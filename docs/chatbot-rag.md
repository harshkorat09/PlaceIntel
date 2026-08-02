# Chatbot and retrieval design

## Goal

Answer student questions about approved placement notices with evidence. Prefer a safe no-evidence response over an invented requirement, deadline, package, or eligibility rule.

## Proposed pipeline

```text
Attachment upload -> text extraction -> chunks linked to Placement
  -> embeddings in PostgreSQL/pgvector -> top-k retrieval
  -> grounded model prompt -> answer + source notice/chunk metadata
```

## Responsibilities

- The API authenticates the student and decides which placement data is visible.
- The chatbot receives a bounded question and approved context, or retrieves through a controlled database connection.
- Retrieval applies placement/status filters before similarity ranking.
- The answer layer distinguishes facts from uncertainty and returns source metadata.

## Response contract

Return `answer`, `source_notice`, and preferably source chunks with placement ID, attachment ID, and relevance score. If no sufficiently relevant evidence is found, return `source_notice: null` and explain that the notice does not provide the answer.

## Controls

- Treat uploaded documents and retrieved text as untrusted content, not instructions.
- Limit context size and question length.
- Do not expose private user data or internal file paths.
- Store model, embedding, and prompt versions for reproducibility.
- Evaluate retrieval recall and unsupported-answer rate with a curated question set.
