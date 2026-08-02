# Shared package

This package contains TypeScript contracts shared by the API and web application.

## Current exports

`UserRole`, `PlacementSummary`, and `ChatResponse` are currently defined in `src/index.ts`.

## Add here

Add stable request/response types, enums, and small cross-application contracts here. Do not place database-only Prisma models or UI-specific components in this package.

When an API response changes, update this package, the API implementation, the web client, tests, and [project-api.md](../../docs/project-api.md) together.
