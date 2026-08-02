# Docker services

`docker-compose.yml` defines local PostgreSQL, API, and chatbot services.

## Commands

```bash
docker compose up postgres -d
docker compose up --build
docker compose down
```

PostgreSQL is available at port `5432`, the API at `4000`, and the chatbot at `8000`.

## Notes

The database uses `pgvector/pgvector:pg15`. Local database data is stored in the `postgres_data` Docker volume. Do not treat the local volume as a backup.
