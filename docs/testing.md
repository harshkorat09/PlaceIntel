# 🧪 Testing Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Testing Objectives
3. Testing Strategy
4. Testing Levels
5. Testing Environment
6. Backend Testing
7. Frontend Testing
8. AI Chatbot Testing
9. Database Testing
10. API Testing
11. Performance Testing
12. Security Testing
13. Manual Testing Checklist
14. Bug Reporting
15. Release Checklist
16. Future Automation
17. Best Practices

---

# 1. Introduction

Testing ensures that the PlaceIntel platform is reliable, secure, scalable, and ready for deployment.

The goal is not only to find bugs but also to verify that every feature behaves as expected under different conditions.

Every feature must be tested before it is merged into the `develop` branch.

---

# 2. Testing Objectives

The objectives of testing are:

- Verify functional correctness
- Detect bugs early
- Prevent regressions
- Validate API contracts
- Ensure database consistency
- Verify AI chatbot responses
- Improve overall software quality

---

# 3. Testing Strategy

PlaceIntel follows a layered testing strategy.

```
Requirements

↓

Development

↓

Unit Testing

↓

Integration Testing

↓

System Testing

↓

User Acceptance Testing

↓

Deployment
```

Testing should be continuous throughout development rather than postponed until the end.

---

# 4. Testing Levels

## Unit Testing

Tests individual functions, utilities, and services.

Examples:

- Password hashing
- JWT generation
- Eligibility calculation

---

## Integration Testing

Tests interaction between multiple modules.

Examples:

- Authentication + Database
- Placement CRUD + Database
- Chatbot + OpenAI API

---

## System Testing

Tests the complete application.

Examples:

- Student registration
- Login
- Company creation
- Placement management
- Resume upload
- AI chatbot

---

## User Acceptance Testing (UAT)

Performed before project demonstration.

Checks whether all requirements from the SRS have been satisfied.

---

# 5. Testing Environment

Development Environment

- Node.js
- pnpm
- Docker
- PostgreSQL
- Prisma
- FastAPI
- React

Operating System

- Windows 11 (Primary)
- Linux (Optional)

Browser

- Google Chrome
- Microsoft Edge

---

# 6. Backend Testing

Verify:

✔ Registration

✔ Login

✔ JWT Authentication

✔ Authorization

✔ CRUD Operations

✔ Validation

✔ Error Handling

✔ Database Transactions

✔ File Upload

✔ API Responses

Example Checklist

| Feature | Status |
|---------|--------|
| Register | ☐ |
| Login | ☐ |
| JWT | ☐ |
| Company CRUD | ☐ |
| Placement CRUD | ☐ |

---

# 7. Frontend Testing

Verify:

✔ Routing

✔ Forms

✔ Validation

✔ Responsive Design

✔ Loading States

✔ Error States

✔ API Integration

✔ Navigation

✔ Dashboard

Checklist

| Component | Status |
|-----------|--------|
| Login | ☐ |
| Dashboard | ☐ |
| Navbar | ☐ |
| Sidebar | ☐ |
| Company Page | ☐ |

---

# 8. AI Chatbot Testing

Verify:

- Question understanding
- Context retrieval
- Semantic search
- Prompt construction
- Response relevance
- Error handling

Sample Questions

```
Which companies allow 7 CGPA?

Show companies requiring React.

Which companies visited last year?

Explain Amazon eligibility.

Compare Google and Microsoft packages.
```

Expected Results

- Accurate
- Relevant
- Grounded in retrieved placement data
- No hallucinations where context is available

---

# 9. Database Testing

Verify

✔ Tables created

✔ Foreign keys

✔ Constraints

✔ Cascade rules

✔ Indexes

✔ Prisma migrations

✔ Seed data

Commands

```bash
pnpm prisma migrate dev

pnpm prisma db seed

pnpm prisma studio
```

---

# 10. API Testing

Tools

- Bruno (Recommended)
- Postman
- Insomnia

Verify

- Status Codes
- Request Validation
- Response Format
- Authentication
- Authorization
- Error Messages

Example

```
POST /api/v1/auth/login
```

Expected

```
200 OK
```

Invalid credentials

```
401 Unauthorized
```

---

# 11. Performance Testing

Verify

- Login response time
- Dashboard loading
- Database query performance
- AI response latency
- File upload speed

Target Response Times

| Operation | Target |
|------------|---------|
| Login | < 2 sec |
| CRUD | < 2 sec |
| Dashboard | < 3 sec |
| AI Chat | < 8 sec |

---

# 12. Security Testing

Verify

✔ Password hashing

✔ JWT validation

✔ Role-based access

✔ SQL Injection prevention

✔ Input validation

✔ File upload validation

✔ Authentication middleware

Negative Tests

- Invalid JWT
- Expired JWT
- Unauthorized access
- Invalid file types
- Missing required fields

---

# 13. Manual Testing Checklist

## Authentication

☐ Register

☐ Login

☐ Logout

☐ Invalid password

☐ Duplicate email

---

## Student

☐ Update profile

☐ Add skills

☐ Upload resume

☐ View placements

---

## Company

☐ Create

☐ Update

☐ Delete

☐ Search

---

## Placement

☐ Create

☐ Edit

☐ Delete

☐ Filter

☐ Eligibility

---

## AI

☐ Ask question

☐ Relevant answer

☐ Invalid question

☐ Empty question

☐ Response time

---

# 14. Bug Reporting

Every bug report should contain:

Title

Description

Steps to Reproduce

Expected Result

Actual Result

Screenshots (if applicable)

Environment

Priority

Status

Example

```
Title

Login API returns 500

Steps

1. Enter invalid password

2. Click Login

Expected

401 Unauthorized

Actual

500 Internal Server Error
```

---

# 15. Release Checklist

Before every release

☐ All features complete

☐ No critical bugs

☐ Documentation updated

☐ Database migrations tested

☐ Docker containers working

☐ AI chatbot verified

☐ API contract updated

☐ README updated

---

# 16. Future Automation

Future improvements

- Unit Tests (Vitest)
- Backend Tests (Jest)
- API Tests (Supertest)
- End-to-End Tests (Playwright)
- GitHub Actions CI
- Code Coverage Reports

Suggested Tools

| Type | Tool |
|------|------|
| Frontend | Vitest |
| Backend | Jest |
| API | Supertest |
| E2E | Playwright |
| Coverage | Istanbul |

---

# 17. Best Practices

✔ Test every feature before merging.

✔ Write reproducible bug reports.

✔ Keep API responses consistent.

✔ Test negative scenarios.

✔ Verify role-based access.

✔ Test Docker setup after dependency changes.

✔ Update tests when requirements change.

✔ Keep documentation synchronized with implementation.

---

# Exit Criteria

A feature is considered complete only if:

- Functional requirements are satisfied.
- Manual tests pass.
- API responses match the contract.
- Database changes are verified.
- No critical or high-severity bugs remain.
- Documentation has been updated.

---

# Testing Philosophy

Testing is the responsibility of every developer.

Quality is built during development—not added at the end. Every commit should leave the project in a working state, and every merged feature should be reliable, maintainable, and aligned with the project requirements.