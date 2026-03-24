---
description: Survey GitHub issues and propose dispatch assignments
allowed-roles: coordinator
---

# Triage Ready Work

## Steps

1. **Survey open issues** — `gh issue list --state open --limit 50`
2. **Categorize** by label and priority
3. **Check dependencies** — identify blocked vs ready issues
4. **Propose assignments**:
   - Map each ready issue to the appropriate agent role
   - Consider priority ordering
   - Flag any issues that need Planner decomposition
5. **Report** — summarize the triage with recommended dispatch order
