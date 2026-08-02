# Contributing to PlaceIntel

Read the relevant documentation and existing behavior before changing a module. Keep changes focused, update tests and docs together, and run lint, tests, and build for affected packages.

Use feature-oriented modules, keep business rules in testable services, keep HTTP concerns in routes/controllers, and put shared contracts in `packages/shared`.

For database changes, edit `prisma/schema.prisma`, generate a named migration, review the SQL, update seed data, and test clean-install and upgrade paths. Do not silently change the meaning or unit of an existing field.

If a change affects a public endpoint, data model, score calculation, chatbot evidence behavior, environment variable, or deployment step, update the corresponding file in `docs/`.
