from app.ingestion.chunker import chunk_text
from app.ingestion.embedding import generate_embedding
from app.ingestion.pdf_loader import extract_pdf
from app.ingestion.text_cleaner import clean_text


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"


def main() -> None:
    # 1. Extract text from the PDF.
    document = extract_pdf(PDF_PATH)

    print(f"File: {document['file_name']}")
    print(f"Pages: {document['page_count']}")

    # 2. Clean the first page.
    page_text = clean_text(document["pages"][0]["text"])

    # 3. Create chunks from the cleaned text.
    chunks = chunk_text(
        text=page_text,
        page_number=1,
        source_file=document["file_name"],
        document_type="pdf",
    )

    if not chunks:
        raise RuntimeError("No chunks were generated from the PDF.")

    # 4. Test embedding on the first chunk only.
    chunk = chunks[0]

    print(f"\nChunk index: {chunk.metadata.chunk_index}")
    print(f"Page number: {chunk.metadata.page_number}")
    print(f"Chunk length: {len(chunk.text)} characters")

    print("\nGenerating Gemini embedding...")

    embedding = generate_embedding(chunk.text)

    # 5. Verify the embedding.
    print(f"Embedding dimensions: {len(embedding)}")
    print(f"First 5 values: {embedding[:5]}")

    if len(embedding) != 1536:
        raise RuntimeError(
            f"Expected 1536 dimensions, got {len(embedding)}."
        )

    print("\nEmbedding test successful.")


if __name__ == "__main__":
    main()