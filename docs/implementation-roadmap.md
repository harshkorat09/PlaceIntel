# Implementation roadmap

## Recommended API layout

```text
apps/api/src/
  server.ts
  app.ts
  middleware/       auth, errors, request-id
  modules/          auth, companies, placements, profile, analytics, chat
  lib/              prisma, config, logger
```

The web app should add route-level pages for login, placements, placement detail, profile, admin management, analytics, and chat. Shared API types belong in `packages/shared`.

## Build order

1. Create `app.ts`, configuration validation, Prisma client lifecycle, and centralized error handling.
2. Implement auth and role middleware; add tests before admin mutation routes.
3. Implement placement/company services and repositories with Zod schemas.
4. Implement list filtering, pagination, and profile/eligibility services.
5. Implement Fit Score as a pure function with versioned weights.
6. Add the web API client, route guards, loading states, and error states.
7. Add notice ingestion and chatbot retrieval behind a feature flag.
8. Add CI, integration fixtures, observability, and deployment configuration.

## Definition of done

- Request and response types are shared or generated.
- Validation, authorization, and error behavior are specified.
- Unit tests cover business rules; integration tests cover database paths.
- UI covers loading, empty, success, and failure states.
- Documentation and seed data are updated.
- No secrets or personal data are committed.
