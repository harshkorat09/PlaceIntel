from google import genai

from app.config import (
    EMBEDDING_DIMENSIONS,
    EMBEDDING_MODEL,
    GEMINI_API_KEY,
)


client = genai.Client(api_key=GEMINI_API_KEY)


def generate_embedding(text: str) -> list[float]:
    """
    Generate a vector embedding for a single text chunk.
    """

    if not text.strip():
        raise ValueError("Cannot generate an embedding for empty text.")

    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=text,
        config={
            "output_dimensionality": EMBEDDING_DIMENSIONS,
        },
    )

    if not response.embeddings:
        raise ValueError("Gemini returned no embeddings.")

    embedding = response.embeddings[0].values

    if embedding is None:
        raise ValueError("Gemini returned an embedding without values.")

    if len(embedding) != EMBEDDING_DIMENSIONS:
        raise ValueError(
            f"Expected {EMBEDDING_DIMENSIONS} dimensions, "
            f"received {len(embedding)}."
        )

    return list(embedding)