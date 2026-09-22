import os

from dotenv import load_dotenv


load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "gemini-embedding-001",
)

EMBEDDING_DIMENSIONS = int(
    os.getenv("EMBEDDING_DIMENSIONS", "1536")
)

GENERATION_MODEL = os.getenv(
    "GENERATION_MODEL",
    "gemini-3.6-flash",
)

GENERATION_FALLBACK_MODEL = os.getenv(
    "GENERATION_FALLBACK_MODEL",
    "gemini-3.5-flash-lite",
)


if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not configured.")