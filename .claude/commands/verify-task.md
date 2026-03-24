---
description: Verify a completed GitHub issue meets acceptance criteria
allowed-roles: verifier
args: issue_number
---

# Verify Task #$ARGS

## Steps

1. **Read the issue** — `gh issue view $ARGS` and note acceptance criteria
2. **Find the PR** — `gh pr list` and find the PR for this issue
3. **Review changes** — `gh pr diff <pr-number>`
4. **Run quality gates**:
   - Linter passes
   - Tests pass
   - No secrets in code
   - Files within size limits
5. **Check acceptance criteria** — verify each criterion
6. **Decision**:
   - **Pass** — `gh pr merge <pr-number>` and close the issue with a summary
   - **Fail** — comment on the issue with failure details and create a bug issue
