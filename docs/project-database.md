# PlaceIntel database design

## Technology

PostgreSQL 15 is the system of record. Prisma defines the relational model. The pgvector extension is enabled for future chatbot embeddings. Local development uses the `pgvector/pgvector:pg15` Docker image.

## Core entities

| Entity | Responsibility |
|---|---|
| `User` | Login identity, role, branch, CGPA, and profile ownership |
| `Company` | Employer identity and optional website/industry metadata |
| `Placement` | Role, package, deadline, description, and eligibility source |
| `Branch` | Academic branch catalogue |
| `Skill` | Normalized skill catalogue |
| `PlacementBranch` | Many-to-many placement eligibility by branch |
| `PlacementSkill` | Many-to-many required placement skills |
| `StudentSkill` | Many-to-many student skills |
| `Attachment` | Notice or supporting file metadata |
| `PlacementChunk` | Extracted notice text and optional 1536-dimensional embedding |

## Relationships

```text
Company 1 ── * Placement
Placement * ── * Branch       via PlacementBranch
Placement * ── * Skill        via PlacementSkill
User     * ── 1 Branch
User     * ── * Skill         via StudentSkill
Placement 1 ── * Attachment
Placement 1 ── * PlacementChunk
```

## Data rules

- Company, branch, and skill names are unique.
- A placement belongs to one company.
- Join-table primary keys prevent duplicate relationships.
- Placement-owned relationships cascade on deletion in the current schema; prefer application-level archive for published records.
- CGPA uses `Decimal(3,2)`; the API must define whether the accepted range is 0–10.
- Money values use `Decimal(10,2)` and need one documented unit, such as INR lakhs per annum.

## Migration workflow

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Schema changes require a Prisma migration, updated seed fixtures where relevant, and tests for affected queries. Never use `db push` as the production migration process.

## Known implementation work

- Add and verify the initial migration in version control.
- Add publication/archive status and audit fields before production use.
- Add indexes for common search filters and deadline ordering.
- Decide whether vectors remain in `PlacementChunk` or move to a retrieval table.
- Define attachment size, MIME type, checksum, and retention rules.
- Add audit logging for admin changes.
