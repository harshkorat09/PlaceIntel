# 🤖 AI Chatbot & RAG Architecture

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Objectives
3. Why AI?
4. What is RAG?
5. High-Level Architecture
6. AI Technology Stack
7. Chatbot Workflow
8. Document Processing Pipeline
9. Embedding Generation
10. Vector Database
11. Semantic Search
12. Prompt Engineering
13. OpenAI Integration
14. API Endpoints
15. Security
16. Future Improvements
17. Best Practices

---

# 1. Introduction

The PlaceIntel AI Chatbot is designed to provide intelligent placement assistance to students.

Unlike traditional chatbots that rely on predefined answers, PlaceIntel uses Retrieval-Augmented Generation (RAG) to retrieve relevant placement information before generating responses.

The chatbot is capable of answering placement-related questions using structured placement data and uploaded placement documents.

---

# 2. Objectives

The chatbot should help students:

- Understand placement requirements.
- Search previous placement drives.
- Compare companies.
- Explain eligibility criteria.
- Recommend companies.
- Answer placement-related questions.
- Provide interview preparation guidance.

---

# 3. Why AI?

Traditional placement portals only display information.

Students still need to manually search documents.

Example

```
Student

↓

Search PDF

↓

Read Entire JD

↓

Find CGPA Requirement
```

PlaceIntel

```
Student

↓

Ask AI

↓

Instant Answer
```

---

# 4. What is RAG?

RAG stands for

Retrieval-Augmented Generation.

Instead of relying only on the language model,

the chatbot first retrieves relevant placement information from the database.

Workflow

```
Question

↓

Embedding

↓

Vector Search

↓

Relevant Chunks

↓

Prompt

↓

OpenAI

↓

Answer
```

---

# 5. High-Level Architecture

```
Student

↓

React

↓

Express API

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

---

# 6. AI Technology Stack

| Component | Technology |
|------------|------------|
| AI Service | FastAPI |
| Language | Python |
| Embedding Model | text-embedding-3-small |
| Chat Model | GPT-4o Mini |
| Vector Storage | pgvector |
| Database | PostgreSQL |
| API | OpenAI |

---

# 7. Chatbot Workflow

```
Student Question

↓

Frontend

↓

Express API

↓

FastAPI

↓

Generate Embedding

↓

Vector Similarity Search

↓

Relevant Placement Chunks

↓

Construct Prompt

↓

OpenAI

↓

Generate Response

↓

Return Answer
```

---

# 8. Document Processing Pipeline

Every uploaded placement document follows this process.

```
Upload PDF

↓

Extract Text

↓

Clean Text

↓

Split into Chunks

↓

Generate Embeddings

↓

Store in Database
```

Only processed documents are searchable.

---

# 9. Embedding Generation

Embeddings convert text into numerical vectors.

Example

```
Placement Description

↓

Embedding API

↓

1536-Dimensional Vector

↓

Store in PostgreSQL
```

These vectors enable semantic similarity search.

---

# 10. Vector Database

Embeddings are stored in PostgreSQL using the pgvector extension.

Table

```
PlacementChunk
```

Columns

```
chunkText

embedding

placementId
```

Each chunk is associated with a placement record.

---

# 11. Semantic Search

Instead of keyword matching,

semantic search compares meanings.

Example

Question

```
Which companies require React?
```

Even if the document contains

```
Frontend Development
```

the AI can still retrieve it because the embeddings are semantically similar.

---

# 12. Prompt Engineering

After retrieving relevant chunks,

the chatbot constructs a prompt.

Example

```
System Prompt

+

Relevant Placement Chunks

+

Student Question

↓

GPT-4o Mini

↓

Final Response
```

The chatbot should answer only using retrieved placement information whenever possible.

---

# 13. OpenAI Integration

Responsibilities

- Generate embeddings
- Generate answers
- Understand natural language
- Summarize placement documents

The API key is stored in `.env` and must never be committed to Git.

---

# 14. API Endpoints

## Chat

POST

```
/api/v1/chat
```

Request

```json
{
  "question": "Which companies allow students with 7.5 CGPA?"
}
```

Response

```json
{
  "success": true,
  "data": {
    "answer": "..."
  }
}
```

---

## Generate Embeddings

POST

```
/api/v1/embeddings
```

Admin only.

Used when new placement documents are uploaded.

---

# 15. Security

- API keys stored in environment variables.
- Input validation before processing.
- Authentication required for protected endpoints.
- Rate limiting (future enhancement).
- Never expose internal prompts.

---

# 16. Future Improvements

Future AI capabilities may include:

- Resume analysis
- ATS scoring
- Mock interviews
- Personalized preparation plans
- Placement prediction
- Resume-to-job matching
- Voice-based chatbot
- Conversation history
- Multi-language support

---

# 17. Best Practices

✔ Keep prompts concise.

✔ Use retrieved context before answering.

✔ Generate embeddings only when documents change.

✔ Avoid storing duplicate embeddings.

✔ Monitor API usage and costs.

✔ Validate every user input.

✔ Log errors without exposing sensitive data.

---

# RAG Workflow Summary

```
Placement PDF

↓

Extract Text

↓

Chunk Text

↓

Generate Embeddings

↓

Store in PostgreSQL

↓

Student Question

↓

Embedding

↓

Similarity Search

↓

Relevant Chunks

↓

OpenAI

↓

Final Answer
```

---

# AI Design Principles

The chatbot should:

- Be accurate.
- Prefer retrieved facts over assumptions.
- Provide concise, placement-focused answers.
- Avoid hallucinations by grounding responses in retrieved data.
- Scale as more placement documents are added.

---

# Conclusion

The PlaceIntel AI chatbot combines FastAPI, OpenAI, PostgreSQL, and pgvector to provide intelligent, context-aware placement assistance.

By using Retrieval-Augmented Generation, the chatbot delivers responses based on actual placement data rather than relying solely on the language model, making it more reliable, explainable, and scalable.