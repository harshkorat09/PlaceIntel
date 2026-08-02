# PlaceIntel API reference

Base URL in local development: `http://localhost:4000`.

## Implemented endpoints

### `GET /health`

Returns `{"service":"placeintel-api","status":"ok"}`. The chatbot currently exposes equivalent `GET /health` and a placeholder `POST /chat` on port `8000`.

## Planned API surface

All application routes should use the `/api` prefix. Protected routes require `Authorization: Bearer <token>`.

| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | `/api/login` | Public | Authenticate and return a JWT |
| GET | `/api/me` | Authenticated | Return current user profile |
| GET/POST/PUT/DELETE | `/api/companies` | Auth/Admin | List, create, update, or remove companies |
| GET/POST/PUT/DELETE | `/api/placements` | Auth/Admin | List, create, update, or archive placements |
| GET | `/api/placements/:id` | Authenticated | Placement details and eligibility |
| GET | `/api/skills` | Authenticated | List skills |
| GET | `/api/branches` | Authenticated | List branches |
| PUT | `/api/profile` | Student | Update CGPA, branch, and skills |
| GET | `/api/placements/:id/fit-score` | Student | Return score and explanation |
| GET | `/api/stats` | Admin | Return documented aggregate metrics |
| POST | `/api/chat` | Student | Proxy a grounded question to the chatbot |

## List query parameters

The planned placement list supports `q`, `companyId`, `branchId`, `skillIds`, `minPackage`, `maxPackage`, `year`, `deadlineBefore`, `eligibleOnly`, `page`, and `pageSize`. Defaults and maximum page size must be fixed in validation code.

## Common response shapes

```json
{"data": [], "page": 1, "pageSize": 20, "total": 0}
```

Errors use one stable shape:

```json
{"error":{"code":"VALIDATION_ERROR","message":"The request contains invalid fields.","fields":{"cgpa":"Must be between 0 and 10."}}}
```

Recommended codes: `UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `CONFLICT`, `RATE_LIMITED`, and `INTERNAL_ERROR`.

## API rules

- Validate body, query, and path parameters with Zod.
- Enforce role checks on the server, never only in the UI.
- Do not expose password hashes, embedding vectors, or internal file paths.
- Use UTC ISO-8601 timestamps in JSON.
- Make destructive operations archive-first where possible.
- Add request IDs and structured logs before production deployment.
