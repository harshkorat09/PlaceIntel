# Web implementation plan

## Responsibility

The React frontend provides student and administrator workflows. It communicates with the API and never connects directly to PostgreSQL.

## Current status

Implemented: Vite startup and starter landing page with links to placements and login.

## Planned pages

- Login
- Placement search and filtered list
- Placement detail and eligibility
- Student profile
- Fit Score explanation
- Admin company and placement management
- Analytics dashboard
- Grounded chatbot interface

## UI rules

Every page needs loading, empty, success, and error states. Admin controls in the UI improve usability but do not replace server authorization. Preserve keyboard navigation, readable contrast, and clear form validation.

## Verification

```bash
pnpm --filter @placeintel/web lint
pnpm --filter @placeintel/web test
pnpm --filter @placeintel/web build
```
