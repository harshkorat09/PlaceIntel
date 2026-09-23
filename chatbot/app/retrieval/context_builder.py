from typing import Any


def build_context(results: list[dict[str, Any]]) -> str:
    """
    Convert retrieved chunks into structured context
    that can be provided to the LLM.

    Args:
        results: Retrieved chunks returned by the retrieval layer.

    Returns:
        Formatted context string.
    """

    if not results:
        return ""

    context_parts: list[str] = []

    for index, result in enumerate(results, start=1):
        source_file = result.get("source_file", "Unknown source")
        page_number = result.get("page_number", "Unknown page")
        chunk_text = result.get("chunk_text", "").strip()

        if not chunk_text:
            continue

        context_parts.append(
            f"""SOURCE {index}
File: {source_file}
Page: {page_number}

{chunk_text}"""
        )

    return "\n\n---\n\n".join(context_parts)