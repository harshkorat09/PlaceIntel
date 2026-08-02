# 🌐 API Contract

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. API Design Principles
3. Base URL
4. Authentication
5. API Versioning
6. Request Format
7. Response Format
8. Error Response Format
9. HTTP Status Codes
10. Authentication APIs
11. Student APIs
12. Company APIs
13. Placement APIs
14. Skill APIs
15. Branch APIs
16. Upload APIs
17. AI Chatbot APIs
18. Pagination
19. Filtering & Searching
20. Validation Rules
21. Security
22. Future APIs

---

# 1. Introduction

This document defines the REST API specification for PlaceIntel.

Every frontend request and backend response must follow this contract.

The goals are:

- Consistency
- Predictability
- Security
- Maintainability
- Scalability

---

# 2. API Design Principles

The API follows REST principles.

Rules

✔ Resource-based URLs

✔ JSON Request Body

✔ JSON Response

✔ Stateless Authentication

✔ JWT Authorization

✔ Standard HTTP Status Codes

✔ Predictable Error Messages

---

# 3. Base URL

Development

```
http://localhost:4000/api/v1
```

Production

```
https://api.placeintel.com/api/v1
```

---

# 4. Authentication

Protected endpoints require

```
Authorization

Bearer <JWT_TOKEN>
```

Example

```
Authorization: Bearer eyJhbGciOi...
```

---

# 5. API Versioning

Current Version

```
v1
```

Example

```
/api/v1/auth/login

/api/v1/companies

/api/v1/placements
```

Future

```
v2
```

can coexist without breaking older clients.

---

# 6. Request Format

Example

```json
{
    "name":"Google",
    "website":"https://google.com"
}
```

Always

```
Content-Type

application/json
```

---

# 7. Success Response Format

Every successful response follows

```json
{
    "success": true,
    "message": "Company created successfully.",
    "data": {}
}
```

---

List Response

```json
{
    "success": true,
    "message": "Companies fetched successfully.",
    "count": 10,
    "data": []
}
```

---

# 8. Error Response Format

Validation Error

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors":[]
}
```

Server Error

```json
{
    "success": false,
    "message": "Internal Server Error"
}
```

Unauthorized

```json
{
    "success": false,
    "message":"Unauthorized"
}
```

---

# 9. HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Created|
|204|Deleted|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|422|Validation Error|
|500|Internal Server Error|

---

# 10. Authentication APIs

---

## Register

POST

```
/auth/register
```

Request

```json
{
    "name":"Harsh",
    "email":"abc@gmail.com",
    "password":"password123",
    "branchId":1
}
```

Response

```json
{
    "success":true,
    "message":"Registration successful.",
    "data":{
        "id":1
    }
}
```

---

## Login

POST

```
/auth/login
```

Request

```json
{
    "email":"abc@gmail.com",
    "password":"password123"
}
```

Response

```json
{
    "success":true,
    "message":"Login successful.",
    "data":{
        "token":"JWT_TOKEN"
    }
}
```

---

## Get Current User

GET

```
/auth/me
```

Protected

---

## Logout

POST

```
/auth/logout
```

Protected

---

# 11. Student APIs

---

Get All Students

GET

```
/students
```

---

Get Student

GET

```
/students/:id
```

---

Update Student

PUT

```
/students/:id
```

---

Delete Student

DELETE

```
/students/:id
```

Admin Only

---

Update Skills

PUT

```
/students/:id/skills
```

---

Upload Resume

POST

```
/students/:id/resume
```

---

# 12. Company APIs

---

Create Company

POST

```
/companies
```

---

Get Companies

GET

```
/companies
```

---

Get Company

GET

```
/companies/:id
```

---

Update Company

PUT

```
/companies/:id
```

---

Delete Company

DELETE

```
/companies/:id
```

---

# 13. Placement APIs

Create Placement

POST

```
/placements
```

---

Get Placements

GET

```
/placements
```

---

Get Placement

GET

```
/placements/:id
```

---

Update Placement

PUT

```
/placements/:id
```

---

Delete Placement

DELETE

```
/placements/:id
```

---

Eligible Placements

GET

```
/placements/eligible
```

---

Placement Recommendation

GET

```
/placements/recommendations
```

---

# 14. Skill APIs

Get Skills

```
GET /skills
```

Create Skill

```
POST /skills
```

Update Skill

```
PUT /skills/:id
```

Delete Skill

```
DELETE /skills/:id
```

---

# 15. Branch APIs

Get Branches

```
GET /branches
```

Create Branch

```
POST /branches
```

Update Branch

```
PUT /branches/:id
```

Delete Branch

```
DELETE /branches/:id
```

---

# 16. Upload APIs

Upload File

POST

```
/uploads
```

Multipart Form Data

Supported

- PDF

- DOCX

Maximum

```
10 MB
```

---

# 17. AI Chatbot APIs

Ask AI

POST

```
/chat
```

Request

```json
{
    "question":"Which companies require React?"
}
```

Response

```json
{
    "success":true,
    "data":{
        "answer":"..."
    }
}
```

---

Generate Embeddings

POST

```
/embeddings
```

Admin Only

---

# 18. Pagination

Example

```
GET /companies?page=1&limit=10
```

Response

```json
{
    "page":1,
    "limit":10,
    "totalPages":5,
    "totalRecords":50,
    "data":[]
}
```

---

# 19. Filtering & Searching

Examples

```
GET /companies?search=google

GET /placements?branch=CE

GET /placements?cgpa=7.5

GET /placements?skill=React
```

Sorting

```
GET /placements?sort=deadline

GET /companies?sort=name
```

---

# 20. Validation Rules

Use Zod validation.

Examples

Student Name

Minimum

```
3 characters
```

Password

Minimum

```
8 characters
```

Email

Must be valid.

CGPA

```
0 - 10
```

Package

Positive decimal.

---

# 21. Security

JWT Authentication

Password Hashing

Helmet

CORS

Rate Limiting (Future)

Input Validation

SQL Injection Protection

Role Based Access Control

---

# 22. Future APIs

Future versions may include

Resume Analysis

```
POST /resume/analyze
```

Mock Interview

```
POST /interview/mock
```

Placement Prediction

```
GET /prediction
```

Notification

```
POST /notifications
```

Resume ATS

```
POST /resume/ats
```

---

# API Development Rules

✔ Every endpoint must have validation.

✔ Every endpoint returns JSON.

✔ Every protected route requires JWT.

✔ Controllers remain thin.

✔ Business logic belongs in services.

✔ Database logic belongs in repositories.

✔ Errors use centralized middleware.

✔ API documentation must be updated whenever a new endpoint is added.

---

# API Lifecycle

Client

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

JSON Response

---

# Conclusion

This API Contract serves as the official specification for all REST endpoints in PlaceIntel.

Every developer should implement and consume APIs according to this contract to maintain consistency, reduce integration issues, and simplify frontend-backend collaboration.

Changes to existing endpoints should be discussed by the team before implementation to avoid breaking compatibility.