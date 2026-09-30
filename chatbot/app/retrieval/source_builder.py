import re

def build_sources(retrieved_chunks: list[dict], answer_text: str = "") -> list[dict]:
    """
    Build unique source references from retrieved chunks that were ACTUALLY cited.
    """
    
    # Extract cited source indices (e.g., "Source 1", "SOURCE 2")
    cited_indices = set()
    if answer_text:
        matches = re.finditer(r'(?i)source\s+(\d+)', answer_text)
        for match in matches:
            cited_indices.add(int(match.group(1)))

    sources: dict[str, set[int]] = {}
    structured_companies = set()

    # The chunks were passed to the prompt 1-indexed
    for index, chunk in enumerate(retrieved_chunks, start=1):
        if answer_text and index not in cited_indices:
            continue
            
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