import time

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
# Gemini client
# ---------------------------------------------------------

client = genai.Client(
    api_key=GEMINI_API_KEY,
    http_options=types.HttpOptions(
        timeout=10_000,
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

    generation_time = (
        time.perf_counter()
        - start_time
    )

    if not response.text:
        raise ValueError(
            f"{model} returned an empty response."
        )

    finish_reason = None

    if response.candidates:
        finish_reason = (
            response.candidates[0].finish_reason
        )

    print(
        f"Gemini model: {model} | "
        f"Generation: {generation_time:.3f}s | "
        f"Finish reason: {finish_reason} | "
        f"Response length: {len(response.text)}"
    )

    return response.text.strip()


def generate_answer(
    question: str,
    retrieved_chunks: list[dict],
) -> str:
    """
    Generate a grounded placement answer.

    Retrieval returns candidate chunks. Before generation,
    only the strongest relevant chunks are passed to Gemini.

    Model selection is handled by AdaptiveModelRouter.
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

    if not selected_chunks:
        return (
            "I searched the placement knowledge base, but "
            "couldn't find enough relevant evidence for that. "
            "Try asking about companies, roles, eligibility, "
            "skills, packages, or placement notices."
        )

    # ---------------------------------------------------------
    # Build context
    # ---------------------------------------------------------

    context = build_context(
        selected_chunks
    )

    if not context:
        return (
            "I searched the placement knowledge base, but "
            "couldn't find enough relevant evidence for that. "
            "Try asking about companies, roles, eligibility, "
            "skills, packages, or placement notices."
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

        return answer

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

            fallback_model = (
                GENERATION_FALLBACK_MODEL
            )

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

                return answer

            except Exception as fallback_error:

                print(
                    "[MODEL ROUTER] "
                    f"Fallback model also failed: "
                    f"{fallback_error}"
                )

                return (
                    "The placement AI is temporarily "
                    "unavailable. Please try again shortly."
                )

        # -----------------------------------------------------
        # Fallback model failed
        # -----------------------------------------------------

        model_router.record_failure(
            model=model,
        )

        return (
            "The placement AI is temporarily "
            "unavailable. Please try again shortly."
        )