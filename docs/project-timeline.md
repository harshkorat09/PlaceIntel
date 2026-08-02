# PlaceIntel project timeline

This is a dependency-aware delivery plan. Dates should be assigned after the team confirms capacity; the phase order is the important part.

| Phase | Deliverables | Exit criteria |
|---|---|---|
| 0. Foundation | Environment validation, Prisma migration workflow, shared error shape, module structure | A clean checkout starts the database and passes health checks |
| 1. Identity | Login, JWT middleware, role guard, password hashing | Student and admin access are independently verified |
| 2. Placement catalogue | Company, placement, skill, branch CRUD; validation; attachment metadata | Admin can publish, edit, archive, and inspect a placement |
| 3. Student discovery | Listing, search, filters, pagination, placement detail page | Student can locate a relevant opportunity |
| 4. Eligibility and Fit Score | Deterministic eligibility service, score explanation, profile updates | Same input always produces the same score and explanation |
| 5. Analytics | Counts, package summaries, branch/skill breakdowns, admin dashboard | Analytics match fixtures and documented definitions |
| 6. Chatbot ingestion | Text extraction, chunking, embeddings, retrieval, source metadata | Notice questions return evidence or an explicit no-evidence result |
| 7. Chatbot experience | API proxy, conversation UI, guardrails, source links | Authenticated student can ask and inspect a source |
| 8. Hardening | Integration tests, security review, logging, rate limits, backups | Release checklist and rollback runbook are complete |

## Suggested milestone slices

1. Vertical slice: login → list placements → placement detail.
2. Admin slice: create company and placement → attach notice → publish.
3. Decision-support slice: student profile → eligibility → explainable Fit Score.
4. Grounded AI slice: notice ingestion → retrieval → cited response.
5. Release slice: observability, security, testing, deployment, and runbook.

Any change to eligibility rules, score weights, public API fields, or document retention should update the relevant documentation and tests in the same change.
