from app.ingestion.chunker import chunk_text
from app.ingestion.embedding import generate_embedding
from app.ingestion.pdf_loader import extract_pdf
from app.ingestion.text_cleaner import clean_text
from app.repositories.placement_chunk_repository import (
    create_chunk,
    delete_chunks_by_attachment,
)


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"

ATTACHMENT_ID = 3


def main() -> None:
    print("=" * 70)
    print("PlaceIntel - Attachment Re-index")
    print("=" * 70)

    # ---------------------------------------------------------
    # 1. Extract PDF
    # ---------------------------------------------------------

    print("\n[1] Extracting PDF...")

    document = extract_pdf(PDF_PATH)

    print(f"File: {document['file_name']}")
    print(f"Pages: {document['page_count']}")

    # ---------------------------------------------------------
    # 2. Chunk all pages
    # ---------------------------------------------------------

    print("\n[2] Creating semantic chunks...")

    all_chunks = []

    for page in document["pages"]:
        cleaned_text = clean_text(page["text"])

        page_chunks = chunk_text(
            text=cleaned_text,
            page_number=page["page_number"],
            source_file=document["file_name"],
            document_type="notice",
        )

        print(
            f"Page {page['page_number']}: "
            f"{len(page_chunks)} chunks"
        )

        all_chunks.extend(page_chunks)

    print(f"\nTotal new chunks: {len(all_chunks)}")

    if not all_chunks:
        raise RuntimeError("No chunks were generated.")

    # ---------------------------------------------------------
    # 3. Delete existing chunks
    # ---------------------------------------------------------

    print("\n[3] Removing existing chunks...")

    deleted_count = delete_chunks_by_attachment(
        attachment_id=ATTACHMENT_ID
    )

    print(f"Deleted chunks: {deleted_count}")

    # ---------------------------------------------------------
    # 4. Generate embeddings and insert new chunks
    # ---------------------------------------------------------

    print("\n[4] Generating embeddings and storing chunks...")

    successful_chunks = 0

    for index, chunk in enumerate(all_chunks, start=1):
        print(
            f"Processing chunk {index}/{len(all_chunks)} "
            f"(page {chunk.metadata.page_number})..."
        )

        embedding = generate_embedding(chunk.text)

        if len(embedding) != 1536:
            raise ValueError(
                f"Unexpected embedding dimension: {len(embedding)}"
            )

        chunk_id = create_chunk(
            attachment_id=ATTACHMENT_ID,
            chunk_text=chunk.text,
            page_number=chunk.metadata.page_number,
            chunk_index=chunk.metadata.chunk_index,
            embedding=embedding,
        )

        successful_chunks += 1

        print(f"  Stored PlacementChunk ID: {chunk_id}")

    # ---------------------------------------------------------
    # 5. Summary
    # ---------------------------------------------------------

    print("\n" + "=" * 70)
    print("RE-INDEXING SUCCESSFUL")
    print("=" * 70)

    print(
        f"""
Attachment ID:      {ATTACHMENT_ID}
PDF:                {document['file_name']}
Pages:              {document['page_count']}
Old chunks deleted: {deleted_count}
New chunks:         {successful_chunks}
Embedding model:    Gemini
Embedding size:     1536
Database:           PostgreSQL + pgvector
"""
    )


if __name__ == "__main__":
    main()