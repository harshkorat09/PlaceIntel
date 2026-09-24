from typing import Any


def build_context(results: list[dict[str, Any]]) -> str:
    """
    Convert retrieved results (structured placements OR PDF chunks)
    into a combined context string for the LLM.

    Structured results (source_type="structured") are rendered as
    labelled placement data blocks.

    PDF chunk results (source_type="pdf" or untagged) are rendered
    with File/Page attribution exactly as before.

    Args:
        results: Mixed list from the hybrid retriever.

    Returns:
        Formatted context string for the LLM prompt.
    """

    if not results:
        return ""

    context_parts: list[str] = []

    for index, result in enumerate(results, start=1):
        source_type = result.get("source_type", "pdf")
        chunk_text = result.get("chunk_text", "").strip()

        if not chunk_text:
            continue

        if source_type == "structured":
            # Structured placement record — render as labelled block
            company_name = result.get("company_name", "Unknown Company")
            position = result.get("position", "Unknown Position")
            context_parts.append(
                f"""SOURCE {index}
Type: Structured Placement Data
Company: {company_name}
Position: {position}

{chunk_text}"""
            )
        else:
            # PDF chunk — original rendering (File + Page)
            source_file = result.get("source_file", "Unknown source")
            page_number = result.get("page_number", "Unknown page")
            context_parts.append(
                f"""SOURCE {index}
File: {source_file}
Page: {page_number}

{chunk_text}"""
            )

    return "\n\n---\n\n".join(context_parts)