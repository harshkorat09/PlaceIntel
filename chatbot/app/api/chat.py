import time
import traceback

from fastapi import APIRouter, HTTPException

from app.api.schemas import ChatRequest, ChatResponse
from app.repositories.chat_repository import get_or_create_session, get_recent_messages, save_message
from app.graph.graph import graph


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
    Process a student question through the PlaceIntel Placement Intelligence pipeline.

    The request is handled entirely by the LangGraph workflow defined in
    app/graph/graph.py.  Session setup and persistence remain unchanged.
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

        # ── 1. Session setup (unchanged) ──────────────────────────────
        if user_id:
            session_id = get_or_create_session(user_id=user_id, session_id=session_id)
            recent_messages = get_recent_messages(session_id=session_id, limit=6)
        else:
            recent_messages = []

        # ── 2. Out-of-domain short-circuit (pre-graph) ───────────────
        # The graph handles this internally but we keep the fast-path
        # session-save behaviour for OUT_OF_DOMAIN consistent with the
        # original implementation by letting the graph run and checking
        # the answer afterward (see step 3).

        # ── 3. Invoke the LangGraph workflow ─────────────────────────
        initial_state = {
            "question": question,
            "history": recent_messages,
            # Initialise list fields to avoid Annotated[list, operator.add]
            # accumulation issues on a fresh invocation.
            "retrieved_chunks": [],
        }

        final_state = graph.invoke(initial_state)

        # ── 4. Extract results from final state ───────────────────────
        is_placement_related: bool = final_state.get("is_placement_related", True)
        intent: str = final_state.get("intent", "PLACEMENT_LOOKUP")
        answer: str = final_state.get("answer", "")
        sources_raw: list[dict] = final_state.get("sources") or []

        # ── 5. Out-of-domain override (mirrors original behaviour) ────
        if not is_placement_related or intent == "OUT_OF_DOMAIN":
            answer = (
                "I am a Placement Assistant focused on placement-related information "
                "such as companies, roles, packages, eligibility, and selection processes. "
                "I cannot answer unrelated questions."
            )
            if session_id:
                save_message(session_id=session_id, role="USER", content=question)
                save_message(session_id=session_id, role="ASSISTANT", content=answer)
            return ChatResponse(
                answer=answer,
                sources=[],
                session_id=session_id,
            )

        # ── 6. Persist conversation messages ─────────────────────────
        if session_id:
            save_message(session_id=session_id, role="USER", content=question)
            save_message(session_id=session_id, role="ASSISTANT", content=answer)

        total_time = time.perf_counter() - request_start
        print(
            f"[CHAT] Request time: {total_time:.3f}s | "
            f"Intent: {intent} | "
            f"Sources: {len(sources_raw)} | "
            f"Session: {session_id}"
        )

        return ChatResponse(
            answer=answer,
            sources=sources_raw,
            session_id=session_id,
        )

    except HTTPException:
        raise

    except Exception as exc:
        # -----------------------------------------------------------------
        # Log complete server-side error details
        # -----------------------------------------------------------------

        print("========== CHAT ERROR ==========")

        traceback.print_exc()

        print("================================")

        # -----------------------------------------------------------------
        # Do not expose internal exception details to clients.
        # -----------------------------------------------------------------

        raise HTTPException(
            status_code=500,
            detail="Unable to process the question.",
        ) from exc