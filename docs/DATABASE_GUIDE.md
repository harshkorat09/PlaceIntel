# 🗄️ Database Guide

# PlaceIntel

Version: 1.0

---

# Table of Contents

1. Introduction
2. Database Goals
3. Why PostgreSQL?
4. Why Prisma ORM?
5. Why pgvector?
6. Database Architecture
7. Database Design Principles
8. Database Technology Stack
9. Database Folder Structure
10. Connection Architecture
11. Entity Overview
12. Relationship Overview
13. Database Naming Conventions
14. Schema Design Rules
15. Prisma Configuration
16. Development Workflow
17. Team Database Workflow

---

# 1. Introduction

The database is the foundation of the PlaceIntel platform.

Every module within the system depends on a properly designed and normalized database. Whether it is authentication, placement management, AI recommendations, resume analysis, or chatbot retrieval, all operations eventually interact with the database.

This document serves as the official guide for designing, modifying, maintaining, and extending the database.

Every developer working on the backend must follow this guide before making any schema changes.

---

# 2. Database Goals

The database has been designed with the following goals.

## Maintainability

The schema should be easy to understand and modify.

---

## Scalability

Support thousands of students and placement records without requiring structural changes.

---

## Performance

Queries should remain fast through proper indexing and normalization.

---

## Security

Sensitive information such as passwords must never be stored in plain text.

---

## AI Integration

The database must support vector embeddings required for Retrieval-Augmented Generation (RAG).

---

## Extensibility

Future modules such as Resume ATS Scoring, Mock Interviews, Placement Prediction, and Multi-University Support should be added without redesigning the database.

---

# 3. Why PostgreSQL?

PlaceIntel uses PostgreSQL as the primary relational database.

Reasons include:

- Open Source
- ACID Compliance
- Excellent Performance
- Strong Community Support
- JSON Support
- Full Transaction Support
- Advanced Indexing
- Mature Ecosystem
- Native Extension Support
- pgvector Compatibility

---

## Advantages

### ACID Transactions

Ensures data consistency.

Example:

Creating a Placement

↓

Uploading Documents

↓

Creating Embeddings

↓

Saving Skills

↓

Commit

If any step fails,

Everything rolls back automatically.

---

### Rich Data Types

PostgreSQL supports

- Integer
- Decimal
- Boolean
- Timestamp
- JSON
- Arrays
- UUID
- Vector (using pgvector)

---

### High Performance

Suitable for

- Placement Search
- Company Search
- Student Filtering
- Dashboard Analytics

---

# 4. Why Prisma ORM?

Instead of writing raw SQL queries, PlaceIntel uses Prisma ORM.

Advantages

- Type Safety
- Auto-generated Client
- Easy Migrations
- Excellent TypeScript Support
- Faster Development
- Better Maintainability

---

Example

Instead of

```sql
SELECT *
FROM User
WHERE email='abc@gmail.com';
```

We write

```ts
await prisma.user.findUnique({
    where:{
        email
    }
})
```

Benefits

- No SQL Injection
- IntelliSense
- Type Checking
- Cleaner Code

---

# 5. Why pgvector?

The chatbot uses Retrieval-Augmented Generation (RAG).

Traditional databases search exact text.

AI systems search semantic meaning.

For semantic search we need vectors.

pgvector stores embeddings inside PostgreSQL.

Example

Resume

↓

Embedding

↓

Vector

↓

Stored in PostgreSQL

↓

Similarity Search

↓

Relevant Placement Documents

---

Without pgvector

Only keyword search.

With pgvector

Semantic Search

Meaning-based Search

AI Recommendations

---

# 6. Database Architecture

```
                Express API

                      │

               Prisma ORM

                      │

          PostgreSQL + pgvector

                      │

         Placement Intelligence Data
```

Database responsibilities

- Authentication
- Student Data
- Company Data
- Placement Data
- Skills
- Branches
- Resume Metadata
- AI Embeddings

---

# 7. Database Design Principles

The PlaceIntel database follows the following principles.

---

## Principle 1

Normalization

The schema follows approximately Third Normal Form (3NF).

Avoid duplicate data.

Example

Company Name

Stored once

Referenced everywhere.

---

## Principle 2

Referential Integrity

Relationships use Foreign Keys.

Example

Placement

↓

Company

If Company is deleted

↓

Associated Placement handled according to relation rules.

---

## Principle 3

Single Source of Truth

Every entity owns its own data.

User table stores user information.

Company table stores company information.

Skill table stores skill information.

Never duplicate values unnecessarily.

---

## Principle 4

Scalable Relationships

Many-to-Many relationships use junction tables.

Example

Student

↓

StudentSkill

↓

Skill

---

## Principle 5

Audit Friendly

Every major table contains

```text
createdAt

updatedAt
```

These timestamps help

- debugging
- analytics
- reporting

---

# 8. Database Technology Stack

| Component | Technology |
|------------|------------|
| Database | PostgreSQL 15 |
| ORM | Prisma 7 |
| Vector Storage | pgvector |
| Migration | Prisma Migrate |
| Seed | Prisma Seed |
| Container | Docker |

---

# 9. Database Folder Structure

```
prisma/

schema.prisma

seed.ts

migrations/

README.md
```

---

## schema.prisma

Contains

- Models
- Relations
- Enums
- Indexes

---

## seed.ts

Contains initial data

Examples

- Branches
- Skills
- Admin User

---

## migrations/

Contains database migration history.

Never edit migration files manually.

---

# 10. Connection Architecture

```
React

↓

Express

↓

Prisma Client

↓

PostgreSQL

↓

pgvector
```

The frontend never connects directly to PostgreSQL.

Only the backend communicates with the database.

---

# 11. Entity Overview

Current entities include

User

Company

Placement

Skill

Branch

Attachment

PlacementChunk

PlacementSkill

PlacementBranch

StudentSkill

---

Entity Responsibilities

### User

Stores

- Student
- Admin

Authentication

Profile

CGPA

Branch

---

### Company

Stores

Company Information

Industry

Website

---

### Placement

Stores

Placement Drive

Eligibility

Salary

Description

Deadline

---

### Skill

Master table

Stores

All skills.

---

### Branch

Master table

Stores

Engineering branches.

---

### Attachment

Stores uploaded files.

---

### PlacementChunk

Stores vector embeddings.

Used by AI chatbot.

---

# 12. Relationship Overview

The database contains

One-to-One

One-to-Many

Many-to-Many

relationships.

---

User

↓

StudentSkill

↓

Skill

---

Placement

↓

PlacementSkill

↓

Skill

---

Placement

↓

PlacementBranch

↓

Branch

---

Company

↓

Placement

---

Placement

↓

Attachment

---

Placement

↓

PlacementChunk

---

# 13. Database Naming Conventions

Tables

Use Singular Names

✔ User

✔ Company

✔ Placement

Not

❌ Users

❌ Companies

---

Columns

camelCase

Examples

createdAt

updatedAt

passwordHash

branchId

companyId

---

Primary Key

Always

```
id
```

---

Foreign Keys

Use

```
tableNameId
```

Examples

companyId

placementId

branchId

studentId

---

Boolean

Start with

is

has

Examples

isActive

hasResume

---

# 14. Schema Design Rules

Every table should include

```prisma
id

createdAt

updatedAt
```

Whenever possible.

---

Passwords

Never store

```
password
```

Store

```
passwordHash
```

using bcrypt.

---

Emails

Always unique.

---

Relationships

Always use Prisma Relations.

Never manually maintain references.

---

# 15. Prisma Configuration

Main configuration

```
prisma/

schema.prisma
```

Generator

```prisma
generator client {

provider="prisma-client-js"

}
```

Datasource

```prisma
datasource db {

provider="postgresql"

}
```

Configuration file

```
prisma.config.ts
```

Contains

DATABASE_URL

Migration path

Schema location

---

# 16. Development Workflow

Whenever the schema changes

Step 1

Modify

```
schema.prisma
```

↓

Step 2

Generate Prisma Client

```bash
pnpm prisma generate
```

↓

Step 3

Create Migration

```bash
pnpm prisma migrate dev --name meaningful-name
```

↓

Step 4

Verify Database

↓

Step 5

Update Documentation

↓

Step 6

Commit

```
schema.prisma

migrations/
```

↓

Step 7

Push

---

# 17. Team Database Workflow

Every schema change affects the entire team.

Follow this process.

Developer A

↓

Modify Schema

↓

Generate Migration

↓

Commit

↓

Push

↓

Pull Request

↓

Merge

↓

Developer B

↓

git pull

↓

pnpm install

↓

pnpm prisma generate

↓

pnpm prisma migrate dev

↓

Database Updated

Never send SQL files manually.

Never manually recreate tables.

Never edit production database directly.

Always use Prisma migrations.

---

# Summary

The PlaceIntel database is designed to provide a scalable, secure, and maintainable foundation for the platform.

By combining PostgreSQL, Prisma ORM, Docker, and pgvector, the project benefits from strong relational modeling, modern developer tooling, and AI-ready vector storage.

Every schema modification should follow the documented workflow to ensure consistency across all development environments and future deployments.

# 18. Entity Relationship Details

This section explains every database entity and its purpose.

---

## User

The `User` table stores all authenticated users.

Current roles include:

- Student
- Admin

### Responsibilities

- Authentication
- Authorization
- Student Profile
- CGPA
- Branch Association

### Relationships

```
User

↓

StudentSkill

↓

Skill
```

```
Branch

↓

User
```

---

## Company

Stores company information.

Example

```
Google

Microsoft

Amazon

TCS
```

Attributes include

- Name
- Website
- Industry

One company can conduct multiple placement drives.

Relationship

```
Company

↓

Placement
```

---

## Placement

Represents a placement drive.

Example

```
Google SDE 2027

Microsoft Internship

Amazon ML Engineer
```

Contains

- Description
- Package
- Deadline
- Eligibility
- Required Skills

Relationships

```
Placement

↓

Attachment

↓

PlacementChunk

↓

PlacementSkill

↓

PlacementBranch
```

---

## Skill

Master table.

Stores all available skills.

Examples

```
React

Node.js

Java

Python

Docker

SQL
```

Never duplicate skills.

Always reference using IDs.

---

## Branch

Master table.

Examples

```
Computer Engineering

Information Technology

Artificial Intelligence

Electronics

Mechanical
```

Students belong to one branch.

Placements may allow multiple branches.

---

## StudentSkill

Junction table.

Represents

```
Student

↔

Skill
```

One student

↓

Many skills

One skill

↓

Many students

---

## PlacementSkill

Stores required skills.

Relationship

```
Placement

↓

PlacementSkill

↓

Skill
```

---

## PlacementBranch

Stores eligible branches.

Relationship

```
Placement

↓

PlacementBranch

↓

Branch
```

---

## Attachment

Stores uploaded documents.

Examples

- Job Description
- PPT
- Company Brochure

Only metadata is stored.

Actual files remain inside

```
uploads/
```

---

## PlacementChunk

Stores AI embeddings.

Contains

```
Chunk Text

Embedding Vector
```

Used only by AI.

---

# 19. Entity Relationship Summary

```
Branch
   │
   ▼
 User
   │
   ▼
StudentSkill
   ▲
   │
 Skill


Company
   │
   ▼
Placement
   │
   ├─────────────► Attachment
   │
   ├─────────────► PlacementChunk
   │
   ├─────────────► PlacementSkill
   │                   ▲
   │                   │
   │                Skill
   │
   └─────────────► PlacementBranch
                       ▲
                       │
                    Branch
```

---

# 20. Migration Strategy

Prisma Migrate is the only supported method for changing the database schema.

Never modify the database manually.

---

## Workflow

Modify schema

↓

Generate Client

↓

Create Migration

↓

Review

↓

Commit

↓

Push

---

Commands

```bash
pnpm prisma generate

pnpm prisma migrate dev --name meaningful-name
```

Examples

```bash
pnpm prisma migrate dev --name add-company

pnpm prisma migrate dev --name add-placement

pnpm prisma migrate dev --name add-auth
```

Migration names should describe the change.

---

## Migration Rules

✔ Every schema modification requires a migration.

✔ Commit migration files.

✔ Never edit migration SQL manually.

✔ Pull latest changes before creating migrations.

---

# 21. Seeding Strategy

Seeding inserts default data into the database.

Current seed data should include:

- Admin User
- Branches
- Skills
- Sample Companies
- Sample Placements

---

Run

```bash
pnpm prisma db seed
```

Whenever new master data is added.

---

# 22. Docker Database Workflow

Every developer has their own PostgreSQL container.

```
Harsh

↓

Docker

↓

PostgreSQL


Om

↓

Docker

↓

PostgreSQL


Het

↓

Docker

↓

PostgreSQL
```

Everyone has identical environments.

Nobody shares databases.

---

Start

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

---

# 23. Transactions

Use Prisma Transactions whenever multiple related operations occur.

Example

```
Create Placement

↓

Upload Attachment

↓

Generate Embedding

↓

Insert Chunk

↓

Commit
```

If any step fails

↓

Rollback

Example

```ts
await prisma.$transaction(async (tx) => {

});
```

Use transactions for

- Placement Creation
- Student Registration
- Resume Processing
- Bulk Imports

---

# 24. Indexing Strategy

Indexes improve query performance.

Current recommended indexes

```
email

companyId

placementId

year

deadline

branchId
```

Avoid unnecessary indexes.

They slow down inserts.

---

# 25. Performance Guidelines

Prefer

```
findUnique()
```

instead of

```
findMany()
```

when querying unique fields.

---

Select only required fields.

Example

Bad

```ts
findMany()
```

Good

```ts
findMany({

select:{

id:true,

name:true

}

})
```

---

Avoid

```
SELECT *
```

style queries.

---

Use pagination.

Never return thousands of rows.

---

# 26. Security Guidelines

Passwords

Always hash using bcrypt.

Never store plaintext passwords.

---

Use JWT.

---

Never expose

```
passwordHash
```

through APIs.

---

Validate all inputs.

---

Restrict admin endpoints.

---

Never trust client-side validation.

---

# 27. Backup Strategy

Development

No backup required.

Production

Daily database backups.

Keep

- Daily
- Weekly
- Monthly

backup snapshots.

Always test backup restoration.

---

# 28. Recovery Strategy

If migration fails

1.

Restore backup.

2.

Fix schema.

3.

Generate new migration.

Never modify production tables directly.

---

# 29. Team Workflow

Suppose Harsh adds

```
Company
```

Workflow

Harsh

↓

schema.prisma

↓

Migration

↓

Commit

↓

Push

↓

Pull Request

↓

Merge

↓

Om

↓

git pull

↓

pnpm install

↓

pnpm prisma generate

↓

pnpm prisma migrate dev

↓

Database Updated

Same for Het.

---

# 30. Common Mistakes

❌ Manual SQL

❌ Editing production tables

❌ Skipping migrations

❌ Not generating Prisma Client

❌ Forgetting seed updates

❌ Duplicate skills

❌ Duplicate companies

❌ Missing foreign keys

❌ Missing indexes

❌ Large migrations containing unrelated changes

---

# 31. Database Checklist

Before every Pull Request

☐ Schema validated

☐ Migration generated

☐ Prisma Client generated

☐ Seed updated (if required)

☐ Documentation updated

☐ Relations verified

☐ Indexes verified

☐ Tested locally

☐ Docker database working

☐ No raw SQL

---

# 32. Future Database Enhancements

Future versions may include

- Resume Table
- Interview Table
- Notification Table
- Email Queue
- Activity Logs
- Audit Logs
- Company Reviews
- Student Applications
- Placement Statistics
- Resume ATS Scores
- AI Conversation History
- Multi-University Support

The current schema has been designed to support these additions without requiring major structural changes.

---

# Database Philosophy

The PlaceIntel database should remain

✔ Normalized

✔ Scalable

✔ Secure

✔ Performant

✔ AI Ready

✔ Easy to Maintain

Every schema modification should improve the system without introducing unnecessary complexity.

Always prioritize clarity, consistency, and long-term maintainability over short-term convenience.

---

# Conclusion

The PlaceIntel database architecture provides a robust foundation for the platform by combining PostgreSQL, Prisma ORM, Docker, and pgvector. Following the standards defined in this guide ensures that every developer works consistently, database changes remain traceable through migrations, and the system is ready for future enhancements such as AI-powered recommendations, analytics, and multi-university support.

This document should be reviewed whenever a new database feature or schema change is introduced.