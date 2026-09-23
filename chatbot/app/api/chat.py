import time

from fastapi import APIRouter, HTTPException

from app.api.schemas import ChatRequest, ChatResponse
from app.generation.answer_generator import generate_answer
from app.retrieval.retriever import retrieve_chunks
from app.retrieval.source_builder import build_sources


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Process a student question through the PlaceIntel RAG pipeline.

    Pipeline:

        Student Question
              ↓
        Query Embedding
              ↓
        pgvector Retrieval
              ↓
        Context Building
              ↓
        Grounded Gemini Generation
              ↓
        Source Building
              ↓
        Chat Response

    The endpoint also records total request latency so that
    RAG performance can be measured before optimization.
    """

    # ---------------------------------------------------------
    # Start request timer
    # ---------------------------------------------------------

    request_start = time.perf_counter()

    # ---------------------------------------------------------
    # Validate question
    # ---------------------------------------------------------

    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    try:
        # -----------------------------------------------------
        # Step 1: Retrieve relevant placement chunks
        # -----------------------------------------------------

        retrieved_chunks = retrieve_chunks(
            query=question,
            top_k=5,
        )

        # -----------------------------------------------------
        # Step 2: Generate grounded answer
        # -----------------------------------------------------

        answer = generate_answer(
            question=question,
            retrieved_chunks=retrieved_chunks,
        )

        # -----------------------------------------------------
        # Step 3: Build structured source references
        # -----------------------------------------------------

        sources = build_sources(
            retrieved_chunks=retrieved_chunks,
        )

        # -----------------------------------------------------
        # Calculate total request latency
        # -----------------------------------------------------

        total_time = time.perf_counter() - request_start

        print(
            f"[CHAT] Total request time: "
            f"{total_time:.3f}s | "
            f"Chunks: {len(retrieved_chunks)} | "
            f"Sources: {len(sources)}"
        )

        # -----------------------------------------------------
        # Return response
        # -----------------------------------------------------

        return ChatResponse(
            answer=answer,
            sources=sources,
        )

    except HTTPException:
        raise

    except Exception as exc:
        # -----------------------------------------------------
        # Log complete server-side error details
        # -----------------------------------------------------

        print("========== CHAT ERROR ==========")

        import traceback

        traceback.print_exc()

        print("================================")

        # -----------------------------------------------------
        # Do not expose internal exception details to clients.
        # -----------------------------------------------------

        raise HTTPException(
            status_code=500,
            detail="Unable to process the question.",
        ) from exc