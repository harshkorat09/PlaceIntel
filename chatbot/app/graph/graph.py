"""
PlaceIntel LangGraph Workflow

Compiles the StateGraph that replaces the manual orchestration
that previously lived in app/api/chat.py and
app/services/retrieval_service.py.

Graph topology
──────────────

  START
    │
    ▼
  resolve_question
    │
    ▼
  route_question
    │  (conditional edge: decide_retrieval_path)
    ├─► out_of_domain_response  ← NEW: OUT_OF_DOMAIN short-circuit
    ├─► structured_retrieval
    ├─► vector_retrieval
    ├─► hybrid_retrieval
    └─► aggregation_retrieval
           │  (all converge except out_of_domain → build_sources directly)
           ▼
        evidence_check
           │  (conditional edge: decide_generation_path)
           ├─► generate_answer
           └─► no_evidence_response
                    │  (both converge)
                    ▼
               build_sources
                    │
                    ▼
                  END

The graph is compiled once at module load time and reused across
all requests (stateless; all mutable state lives in ChatState).
"""

from __future__ import annotations

from langgraph.graph import StateGraph, START, END

from app.graph.state import ChatState
from app.graph.nodes import (
    resolve_question,
    route_question,
    out_of_domain_response,
    structured_retrieval,
    vector_retrieval,
    hybrid_retrieval,
    aggregation_retrieval,
    evidence_check,
    generate_answer,
    no_evidence_response,
    build_sources,
    decide_retrieval_path,
    decide_generation_path,
)


# ─────────────────────────────────────────────────────────────────────
# Build the graph
# ─────────────────────────────────────────────────────────────────────

def _build_graph() -> StateGraph:
    # pyrefly: ignore [bad-specialization]
    builder = StateGraph(ChatState)

    # ── Nodes ──────────────────────────────────────────────────────
    builder.add_node("resolve_question", resolve_question)
    builder.add_node("route_question", route_question)
    builder.add_node("out_of_domain_response", out_of_domain_response)
    builder.add_node("structured_retrieval", structured_retrieval)
    builder.add_node("vector_retrieval", vector_retrieval)
    builder.add_node("hybrid_retrieval", hybrid_retrieval)
    builder.add_node("aggregation_retrieval", aggregation_retrieval)
    builder.add_node("evidence_check", evidence_check)
    builder.add_node("generate_answer", generate_answer)
    builder.add_node("no_evidence_response", no_evidence_response)
    builder.add_node("build_sources", build_sources)

    # ── Entry edge ─────────────────────────────────────────────────
    builder.add_edge(START, "resolve_question")
    builder.add_edge("resolve_question", "route_question")

    # ── Conditional routing: intent → retrieval node ───────────────
    builder.add_conditional_edges(
        "route_question",
        decide_retrieval_path,
        {
            "out_of_domain": "out_of_domain_response",
            "structured":    "structured_retrieval",
            "vector":        "vector_retrieval",
            "hybrid":        "hybrid_retrieval",
            "aggregation":   "aggregation_retrieval",
        },
    )

    # ── OUT_OF_DOMAIN bypasses evidence_check, goes straight to build_sources
    builder.add_edge("out_of_domain_response", "build_sources")

    # ── All other retrieval paths converge at evidence_check ───────
    builder.add_edge("structured_retrieval",   "evidence_check")
    builder.add_edge("vector_retrieval",       "evidence_check")
    builder.add_edge("hybrid_retrieval",       "evidence_check")
    builder.add_edge("aggregation_retrieval",  "evidence_check")

    # ── Conditional routing: evidence → generation node ────────────
    builder.add_conditional_edges(
        "evidence_check",
        decide_generation_path,
        {
            "HAS_EVIDENCE": "generate_answer",
            "NO_EVIDENCE":  "no_evidence_response",
        },
    )

    # ── Both generation paths converge at build_sources ────────────
    builder.add_edge("generate_answer",       "build_sources")
    builder.add_edge("no_evidence_response",  "build_sources")

    # ── Final edge ─────────────────────────────────────────────────
    builder.add_edge("build_sources", END)

    return builder


# Compile once at import time — the compiled graph is threadsafe
# and reused across all FastAPI requests.
_builder = _build_graph()
graph = _builder.compile()
