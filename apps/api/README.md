# API service

PlaceIntel’s API is an Express + TypeScript service. It owns authentication, authorization, validation, placement business rules, analytics, and the proxy to the chatbot.

## Current status

The service currently exposes `GET /health`. Feature routes are planned in [project-api.md](../../docs/project-api.md).

## Run locally

From the repository root:

```bash
pnpm install
pnpm --filter @placeintel/api dev
```

The API listens on port `4000` by default. Build with `pnpm --filter @placeintel/api build`.

## Implementation rules

- Keep routes thin; put business logic in feature services.
- Validate request bodies, query parameters, and path parameters with Zod.
- Enforce JWT and role checks on the server.
- Use Prisma for database access and structured errors for failures.
- Do not return password hashes, embeddings, or internal file paths.

## Planned modules

`auth`, `companies`, `placements`, `profile`, `analytics`, and `chat`. See [implementation-roadmap.md](../../docs/implementation-roadmap.md).
