# 🚀 PlaceIntel

<div align="center">

![Status](https://img.shields.io/badge/Status-Under%20Development-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

### AI-Powered Placement Intelligence Platform

Helping students prepare smarter for campus placements through AI-driven insights, company analytics, resume matching, and intelligent career assistance.

</div>

---

# 📖 Table of Contents

- About the Project
- Problem Statement
- Objectives
- Key Features
- Technology Stack
- System Architecture
- Repository Structure
- Quick Start
- Development Workflow
- Documentation
- Team Members
- Future Scope
- License

---

# 📌 About the Project

PlaceIntel is an AI-powered Placement Intelligence Platform designed to modernize how students prepare for campus placements.

Instead of simply displaying placement notices, PlaceIntel acts as an intelligent assistant capable of:

- Organizing placement information
- Tracking company requirements
- Matching student skills with job requirements
- Providing AI-assisted placement guidance
- Offering resume-based recommendations
- Building a searchable placement knowledge base using Retrieval-Augmented Generation (RAG)

The platform combines traditional placement management with Artificial Intelligence to create a smarter and more personalized experience for students.

---

# ❗ Problem Statement

Many universities still manage placement information through static notices, spreadsheets, or basic web portals.

Students often struggle with:

- Finding relevant placement opportunities
- Understanding eligibility requirements
- Comparing companies
- Preparing according to required skills
- Tracking previous placement drives
- Receiving personalized guidance

Current systems rarely provide intelligent recommendations or AI-powered assistance.

---

# 🎯 Project Objectives

The primary objectives of PlaceIntel are:

- Centralize placement information
- Maintain structured placement data
- Provide role-based access
- Build an intelligent chatbot using RAG
- Recommend companies based on student profiles
- Enable advanced placement analytics
- Improve placement preparation

---

# ✨ Key Features

## Student Module

- Student Registration
- Login Authentication
- Profile Management
- Skills Management
- Resume Upload
- Eligibility Checking
- Placement Recommendations
- AI Chat Assistant

---

## Admin Module

- Dashboard
- Company Management
- Placement Management
- Student Management
- Skills Management
- Branch Management
- Resume Verification
- Analytics

---

## AI Module

- Resume Embedding
- Company Embedding
- Semantic Search
- Retrieval-Augmented Generation (RAG)
- Natural Language Queries
- Intelligent Recommendations

---

## Placement Module

- Company Listings
- Placement Drives
- Eligibility Criteria
- Required Skills
- Package Information
- Deadlines
- Placement History

---

# 🛠 Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

---

## Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Zod Validation

---

## Database

- PostgreSQL
- Prisma ORM
- pgvector

---

## AI

- Python
- FastAPI
- OpenAI API
- LangChain
- Vector Embeddings

---

## DevOps

- Docker
- Docker Compose
- GitHub
- pnpm Workspace

---

# 🏗 High-Level Architecture

```
                        +----------------------+
                        |      React Web       |
                        +----------+-----------+
                                   |
                                   |
                          REST API / JWT
                                   |
                      +------------+------------+
                      |      Express API        |
                      +------------+------------+
                                   |
                 +-----------------+------------------+
                 |                                    |
          PostgreSQL + Prisma                  FastAPI Chatbot
                 |                                    |
          Placement Database                  RAG + OpenAI
                 |                                    |
                 +-----------------+------------------+
                                   |
                              AI Responses
```

---

# 📂 Repository Structure

```
PlaceIntel/

├── apps/
│   ├── api/
│   ├── chatbot/
│   └── web/
│
├── packages/
│   ├── shared/
│   ├── ui/
│   ├── utils/
│   └── config/
│
├── prisma/
├── docker/
├── docs/
├── scripts/
├── uploads/
│
├── package.json
├── docker-compose.yml
├── pnpm-workspace.yaml
└── README.md
```

Detailed explanation is available in:

```
docs/PROJECT_STRUCTURE.md
```

---

# 🚀 Quick Start

Clone Repository

```bash
git clone https://github.com/<organization>/PlaceIntel.git

cd PlaceIntel
```

Install Dependencies

```bash
pnpm install
```

Start Docker

```bash
docker compose up -d
```

Generate Prisma Client

```bash
pnpm prisma generate
```

Run Development Servers

Frontend

```bash
pnpm --filter web dev
```

Backend

```bash
pnpm --filter api dev
```

---

# 🌳 Development Workflow

This project follows a **Git Feature Branch Workflow**.

Every new task must be developed in a **separate branch**.

Example:

```
week-3/database-schema

week-3/authentication

week-4/company-api

week-4/frontend-dashboard

week-5/chatbot-rag
```

Workflow:

```
develop
      │
      ▼
Create Feature Branch
      │
      ▼
Develop
      │
      ▼
Commit
      │
      ▼
Push
      │
      ▼
Pull Request
      │
      ▼
Merge into develop
```

Never develop directly on **main**.

---

# 📚 Documentation

Complete project documentation is available in the **docs/** directory.

| Document | Description |
|-----------|-------------|
| INITIAL_SETUP.md | First-time project setup |
| GIT_WORKFLOW.md | Git branching strategy |
| CODING_STANDARDS.md | Coding conventions |
| DATABASE_GUIDE.md | Database workflow |
| architecture.md | System architecture |
| api-contract.md | API specifications |
| chatbot-rag.md | AI documentation |
| development.md | Development guide |
| security.md | Security guidelines |
| testing.md | Testing strategy |

---

# 👥 Team

| Name | Responsibility |
|------|----------------|
| Harsh & Het | Backend • Database • Authentication • Frontend Development |
| Om | AI Chatbot & RAG  |

---

# 📅 Project Status

Current Phase

```
Week 3
```

Current Tasks

- Project Setup
- Git Workflow
- Docker Environment
- Database Design
- Prisma Integration

---

# 🚧 Future Scope

- Resume Analysis
- AI Mock Interview
- Placement Prediction
- Resume ATS Scoring
- Company Recommendation Engine
- Email Notifications
- Admin Analytics Dashboard
- Mobile Application
- Multi-University Support

---

# 🤝 Contributing

Please read

```
docs/contributing.md
```

before contributing.

---

# 📜 License

This project is developed as part of the **CHARUSAT Summer Internship Project**.

For academic purposes only.

---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

**Built with ❤️ by Team PlaceIntel**

</div>