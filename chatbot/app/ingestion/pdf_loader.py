from pathlib import Path

import pymupdf


class PDFExtractionError(Exception):
    """Raised when a PDF cannot be extracted successfully."""


def extract_pdf(file_path: str | Path) -> dict:
    """
    Extract text from a PDF while preserving page boundaries.

    Args:
        file_path: Path to the PDF document.

    Returns:
        Dictionary containing:
        - file_name
        - page_count
        - pages

    Raises:
        PDFExtractionError: If the PDF cannot be found, opened,
        or processed.
    """

    path = Path(file_path)

    if not path.exists():
        raise PDFExtractionError(f"PDF file not found: {path}")

    if not path.is_file():
        raise PDFExtractionError(f"Path is not a file: {path}")

    if path.suffix.lower() != ".pdf":
        raise PDFExtractionError(f"Expected a PDF file: {path}")

    try:
        document = pymupdf.open(path)
    except Exception as exc:
        raise PDFExtractionError(
            f"Unable to open PDF: {path}"
        ) from exc

    try:
        pages = []

        for page_number, page in enumerate(document, start=1):
            raw_text = page.get_text("text")
            text = str(raw_text).strip()

            pages.append(
                {
                    "page_number": page_number,
                    "text": text,
                }
            )

        return {
            "file_name": path.name,
            "page_count": len(document),
            "pages": pages,
        }

    finally:
        document.close()