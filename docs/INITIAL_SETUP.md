# 🚀 Initial Setup Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Prerequisites
3. Required Software
4. Clone Repository
5. Project Structure
6. Install Dependencies
7. Environment Variables
8. Docker Setup
9. Database Setup
10. Prisma Setup
11. Running the Project
12. First-Time Checklist
13. Git Workflow
14. Weekly Development Workflow
15. Troubleshooting
16. Best Practices
17. Common Mistakes

---

# 1. Introduction

Welcome to the PlaceIntel development team.

This document explains everything required to set up the project from scratch.

Following these steps ensures every developer has an identical development environment.

Never skip any step.

---

# 2. Prerequisites

Basic knowledge of:

- Git
- GitHub
- Node.js
- Docker
- PostgreSQL
- TypeScript
- React
- Express
- FastAPI

---

# 3. Required Software

Install the following software before cloning the repository.

| Software | Version |
|-----------|----------|
| Git | Latest |
| Node.js | 20+ |
| pnpm | Latest |
| Docker Desktop | Latest |
| VS Code | Latest |
| PostgreSQL | Docker Container |

---

## Verify Installation

```bash
git --version

node -v

pnpm -v

docker --version

docker compose version
```

---

# 4. Clone Repository

Clone the GitHub repository.

```bash
git clone https://github.com/<organization>/PlaceIntel.git

cd PlaceIntel
```

---

# 5. Project Structure

```
PlaceIntel/

apps/
│
├── api/
├── chatbot/
└── web/

packages/
│
├── config/
├── shared/
├── ui/
└── utils/

docker/

docs/

prisma/

scripts/

uploads/
```

Do not modify the folder structure without team discussion.

---

# 6. Install Dependencies

Install every workspace dependency.

```bash
pnpm install
```

Do NOT install packages manually unless required.

If a new dependency is added by another team member:

```bash
git pull

pnpm install
```

---

# 7. Environment Variables

Create a `.env` file in the project root.

Copy the values from `.env.example`.

Example

```env
NODE_ENV=development

WEB_PORT=5173

API_PORT=4000

CHATBOT_PORT=8000

DATABASE_URL=postgresql://placeintel:placeintel@localhost:5432/placeintel?schema=public

JWT_SECRET=replace-with-a-secure-secret

CHATBOT_MODEL=gpt-4o-mini

EMBEDDING_MODEL=text-embedding-3-small

EMBEDDING_DIMENSIONS=1536

OPENAI_API_KEY=
```

Never commit `.env`.

Only commit `.env.example`.

---

# 8. Docker Setup

Start Docker Desktop.

Wait until Docker is fully running.

Verify Docker.

```bash
docker --version

docker compose version
```

Start containers.

```bash
docker compose up -d
```

Verify running containers.

```bash
docker ps
```

Expected containers

- PostgreSQL
- API
- Chatbot

Stop containers

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

---

# 9. Database Setup

The project uses PostgreSQL running inside Docker.

Do NOT install PostgreSQL locally unless required.

The database is created automatically by Docker Compose.

Connection

```
Host

localhost

Port

5432

Database

placeintel

Username

placeintel

Password

placeintel
```

---

# 10. Prisma Setup

Generate Prisma Client

```bash
pnpm prisma generate
```

Run migrations

```bash
pnpm prisma migrate dev
```

Seed database

```bash
pnpm prisma db seed
```

If the schema changes:

```bash
git pull

pnpm prisma generate

pnpm prisma migrate dev
```

Never edit database tables manually.

Always use Prisma migrations.

---

# 11. Running the Project

## Frontend

```bash
pnpm --filter web dev
```

Runs on

```
http://localhost:5173
```

---

## Backend

```bash
pnpm --filter api dev
```

Runs on

```
http://localhost:4000
```

---

## Chatbot

```bash
docker compose up chatbot
```

Runs on

```
http://localhost:8000
```

---

# 12. First-Time Checklist

Every new developer must complete the following checklist.

☐ Clone repository

☐ Install dependencies

☐ Create `.env`

☐ Start Docker

☐ Generate Prisma Client

☐ Run database migrations

☐ Verify frontend starts

☐ Verify backend starts

☐ Verify chatbot starts

☐ Verify Docker containers

Only start development after all steps are complete.

---

# 13. Git Workflow

Never work directly on `main`.

The repository follows the following structure.

```
main

↓

develop

↓

week-x/task-name

↓

Pull Request

↓

develop

↓

main
```

---

## Starting Work

Always begin from the latest develop branch.

```bash
git checkout develop

git pull origin develop
```

Create a new branch.

Example

```bash
git checkout -b week-3/database-schema
```

Examples

```
week-3/authentication

week-4/company-api

week-4/frontend-dashboard

week-5/chatbot-rag
```

Every new task requires a **new branch**.

Never continue using an old merged branch.

---

## Commit Changes

```bash
git add .

git commit -m "feat(company): create company CRUD"
```

Push

```bash
git push -u origin week-4/company-api
```

Create Pull Request into

```
develop
```

Never merge directly into

```
main
```

---

# 14. Weekly Development Workflow

Every week follow this sequence.

## Step 1

Update repository.

```bash
git checkout develop

git pull
```

---

## Step 2

Create a new branch.

```bash
git checkout -b week-5/dashboard
```

---

## Step 3

Develop feature.

---

## Step 4

Test feature.

---

## Step 5

Commit.

---

## Step 6

Push.

---

## Step 7

Create Pull Request.

---

## Step 8

Merge into develop.

---

## Step 9

Delete completed branch.

```bash
git branch -d week-5/dashboard
```

Remote

```bash
git push origin --delete week-5/dashboard
```

---

# 15. Troubleshooting

## Docker not running

Start Docker Desktop.

Wait until the engine is running.

---

## PostgreSQL authentication failed

Check

- Docker container
- DATABASE_URL
- Docker service

---

## Prisma migration fails

Run

```bash
pnpm prisma generate
```

Then

```bash
pnpm prisma migrate dev
```

---

## Port already in use

Find process.

```bash
netstat -ano | findstr :5432
```

Stop conflicting service.

---

## Dependency errors

Run

```bash
pnpm install
```

---

## Docker rebuild

```bash
docker compose down

docker compose up --build -d
```

---

# 16. Best Practices

✔ Pull latest code before starting work.

✔ Create a new branch for every task.

✔ Commit frequently.

✔ Keep commits small.

✔ Update documentation when necessary.

✔ Test before creating Pull Request.

✔ Use Prisma migrations.

✔ Keep Docker running.

✔ Follow coding standards.

---

# 17. Common Mistakes

❌ Working directly on `main`

❌ Forgetting to pull latest changes

❌ Sharing `.env`

❌ Committing `node_modules`

❌ Manually editing the database

❌ Using one branch for multiple tasks

❌ Skipping testing before merge

❌ Not updating documentation

---

# Initial Setup Complete

If you have successfully completed every step in this guide, your development environment is fully configured and ready for implementation.

Welcome to the PlaceIntel development team!