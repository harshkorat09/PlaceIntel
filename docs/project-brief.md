# PlaceIntel project brief

## Overview

PlaceIntel is a placement intelligence platform for CHARUSAT. It converts placement notices and related company information into structured, searchable opportunities. Students can discover relevant placements, understand eligibility, estimate fit, and ask questions whose answers are grounded in an uploaded notice. Administrators can maintain the placement catalogue and supporting documents.

## Problem

Placement information is often spread across notices, messages, attachments, and informal explanations. This makes it difficult to answer consistently which companies and roles are available, whether a student is eligible, what the deadline/package is, and where an answer came from.

## Users

### Student

Views placements, filters opportunities, maintains a lightweight profile, sees an explainable Fit Score, and asks grounded questions through the chatbot.

### Administrator

Creates and updates companies, placements, skills, branches, eligibility rules, and notice attachments. Admin actions must be authorized on the server.

## First-release scope

- JWT-based login with STUDENT and ADMIN roles.
- Company and placement CRUD for authorized administrators.
- Placement search and filters for students.
- Branch, CGPA, year, and skill eligibility checks.
- A transparent Fit Score with an explanation, not only a number.
- Basic placement statistics.
- Notice upload metadata and local development storage.
- Retrieval-grounded chatbot answers with a source notice or a no-evidence response.

## Out of scope for the first release

- Automatic job application submission.
- Scraping external portals without an approved data source and review process.
- A fully autonomous admission or hiring decision.
- Production object storage, advanced recommendation learning, and multi-university tenancy.

## Success criteria

An administrator can publish a placement with eligibility data and a notice, a student can find and evaluate it, and a chatbot answer can be traced back to the relevant notice chunk. Core actions have automated tests and structured errors.

## Current baseline

Implemented today: service scaffolding, health endpoints, Prisma schema, seed data for a few branches and skills, shared TypeScript response types, Docker Compose PostgreSQL with pgvector, and a starter web landing page. Business routes and the retrieval pipeline remain to be implemented.
