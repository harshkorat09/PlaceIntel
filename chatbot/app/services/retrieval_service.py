from app.services.query_router import IntentContext

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
)

from app.retrieval.retriever import retrieve_chunks


def orchestrate_retrieval(
    question: str,
    intent_context: IntentContext,
    active_company: str | None,
) -> list[dict]:
    """
    Select the correct retrieval strategy for the resolved intent.
    """

    intent = intent_context.intent

    target_companies = list(
        intent_context.target_companies
    )

    if not target_companies and active_company:
        target_companies = [active_company]

    primary_company = (
        target_companies[0]
        if len(target_companies) == 1
        else None
    )

    print(
        f"[ORCHESTRATOR] Intent: {intent} | "
        f"Targets: {target_companies} | "
        f"Skills: {intent_context.target_skills} | "
        f"Branches: {intent_context.target_branches}"
    )

    try:

        # ---------------------------------------------------------
        # Specific placement/company lookup
        # ---------------------------------------------------------

        if intent == "PLACEMENT_LOOKUP":
            return retrieve_hybrid(
                question,
                top_k_pdf=3,
                company_filter=primary_company,
            )

        # ---------------------------------------------------------
        # Structured filtering
        # ---------------------------------------------------------

        if intent == "PLACEMENT_FILTER":
            placements = filter_placements(
                skills=(
                    intent_context.target_skills
                    or None
                ),
                branches=(
                    intent_context.target_branches
                    or None
                ),
            )

            return _wrap_structured_results(
                placements
            )

        # ---------------------------------------------------------
        # Company comparison
        # ---------------------------------------------------------

        if intent == "PLACEMENT_COMPARISON":

            if target_companies:
                placements = get_placements_by_companies(
                    target_companies
                )
            else:
                placements = get_all_active_placements()

            structured = _wrap_structured_results(
                placements
            )

            if target_companies:
                for company in target_companies:
                    try:
                        pdf_chunks = retrieve_chunks(
                            question,
                            top_k=3,
                            company_filter=company,
                        )

                        for chunk in pdf_chunks:
                            chunk.setdefault(
                                "source_type",
                                "pdf",
                            )

                        structured.extend(
                            pdf_chunks
                        )

                    except Exception as exc:
                        print(
                            "[ORCHESTRATOR] "
                            f"PDF comparison retrieval failed: {exc}"
                        )

            return structured

        # ---------------------------------------------------------
        # Deterministic aggregation
        # ---------------------------------------------------------

        if intent == "PLACEMENT_AGGREGATION":

            question_lower = question.lower()

            if (
                "highest ctc" in question_lower
                or "highest package" in question_lower
                or "highest package" in question_lower
                or "maximum ctc" in question_lower
                or "maximum package" in question_lower
                or "highest salary" in question_lower
            ):
                placements = get_highest_ctc_placements()

                return _wrap_structured_results(
                    placements
                )

            if (
                "lowest cgpa" in question_lower
                or "minimum cgpa" in question_lower
                or "lowest cutoff" in question_lower
            ):
                placements = get_lowest_cgpa_placements()

                return _wrap_structured_results(
                    placements
                )

            # General aggregation fallback.
            placements = get_all_active_placements()

            return _wrap_structured_results(
                placements
            )

        # ---------------------------------------------------------
        # Criteria-based query
        # ---------------------------------------------------------

        if intent == "PLACEMENT_CRITERIA":

            placements = filter_placements(
                skills=(
                    intent_context.target_skills
                    or None
                ),
                branches=(
                    intent_context.target_branches
                    or None
                ),
            )

            if not placements:
                placements = get_all_active_placements()

            return _wrap_structured_results(
                placements
            )

        # ---------------------------------------------------------
        # Company visits
        # ---------------------------------------------------------

        if intent == "COMPANY_VISITS":

            return []

        # ---------------------------------------------------------
        # Placement notice RAG
        # ---------------------------------------------------------

        if intent == "NOTICE_RAG":

            if primary_company:
                pdf_chunks = retrieve_chunks(
                    question,
                    top_k=5,
                    company_filter=primary_company,
                )

                if not pdf_chunks:
                    pdf_chunks = retrieve_chunks(
                        question,
                        top_k=5,
                    )
            else:
                pdf_chunks = retrieve_chunks(
                    question,
                    top_k=5,
                )

            for chunk in pdf_chunks:
                chunk.setdefault(
                    "source_type",
                    "pdf",
                )

            return pdf_chunks

        # ---------------------------------------------------------
        # Hybrid retrieval
        # ---------------------------------------------------------

        if intent == "HYBRID":

            return retrieve_hybrid(
                question,
                top_k_pdf=5,
                company_filter=primary_company,
            )

        # ---------------------------------------------------------
        # General placement
        # ---------------------------------------------------------

        if intent == "GENERAL_PLACEMENT":

            placements = get_all_active_placements()

            return _wrap_structured_results(
                placements
            )

        # ---------------------------------------------------------
        # Out of domain
        # ---------------------------------------------------------

        return []

    except Exception as exc:

        print(
            f"[ORCHESTRATOR] "
            f"Retrieval error for intent {intent}: {exc}"
        )

        return []


def _wrap_structured_results(
    placements: list[dict],
) -> list[dict]:
    """
    Convert structured placement records into the common
    context format used by the generation layer.
    """

    results = []

    for record in placements:

        results.append(
            {
                "similarity": 1.0,
                "chunk_text": _format_structured_context(
                    record
                ),
                "source_type": "structured",
                "placement_id": record[
                    "placement_id"
                ],
                "company_name": record[
                    "company_name"
                ],
                "position": record[
                    "position"
                ],
                "source_file": None,
                "page_number": None,
            }
        )

    return results