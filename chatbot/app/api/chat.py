import time
import traceback

from fastapi import APIRouter, HTTPException

from app.api.schemas import ChatRequest, ChatResponse
from app.generation.answer_generator import generate_answer
from app.retrieval.hybrid_retriever import retrieve_hybrid
from app.retrieval.source_builder import build_sources
from app.repositories.chat_repository import get_or_create_session, get_recent_messages, save_message
from app.generation.question_resolver import resolve_question


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
async def chat(
    request: ChatRequest,
) -> ChatResponse:
    """
    Process a student question through the PlaceIntel RAG pipeline.
    """

    request_start = time.perf_counter()

    question = request.question.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    try:
        user_id = request.user_id
        session_id = request.session_id

        # 1. Setup session
        if user_id:
            session_id = get_or_create_session(user_id=user_id, session_id=session_id)
            recent_messages = get_recent_messages(session_id=session_id, limit=6)
        else:
            recent_messages = []

        # 2. Resolve question and check intent
        resolved_info = resolve_question(question=question, history=recent_messages)

        if not resolved_info.is_placement_related:
            answer = "I am a Placement Assistant focused on placement-related information such as companies, roles, packages, eligibility, and selection processes. I cannot answer unrelated questions."
            if session_id:
                save_message(session_id=session_id, role="USER", content=question)
                save_message(session_id=session_id, role="ASSISTANT", content=answer)
            return ChatResponse(
                answer=answer,
                sources=[],
                session_id=session_id
            )

        resolved_query = resolved_info.resolved_query
        company_filter = resolved_info.active_company
        print(f"[RESOLVED QUERY] {resolved_query} | [COMPANY FILTER] {company_filter}")

        # 3. Retrieve relevant chunks
        retrieved_chunks = retrieve_hybrid(
            question=resolved_query,
            top_k_pdf=5,
            company_filter=company_filter,
        )

        # 4. Generate grounded answer
        generation_result = generate_answer(
            question=resolved_query,
            retrieved_chunks=retrieved_chunks,
        )

        # 5. Build sources
        sources = build_sources(
            retrieved_chunks=generation_result.context_chunks,
        )

        # 6. Save messages
        if session_id:
            save_message(session_id=session_id, role="USER", content=question)
            save_message(session_id=session_id, role="ASSISTANT", content=generation_result.answer)

        total_time = time.perf_counter() - request_start
        print(f"[CHAT] Request time: {total_time:.3f}s | Retrieved: {len(retrieved_chunks)} | Session: {session_id}")

        return ChatResponse(
            answer=generation_result.answer,
            sources=sources,
            session_id=session_id
        )

    except HTTPException:
        raise

    except Exception as exc:
        # -----------------------------------------------------
        # Log complete server-side error details
        # -----------------------------------------------------

        print("========== CHAT ERROR ==========")

        traceback.print_exc()

        print("================================")

        # -----------------------------------------------------
        # Do not expose internal exception details to clients.
        # -----------------------------------------------------

        raise HTTPException(
            status_code=500,
            detail="Unable to process the question.",
        ) from exc