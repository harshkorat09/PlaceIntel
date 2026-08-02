# Testing and quality

## Test layers

- **Unit:** Fit Score, eligibility, validation, pagination, and error mapping.
- **Integration:** API routes against disposable PostgreSQL and Prisma migrations.
- **Contract:** Shared request/response types and chatbot source response shape.
- **End-to-end:** Login, browse placements, admin publish, and student chat.
- **Retrieval evaluation:** Curated questions with expected evidence and unsupported-answer checks.

## Minimum scenarios

Test invalid login and expired token; students blocked from admin mutations; duplicate normalized records; missing optional placement fields; CGPA boundaries; oversized/malicious queries; unsafe attachments; and chatbot questions with relevant, ambiguous, and absent evidence.

```bash
pnpm lint
pnpm test
pnpm build
```

The current scaffold has limited tests. Add tests alongside each implementation phase.
