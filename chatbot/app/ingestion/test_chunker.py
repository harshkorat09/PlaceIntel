from app.ingestion.pdf_loader import extract_pdf
from app.ingestion.text_cleaner import clean_text
from app.ingestion.chunker import chunk_text


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"


def main() -> None:
    document = extract_pdf(PDF_PATH)

    total_chunks = 0

    for page in document["pages"]:
        cleaned_text = clean_text(page["text"])

        chunks = chunk_text(
            text=cleaned_text,
            page_number=page["page_number"],
            source_file=PDF_PATH,
            document_type="notice",
        )

        print(f"\nPage {page['page_number']}: {len(chunks)} chunks")

        for chunk in chunks:
            print(f"\n--- Chunk {chunk.metadata.chunk_index} ---")
            print(chunk.text)

        total_chunks += len(chunks)

    print(f"\nTotal chunks: {total_chunks}")


if __name__ == "__main__":
    main()