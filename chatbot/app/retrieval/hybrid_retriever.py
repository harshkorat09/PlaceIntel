"""
Hybrid retriever: combines structured SQL placement retrieval
with the existing pgvector PDF chunk retrieval.

Structured results are injected with source_type="structured"
and a synthetic similarity of 1.0 so they always pass the
context selector without changing any selector logic.
"""

from app.repositories.placement_repository import retrieve_structured_placements
from app.retrieval.retriever import retrieve_chunks


def retrieve_hybrid(
    question: str,
    top_k_pdf: int = 5,
    company_filter: str | None = None,
) -> list[dict]:
    """
    Hybrid retrieval: structured SQL placements + pgvector PDF chunks.

    Both paths run independently. Their results are merged so the
    existing answer_generator receives a unified list of context items.

    Args:
        question:       The student's question text.
        top_k_pdf:      Number of PDF vector candidates to retrieve.
        company_filter: Optional company name to restrict retrieval.

    Returns:
        A combined list where:
          - Structured placement dicts have source_type = "structured"
          - PDF chunk dicts have source_type = "pdf" (added here for
            consistency; existing code that omits it still works)
    """

    # ----------------------------------------------------------------
    # 1. Structured SQL retrieval (keyword-based, no embeddings)
    # ----------------------------------------------------------------

    structured_results: list[dict] = []

    try:
        raw_structured = retrieve_structured_placements(question, company_filter=company_filter)

        for record in raw_structured:
            # Convert to a chunk-compatible dict so context_selector
            # and context_builder can process it generically.
            structured_results.append(
                {
                    # Fields needed by context_selector
                    "similarity": 1.0,
                    "chunk_text": _format_structured_context(record),
                    # Structured source tracking
                    "source_type": "structured",
                    "placement_id": record["placement_id"],
                    "company_name": record["company_name"],
                    "position": record["position"],
                    # source_file / page_number are None for structured;
                    # source_builder handles this gracefully.
                    "source_file": None,
                    "page_number": None,
                }
            )
    except Exception as exc:
        print(f"[HYBRID] Structured retrieval error (non-fatal): {exc}")

    # ----------------------------------------------------------------
    # 2. PDF / pgvector retrieval (unchanged existing path)
    # ----------------------------------------------------------------

    pdf_results: list[dict] = []

    try:
        pdf_results = retrieve_chunks(
            query=question,
            top_k=top_k_pdf,
            company_filter=company_filter,
        )
        # Tag PDF results for clarity (source_builder already handles them)
        for item in pdf_results:
            item.setdefault("source_type", "pdf")
    except Exception as exc:
        print(f"[HYBRID] PDF retrieval error (non-fatal): {exc}")

    # ----------------------------------------------------------------
    # 3. Merge: structured first, then PDF chunks
    # ----------------------------------------------------------------

    merged = structured_results + pdf_results

    print(
        f"[HYBRID] Structured: {len(structured_results)} | "
        f"PDF chunks: {len(pdf_results)} | "
        f"Total: {len(merged)}"
    )

    return merged


def _format_structured_context(record: dict) -> str:
    """
    Format a structured placement record as a bounded context string
    for the LLM.  Only includes fields that are actually present.
    """

    lines = [
        "STRUCTURED PLACEMENT DATA",
        f"Company: {record.get('company_name', 'N/A')}",
        f"Position: {record.get('position', 'N/A')}",
    ]

    if record.get("ctc") is not None:
        lines.append(f"CTC: {record['ctc']} LPA")

    if record.get("cgpa_cutoff") is not None:
        lines.append(f"Minimum CGPA: {record['cgpa_cutoff']}")

    if record.get("deadline"):
        lines.append(f"Deadline: {record['deadline']}")

    if record.get("status"):
        lines.append(f"Status: {record['status']}")

    branches = record.get("branches") or []
    if branches:
        lines.append(f"Eligible Branches: {', '.join(branches)}")

    skills = record.get("skills") or []
    if skills:
        lines.append(f"Required Skills: {', '.join(skills)}")

    if record.get("description"):
        lines.append(f"Description: {record['description']}")

    return "\n".join(lines)
