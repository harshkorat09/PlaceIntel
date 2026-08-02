# Development notes

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL with `docker compose up postgres -d`.
3. Install JavaScript dependencies with `pnpm install`.
4. Generate Prisma Client and create the first migration with `pnpm db:generate` and `pnpm db:migrate`.
5. Run the web and API with `pnpm dev`; run the chatbot with `uvicorn app.main:app --reload --app-dir apps/chatbot`.

The `uploads/` directory is for local attachment storage during development. Production storage can be introduced later without changing the placement domain model.
