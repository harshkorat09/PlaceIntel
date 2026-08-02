# 📑 Software Requirements Specification (SRS)

# PlaceIntel
### AI-Powered Placement Intelligence Platform

Version: 1.0

---

# Table of Contents

1. Introduction
2. Purpose
3. Scope
4. Definitions
5. Product Perspective
6. Product Functions
7. User Classes
8. Functional Requirements
9. Non-Functional Requirements
10. External Interface Requirements
11. Business Rules
12. User Stories
13. Use Cases
14. Constraints
15. Assumptions
16. Acceptance Criteria
17. Future Requirements

---

# 1. Introduction

This document defines the software requirements for the PlaceIntel project.

It serves as the primary reference for developers, testers, project members, and stakeholders throughout the software development lifecycle.

The purpose of this document is to clearly specify what the system should do, how it should behave, and the quality standards it must satisfy.

---

# 2. Purpose

The purpose of PlaceIntel is to develop an AI-powered Placement Intelligence Platform that enables students to prepare for campus placements more efficiently while providing placement coordinators with an effective management system.

The application integrates Artificial Intelligence with placement management to provide intelligent search, semantic recommendations, analytics, and conversational assistance.

---

# 3. Scope

The project consists of four major components:

## Student Portal

Students can:

- Register
- Login
- Manage profile
- Manage skills
- Upload resume
- View companies
- Check eligibility
- Chat with AI assistant

---

## Admin Portal

Administrators can:

- Manage students
- Manage companies
- Create placement drives
- Upload placement documents
- View analytics
- Manage skills
- Manage branches

---

## AI Chatbot

The chatbot provides:

- Placement guidance
- Eligibility queries
- Company information
- Resume suggestions
- Interview preparation guidance

---

## Database

The database stores:

- Student information
- Company information
- Placement drives
- Skills
- Branches
- Uploaded documents
- AI embeddings

---

# 4. Definitions

| Term | Description |
|--------|-------------|
| Placement | Recruitment process conducted by companies |
| Student | Registered user seeking placement |
| Admin | Placement coordinator |
| RAG | Retrieval Augmented Generation |
| Embedding | Numerical representation of text |
| Vector Search | Similarity search using embeddings |

---

# 5. Product Perspective

PlaceIntel follows a distributed architecture.

```
React Frontend
        │
REST API
        │
Express Backend
        │
PostgreSQL
        │
FastAPI AI Service
        │
OpenAI
```

Each component is independently deployable and communicates through REST APIs.

---

# 6. Product Functions

The system provides the following capabilities.

## User Management

- Registration
- Login
- Authentication
- Authorization
- Profile Update
- Password Management

---

## Placement Management

- Company CRUD
- Placement CRUD
- Eligibility
- Deadline Tracking

---

## Skill Management

- Add Skills
- Update Skills
- Skill Matching

---

## AI Features

- Semantic Search
- Resume Understanding
- Company Recommendation
- AI Chat

---

## Analytics

- Placement Statistics
- Company Analytics
- Student Analytics

---

# 7. User Classes

## Student

Permissions

- View placements
- Edit profile
- Upload resume
- Chat with AI

---

## Admin

Permissions

- Full CRUD
- User Management
- Company Management
- Dashboard
- Analytics

---

# 8. Functional Requirements

---

## FR-1 User Registration

Description

Students shall be able to create an account.

Priority

High

Input

- Name
- Email
- Password
- Branch

Output

Student account created.

---

## FR-2 Authentication

The system shall authenticate users using JWT.

Priority

High

---

## FR-3 Student Profile

Students shall be able to

- Edit profile
- Update CGPA
- Add skills

Priority

High

---

## FR-4 Company Management

Admins shall be able to

- Create company
- Update company
- Delete company
- View company

Priority

High

---

## FR-5 Placement Management

Admins shall be able to

- Create placement
- Update placement
- Delete placement
- Upload JD

Priority

High

---

## FR-6 Resume Upload

Students shall upload resumes.

Supported formats

- PDF
- DOCX

Maximum size

10 MB

---

## FR-7 AI Chatbot

Students shall ask questions such as

- Which companies allow 7 CGPA?
- Which companies require React?
- Show previous Microsoft placements.

The chatbot shall answer using the RAG pipeline.

---

## FR-8 Semantic Search

The system shall search placement documents using vector similarity.

---

## FR-9 Recommendation Engine

The system shall recommend placements based on

- Skills
- Branch
- CGPA

---

## FR-10 Dashboard

The system shall display

- Total Students
- Total Companies
- Active Placements
- Placement Statistics

---

# 9. Non-Functional Requirements

## Performance

- Response time < 2 seconds
- AI response < 8 seconds

---

## Availability

Target uptime

99%

---

## Security

- JWT Authentication
- Password Hashing
- Input Validation
- SQL Injection Prevention

---

## Scalability

Support

- 5000+ Students
- 1000+ Companies
- Future Microservices

---

## Reliability

Database transactions must preserve consistency.

---

## Maintainability

- Modular architecture
- Clean folder structure
- Reusable services

---

## Portability

The application shall run using Docker.

---

# 10. External Interface Requirements

## Frontend

React

REST API

---

## Backend

Express

JSON

---

## Database

PostgreSQL

Prisma ORM

---

## AI

FastAPI

OpenAI

---

# 11. Business Rules

BR-1

Every email must be unique.

---

BR-2

Only Admin can create placements.

---

BR-3

Students cannot delete companies.

---

BR-4

CGPA cannot exceed 10.

---

BR-5

Placement deadline cannot be before creation date.

---

BR-6

Deleted companies remove associated placements.

---

# 12. User Stories

### Student

As a student,

I want to upload my resume,

so that I receive personalized placement recommendations.

---

### Student

As a student,

I want to chat with AI,

so that I can quickly understand company requirements.

---

### Admin

As an administrator,

I want to manage placement drives,

so that students always receive updated information.

---

# 13. Use Cases

UC-1

Register Student

Actor

Student

---

UC-2

Login

Actor

Student/Admin

---

UC-3

Create Company

Actor

Admin

---

UC-4

Create Placement

Actor

Admin

---

UC-5

Upload Resume

Actor

Student

---

UC-6

Ask AI Question

Actor

Student

---

# 14. Constraints

- Academic timeline
- Limited team size
- OpenAI API quota
- Limited budget
- Internet dependency

---

# 15. Assumptions

- Docker Desktop installed.
- PostgreSQL available.
- GitHub repository available.
- Students have internet access.

---

# 16. Acceptance Criteria

The project shall be accepted when:

✅ User authentication works.

✅ Students can manage profiles.

✅ Admin can manage placements.

✅ AI chatbot answers placement questions.

✅ Recommendations work.

✅ APIs documented.

✅ Docker environment reproducible.

✅ Project successfully deployed.

---

# 17. Future Requirements

Future enhancements include

- Resume ATS Score
- AI Mock Interview
- Placement Prediction
- Email Notifications
- Resume Parser
- Calendar Integration
- Mobile Application
- Multi-University Support
- AI Career Advisor
- Interview Scheduling

---

# Requirement Traceability Matrix

| Requirement | Module |
|-------------|--------|
| FR-1 | Authentication |
| FR-2 | Authentication |
| FR-3 | Student |
| FR-4 | Company |
| FR-5 | Placement |
| FR-6 | Resume |
| FR-7 | AI Chatbot |
| FR-8 | Vector Search |
| FR-9 | Recommendation |
| FR-10 | Dashboard |

---

# Conclusion

This Software Requirements Specification defines the complete functional and non-functional requirements for PlaceIntel. All future development, testing, and deployment activities should align with the requirements defined in this document.

Any change to these requirements must be reviewed and approved by the project team before implementation.