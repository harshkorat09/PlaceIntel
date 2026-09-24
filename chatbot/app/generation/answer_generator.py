import time
from dataclasses import dataclass
from typing import Any

from google import genai
from google.genai import types

from app.config import (
    GENERATION_FALLBACK_MODEL,
    GENERATION_MODEL,
    GEMINI_API_KEY,
)
from app.generation.model_router import AdaptiveModelRouter
from app.generation.prompt_builder import build_rag_prompt
from app.retrieval.context_builder import build_context
from app.retrieval.context_selector import select_context_chunks


# ---------------------------------------------------------
# Generation result
# ---------------------------------------------------------


@dataclass
class GenerationResult:
    """
    Result returned by the generation layer.

    answer:
        Final answer generated for the student.

    context_chunks:
        Exact chunks selected as evidence for generation.
        These are also used to build source references.
    """

    answer: str
    context_chunks: list[dict[str, Any]]


# ---------------------------------------------------------
# Gemini client
# ---------------------------------------------------------

client = genai.Client(
    api_key=GEMINI_API_KEY,
    http_options=types.HttpOptions(
        timeout=30_000,
    ),
)


MAX_OUTPUT_TOKENS = 1000


# ---------------------------------------------------------
# Adaptive model router
# ---------------------------------------------------------

model_router = AdaptiveModelRouter(
    primary_model=GENERATION_MODEL,
    fallback_model=GENERATION_FALLBACK_MODEL,
    recovery_interval_seconds=300,
)


# ---------------------------------------------------------
# Gemini generation
# ---------------------------------------------------------


def _generate_with_model(
    model: str,
    prompt: str,
) -> str:
    """
    Generate an answer using a specific Gemini model.

    Generation latency is measured for observability.
    """

    start_time = time.perf_counter()

    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=MAX_OUTPUT_TOKENS,
        ),
    )

    generation_time = time.perf_counter() - start_time

    if not response.text:
        raise ValueError(
            f"{model} returned an empty response."
        )

    finish_reason = None

    if response.candidates:
        finish_reason = response.candidates[0].finish_reason

    print(
        f"Gemini model: {model} | "
        f"Generation: {generation_time:.3f}s | "
        f"Finish reason: {finish_reason} | "
        f"Response length: {len(response.text)}"
    )

    return response.text.strip()


# ---------------------------------------------------------
# Answer generation
# ---------------------------------------------------------


def generate_answer(
    question: str,
    retrieved_chunks: list[dict[str, Any]],
) -> GenerationResult:
    """
    Generate a grounded placement answer.

    Retrieval returns candidate chunks. Before generation,
    only the strongest relevant chunks are passed to Gemini.

    The selected chunks are returned together with the answer
    so that the API can build source references from the exact
    evidence used for generation.
    """

    # ---------------------------------------------------------
    # Validate question
    # ---------------------------------------------------------

    if not question.strip():
        raise ValueError(
            "Question cannot be empty."
        )

    # ---------------------------------------------------------
    # Select relevant context
    # ---------------------------------------------------------

    selected_chunks = select_context_chunks(
        retrieved_chunks
    )

    print(
        f"[CONTEXT] Retrieved: "
        f"{len(retrieved_chunks)} | "
        f"Selected: {len(selected_chunks)}"
    )

    # ---------------------------------------------------------
    # No relevant context
    # ---------------------------------------------------------

    if not selected_chunks:
        return GenerationResult(
            answer=(
                "I searched the placement knowledge base, but "
                "couldn't find enough relevant evidence for that. "
                "Try asking about companies, roles, eligibility, "
                "skills, packages, or placement notices."
            ),
            context_chunks=[],
        )

    # ---------------------------------------------------------
    # Build context
    # ---------------------------------------------------------

    context = build_context(
        selected_chunks
    )

    if not context:
        return GenerationResult(
            answer=(
                "I searched the placement knowledge base, but "
                "couldn't find enough relevant evidence for that. "
                "Try asking about companies, roles, eligibility, "
                "skills, packages, or placement notices."
            ),
            context_chunks=[],
        )

    # ---------------------------------------------------------
    # Build grounded prompt
    # ---------------------------------------------------------

    prompt = build_rag_prompt(
        question=question,
        context=context,
    )

    # ---------------------------------------------------------
    # Select runtime model
    # ---------------------------------------------------------

    model = model_router.get_model()

    print(
        f"[MODEL ROUTER] "
        f"Selected model: {model}"
    )

    # ---------------------------------------------------------
    # Generate answer
    # ---------------------------------------------------------

    try:
        answer = _generate_with_model(
            model=model,
            prompt=prompt,
        )

        model_router.record_success(
            model=model,
        )

        return GenerationResult(
            answer=answer,
            context_chunks=selected_chunks,
        )

    except Exception as model_error:

        print(
            f"Model failed: {model} | "
            f"Error: {model_error}"
        )

        # -----------------------------------------------------
        # Primary model failed → fallback
        # -----------------------------------------------------

        if model == GENERATION_MODEL:

            model_router.record_failure(
                model=model,
            )

            fallback_model = GENERATION_FALLBACK_MODEL

            print(
                "[MODEL ROUTER] "
                f"Retrying with fallback: "
                f"{fallback_model}"
            )

            try:
                answer = _generate_with_model(
                    model=fallback_model,
                    prompt=prompt,
                )

                model_router.record_success(
                    model=fallback_model,
                )

                return GenerationResult(
                    answer=answer,
                    context_chunks=selected_chunks,
                )

            except Exception as fallback_error:

                print(
                    "[MODEL ROUTER] "
                    f"Fallback model also failed: "
                    f"{fallback_error}"
                )

                return GenerationResult(
                    answer=(
                        "The placement AI is temporarily "
                        "unavailable. Please try again shortly."
                    ),
                    context_chunks=selected_chunks,
                )

        # -----------------------------------------------------
        # Fallback model failed
        # -----------------------------------------------------

        model_router.record_failure(
            model=model,
        )

        return GenerationResult(
    answer=(
        "The placement AI is temporarily "
        "unavailable. Please try again shortly."
    ),
    context_chunks=[],
)