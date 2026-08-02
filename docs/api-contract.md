# API contract roadmap

Initial routes from the SRS:

`POST /api/login`, `GET|POST|PUT|DELETE /api/companies`, `GET|POST|PUT|DELETE /api/placements`, `GET /api/skills`, `GET /api/stats`, `GET /api/placements/:id/fit-score`, and `POST /api/chat`.

All protected routes should return structured errors with an error code, message, and optional field details. Admin writes require server-side role checks; hiding an action in the UI is not authorization.
