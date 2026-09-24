from pathlib import Path

from app.ingestion.chunker import chunk_text
from app.ingestion.document_hash import calculate_file_hash
from app.ingestion.embedding import generate_embedding
from app.ingestion.pdf_loader import extract_pdf
from app.ingestion.text_cleaner import clean_text
from app.repositories.placement_chunk_repository import (
    create_attachment,
    create_chunk,
    delete_chunks_by_attachment,
    find_attachment_by_hash,
)


def ingest_pdf(
    placement_id: int,
    file_path: str,
    file_type: str = "application/pdf",
) -> dict:
    """
    Ingest a PDF into the PlaceIntel RAG knowledge base.

    Flow:
        PDF
        → SHA-256
        → duplicate check
        → Attachment
        → PDF extraction
        → cleaning
        → semantic chunking
        → Gemini embeddings
        → PostgreSQL + pgvector

    Args:
        placement_id: Existing Placement ID that owns this document.
        file_path: Path to the PDF file.
        file_type: MIME type of the uploaded file.

    Returns:
        Ingestion summary.
    """

    if placement_id <= 0:
        raise ValueError("Placement ID must be greater than 0.")

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(
            f"PDF file not found: {path}"
        )

    if not path.is_file():
        raise ValueError(
            f"Provided path is not a file: {path}"
        )

    if path.suffix.lower() != ".pdf":
        raise ValueError(
            "Only PDF files are supported."
        )

    # ---------------------------------------------------------
    # 1. Calculate document hash
    # ---------------------------------------------------------

    file_hash = calculate_file_hash(path)

    print(f"File: {path.name}")
    print(f"SHA-256: {file_hash}")

    # ---------------------------------------------------------
    # 2. Check for duplicate document
    # ---------------------------------------------------------

    existing_attachment = find_attachment_by_hash(
        file_hash
    )

    if existing_attachment is not None:
        raise ValueError(
            "This document has already been ingested. "
            f"Existing attachment ID: {existing_attachment['id']}"
        )

    # ---------------------------------------------------------
    # 3. Extract PDF
    # ---------------------------------------------------------

    print("\n[1] Extracting PDF...")

    document = extract_pdf(path)

    print(
        f"Pages extracted: {document['page_count']}"
    )

    # ---------------------------------------------------------
    # 4. Clean and chunk
    # ---------------------------------------------------------

    print("\n[2] Cleaning and creating chunks...")

    all_chunks = []

    for page in document["pages"]:

        cleaned_text = clean_text(
            page["text"]
        )

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

    if not all_chunks:
        raise RuntimeError(
            "No chunks were generated from the PDF."
        )

    print(
        f"Total chunks: {len(all_chunks)}"
    )

    # ---------------------------------------------------------
    # 5. Create Attachment
    # ---------------------------------------------------------

    print("\n[3] Creating attachment...")

    attachment_id = create_attachment(
        placement_id=placement_id,
        file_path=str(path),
        file_type=file_type,
        file_hash=file_hash,
    )

    print(
        f"Attachment ID: {attachment_id}"
    )

    # ---------------------------------------------------------
    # 6. Generate embeddings and store chunks
    # ---------------------------------------------------------

    print(
        "\n[4] Generating embeddings and storing chunks..."
    )

    successful_chunks = 0

    try:
        for index, chunk in enumerate(
            all_chunks,
            start=1,
        ):

            print(
                f"Processing chunk "
                f"{index}/{len(all_chunks)} "
                f"(page {chunk.metadata.page_number})..."
            )

            embedding = generate_embedding(
                chunk.text
            )

            if len(embedding) != 1536:
                raise ValueError(
                    "Unexpected embedding dimension: "
                    f"{len(embedding)}"
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

    except Exception:
        print(
            "\nEmbedding/storage failed. "
            "Removing partially created chunks..."
        )

        delete_chunks_by_attachment(
            attachment_id
        )

        raise

    # ---------------------------------------------------------
    # 7. Return ingestion summary
    # ---------------------------------------------------------

    result = {
        "placement_id": placement_id,
        "attachment_id": attachment_id,
        "file_name": document["file_name"],
        "file_path": str(path),
        "file_hash": file_hash,
        "page_count": document["page_count"],
        "chunk_count": successful_chunks,
        "embedding_dimensions": 1536,
    }

    print("\n" + "=" * 70)
    print("PDF INGESTION SUCCESSFUL")
    print("=" * 70)

    print(
        f"""
Placement ID:       {placement_id}
Attachment ID:      {attachment_id}
File:               {document['file_name']}
Pages:              {document['page_count']}
Chunks:             {successful_chunks}
Embedding size:     1536
Database:           PostgreSQL + pgvector
"""
    )

    return result