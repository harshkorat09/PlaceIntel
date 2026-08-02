# Operations and deployment

## Local services

| Service | Local port | Health check |
|---|---:|---|
| Web (Vite) | 5173 | Browser page |
| API | 4000 | `GET /health` |
| Chatbot | 8000 | `GET /health` |
| PostgreSQL | 5432 | `pg_isready` |

## Environment

Copy `.env.example` to `.env`. Production requires a strong `JWT_SECRET`, managed `DATABASE_URL`, and an approved `OPENAI_API_KEY` if chatbot generation is enabled. Never commit `.env`.
# ⚙️ Operations Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Operational Goals
3. System Overview
4. Services
5. Starting the System
6. Stopping the System
7. Restarting Services
8. Docker Operations
9. Environment Variables
10. Health Checks
11. Monitoring
12. Logging
13. Database Operations
14. Backup Strategy
15. Restore Strategy
16. Deployment Workflow
17. Maintenance
18. Incident Response
19. Troubleshooting
20. Production Readiness Checklist

---

# 1. Introduction

This document explains how the PlaceIntel platform should be operated during development and future production deployment.

It provides operational procedures for developers and maintainers, including:

- Running services
- Monitoring containers
- Managing databases
- Viewing logs
- Performing backups
- Recovering from failures
- Deploying updates

---

# 2. Operational Goals

The operational goals are:

✔ Consistent development environment

✔ Reliable service startup

✔ Easy maintenance

✔ Quick troubleshooting

✔ Safe deployments

✔ Minimal downtime

---

# 3. System Overview

PlaceIntel consists of three primary services.

```
                React Web

                     │

               Express API

            ┌────────┴────────┐

            │                 │

      PostgreSQL          AI Chatbot

        (Docker)          (FastAPI)
```

Every service is independent.

Failure of one service should not permanently affect others.

---

# 4. Services

## Frontend

Technology

React + Vite

Default Port

```
5173
```

---

## Backend

Technology

Express

Default Port

```
4000
```

---

## AI Chatbot

Technology

FastAPI

Default Port

```
8000
```

---

## Database

Technology

PostgreSQL + pgvector

Default Port

```
5432
```

---

# 5. Starting the System

Start Docker services.

```bash
docker compose up -d
```

Verify containers.

```bash
docker ps
```

Run frontend.

```bash
pnpm --filter web dev
```

Run backend.

```bash
pnpm --filter api dev
```

Verify application.

```
Frontend

http://localhost:5173

Backend

http://localhost:4000

Chatbot

http://localhost:8000
```

---

# 6. Stopping the System

Stop frontend

```
Ctrl + C
```

Stop backend

```
Ctrl + C
```

Stop Docker

```bash
docker compose down
```

---

# 7. Restarting Services

Restart containers.

```bash
docker compose restart
```

Restart a specific service.

```bash
docker compose restart postgres
```

```bash
docker compose restart api
```

```bash
docker compose restart chatbot
```

---

# 8. Docker Operations

Start

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Rebuild

```bash
docker compose up --build -d
```

View running containers

```bash
docker ps
```

View all containers

```bash
docker ps -a
```

View logs

```bash
docker compose logs
```

View logs for backend

```bash
docker compose logs api
```

View logs for chatbot

```bash
docker compose logs chatbot
```

View database logs

```bash
docker compose logs postgres
```

---

# 9. Environment Variables

Configuration is stored in

```
.env
```

Important variables

```
DATABASE_URL

JWT_SECRET

OPENAI_API_KEY

API_PORT

WEB_PORT

CHATBOT_PORT
```

Never commit

```
.env
```

Commit

```
.env.example
```

---

# 10. Health Checks

Verify Backend

```
GET

/api/v1/health
```

Expected

```json
{
    "status":"healthy"
}
```

---

Verify Database

```bash
docker exec -it placeintel-postgres psql -U placeintel
```

---

Verify Chatbot

```
GET

/
```

Should return

```
Running
```

---

# 11. Monitoring

Monitor

- API response time
- Database health
- AI response latency
- Docker containers
- CPU usage
- Memory usage

Useful commands

```bash
docker stats
```

Container status

```bash
docker ps
```

---

# 12. Logging

Development

Use

Morgan

Future

Use

Pino

or

Winston

Do not log

- Passwords
- JWT Tokens
- API Keys
- Database Passwords

Store logs by service.

Example

```
Backend

Frontend

Chatbot

Database
```

---

# 13. Database Operations

Generate Prisma Client

```bash
pnpm prisma generate
```

Create Migration

```bash
pnpm prisma migrate dev
```

Seed

```bash
pnpm prisma db seed
```

Open Prisma Studio

```bash
pnpm prisma studio
```

---

# 14. Backup Strategy

Development

No scheduled backup required.

Production

Daily backup

Weekly backup

Monthly backup

Backup should include

- Database
- Uploaded documents
- Configuration files

---

# 15. Restore Strategy

If data is corrupted

Stop application.

Restore backup.

Run migrations.

Verify application.

Restart services.

Always test restoration before production deployment.

---

# 16. Deployment Workflow

Development

```
Feature Branch

↓

Pull Request

↓

Develop

↓

Testing

↓

Main

↓

Deployment
```

Deployment Checklist

☐ Latest code pulled

☐ Dependencies installed

☐ Docker rebuilt

☐ Migrations applied

☐ Environment variables configured

☐ Health checks passed

---

# 17. Maintenance

Regular maintenance tasks

Weekly

- Pull latest changes
- Update dependencies
- Review logs

Monthly

- Review database indexes
- Remove unused Docker images
- Audit dependencies
- Review backups

---

# 18. Incident Response

Examples

- Backend crash
- Database unavailable
- Chatbot timeout
- Authentication failure

Procedure

1. Identify issue.
2. Check logs.
3. Verify Docker containers.
4. Verify database.
5. Apply fix.
6. Test.
7. Document incident.

---

# 19. Troubleshooting

## Docker not running

Start Docker Desktop.

---

## Database authentication failed

Verify

```
DATABASE_URL
```

Check PostgreSQL container.

---

## Prisma migration error

```bash
pnpm prisma generate
```

Then

```bash
pnpm prisma migrate dev
```

---

## Port already in use

```bash
netstat -ano | findstr :5432
```

Stop conflicting process.

---

## Frontend not loading

Verify Vite is running.

---

## Backend not responding

Check

```
docker compose logs api
```

---

## AI not responding

Check

```
docker compose logs chatbot
```

Verify

```
OPENAI_API_KEY
```

---

# 20. Production Readiness Checklist

Infrastructure

☐ Docker working

☐ PostgreSQL healthy

☐ API healthy

☐ Chatbot healthy

☐ Environment variables configured

Database

☐ Latest migration applied

☐ Seed completed

☐ Backup verified

Security

☐ JWT configured

☐ Password hashing enabled

☐ HTTPS configured

☐ Secrets protected

Application

☐ Frontend builds

☐ Backend builds

☐ AI tested

☐ Documentation updated

☐ Tests passed

Monitoring

☐ Logs enabled

☐ Health checks working

☐ Error handling verified

---

# Maintenance Philosophy

The PlaceIntel platform should always remain:

- Available
- Secure
- Observable
- Recoverable
- Maintainable

Operational procedures should be documented, repeatable, and easy for any team member to follow.

---

# Conclusion

This Operations Guide defines the operational standards for the PlaceIntel platform. By following these procedures, developers can reliably run, maintain, troubleshoot, and deploy the application while ensuring consistency across all development environments and preparing the project for future production deployment.
## Deployment principles

- Build immutable API, web, and chatbot artifacts.
- Use managed PostgreSQL with pgvector or a tested equivalent.
- Store attachments in durable object storage rather than local `uploads/`.
- Run migrations as a controlled release step.
- Use HTTPS, secret management, database backups, and least-privilege credentials.
- Add logs, metrics, and alerts for errors, latency, chatbot failures, and database health.

If chatbot answers are incorrect, disable chat through a feature flag, preserve the question/source trace, and inspect retrieval results before changing prompts or model settings.
