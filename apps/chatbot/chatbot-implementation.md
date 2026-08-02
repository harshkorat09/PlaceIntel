# Chatbot implementation plan

## Responsibility

The FastAPI chatbot answers placement questions using approved notice content and must identify its evidence.

## Current status

Implemented: GET /health and placeholder POST /chat returning a temporary response.

## Planned pipeline

```text
attachment
  -> text extraction
  -> normalized chunks
  -> embeddings
  -> pgvector retrieval
  -> grounded model prompt
  -> answer and source notice/chunk
```

## Required behavior

The service must not invent deadlines, packages, requirements, or eligibility rules. If retrieval finds no reliable evidence, return a clear no-evidence response. Limit question length and context size, and treat document text as untrusted content.

## Configuration

Use OPENAI_API_KEY, CHATBOT_MODEL, EMBEDDING_MODEL, and EMBEDDING_DIMENSIONS from environment configuration. Never commit keys or log private student data.

## Verification

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
