# 💻 Coding Standards

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Purpose
2. General Principles
3. Project Structure
4. Naming Conventions
5. TypeScript Standards
6. React Standards
7. Express Standards
8. FastAPI Standards
9. Prisma Standards
10. API Standards
11. Error Handling
12. Logging
13. Git Standards
14. Documentation Standards
15. Code Review Checklist
16. Best Practices
17. Common Mistakes

---

# 1. Purpose

This document defines the coding standards for the PlaceIntel project.

Its objectives are:

- Maintain consistent code quality
- Improve readability
- Reduce bugs
- Simplify maintenance
- Make collaboration easier

Every team member must follow these standards.

---

# 2. General Principles

Follow these principles:

✔ Write readable code.

✔ Keep functions small.

✔ Use meaningful names.

✔ Avoid duplicate code.

✔ Keep business logic separate from controllers.

✔ Prefer composition over duplication.

✔ Keep modules independent.

✔ Follow Single Responsibility Principle (SRP).

✔ Always use TypeScript types.

---

# 3. Project Structure

Backend

```
apps/api/src/

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

Frontend

```
apps/web/src/

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

AI

```
apps/chatbot/app/

api/

core/

services/

rag/

models/

utils/

main.py
```

Never place unrelated code in another folder.

---

# 4. Naming Conventions

## Variables

Use camelCase

```ts
const studentName

const companyList

const isEligible
```

---

## Functions

camelCase

```ts
createPlacement()

updateCompany()

generateToken()
```

---

## Classes

PascalCase

```ts
CompanyService

UserRepository

AuthController
```

---

## Components

PascalCase

```
LoginPage.tsx

Navbar.tsx

DashboardCard.tsx
```

---

## Files

Use kebab-case

```
company-service.ts

student-controller.ts

auth-validator.ts
```

React Components

PascalCase

```
Dashboard.tsx

Navbar.tsx
```

---

## Constants

UPPER_CASE

```ts
JWT_SECRET

MAX_FILE_SIZE

API_VERSION
```

---

# 5. TypeScript Standards

Always enable strict typing.

Avoid

```ts
any
```

Prefer

```ts
interface Student

type PlacementDTO
```

---

Always define interfaces.

Bad

```ts
const user = {}
```

Good

```ts
interface User {

id:number

name:string

email:string

}
```

---

Use Enums

```ts
enum UserRole {

ADMIN,

STUDENT

}
```

---

Use async/await

Avoid

```ts
.then()
```

Prefer

```ts
await prisma.user.findMany()
```

---

# 6. React Standards

Keep components small.

Prefer

```
<200 lines
```

Split reusable components.

---

Pages

```
pages/

LoginPage.tsx

DashboardPage.tsx
```

---

Components

```
components/

Navbar

Sidebar

Card

Button

Modal
```

---

Never call APIs directly inside JSX.

Use

```
services/

hooks/
```

instead.

---

Keep state minimal.

---

# 7. Express Standards

Never write business logic in routes.

Wrong

```
Route

↓

Database
```

Correct

```
Route

↓

Controller

↓

Service

↓

Repository

↓

Database
```

---

Controllers

Responsible for

- Request
- Response
- Validation

---

Services

Responsible for

Business Logic

---

Repositories

Responsible for

Database queries.

---

Validators

Responsible for

Input validation using Zod.

---

# 8. FastAPI Standards

Keep routes thin.

Business logic belongs in

```
services/
```

Use

Pydantic Models

Never return raw exceptions.

Use proper HTTP status codes.

---

# 9. Prisma Standards

Never write raw SQL unless absolutely necessary.

Always use Prisma Client.

Bad

```sql
SELECT *
FROM User
```

Good

```ts
prisma.user.findMany()
```

---

Every schema change requires

```bash
pnpm prisma migrate dev
```

Never edit database manually.

---

# 10. API Standards

Use REST principles.

Example

```
GET /companies

POST /companies

PUT /companies/:id

DELETE /companies/:id
```

---

Response Format

Success

```json
{
  "success": true,
  "message": "Company created successfully.",
  "data": {}
}
```

---

Error

```json
{
  "success": false,
  "message": "Company not found."
}
```

Use consistent responses.

---

HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|OK|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|500|Internal Server Error|

---

# 11. Error Handling

Never

```ts
console.log(error)
```

Use centralized error middleware.

Example

```
Route

↓

Controller

↓

Service

↓

Throw Error

↓

Global Error Handler
```

---

Always return meaningful messages.

---

# 12. Logging

Use Morgan for HTTP logging.

Future

Use Winston or Pino.

Never log

Passwords

JWT Secrets

API Keys

Database Passwords

---

# 13. Git Standards

Every feature gets a new branch.

Examples

```
week-4/company-api

week-4/student-api

week-5/chatbot
```

Commit messages

```
feat(auth): implement login

fix(upload): validate files

docs(api): update contract
```

Never commit

```
node_modules

.env

dist
```

---

# 14. Documentation Standards

Whenever you implement

- API

Update

```
api-contract.md
```

---

Whenever you change database

Update

```
DATABASE_GUIDE.md
```

---

Whenever setup changes

Update

```
INITIAL_SETUP.md
```

Documentation should evolve with the project.

---

# 15. Code Review Checklist

Before creating a Pull Request

Backend

☐ Validation

☐ Authentication

☐ Error Handling

☐ No duplicate code

☐ API tested

Frontend

☐ Responsive

☐ API connected

☐ Loading state

☐ Error state

☐ Accessibility

AI

☐ Prompt tested

☐ Embeddings verified

☐ Vector search working

General

☐ No console.log

☐ Lint passes

☐ Build passes

☐ Documentation updated

---

# 16. Best Practices

✔ Use TypeScript everywhere.

✔ Prefer reusable components.

✔ Keep controllers thin.

✔ Keep services reusable.

✔ Keep repositories database-only.

✔ Validate every request.

✔ Write meaningful commit messages.

✔ Update documentation.

✔ Test before merge.

---

# 17. Common Mistakes

❌ Using any

❌ Business logic inside controllers

❌ Business logic inside routes

❌ Huge React components

❌ Hardcoded secrets

❌ SQL written outside Prisma

❌ Duplicate code

❌ Large commits

❌ Skipping validation

❌ Skipping documentation

---

# Folder Responsibility Summary

| Folder | Responsibility |
|---------|----------------|
| controllers | Handle HTTP requests and responses |
| services | Business logic |
| repositories | Database operations |
| routes | API endpoints |
| validators | Request validation |
| middlewares | Authentication, logging, error handling |
| utils | Helper functions |
| config | Application configuration |

---

# Coding Philosophy

The PlaceIntel codebase should be:

- Simple to understand
- Easy to maintain
- Easy to test
- Easy to extend
- Secure by default
- Consistent across all modules

Every developer is responsible for maintaining these standards.

Following this document ensures that PlaceIntel remains clean, scalable, and professional throughout its development lifecycle.