# Security and privacy

## Required controls

- Hash passwords with a modern adaptive algorithm; never store or return plaintext passwords.
- Keep JWT secrets and AI keys outside source control.
- Validate and authorize every mutation server-side.
- Rate-limit login and chat endpoints.
- Restrict CORS to known web origins outside development.
- Validate attachment MIME type and size; sanitize filenames and prevent path traversal.
- Use parameterized ORM queries.
- Redact tokens, passwords, student profiles, and notice contents from logs.

CGPA, branch, skills, email, and chat questions may be personal data. Collect only what is needed, define retention, restrict admin access, and provide correction/removal processes according to institutional policy.

Do not send unnecessary personal data to the model provider. Prompt injection inside a notice must not override application policy.

Before production, perform dependency scanning, authentication/authorization tests, upload abuse tests, secret scanning, and a backup-restore review.
