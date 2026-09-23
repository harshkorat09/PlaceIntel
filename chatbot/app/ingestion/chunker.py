from dataclasses import dataclass

from app.ingestion.metadata import ChunkMetadata


@dataclass
class DocumentChunk:
    text: str
    metadata: ChunkMetadata


SECTION_HEADINGS = {
    "eligibility",
    "eligibility criteria",
    "eligibility requirements",
    "ctc package details",
    "package details",
    "compensation",
    "test pattern",
    "test pattern — nqt integrated test",
    "how to apply",
    "how to apply — step-by-step",
    "application process",
    "important notices",
    "important information",
    "registration",
    "selection process",
    "selection procedure",
    "job description",
    "roles and responsibilities",
    "skills required",
    "required skills",
    "qualification",
    "qualifications",
    "special note to all faculty members",
    "tcs helpdesk & registration link",
}


def _normalize_line(line: str) -> str:
    return " ".join(line.strip().lower().split())


def _is_section_heading(line: str) -> bool:
    """
    Identify semantic document section headings.

    We intentionally do NOT classify every uppercase line as a heading.
    PDF extraction frequently produces uppercase labels such as
    'REGISTRATION OPENS' and 'TEST DATE', which belong with the
    surrounding recruitment information.
    """

    normalized = _normalize_line(line)

    return normalized in SECTION_HEADINGS


def _split_large_text(
    text: str,
    chunk_size: int,
    chunk_overlap: int,
) -> list[str]:
    """
    Split an oversized semantic section while preserving overlap.
    """

    if len(text) <= chunk_size:
        return [text]

    pieces: list[str] = []
    start = 0

    while start < len(text):
        end = min(start + chunk_size, len(text))

        # Prefer breaking at a newline instead of cutting through
        # a sentence/table row whenever possible.
        if end < len(text):
            newline_position = text.rfind("\n", start, end)

            if newline_position > start:
                end = newline_position

        piece = text[start:end].strip()

        if piece:
            pieces.append(piece)

        if end >= len(text):
            break

        start = max(end - chunk_overlap, start + 1)

    return pieces


def chunk_text(
    text: str,
    page_number: int,
    source_file: str,
    document_type: str,
    chunk_size: int = 1600,
    chunk_overlap: int = 150,
) -> list[DocumentChunk]:
    """
    Create semantic chunks from a placement notice page.

    Content is grouped around known semantic section headings.
    Sections are split only when they exceed the configured size.

    Args:
        text: Cleaned text from one PDF page.
        page_number: Original PDF page number.
        source_file: Source PDF filename.
        document_type: Document category.
        chunk_size: Maximum target size for a semantic chunk.
        chunk_overlap: Overlap used when a section is oversized.

    Returns:
        List of DocumentChunk objects.
    """

    if not text.strip():
        return []

    if chunk_size <= 0:
        raise ValueError("chunk_size must be greater than 0.")

    if chunk_overlap < 0:
        raise ValueError("chunk_overlap cannot be negative.")

    if chunk_overlap >= chunk_size:
        raise ValueError(
            "chunk_overlap must be smaller than chunk_size."
        )

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    if not lines:
        return []

    sections: list[list[str]] = []
    current_section: list[str] = []

    for line in lines:
        if _is_section_heading(line) and current_section:
            sections.append(current_section)
            current_section = [line]
        else:
            current_section.append(line)

    if current_section:
        sections.append(current_section)

    chunks: list[DocumentChunk] = []

    for section in sections:
        section_text = "\n".join(section).strip()

        section_parts = _split_large_text(
            text=section_text,
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
        )

        for part in section_parts:
            chunks.append(
                DocumentChunk(
                    text=part,
                    metadata=ChunkMetadata(
                        source_file=source_file,
                        document_type=document_type,
                        page_number=page_number,
                        chunk_index=len(chunks),
                    ),
                )
            )

    return chunks