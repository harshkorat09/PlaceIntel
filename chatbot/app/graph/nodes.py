"""
PlaceIntel LangGraph Nodes

Each node is a thin wrapper that calls the *existing* implementation
and writes its result into the shared ChatState.

NOTHING inside the existing modules is modified.  These nodes merely
bridge the state-passing contract that LangGraph requires.

Node inventory
──────────────
  resolve_question        → app.generation.question_resolver.resolve_question
  route_question          → reads intent from state; sets state["route"]
  out_of_domain_response  → NEW: short-circuits retrieval for OUT_OF_DOMAIN
  structured_retrieval    → placement_repository.filter / get_all / by_company
  vector_retrieval        → retrieval.retriever.retrieve_chunks
  hybrid_retrieval        → retrieval.hybrid_retriever.retrieve_hybrid
  aggregation_retrieval   → placement_repository aggregation functions
                            (driven by aggregation_subtype, not keyword scan)
  evidence_check          → reads state["retrieved_chunks"]; sets routing signal
                            + structured fallback when NOTICE_RAG has 0 chunks
  generate_answer         → generation.answer_generator.generate_answer
  no_evidence_response    → writes the standard no-evidence answer
  build_sources           → retrieval.source_builder.build_sources
"""

from __future__ import annotations

from app.graph.state import ChatState

# ── Existing modules (unchanged) ─────────────────────────────────────
from app.generation.question_resolver import (
    ResolvedQueryContext,
    resolve_question as _resolve_question,
)
from app.generation.answer_generator import generate_answer as _generate_answer
from app.retrieval.source_builder import build_sources as _build_sources
from app.retrieval.retriever import retrieve_chunks
from app.retrieval.hybrid_retriever import (
    retrieve_hybrid,
    _format_structured_context,
)
from app.repositories.placement_repository import (
    get_all_active_placements,
    get_highest_ctc_placements,
    get_lowest_cgpa_placements,
    get_placements_by_companies,
    filter_placements,
    retrieve_structured_placements,
)


# ─────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────

def _wrap_structured_results(placements: list[dict]) -> list[dict]:
    """Convert structured placement records to the common context format.

    This is the same helper that existed in retrieval_service.py,
    kept here so the retrieval nodes can share it without importing
    from the old service.
    """
    results = []
    for record in placements:
        results.append(
            {
                "similarity": 1.0,
                "chunk_text": _format_structured_context(record),
                "source_type": "structured",
                "placement_id": record["placement_id"],
                "company_name": record["company_name"],
                "position": record["position"],
                "source_file": None,
                "page_number": None,
            }
        )
    return results


def _primary_company(state: ChatState) -> str | None:
    """Return the single primary company from state, or None."""
    targets = state.get("target_companies") or []
    active = state.get("active_company")
    if not targets and active:
        targets = [active]
    return targets[0] if len(targets) == 1 else None


# ─────────────────────────────────────────────────────────────────────
# Node: resolve_question
# ─────────────────────────────────────────────────────────────────────

def resolve_question(state: ChatState) -> ChatState:
    """
    Wraps the existing resolve_question() from question_resolver.py.
    Writes the resolved context fields into state.
    """
    question: str = state["question"]
    history: list[dict] = state.get("history") or []

    resolved: ResolvedQueryContext = _resolve_question(
        question=question,
        history=history,
    )

    return {
        "is_placement_related": resolved.is_placement_related,
        "resolved_query": resolved.resolved_query,
        "intent": resolved.intent,
        "active_company": resolved.active_company,
        "target_companies": resolved.target_companies,
        "target_skills": resolved.target_skills,
        "target_branches": resolved.target_branches,
        "aggregation_subtype": resolved.aggregation_subtype,
        # route is set by the next node; initialise for safety
        "route": resolved.intent,
    }


# ─────────────────────────────────────────────────────────────────────
# Node: route_question
# ─────────────────────────────────────────────────────────────────────

def route_question(state: ChatState) -> ChatState:
    """
    Reads the intent resolved by resolve_question and writes a
    normalised ``route`` key that the conditional edge can read.

    This node contains no retrieval or generation logic.
    """
    intent: str = state.get("intent", "HYBRID")

    print(
        f"[GRAPH] Routing intent={intent} | "
        f"company={state.get('active_company')} | "
        f"targets={state.get('target_companies')} | "
        f"agg_subtype={state.get('aggregation_subtype')}"
    )

    return {"route": intent}


# ─────────────────────────────────────────────────────────────────────
# Node: out_of_domain_response  (NEW)
# Short-circuits the retrieval pipeline for OUT_OF_DOMAIN questions.
# ─────────────────────────────────────────────────────────────────────

def out_of_domain_response(state: ChatState) -> ChatState:
    """
    Returns a controlled out-of-domain response without running
    any PostgreSQL or pgvector retrieval.

    This node is only reached when resolve_question classifies the
    question as OUT_OF_DOMAIN (is_placement_related=False).
    """
    answer = (
        "I am a Placement Assistant focused on placement-related information "
        "such as companies, roles, packages, eligibility, and selection processes. "
        "I cannot answer questions unrelated to placements."
    )
    print("[GRAPH] out_of_domain_response: question routed away from retrieval")
    return {
        "answer": answer,
        "context_chunks": [],
        "retrieved_chunks": [],
        "sources": [],
    }


# ─────────────────────────────────────────────────────────────────────
# Node: structured_retrieval
#   Covers: PLACEMENT_FILTER, PLACEMENT_CRITERIA, COMPANY_VISITS,
#           GENERAL_PLACEMENT, PLACEMENT_COMPARISON
# ─────────────────────────────────────────────────────────────────────

def structured_retrieval(state: ChatState) -> ChatState:
    """
    Runs structured SQL retrieval for intents that only need the
    database (no pgvector embeddings).

    Handles:
      PLACEMENT_FILTER    → filter_placements (skills / branches)
      PLACEMENT_CRITERIA  → filter_placements, fallback all
      PLACEMENT_COMPARISON→ by_companies + optional PDF chunks
      COMPANY_VISITS      → empty list (not yet implemented)
      GENERAL_PLACEMENT   → all active placements
    """
    intent = state.get("intent", "GENERAL_PLACEMENT")
    question = state.get("resolved_query", state.get("question", ""))
    targets = list(state.get("target_companies") or [])
    active = state.get("active_company")
    if not targets and active:
        targets = [active]

    skills = state.get("target_skills") or None
    branches = state.get("target_branches") or None

    try:
        if intent in ("PLACEMENT_FILTER", "PLACEMENT_CRITERIA"):
            placements = filter_placements(skills=skills, branches=branches)
            if intent == "PLACEMENT_CRITERIA" and not placements:
                placements = get_all_active_placements()
            chunks = _wrap_structured_results(placements)

        elif intent == "PLACEMENT_COMPARISON":
            if targets:
                placements = get_placements_by_companies(targets)
            else:
                placements = get_all_active_placements()

            chunks = _wrap_structured_results(placements)

            # Augment with PDF chunks per company (mirrors existing logic)
            for company in targets:
                try:
                    pdf_chunks = retrieve_chunks(question, top_k=3, company_filter=company)
                    for chunk in pdf_chunks:
                        chunk.setdefault("source_type", "pdf")
                    chunks.extend(pdf_chunks)
                except Exception as exc:
                    print(f"[GRAPH] PDF comparison retrieval failed for {company}: {exc}")

        elif intent == "COMPANY_VISITS":
            chunks = []

        else:  # GENERAL_PLACEMENT or fallback
            placements = get_all_active_placements()
            chunks = _wrap_structured_results(placements)

    except Exception as exc:
        print(f"[GRAPH] structured_retrieval error: {exc}")
        chunks = []

    print(f"[GRAPH] structured_retrieval → {len(chunks)} chunks")
    return {"retrieved_chunks": chunks}


# ─────────────────────────────────────────────────────────────────────
# Node: vector_retrieval
#   Covers: NOTICE_RAG
# ─────────────────────────────────────────────────────────────────────

def vector_retrieval(state: ChatState) -> ChatState:
    """
    Runs pgvector similarity search for NOTICE_RAG intent.
    Calls the existing retrieve_chunks() without modification.
    """
    question = state.get("resolved_query", state.get("question", ""))
    primary = _primary_company(state)

    try:
        if primary:
            chunks = retrieve_chunks(question, top_k=5, company_filter=primary)
            if not chunks:
                chunks = retrieve_chunks(question, top_k=5)
        else:
            chunks = retrieve_chunks(question, top_k=5)

        for chunk in chunks:
            chunk.setdefault("source_type", "pdf")

    except Exception as exc:
        print(f"[GRAPH] vector_retrieval error: {exc}")
        chunks = []

    print(f"[GRAPH] vector_retrieval → {len(chunks)} chunks")
    return {"retrieved_chunks": chunks}


# ─────────────────────────────────────────────────────────────────────
# Node: hybrid_retrieval
#   Covers: PLACEMENT_LOOKUP, HYBRID
# ─────────────────────────────────────────────────────────────────────

def hybrid_retrieval(state: ChatState) -> ChatState:
    """
    Runs hybrid retrieval (structured SQL + pgvector) for
    PLACEMENT_LOOKUP and HYBRID intents.
    Calls the existing retrieve_hybrid() without modification.
    """
    question = state.get("resolved_query", state.get("question", ""))
    primary = _primary_company(state)

    top_k = 3 if state.get("intent") == "PLACEMENT_LOOKUP" else 5

    try:
        chunks = retrieve_hybrid(question, top_k_pdf=top_k, company_filter=primary)
    except Exception as exc:
        print(f"[GRAPH] hybrid_retrieval error: {exc}")
        chunks = []

    print(f"[GRAPH] hybrid_retrieval → {len(chunks)} chunks")
    return {"retrieved_chunks": chunks}


# ─────────────────────────────────────────────────────────────────────
# Node: aggregation_retrieval
#   Covers: PLACEMENT_AGGREGATION
#   Uses aggregation_subtype from state (set by resolver) instead of
#   brittle keyword scanning.
# ─────────────────────────────────────────────────────────────────────

# Map aggregation_subtype values to CTC threshold detection
_CTC_ABOVE_PATTERN = r"(\d+(?:\.\d+)?)\s*(?:lpa|lakh|lac|l\.?p\.?a\.?)"

def aggregation_retrieval(state: ChatState) -> ChatState:
    """
    Runs deterministic aggregation queries for PLACEMENT_AGGREGATION intent.

    Uses state["aggregation_subtype"] (set by the LLM resolver) instead
    of re-parsing the question text with brittle keyword matching.

    Supported subtypes:
      highest_ctc         → get_highest_ctc_placements()
      lowest_ctc          → SQL ORDER BY ctc ASC
      ctc_above_threshold → filter placements where ctc > threshold
      lowest_cgpa         → get_lowest_cgpa_placements()
      highest_cgpa        → SQL ORDER BY cgpaCutoff DESC
      company_count       → get_all_active_placements()  (count in answer)
      general_stats       → get_all_active_placements()
    """
    subtype = state.get("aggregation_subtype") or "highest_ctc"
    question = state.get("resolved_query") or state.get("question") or ""

    try:
        if subtype == "highest_ctc":
            placements = get_highest_ctc_placements()

        elif subtype == "lowest_ctc":
            # Use get_all sorted ASC — cheapest available query
            all_p = get_all_active_placements()
            placements = sorted(
                [p for p in all_p if p.get("ctc") is not None],
                key=lambda p: p["ctc"],
            )[:3]

        elif subtype == "ctc_above_threshold":
            # Extract threshold from resolved query
            import re as _re
            match = _re.search(_CTC_ABOVE_PATTERN, question, _re.IGNORECASE)
            threshold = float(match.group(1)) if match else 10.0
            all_p = get_all_active_placements()
            placements = [
                p for p in all_p
                if p.get("ctc") is not None and float(p["ctc"]) > threshold
            ]

        elif subtype == "lowest_cgpa":
            placements = get_lowest_cgpa_placements()

        elif subtype == "highest_cgpa":
            all_p = get_all_active_placements()
            placements = sorted(
                [p for p in all_p if p.get("cgpa_cutoff") is not None],
                key=lambda p: p["cgpa_cutoff"],
                reverse=True,
            )[:3]

        elif subtype in ("company_count", "general_stats"):
            placements = get_all_active_placements()

        else:
            # Unknown subtype — fall back to highest CTC (safe default)
            placements = get_highest_ctc_placements()

        chunks = _wrap_structured_results(placements)

    except Exception as exc:
        print(f"[GRAPH] aggregation_retrieval error: {exc}")
        chunks = []

    print(f"[GRAPH] aggregation_retrieval ({subtype}) → {len(chunks)} chunks")
    return {"retrieved_chunks": chunks}


# ─────────────────────────────────────────────────────────────────────
# Node: evidence_check
# ─────────────────────────────────────────────────────────────────────

def evidence_check(state: ChatState) -> ChatState:
    """
    Inspects retrieved_chunks and sets a routing signal so the
    conditional edge can choose between generate_answer and
    no_evidence_response.

    NOTICE_RAG FALLBACK:
    When a NOTICE_RAG question returns 0 PDF chunks (no notice ingested
    for that company), this node runs a structured fallback retrieval
    so at least the database record is returned as evidence, rather
    than immediately returning no_evidence.

    No generation happens here; this node only reads state.
    """
    chunks = state.get("retrieved_chunks") or []
    intent = state.get("intent", "")

    # ── NOTICE_RAG structured fallback ──────────────────────────────
    if intent == "NOTICE_RAG" and len(chunks) == 0:
        question = state.get("resolved_query", state.get("question", ""))
        active = state.get("active_company")
        targets = state.get("target_companies") or []
        company = active or (targets[0] if targets else None)

        print(f"[GRAPH] evidence_check: NOTICE_RAG 0 chunks → structured fallback for company={company}")

        try:
            if company:
                fallback_placements = retrieve_structured_placements(question, company_filter=company)
            else:
                fallback_placements = get_all_active_placements()[:3]

            if fallback_placements:
                chunks = _wrap_structured_results(fallback_placements)
                print(f"[GRAPH] evidence_check: structured fallback → {len(chunks)} chunks")
        except Exception as exc:
            print(f"[GRAPH] evidence_check: structured fallback error: {exc}")
            chunks = []

    has_evidence = len(chunks) > 0
    print(f"[GRAPH] evidence_check → has_evidence={has_evidence} ({len(chunks)} chunks)")

    # Store the (possibly augmented) chunks back so generate_answer sees them
    return {
        "retrieved_chunks": chunks,
        "route": "HAS_EVIDENCE" if has_evidence else "NO_EVIDENCE",
    }


# ─────────────────────────────────────────────────────────────────────
# Node: generate_answer
# ─────────────────────────────────────────────────────────────────────

def generate_answer(state: ChatState) -> ChatState:
    """
    Wraps the existing generate_answer() from answer_generator.py.
    Writes the answer and the exact context_chunks used into state.
    """
    question = state.get("resolved_query") or state.get("question", "")
    chunks = state.get("retrieved_chunks") or []

    result = _generate_answer(
        question=question,
        retrieved_chunks=chunks,
    )

    return {
        "answer": result.answer,
        "context_chunks": result.context_chunks,
    }


# ─────────────────────────────────────────────────────────────────────
# Node: no_evidence_response
# ─────────────────────────────────────────────────────────────────────

def no_evidence_response(state: ChatState) -> ChatState:
    """
    Returns the standard no-evidence answer when no chunks were retrieved.
    This preserves the exact wording used by the original answer_generator.
    """
    answer = (
        "I could not find relevant information in the placement database for that. "
        "Try asking about specific companies, CTC, eligibility, skills, branches, "
        "placement notices, or comparisons between companies in the system."
    )
    return {"answer": answer, "context_chunks": []}


# ─────────────────────────────────────────────────────────────────────
# Node: build_sources
# ─────────────────────────────────────────────────────────────────────

def build_sources(state: ChatState) -> ChatState:
    """
    Wraps the existing build_sources() from source_builder.py.
    Writes the source list into state.
    """
    context_chunks = state.get("context_chunks") or []
    answer = state.get("answer") or ""

    sources = _build_sources(
        retrieved_chunks=context_chunks,
        answer_text=answer,
    )

    return {"sources": sources}


# ─────────────────────────────────────────────────────────────────────
# Conditional edge functions (used by graph.py)
# ─────────────────────────────────────────────────────────────────────

# Intents that go to structured_retrieval
_STRUCTURED_INTENTS = {
    "PLACEMENT_FILTER",
    "PLACEMENT_CRITERIA",
    "PLACEMENT_COMPARISON",
    "COMPANY_VISITS",
    "GENERAL_PLACEMENT",
}

# Intents that go to vector_retrieval
_VECTOR_INTENTS = {"NOTICE_RAG"}

# Intents that go to hybrid_retrieval
_HYBRID_INTENTS = {"PLACEMENT_LOOKUP", "HYBRID"}

# Intents that go to aggregation_retrieval
_AGGREGATION_INTENTS = {"PLACEMENT_AGGREGATION"}

# Intents that skip retrieval entirely
_OUT_OF_DOMAIN_INTENTS = {"OUT_OF_DOMAIN"}


def decide_retrieval_path(state: ChatState) -> str:
    """
    Conditional edge: choose which retrieval node to execute.
    Returns a string matching one of the edge labels registered
    in graph.py.
    """
    route = state.get("route", "HYBRID")

    if route in _OUT_OF_DOMAIN_INTENTS:
        return "out_of_domain"
    if route in _STRUCTURED_INTENTS:
        return "structured"
    if route in _VECTOR_INTENTS:
        return "vector"
    if route in _AGGREGATION_INTENTS:
        return "aggregation"
    # PLACEMENT_LOOKUP, HYBRID, unknown → hybrid
    return "hybrid"


def decide_generation_path(state: ChatState) -> str:
    """
    Conditional edge: choose between generate_answer and no_evidence_response.
    Reads the route key set by evidence_check.
    """
    return state.get("route", "NO_EVIDENCE")
