# 🤝 Contributing Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Purpose
3. Development Philosophy
4. Team Roles
5. Before You Start
6. Development Workflow
7. Branching Strategy
8. Commit Message Convention
9. Pull Request Process
10. Code Review Guidelines
11. Documentation Requirements
12. Database Changes
13. API Changes
14. Testing Requirements
15. Coding Standards
16. Issue Reporting
17. Feature Requests
18. Communication
19. Repository Rules
20. Definition of Done

---

# 1. Introduction

Welcome to the PlaceIntel project.

This document explains how every team member should contribute to the project.

The goal is to maintain:

- High code quality
- Consistent architecture
- Easy collaboration
- Professional Git history
- Stable releases

Every contributor is expected to follow these guidelines.

---

# 2. Purpose

The objectives of this document are:

- Define contribution rules
- Prevent merge conflicts
- Maintain coding consistency
- Improve collaboration
- Keep documentation synchronized

---

# 3. Development Philosophy

The project follows these principles.

✔ Build small features

✔ Commit frequently

✔ Test before merge

✔ Document changes

✔ Review every Pull Request

✔ Never break the main branch

---

# 4. Team Roles

## Harsh

Primary Responsibilities

- Backend
- Authentication
- Database
- Prisma
- Docker

---

## Om

Primary Responsibilities

- React
- UI Components
- Dashboard
- Frontend Integration

---

## Het

Primary Responsibilities

- FastAPI
- AI Chatbot
- OpenAI
- RAG
- Embeddings

---

# 5. Before You Start

Before writing any code:

Update your local repository.

```bash
git checkout develop

git pull origin develop
```

Install dependencies.

```bash
pnpm install
```

Start Docker.

```bash
docker compose up -d
```

Verify the project runs correctly.

---

# 6. Development Workflow

Every task follows the same workflow.

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

---

# 7. Branching Strategy

Permanent Branches

```
main

develop
```

Feature Branches

```
week-3/database-schema

week-3/authentication

week-4/company-api

week-4/student-api

week-5/dashboard

week-6/chatbot-rag
```

Rules

- One branch = One feature
- Delete merged branches
- Never reuse old branches

---

# 8. Commit Message Convention

Follow Conventional Commits.

Examples

Feature

```
feat(auth): implement JWT authentication
```

Bug Fix

```
fix(api): resolve login issue
```

Documentation

```
docs(setup): update installation guide
```

Refactor

```
refactor(company): simplify service logic
```

Chore

```
chore: update dependencies
```

---

# 9. Pull Request Process

Every completed feature requires a Pull Request.

Checklist before creating a PR:

☐ Code builds successfully

☐ Feature tested

☐ Documentation updated

☐ No merge conflicts

☐ Commit messages follow convention

Pull Request Flow

```
Feature Branch

↓

Pull Request

↓

Review

↓

Approval

↓

Merge into develop
```

---

# 10. Code Review Guidelines

Reviewers should verify:

- Correct functionality
- Clean architecture
- Code readability
- Error handling
- Input validation
- Documentation updates
- No unnecessary complexity

Provide constructive feedback and resolve comments before merging.

---

# 11. Documentation Requirements

Whenever you modify:

Database

↓

Update

```
DATABASE_GUIDE.md
```

API

↓

Update

```
api-contract.md
```

Architecture

↓

Update

```
architecture.md
```

Setup

↓

Update

```
INITIAL_SETUP.md
```

Documentation is part of the feature.

---

# 12. Database Changes

When modifying the schema:

1. Update `schema.prisma`

2. Generate Prisma Client

```bash
pnpm prisma generate
```

3. Create Migration

```bash
pnpm prisma migrate dev --name meaningful-name
```

4. Test

5. Commit migration files

Never edit migration files manually.

---

# 13. API Changes

Whenever a new endpoint is created:

- Follow REST conventions
- Validate input
- Update `api-contract.md`
- Test with Bruno/Postman
- Return consistent response format

---

# 14. Testing Requirements

Before requesting a review:

Backend

☐ API tested

☐ Authentication verified

☐ Validation tested

Frontend

☐ Responsive

☐ API connected

☐ Loading state

☐ Error state

AI

☐ Prompt tested

☐ Relevant responses

☐ Embeddings verified

---

# 15. Coding Standards

Follow the rules defined in:

```
CODING_STANDARDS.md
```

Key principles:

- Small functions
- Reusable components
- Thin controllers
- Service-based business logic
- Prisma for database access
- Zod for validation

---

# 16. Issue Reporting

When reporting a bug, include:

- Title
- Description
- Steps to reproduce
- Expected result
- Actual result
- Environment
- Screenshots (if applicable)
- Priority

Example

```
Title:
Login API returns 500

Expected:
401 Unauthorized

Actual:
500 Internal Server Error
```

---

# 17. Feature Requests

When proposing a feature:

Include:

- Problem statement
- Proposed solution
- Benefits
- Impact on existing modules
- Database changes (if any)
- API changes (if any)

Discuss significant architectural changes with the team before implementation.

---

# 18. Communication

For every major task:

- Inform the team before starting.
- Keep feature branches focused.
- Resolve questions early.
- Share schema or API changes before merging.

Weekly meetings should cover:

- Completed work
- Current blockers
- Next sprint tasks

---

# 19. Repository Rules

Never commit:

```
node_modules/

.env

dist/

build/

coverage/

logs/
```

Always commit:

- Source code
- Prisma migrations
- Documentation
- Configuration files
- Lock file (`pnpm-lock.yaml`)

---

# 20. Definition of Done

A task is complete only when:

☐ Feature implemented

☐ Code reviewed

☐ Tests passed

☐ Documentation updated

☐ Database migration committed (if applicable)

☐ API contract updated (if applicable)

☐ Pull Request approved

☐ Merged into `develop`

☐ Feature branch deleted

---

# Contributor Checklist

Before ending your work session:

☐ Commit your changes

☐ Push your branch

☐ Sync with latest `develop`

☐ Update documentation if required

☐ Verify Docker containers

☐ Ensure no sensitive data is committed

---

# Contributing Principles

Every contribution should improve the project.

Prioritize:

- Readability
- Simplicity
- Maintainability
- Scalability
- Security
- Documentation

Code is only considered complete when it is tested, reviewed, and documented.

---

# Conclusion

The success of PlaceIntel depends on consistent collaboration. By following these contribution guidelines, every team member can work independently while maintaining a clean, reliable, and professional codebase.