# Database implementation

## Technology

PostgreSQL 15 is the system of record. Prisma defines the schema. pgvector is enabled for future notice embeddings.

## Main tables

User, Company, Placement, Branch, Skill, PlacementBranch, PlacementSkill, StudentSkill, Attachment, and PlacementChunk.

## Important relationships

A Company has many Placements. A Placement has many eligible Branches and required Skills through join tables. Users have one optional Branch and many Skills. Placements have Attachments and extracted text Chunks.

## Workflow

```bash
docker compose up postgres -d
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

For schema changes, edit schema.prisma, create a named migration, review it, update seed data and tests, and verify both clean installation and upgrade paths. Do not use db push in production.

## Remaining work

Add archive/publication status, audit fields, attachment metadata and retention rules, indexes for search and deadlines, and a tested vector retrieval strategy.
