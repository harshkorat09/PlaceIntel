# 💻 Development Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Development Philosophy
3. Monorepo Structure
4. Development Environment
5. Project Workflow
6. Backend Development
7. Frontend Development
8. AI Development
9. Database Development
10. Shared Packages
11. Environment Variables
12. Development Scripts
13. Feature Development Workflow
14. Code Review Process
15. Debugging
16. Logging
17. Performance Guidelines
18. Best Practices
19. Common Mistakes
20. Development Checklist

---

# 1. Introduction

This document describes how developers should work on the PlaceIntel project.

It defines:

- Development process
- Folder responsibilities
- Coding workflow
- Collaboration rules
- Debugging methods
- Performance considerations
- Feature implementation strategy

Every team member should follow this guide to ensure consistency.

---

# 2. Development Philosophy

The PlaceIntel project follows these principles:

✔ Modular Development

✔ Small Features

✔ Frequent Commits

✔ Documentation First

✔ Test Before Merge

✔ Containerized Development

✔ API-First Backend

✔ Component-Based Frontend

✔ AI as an Independent Service

---

# 3. Monorepo Structure

```
PlaceIntel/

apps/
│
├── api/
├── chatbot/
└── web/

packages/
│
├── shared/
├── config/
├── ui/
└── utils/

prisma/

docker/

docs/

scripts/

uploads/
```

Each application is independent but shares common packages.

---

# 4. Development Environment

Required Software

- Git
- Node.js 20+
- pnpm
- Docker Desktop
- VS Code
- PostgreSQL (Docker)

Verify installation

```bash
git --version
node -v
pnpm -v
docker --version
```

---

# 5. Project Workflow

```
Requirement

↓

Create Branch

↓

Implement Feature

↓

Test

↓

Commit

↓

Push

↓

Pull Request

↓

Review

↓

Merge

↓

Delete Branch
```

Every feature follows this lifecycle.

---

# 6. Backend Development

Location

```
apps/api/
```

Folder Structure

```
src/

config/

controllers/

middlewares/

modules/

repositories/

routes/

services/

validators/

utils/

server.ts
```

### Responsibilities

**Routes**

- Define endpoints
- Apply middleware

**Controllers**

- Handle HTTP requests
- Validate input
- Call services
- Return responses

**Services**

- Business logic
- Data processing
- Validation beyond request schema

**Repositories**

- Database access
- Prisma queries only

**Validators**

- Zod schemas
- Input validation

**Middlewares**

- Authentication
- Authorization
- Logging
- Error handling

---

# 7. Frontend Development

Location

```
apps/web/
```

Folder Structure

```
src/

assets/

components/

hooks/

layouts/

pages/

routes/

services/

types/

utils/
```

### Rules

- Pages contain page-level logic.
- Components should be reusable.
- Hooks manage reusable stateful logic.
- Services handle API communication.
- Keep components focused and small.

---

# 8. AI Development

Location

```
apps/chatbot/
```

Suggested Structure

```
app/

api/

core/

rag/

services/

models/

utils/

main.py
```

Responsibilities

- Embedding generation
- Retrieval
- Prompt construction
- OpenAI communication
- Response formatting

Keep AI logic isolated from the Express backend.

---

# 9. Database Development

Database changes must follow this sequence:

1. Update `schema.prisma`
2. Generate Prisma Client

```bash
pnpm prisma generate
```

3. Create migration

```bash
pnpm prisma migrate dev --name meaningful-name
```

4. Test locally

5. Commit

Never modify database tables manually.

---

# 10. Shared Packages

Shared code belongs inside `packages/`.

Examples

```
packages/shared/

packages/ui/

packages/utils/

packages/config/
```

Use these packages for:

- Shared TypeScript types
- UI components
- Utility functions
- Common configuration

Avoid duplicating code across applications.

---

# 11. Environment Variables

All configuration must come from `.env`.

Examples

```env
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
API_PORT=
WEB_PORT=
CHATBOT_PORT=
```

Never hardcode:

- API keys
- Passwords
- Database credentials
- Tokens

Commit `.env.example`, not `.env`.

---

# 12. Development Scripts

Root

```bash
pnpm install
```

Frontend

```bash
pnpm --filter web dev
```

Backend

```bash
pnpm --filter api dev
```

Prisma

```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
```

Docker

```bash
docker compose up -d
docker compose down
docker compose restart
```

---

# 13. Feature Development Workflow

Before starting:

```bash
git checkout develop
git pull origin develop
```

Create a branch:

```bash
git checkout -b week-4/company-api
```

Implement feature.

Run tests.

Commit:

```bash
git add .
git commit -m "feat(company): implement CRUD API"
```

Push:

```bash
git push -u origin week-4/company-api
```

Open a Pull Request targeting `develop`.

---

# 14. Code Review Process

Every Pull Request should verify:

- Functionality works
- Code follows standards
- Documentation updated
- No unnecessary files
- No secrets committed
- Tests pass

Review comments should be addressed before merging.

---

# 15. Debugging

Backend

- Check server logs
- Inspect API responses
- Use Postman or Bruno
- Verify Prisma queries

Frontend

- Browser Developer Tools
- React DevTools
- Network tab
- Console

AI

- Check prompt construction
- Verify embeddings
- Inspect FastAPI logs

Docker

```bash
docker ps
docker compose logs
```

---

# 16. Logging

Development

- Morgan for HTTP requests
- Structured console logs for debugging

Future

- Winston or Pino for application logging

Do not log:

- Passwords
- JWTs
- API keys
- Database credentials

---

# 17. Performance Guidelines

Backend

- Use pagination
- Select only required fields
- Use indexes
- Avoid N+1 queries

Frontend

- Lazy load pages
- Reuse components
- Minimize re-renders

AI

- Cache embeddings where appropriate
- Avoid regenerating embeddings unnecessarily

---

# 18. Best Practices

✔ Keep functions small.

✔ Keep components reusable.

✔ Validate all inputs.

✔ Write meaningful commit messages.

✔ Update documentation with code changes.

✔ Test before creating a Pull Request.

✔ Use environment variables for configuration.

✔ Prefer reusable utilities over duplication.

---

# 19. Common Mistakes

❌ Working directly on `main`

❌ Large unrelated commits

❌ Hardcoded secrets

❌ Skipping Prisma migrations

❌ Business logic in controllers

❌ API calls inside React components without services

❌ Not updating documentation

❌ Ignoring lint or build errors

---

# 20. Development Checklist

Before marking a task complete:

☐ Feature implemented

☐ Code builds successfully

☐ Lint passes

☐ Backend tested

☐ Frontend tested

☐ AI tested (if applicable)

☐ Database migrations applied

☐ Documentation updated

☐ Commit message follows convention

☐ Pull Request created

☐ Code reviewed

☐ Successfully merged

---

# Development Philosophy

The PlaceIntel codebase should always be:

- Modular
- Readable
- Testable
- Scalable
- Secure
- Well-documented

Every feature should improve the project without introducing unnecessary complexity. Developers should prioritize maintainability, consistency, and collaboration over short-term shortcuts.

Following this guide ensures that the project remains organized, scalable, and easy for every team member to understand and extend.