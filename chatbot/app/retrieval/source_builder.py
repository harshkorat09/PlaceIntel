def build_sources(retrieved_chunks: list[dict]) -> list[dict]:
    """
    Build unique source references from retrieved chunks.
    """

    sources: dict[str, set[int]] = {}

    for chunk in retrieved_chunks:
        source_file = chunk.get("source_file")
        page_number = chunk.get("page_number")

        if not source_file or not page_number:
            continue

        if source_file not in sources:
            sources[source_file] = set()

        sources[source_file].add(page_number)

    return [
        {
            "notice": notice,
            "pages": sorted(pages),
        }
        for notice, pages in sources.items()
    ]