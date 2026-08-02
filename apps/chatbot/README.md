# Chatbot service

PlaceIntel’s chatbot is a FastAPI service intended to answer placement questions using retrieved notice content.

## Current status

The service currently exposes `GET /health` and a placeholder `POST /chat`. Retrieval, embeddings, source metadata, and grounded generation are planned.

## Run locally

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --app-dir .
```

The service listens on port `8000` by default.

## Response expectations

Every useful answer should include the answer and source notice/chunk metadata. When the evidence is missing, return a clear no-evidence response instead of guessing.

## Design

The planned flow is upload → text extraction → chunking → embeddings → filtered retrieval → grounded model response. See [chatbot-rag.md](../../docs/chatbot-rag.md).
