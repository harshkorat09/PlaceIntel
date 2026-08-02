# Operations and deployment

## Local services

| Service | Local port | Health check |
|---|---:|---|
| Web (Vite) | 5173 | Browser page |
| API | 4000 | `GET /health` |
| Chatbot | 8000 | `GET /health` |
| PostgreSQL | 5432 | `pg_isready` |

## Environment

Copy `.env.example` to `.env`. Production requires a strong `JWT_SECRET`, managed `DATABASE_URL`, and an approved `OPENAI_API_KEY` if chatbot generation is enabled. Never commit `.env`.

## Deployment principles

- Build immutable API, web, and chatbot artifacts.
- Use managed PostgreSQL with pgvector or a tested equivalent.
- Store attachments in durable object storage rather than local `uploads/`.
- Run migrations as a controlled release step.
- Use HTTPS, secret management, database backups, and least-privilege credentials.
- Add logs, metrics, and alerts for errors, latency, chatbot failures, and database health.

If chatbot answers are incorrect, disable chat through a feature flag, preserve the question/source trace, and inspect retrieval results before changing prompts or model settings.
