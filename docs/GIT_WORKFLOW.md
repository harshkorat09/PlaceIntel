# 🌳 Git Workflow Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Purpose
2. Git Branch Strategy
3. Repository Workflow
4. Branch Naming Convention
5. Weekly Development Workflow
6. Daily Workflow
7. Starting a New Task
8. Commit Message Convention
9. Pull Request Workflow
10. Merge Strategy
11. Conflict Resolution
12. Branch Cleanup
13. Best Practices
14. Common Mistakes

---

# 1. Purpose

This document defines the official Git workflow for the PlaceIntel project.

The objectives are:

- Maintain a clean Git history
- Avoid merge conflicts
- Improve collaboration
- Ensure every feature is independently developed
- Make project tracking easier

Every team member must follow this workflow.

---

# 2. Git Branch Strategy

The repository contains only two permanent branches.

```
main
develop
```

## main

Purpose

- Stable code
- Production-ready
- Presentation-ready
- Never directly modified

---

## develop

Purpose

- Active development
- Integration branch
- Receives completed features

---

# Feature Branches

Every feature, task, bug fix, documentation update, or weekly activity must be developed in a separate branch.

Example

```
week-3/database-schema

week-3/authentication

week-4/company-api

week-4/frontend-dashboard

week-5/chatbot-rag
```

After merging, delete the branch.

Never reuse an old feature branch.

---

# 3. Repository Workflow

Overall workflow

```
                 main
                  ▲
                  │
          Release / Final Merge
                  ▲
                  │
               develop
          ▲      ▲      ▲
          │      │      │
 week-3/database-schema
 week-3/authentication
 week-4/company-api
 week-5/dashboard
 week-6/chatbot-rag
```

Only completed features should be merged into `develop`.

Only stable versions should be merged into `main`.

---

# 4. Branch Naming Convention

Always use meaningful names.

## Feature

```
feature/login

feature/company-crud

feature/dashboard
```

---

## Weekly

```
week-3/database-schema

week-3/authentication

week-4/company-api

week-4/placement-api

week-5/dashboard

week-6/chatbot-rag
```

---

## Bug Fix

```
bugfix/login-error

bugfix/upload-validation

bugfix/prisma-issue
```

---

## Documentation

```
docs/readme

docs/setup

docs/database-guide
```

---

# 5. Weekly Development Workflow

Every week begins with the latest code.

```
develop

↓

Pull latest changes

↓

Create new branch

↓

Implement task

↓

Commit

↓

Push

↓

Pull Request

↓

Review

↓

Merge into develop

↓

Delete feature branch
```

Repeat for the next task.

---

# 6. Daily Workflow

Before starting work

```bash
git checkout develop

git pull origin develop
```

Create a new branch

```bash
git checkout -b week-4/company-api
```

Work only inside this branch.

---

# 7. Starting a New Task

Suppose today's task is

Create Company CRUD.

## Step 1

Update develop

```bash
git checkout develop

git pull origin develop
```

---

## Step 2

Create a branch

```bash
git checkout -b week-4/company-api
```

---

## Step 3

Implement the feature.

---

## Step 4

Test everything.

---

## Step 5

Commit

```bash
git add .

git commit -m "feat(company): implement company CRUD"
```

---

## Step 6

Push

```bash
git push -u origin week-4/company-api
```

---

## Step 7

Open Pull Request

```
week-4/company-api

↓

develop
```

---

## Step 8

After merge

```bash
git checkout develop

git pull
```

Delete local branch

```bash
git branch -d week-4/company-api
```

Delete remote branch

```bash
git push origin --delete week-4/company-api
```

---

## Step 9

Start the next task

```bash
git checkout -b week-4/student-api
```

Never continue using the old branch.

---

# 8. Commit Message Convention

Follow Conventional Commits.

## Features

```
feat(auth): implement JWT authentication

feat(company): create CRUD endpoints

feat(student): add profile management
```

---

## Bug Fixes

```
fix(upload): validate PDF size

fix(api): resolve authentication issue
```

---

## Documentation

```
docs(setup): update installation guide

docs(api): add authentication endpoints
```

---

## Refactoring

```
refactor(api): improve service structure
```

---

## Chore

```
chore: initial project setup

chore: configure Docker

chore: update dependencies
```

---

# 9. Pull Request Workflow

Every completed task requires a Pull Request.

Checklist before creating PR

☐ Code builds successfully

☐ No lint errors

☐ Feature tested

☐ Documentation updated

☐ Commit messages meaningful

☐ No unnecessary files

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

# 10. Merge Strategy

Merge only when:

✔ Feature completed

✔ Feature tested

✔ Documentation updated

✔ No merge conflicts

Never merge incomplete work.

---

# 11. Conflict Resolution

If Git reports a conflict:

1. Pull latest `develop`.

```bash
git checkout develop

git pull
```

2. Switch back.

```bash
git checkout week-4/company-api
```

3. Merge

```bash
git merge develop
```

4. Resolve conflicts.

5. Test project.

6. Commit.

7. Push.

Never ignore merge conflicts.

---

# 12. Branch Cleanup

After every merge

Delete local branch

```bash
git branch -d week-4/company-api
```

Delete remote branch

```bash
git push origin --delete week-4/company-api
```

This keeps the repository clean.

---

# 13. Best Practices

✔ Pull before starting work

✔ Create a new branch for every task

✔ Keep commits small

✔ Commit frequently

✔ Push regularly

✔ Delete merged branches

✔ Use descriptive branch names

✔ Follow commit message convention

✔ Keep documentation updated

✔ Review code before merging

---

# 14. Common Mistakes

❌ Working directly on main

❌ Using one branch for multiple tasks

❌ Pushing unfinished work into develop

❌ Forgetting to pull latest changes

❌ Committing .env

❌ Committing node_modules

❌ Ignoring merge conflicts

❌ Huge commits containing unrelated changes

❌ Deleting another developer's branch

❌ Skipping testing before merge

---

# Team Responsibilities

## Harsh

Responsible for

- Backend
- Database
- Authentication
- Prisma

---

## Om

Responsible for

- Frontend
- Dashboard
- React

---

## Het

Responsible for

- AI
- FastAPI
- RAG
- Embeddings

---

# Git Philosophy

Every task deserves its own branch.

Every branch should solve one problem.

Every Pull Request should be small.

Every merge should leave the project in a working state.

Every developer is responsible for keeping the repository clean.

Following this workflow ensures smooth collaboration, easier code reviews, reduced merge conflicts, and a professional Git history throughout the PlaceIntel project.