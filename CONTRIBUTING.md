# Contributing to PlaceIntel

## Branch policy

Use one branch for one focused task. Do not work directly on `main`.

```text
feature/auth-login
feature/placement-search
feature/chatbot-retrieval
fix/fit-score-boundary
docs/project-documentation
chore/ci-setup
```

Separate branches make changes easier to review, test, merge, and revert. Do not mix unrelated API, chatbot, UI, and database work in one branch.

## Start a new task

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/short-description
```

Use `develop` instead of `main` if the team has configured `develop` as the shared base branch.

## Pull the latest changes

For an existing feature branch:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch feature/short-description
git rebase main
```

Use `git merge main` instead of `git rebase main` if that is the team policy. Do not rebase a branch used by other people without agreement.

## Commit and push

```bash
git status
git diff --check
git add <files>
git commit -m "feat: add placement search"
git push -u origin feature/short-description
```

Use prefixes such as `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, and `db:`. Never commit `.env`, secrets, local databases, or build output.

## Pull request checklist

Open a PR from the feature branch into `main` and include:

- What changed and why.
- The related issue, requirement, or task.
- Tests and commands run.
- Database migration or environment-variable instructions.
- Screenshots for UI changes.
- Known limitations and follow-up work.

Before requesting review:

```bash
pnpm lint
pnpm test
pnpm build
```

Update the relevant module README and central documentation when behavior, API, database, environment, or deployment changes.

## Review and merge

Wait for required checks and approvals. Address review comments, rerun checks, and resolve conversations only after the issue is fixed. Prefer squash merge for a focused feature unless the project policy says otherwise.

## After merge

```bash
git switch main
git pull --ff-only origin main
git branch -d feature/short-description
git push origin --delete feature/short-description
```

Verify the PR was merged before deleting a branch. Do not use `git reset --hard` to fix normal synchronization issues.

## Conflict recovery

```bash
git status
git add <resolved-file>
git rebase --continue
```

Cancel an in-progress rebase with `git rebase --abort`.
