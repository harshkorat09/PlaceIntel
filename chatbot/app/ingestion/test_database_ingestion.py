from app.database import get_connection
from app.ingestion.chunker import chunk_text
from app.ingestion.embedding import generate_embedding
from app.ingestion.pdf_loader import extract_pdf
from app.ingestion.text_cleaner import clean_text
from app.repositories.placement_chunk_repository import (
    create_attachment,
    create_chunk,
)


PDF_PATH = "data/raw/TCS_NQT_Notice_2026_-_19.02.2026.pdf"


def create_test_placement() -> int:
    """Create a test placement record."""

    connection = get_connection()

    try:
        with connection.cursor() as cursor:

            cursor.execute(
                """
                INSERT INTO "Company"
                    (
                        "name",
                        "sector",
                        "avgPackage",
                        "createdAt",
                        "updatedAt"
                    )
                VALUES
                    (%s, %s, %s, NOW(), NOW())
                ON CONFLICT ("name")
                DO UPDATE SET
                    "updatedAt" = NOW()
                RETURNING id;
                """,
                (
                    "TCS RAG Test",
                    "Information Technology",
                    9.09,
                ),
            )

            # pyrefly: ignore [unsupported-operation]
            company_id = cursor.fetchone()[0]

            cursor.execute(
                """
                INSERT INTO "Placement"
                    (
                        "companyId",
                        "position",
                        "ctc",
                        "deadline",
                        "cgpaCutoff",
                        "createdAt",
                        "updatedAt"
                    )
                VALUES
                    (
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        NOW(),
                        NOW()
                    )
                RETURNING id;
                """,
                (
                    company_id,
                    "RAG Test Position",
                    9.09,
                    "2026-12-31",
                    6.0,
                ),
            )

            # pyrefly: ignore [unsupported-operation]
            placement_id = cursor.fetchone()[0]

        connection.commit()

        return placement_id

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()


def main() -> None:

    print("=" * 70)
    print("PlaceIntel - Full PDF RAG Ingestion Test")
    print("=" * 70)

    # ---------------------------------------------------------
    # 1. Extract complete PDF
    # ---------------------------------------------------------

    print("\n[1] Extracting PDF...")

    document = extract_pdf(PDF_PATH)

    print(f"File: {document['file_name']}")
    print(f"Pages: {document['page_count']}")

    # ---------------------------------------------------------
    # 2. Process ALL pages
    # ---------------------------------------------------------

    print("\n[2] Cleaning and chunking all pages...")

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

    print(f"\nTotal chunks: {len(all_chunks)}")

    if not all_chunks:
        raise RuntimeError("No chunks were generated.")

    # ---------------------------------------------------------
    # 3. Create placement
    # ---------------------------------------------------------

    print("\n[3] Creating test placement...")

    placement_id = create_test_placement()

    print(f"Placement ID: {placement_id}")

    # ---------------------------------------------------------
    # 4. Create attachment
    # ---------------------------------------------------------

    print("\n[4] Creating attachment...")

    attachment_id = create_attachment(
        placement_id=placement_id,
        file_path=PDF_PATH,
        file_type="application/pdf",
    )

    print(f"Attachment ID: {attachment_id}")

    # ---------------------------------------------------------
    # 5. Embed EVERY chunk and store it
    # ---------------------------------------------------------

    print("\n[5] Generating embeddings and storing chunks...")

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
    attachment_id=attachment_id,
    chunk_text=chunk.text,
    page_number=chunk.metadata.page_number,
    chunk_index=chunk.metadata.chunk_index,
    embedding=embedding,
)

        successful_chunks += 1

        print(
            f"  Stored PlacementChunk ID: {chunk_id}"
        )

    # ---------------------------------------------------------
    # 6. Final summary
    # ---------------------------------------------------------

    print("\n" + "=" * 70)
    print("FULL PDF INGESTION SUCCESSFUL")
    print("=" * 70)

    print(f"""
File:              {document['file_name']}
Pages:             {document['page_count']}
Total chunks:      {len(all_chunks)}
Embedded chunks:   {successful_chunks}
Placement ID:      {placement_id}
Attachment ID:     {attachment_id}
Embedding size:    1536
Embedding model:   Gemini
Database:          PostgreSQL + pgvector
""")

    if successful_chunks == len(all_chunks):
        print("Every chunk was embedded and stored successfully.")
    else:
        print("WARNING: Some chunks were not stored.")


if __name__ == "__main__":
    main()