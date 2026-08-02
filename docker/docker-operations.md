# Docker operations

## Services

PostgreSQL runs on 5432, the Express API on 4000, and the FastAPI chatbot on 8000.

## Commands

```bash
docker compose up postgres -d
docker compose up --build
docker compose down
```

## Local data

PostgreSQL data is stored in the postgres_data Docker volume. This is local development data and is not a backup.

## Production direction

Use managed PostgreSQL with pgvector, durable object storage for attachments, secrets management, HTTPS, backups, health checks, logs, and controlled migration releases.
