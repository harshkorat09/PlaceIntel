# PlaceIntel requirements

## Functional requirements

### Authentication and authorization

Authenticate users, hash passwords, issue expiring JWTs, and distinguish student/admin permissions. Unauthorized users must not access protected data or mutation routes.

### Placement management

Admins create companies and placements, associate branches and skills, record CGPA/package/deadline fields, and upload or reference source notices.

### Search and eligibility

Students search by company, role, skill, branch, package, and deadline. Eligibility uses explicit profile and placement inputs and identifies unmet conditions.

### Fit Score

The score is deterministic, bounded, explainable, and versioned when weights change. It is decision support, not a hiring decision.

### Analytics

Admin analytics state their time window and population. Aggregates are reproducible from stored records and covered by fixture-based tests.

### Chatbot

The chatbot retrieves from approved placement notice content, avoids unsupported claims, and returns source metadata or a clear no-evidence response.

## Non-functional requirements

- TypeScript strict mode for web/API code.
- Input validation and structured errors at every public API boundary.
- Passwords, tokens, and AI keys never appear in logs.
- Pagination and bounded query sizes for list endpoints.
- Health checks for API, chatbot, and database dependencies.
- Automated lint, type-check, unit, and integration checks in CI.
- UTC timestamps and documented data retention.
- Accessible UI basics: keyboard navigation, readable contrast, and useful empty/error states.

## Acceptance checklist

- A clean checkout can be configured from `.env.example`.
- The database can be migrated and seeded without manual SQL edits.
- A student can log in, browse, filter, and inspect a placement.
- An admin can publish a placement and attach its notice.
- Eligibility and Fit Score outputs include explanations.
- Chatbot responses identify evidence or decline to answer.
