from app.database import get_connection


EMBEDDING_DIMENSIONS = 1536


def find_attachment_by_hash(file_hash: str) -> dict | None:
    """
    Find an existing attachment using its SHA-256 document hash.

    Returns:
        Attachment metadata if found, otherwise None.
    """

    if not file_hash.strip():
        raise ValueError("File hash cannot be empty.")

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    "placementId",
                    "filePath",
                    "fileType",
                    "fileHash"
                FROM "Attachment"
                WHERE "fileHash" = %s
                LIMIT 1;
                """,
                (file_hash,),
            )

            row = cursor.fetchone()

        if row is None:
            return None

        return {
            "id": row[0],
            "placement_id": row[1],
            "file_path": row[2],
            "file_type": row[3],
            "file_hash": row[4],
        }

    finally:
        connection.close()


def create_attachment(
    placement_id: int,
    file_path: str,
    file_type: str,
    file_hash: str,
) -> int:
    """Create an attachment and return its database ID."""

    if not file_hash.strip():
        raise ValueError("File hash cannot be empty.")

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO "Attachment"
                    (
                        "placementId",
                        "filePath",
                        "fileType",
                        "fileHash"
                    )
                VALUES
                    (%s, %s, %s, %s)
                RETURNING id;
                """,
                (
                    placement_id,
                    file_path,
                    file_type,
                    file_hash,
                ),
            )

            # pyrefly: ignore [unsupported-operation]
            attachment_id = cursor.fetchone()[0]

        connection.commit()
        return attachment_id

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()


def delete_chunks_by_attachment(attachment_id: int) -> int:
    """
    Delete all chunks belonging to an attachment.

    Returns:
        Number of deleted chunks.
    """

    if attachment_id <= 0:
        raise ValueError("Attachment ID must be greater than 0.")

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                DELETE FROM "PlacementChunk"
                WHERE "attachmentId" = %s;
                """,
                (attachment_id,),
            )

            deleted_count = cursor.rowcount

        connection.commit()
        return deleted_count

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()


def create_chunk(
    attachment_id: int,
    chunk_text: str,
    page_number: int,
    chunk_index: int,
    embedding: list[float],
) -> int:
    """
    Store a document chunk and its embedding.

    Args:
        attachment_id: ID of the parent Attachment.
        chunk_text: Cleaned text belonging to this chunk.
        page_number: Original PDF page number.
        chunk_index: Index of the chunk within the document.
        embedding: Gemini embedding vector.

    Returns:
        ID of the newly created PlacementChunk.
    """

    if not chunk_text.strip():
        raise ValueError("Chunk text cannot be empty.")

    if page_number <= 0:
        raise ValueError("Page number must be greater than 0.")

    if chunk_index < 0:
        raise ValueError("Chunk index cannot be negative.")

    if len(embedding) != EMBEDDING_DIMENSIONS:
        raise ValueError(
            f"Expected {EMBEDDING_DIMENSIONS}-dimensional embedding, "
            f"got {len(embedding)}."
        )

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO "PlacementChunk"
                    (
                        "attachmentId",
                        "chunkText",
                        "pageNumber",
                        "chunkIndex",
                        "embedding"
                    )
                VALUES
                    (
                        %s,
                        %s,
                        %s,
                        %s,
                        %s::vector
                    )
                RETURNING id;
                """,
                (
                    attachment_id,
                    chunk_text,
                    page_number,
                    chunk_index,
                    str(embedding),
                ),
            )

            # pyrefly: ignore [unsupported-operation]
            chunk_id = cursor.fetchone()[0]

        connection.commit()
        return chunk_id

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()


def search_similar_chunks(
    query_embedding: list[float],
    top_k: int = 5,
    similarity_threshold: float = 0.45,
    company_filter: str | None = None,
) -> list[dict]:
    """
    Search PlacementChunk records using pgvector cosine similarity.

    Retrieval includes placement and company metadata so the RAG
    pipeline knows which placement generated each chunk.

    Args:
        query_embedding: 1536-dimensional Gemini embedding.
        top_k: Maximum number of chunks to return.
        similarity_threshold: Minimum cosine similarity required
            for a chunk to be considered relevant.
        company_filter: Optional company name to restrict retrieval.

    Returns:
        List of relevant chunks containing:
        - chunk ID
        - placement ID
        - company ID
        - company name
        - attachment ID
        - chunk text
        - page number
        - chunk index
        - source file
        - placement status
        - vector distance
        - similarity score
    """

    if not query_embedding:
        raise ValueError("Query embedding cannot be empty.")

    if len(query_embedding) != EMBEDDING_DIMENSIONS:
        raise ValueError(
            f"Expected {EMBEDDING_DIMENSIONS}-dimensional embedding, "
            f"got {len(query_embedding)}."
        )

    if top_k <= 0:
        raise ValueError("top_k must be greater than 0.")

    if not 0.0 <= similarity_threshold <= 1.0:
        raise ValueError(
            "Similarity threshold must be between 0 and 1."
        )

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            where_clause = 'pc.embedding IS NOT NULL'
            params = [str(query_embedding)]
            
            if company_filter:
                where_clause += ' AND LOWER(c.name) = LOWER(%s)'
                params.append(company_filter)
                
            params.extend([str(query_embedding), top_k])
            
            cursor.execute(
                f"""
                SELECT
                    pc.id,
                    pc."attachmentId",
                    a."placementId",
                    p."companyId",
                    c.name,
                    pc."chunkText",
                    pc."pageNumber",
                    pc."chunkIndex",
                    a."filePath",
                    p.status,
                    pc.embedding <=> %s::vector AS distance
                FROM "PlacementChunk" pc
                INNER JOIN "Attachment" a
                    ON a.id = pc."attachmentId"
                INNER JOIN "Placement" p
                    ON p.id = a."placementId"
                INNER JOIN "Company" c
                    ON c.id = p."companyId"
                WHERE {where_clause}
                ORDER BY pc.embedding <=> %s::vector
                LIMIT %s;
                """,
                tuple(params),
            )

            rows = cursor.fetchall()

        results = []

        for row in rows:
            distance = float(row[10])

            # pgvector cosine distance:
            #
            # distance = 1 - cosine_similarity
            #
            # Therefore:
            #
            # similarity = 1 - distance
            similarity = 1.0 - distance

            if similarity < similarity_threshold:
                continue

            results.append(
                {
                    "id": row[0],
                    "attachment_id": row[1],
                    "placement_id": row[2],
                    "company_id": row[3],
                    "company_name": row[4],
                    "chunk_text": row[5],
                    "page_number": row[6],
                    "chunk_index": row[7],
                    "source_file": row[8],
                    "placement_status": row[9],
                    "distance": distance,
                    "similarity": similarity,
                }
            )

        return results

    finally:
        connection.close()