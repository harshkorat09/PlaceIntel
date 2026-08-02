# Database and Prisma

The project uses PostgreSQL with Prisma. The schema is in `schema.prisma` and seed data is in `seed.ts`.

## Local workflow

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Start PostgreSQL first with `docker compose up postgres -d`.

## Schema rules

Use named migrations for schema changes. Review migrations before applying them. Update seed data and tests when entities, relationships, or constraints change. Do not use `prisma db push` as the production migration process.

## Current model

The schema contains users, companies, placements, branches, skills, attachments, and placement text chunks with a future pgvector embedding. See [project-database.md](../docs/project-database.md).
