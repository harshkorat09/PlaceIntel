# API implementation plan

## Responsibility

The Express API owns authentication, authorization, validation, placement business rules, analytics, and authenticated communication with the chatbot.

## Current status

Implemented: Express startup, CORS, JSON parsing, and GET /health.

## Planned structure

```text
src/
  server.ts
  app.ts
  middleware/
    auth.ts
    errors.ts
    request-id.ts
  modules/
    auth/
    companies/
    placements/
    profile/
    analytics/
    chat/
  lib/
    config.ts
    prisma.ts
```

## Planned endpoints

POST /api/login, GET /api/me, company CRUD, placement CRUD and search, GET /api/skills, GET /api/branches, PUT /api/profile, GET /api/placements/:id/fit-score, GET /api/stats, and POST /api/chat.

## Rules

Validate every request with Zod. Enforce roles on the server. Keep routes thin and business logic in services. Never return password hashes, embeddings, or internal file paths. Use structured errors and UTC timestamps.

## Verification

Run from the repository root:

```bash
pnpm --filter @placeintel/api lint
pnpm --filter @placeintel/api test
pnpm --filter @placeintel/api build
```
