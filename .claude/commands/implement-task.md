---
description: Claim and implement a single GitHub issue
allowed-roles: implementer, implementer-complex
args: issue_number
---

# Implement Task #$ARGS

## Steps

1. **Read the issue** — `gh issue view $ARGS`
2. **Read context** — CLAUDE.md, ARCHITECTURE.md, relevant conventions
3. **Create branch** — `git checkout -b feat/#$ARGS-<short-description>`
4. **Implement** — write code satisfying all acceptance criteria
5. **Quality gates** — run linter and tests
6. **Commit** — `git commit` referencing `Closes #$ARGS`
7. **Push** — `git push -u origin <branch>`
8. **Create PR** — `gh pr create` with summary and test plan
9. **Hand off** — notify Verifier
