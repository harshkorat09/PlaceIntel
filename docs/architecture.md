# PlaceIntel architecture

The SRS-aligned runtime is intentionally split into four boundaries:

- `apps/web`: React + TypeScript student and administrator interface.
- `apps/api`: Express REST API for authentication, validation, placement CRUD, search, analytics, and Fit Score.
- `apps/chatbot`: FastAPI service for chunk retrieval and grounded LLM responses.
- PostgreSQL 15 + pgvector: relational placement data and chatbot embeddings in one database.

The browser talks only to the API. The API owns authorization and business rules, and calls the chatbot only for authenticated student questions. The chatbot must return a source notice or an explicit no-evidence response.
