import time

from app.ingestion.embedding import generate_embedding
from app.repositories.placement_chunk_repository import (
    search_similar_chunks,
)
from app.retrieval.embedding_cache import EmbeddingCache


# ---------------------------------------------------------
# Query embedding cache
# ---------------------------------------------------------

embedding_cache = EmbeddingCache(
    max_size=256,
)


def retrieve_chunks(
    query: str,
    top_k: int = 5,
    similarity_threshold: float = 0.45,
) -> list[dict]:
    """
    Retrieve relevant placement chunks.

    Flow:

        Query
          ↓
        Embedding Cache
          ↓
        Gemini Embedding API (cache miss only)
          ↓
        pgvector similarity search
          ↓
        Relevant chunks
    """

    if not query.strip():
        raise ValueError(
            "Query cannot be empty."
        )

    # -----------------------------------------------------
    # Query embedding
    # -----------------------------------------------------

    embedding_start = time.perf_counter()

    query_embedding = embedding_cache.get(
        query
    )

    embedding_cache_hit = query_embedding is not None

    if query_embedding is None:
        query_embedding = generate_embedding(
            query
        )

        embedding_cache.set(
            query,
            query_embedding,
        )

    embedding_time = (
        time.perf_counter()
        - embedding_start
    )

    # -----------------------------------------------------
    # PostgreSQL / pgvector retrieval
    # -----------------------------------------------------

    retrieval_start = time.perf_counter()

    results = search_similar_chunks(
        query_embedding=query_embedding,
        top_k=top_k,
        similarity_threshold=similarity_threshold,
    )

    retrieval_time = (
        time.perf_counter()
        - retrieval_start
    )

    # -----------------------------------------------------
    # Performance logging
    # -----------------------------------------------------

    cache_status = (
        "HIT"
        if embedding_cache_hit
        else "MISS"
    )

    print(
        f"Embedding: {embedding_time:.3f}s "
        f"({cache_status}) | "
        f"PostgreSQL retrieval: "
        f"{retrieval_time:.3f}s | "
        f"Chunks: {len(results)}"
    )

    return results