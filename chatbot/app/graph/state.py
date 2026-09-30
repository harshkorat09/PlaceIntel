"""
PlaceIntel LangGraph State

Typed state that is passed between every node in the workflow.
Only data required to communicate between existing components
is stored here — no database connections, no infrastructure objects.
"""

from __future__ import annotations

from typing import Annotated, Any
from typing_extensions import TypedDict

import operator


class ChatState(TypedDict, total=False):
    # ----------------------------------------------------------------
    # Input fields (populated before graph.invoke())
    # ----------------------------------------------------------------

    question: str
    """The raw student question as received from the API."""

    history: list[dict]
    """Recent conversation messages fetched from the database."""

    # ----------------------------------------------------------------
    # Resolution output  (resolve_question node)
    # ----------------------------------------------------------------

    is_placement_related: bool
    """True when the question is about placements."""

    resolved_query: str
    """Standalone, context-resolved version of the question."""

    intent: str
    """Classified intent string, e.g. PLACEMENT_LOOKUP, HYBRID, …"""

    active_company: str | None
    """Primary company extracted or inherited from history."""

    target_companies: list[str]
    """All companies explicitly mentioned in the question."""

    target_skills: list[str]
    """Skills extracted from the question."""

    target_branches: list[str]
    """Branches extracted from the question."""

    aggregation_subtype: str | None
    """
    Set when intent = PLACEMENT_AGGREGATION.
    Values: highest_ctc | lowest_ctc | ctc_above_threshold |
            lowest_cgpa | highest_cgpa | company_count | general_stats
    """

    # ----------------------------------------------------------------
    # Retrieval output  (structured / vector / hybrid / aggregation nodes)
    # ----------------------------------------------------------------

    retrieved_chunks: Annotated[list[dict[str, Any]], operator.add]
    """
    Context items returned by the active retrieval node.

    Uses `operator.add` so that nodes can append independently
    (used by PLACEMENT_COMPARISON which runs both structured and
    vector retrieval internally, but the merge already happens
    inside the node so only one write is made here).
    """

    # ----------------------------------------------------------------
    # Generation output  (generate_answer / no_evidence_response nodes)
    # ----------------------------------------------------------------

    answer: str
    """Final answer text for the student."""

    context_chunks: list[dict[str, Any]]
    """Exact chunks selected as evidence (used to build sources)."""

    # ----------------------------------------------------------------
    # Source output  (build_sources node)
    # ----------------------------------------------------------------

    sources: list[dict]
    """Source references attached to the API response."""

    # ----------------------------------------------------------------
    # Routing / error bookkeeping
    # ----------------------------------------------------------------

    route: str
    """
    Routing decision written by route_question.
    Values: PLACEMENT_LOOKUP | PLACEMENT_FILTER | PLACEMENT_AGGREGATION
            | PLACEMENT_COMPARISON | PLACEMENT_CRITERIA | NOTICE_RAG
            | HYBRID | COMPANY_VISITS | GENERAL_PLACEMENT | OUT_OF_DOMAIN
    """

    error: str | None
    """Populated when a node encounters a non-fatal error."""
