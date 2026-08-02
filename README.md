# PlaceIntel

PlaceIntel is a placement intelligence platform for CHARUSAT. It turns scattered placement notices into searchable, explainable student workflows: company and placement records, eligibility filters, Fit Score, analytics, and a grounded chatbot that names its source notice.

## Repository layout

```text
apps/
  web/       React + TypeScript frontend
  api/       Express + TypeScript REST API
  chatbot/   FastAPI retrieval and answer service
packages/
  shared/    Shared TypeScript contracts
  ui/        Shared UI components
  config/    Shared tooling configuration
  utils/     Shared utilities
prisma/      PostgreSQL schema, migrations, and seed
docker/      Container and database setup
docs/        Architecture and API notes
scripts/     Maintenance/import scripts
uploads/     Local attachment storage
```

## Quick start

```bash
copy .env.example .env
pnpm install
docker compose up postgres -d
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The SRS is the source of truth for the first implementation scope. The scaffold keeps the chatbot isolated from the main API while keeping its source chunks in the same PostgreSQL database through Prisma/pgvector.
