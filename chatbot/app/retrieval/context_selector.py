from typing import Any


# Minimum similarity for a chunk to be considered
# useful evidence for generation.
MIN_CONTEXT_SIMILARITY = 0.60

# Maximum number of chunks sent to the LLM.
MAX_CONTEXT_CHUNKS = 3


def select_context_chunks(
    results: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """
    Select the strongest retrieved chunks for LLM generation.

    Retrieval intentionally returns more candidates than the LLM
    needs. This layer reduces the context size while preserving
    multiple chunks when a question requires information from
    different parts of a notice.

    Args:
        results:
            Retrieved chunks ordered by similarity.

    Returns:
        A smaller list of relevant chunks.
    """

    if not results:
        return []

    valid_results = [
        result
        for result in results
        if result.get("chunk_text", "").strip()
        and _get_similarity(result) >= MIN_CONTEXT_SIMILARITY
    ]

    if not valid_results:
        return []

    selected: list[dict[str, Any]] = []

    for result in valid_results:
        if len(selected) >= MAX_CONTEXT_CHUNKS:
            break

        selected.append(result)

    return selected


def _get_similarity(
    result: dict[str, Any],
) -> float:
    """
    Safely extract similarity from a retrieved result.
    """

    value = result.get("similarity", 0.0)

    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0