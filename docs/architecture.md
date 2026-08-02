# 🏗 System Architecture

# PlaceIntel
### AI-Powered Placement Intelligence Platform

Version: 1.0

---

# Table of Contents

1. Introduction
2. Architectural Goals
3. High-Level Architecture
4. Technology Architecture
5. Monorepo Architecture
6. Component Architecture
7. Backend Architecture
8. Frontend Architecture
9. AI Service Architecture
10. Database Architecture
11. Request Lifecycle
12. Authentication Flow
13. Placement Workflow
14. AI RAG Workflow
15. Docker Architecture
16. Deployment Architecture
17. Scalability Strategy
18. Security Architecture
19. Future Architecture

---

# 1. Introduction

This document describes the complete software architecture of PlaceIntel.

The architecture has been designed with the following goals:

- Scalability
- Maintainability
- Security
- Modularity
- AI Integration
- Cloud Readiness
- Team Collaboration

The project follows a **Monorepo Architecture**, allowing multiple applications to coexist in a single repository while sharing common packages.

---

# 2. Architectural Goals

The architecture is designed to achieve the following objectives:

- Independent frontend and backend development
- Shared codebase using pnpm workspace
- AI service isolation
- Secure authentication
- Modular backend design
- Easy database migrations
- Dockerized development environment
- Future cloud deployment

---

# 3. High-Level Architecture

```
                        ┌────────────────────┐
                        │      Browser       │
                        └─────────┬──────────┘
                                  │
                            HTTP / HTTPS
                                  │
                        ┌─────────▼─────────┐
                        │   React Frontend  │
                        └─────────┬─────────┘
                                  │ REST API
                                  │
                 ┌────────────────▼────────────────┐
                 │         Express Backend         │
                 └───────┬───────────────┬─────────┘
                         │               │
                         │               │
                  Prisma ORM        FastAPI AI Service
                         │               │
                         │               │
                PostgreSQL + pgvector    │
                         │               │
                         └──────┬────────┘
                                │
                             OpenAI API
```

---

# 4. Technology Architecture

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- Zod Validation

---

## Database

- PostgreSQL
- pgvector Extension
- Prisma ORM

---

## AI Layer

- Python
- FastAPI
- LangChain
- OpenAI
- Vector Embeddings

---

## DevOps

- Docker
- Docker Compose
- GitHub
- pnpm Workspace

---

# 5. Monorepo Architecture

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
├── utils/
└── ui/

docker/

docs/

prisma/

scripts/

uploads/
```

---

## Why Monorepo?

Advantages:

- Shared packages
- Easier dependency management
- Consistent tooling
- Single Git repository
- Simplified CI/CD
- Better collaboration

---

# 6. Component Architecture

The system consists of three major applications.

## Web Application

Responsible for:

- User Interface
- Dashboard
- Authentication
- Placement Management

---

## API Server

Responsible for:

- Business Logic
- Authentication
- Database Access
- Validation
- Authorization

---

## AI Service

Responsible for:

- Embeddings
- Semantic Search
- RAG
- OpenAI Communication

---

# 7. Backend Architecture

The backend follows a layered architecture.

```
Client

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Prisma ORM

↓

PostgreSQL
```

---

## Folder Structure

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

---

## Layer Responsibilities

### Routes

Define API endpoints.

---

### Controllers

Receive requests.

Validate input.

Call services.

Return responses.

---

### Services

Contain business logic.

---

### Repositories

Interact with the database.

---

### Validators

Validate incoming requests using Zod.

---

### Middlewares

Authentication

Authorization

Logging

Error Handling

---

# 8. Frontend Architecture

The frontend follows a component-based architecture.

```
Pages

↓

Layouts

↓

Components

↓

Hooks

↓

Services

↓

API
```

---

Expected structure

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

main.tsx
```

---

# 9. AI Service Architecture

The AI service is completely isolated.

```
Express

↓

FastAPI

↓

Embedding Model

↓

Vector Search

↓

OpenAI

↓

Response
```

Responsibilities:

- Generate embeddings
- Search vectors
- Build prompts
- Call OpenAI
- Return responses

---

# 10. Database Architecture

```
Express

↓

Prisma ORM

↓

PostgreSQL

↓

pgvector
```

Major entities include:

- User
- Company
- Placement
- Skill
- Branch
- Attachment
- PlacementChunk

---

# 11. Request Lifecycle

```
Browser

↓

Express Route

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

Repository

↓

Service

↓

Controller

↓

JSON Response
```

---

# 12. Authentication Flow

```
Login Request

↓

Validate Credentials

↓

Hash Comparison

↓

JWT Generation

↓

Return Token

↓

Client Stores Token

↓

Protected Requests

↓

JWT Verification
```

---

# 13. Placement Workflow

```
Admin Login

↓

Create Company

↓

Create Placement

↓

Upload Documents

↓

Generate Embeddings

↓

Students View Placement

↓

Eligibility Check

↓

Recommendation Engine
```

---

# 14. AI RAG Workflow

```
Student Question

↓

Express API

↓

FastAPI

↓

Embedding Generation

↓

Vector Search

↓

Relevant Chunks

↓

Prompt Construction

↓

OpenAI

↓

Answer Returned
```

---

# 15. Docker Architecture

Each developer runs identical containers locally.

```
Docker Compose

│

├── PostgreSQL

├── Express API

└── FastAPI Chatbot
```

Benefits:

- Consistent environment
- Easy onboarding
- Version consistency
- Isolation

---

# 16. Deployment Architecture

Future deployment architecture:

```
Internet

↓

Nginx

↓

React

↓

Express API

↓

PostgreSQL

↓

FastAPI

↓

OpenAI
```

Possible hosting:

- Vercel (Frontend)
- Render / Railway (Backend)
- AWS / Azure / GCP
- Docker VPS

---

# 17. Scalability Strategy

The system is designed for future scalability.

Potential improvements:

- Redis Caching
- Background Workers
- Object Storage
- Kubernetes
- Microservices
- Load Balancing
- Horizontal Scaling

---

# 18. Security Architecture

Security mechanisms include:

- JWT Authentication
- Password Hashing (bcrypt)
- Input Validation (Zod)
- SQL Injection Protection (Prisma)
- CORS
- Helmet
- Environment Variables
- Docker Isolation

---

# 19. Future Architecture

Future enhancements:

- Resume ATS Scoring
- AI Mock Interviews
- Resume Parser
- Notification Service
- Email Integration
- Mobile Application
- Multi-University Support
- Analytics Engine
- Placement Prediction
- Microservices Architecture

---

# Architecture Principles

The PlaceIntel architecture follows these principles:

- Separation of Concerns
- Single Responsibility Principle
- Layered Architecture
- Reusability
- Scalability
- Security by Design
- Maintainability
- AI-First Design
- Modular Development
- Containerized Deployment

---

# Conclusion

The architecture of PlaceIntel has been designed to support both current academic project requirements and future production-scale enhancements.

By separating the frontend, backend, AI service, and database into independent components while maintaining a shared monorepo structure, the system remains modular, maintainable, and scalable.

This architecture allows multiple developers to work independently, simplifies deployment through Docker, and provides a strong foundation for integrating advanced AI capabilities without affecting the core application.