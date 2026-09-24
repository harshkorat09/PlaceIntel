def build_sources(retrieved_chunks: list[dict]) -> list[dict]:
    """
    Build unique source references from retrieved chunks.
    """

    sources: dict[str, set[int]] = {}
    structured_companies = set()

    for chunk in retrieved_chunks:
        if chunk.get("source_type") == "structured":
            company = chunk.get("company_name")
            if company:
                structured_companies.add(company)
            continue
            
        source_file = chunk.get("source_file")
        page_number = chunk.get("page_number")

        if not source_file or not page_number:
            continue

        if source_file not in sources:
            sources[source_file] = set()

        sources[source_file].add(page_number)

    results = [
        {
            "notice": notice,
            "pages": sorted(pages),
        }
        for notice, pages in sources.items()
    ]
    
    if structured_companies:
        results.append({
            "notice": f"Database (Companies: {', '.join(sorted(structured_companies))})",
            "pages": [],
        })

    return results