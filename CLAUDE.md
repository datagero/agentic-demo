# Princess Cruises Mobile App — Agentic Demo

Shared foundation for all agents working in this repository.

## Project Overview

This project is an **RFP response and prototype demo** for Princess Cruises (PCL) Mobile App Product Development Transition. The goal is to produce a functional prototype, a compelling pitch (3–4 min), and a 1-minute demo walkthrough.

**Core Problem:** PCL's mobile app needs a strategic partner to drive transition planning, platform assessment, product strategy, and technical foundations for a best-in-class cruise guest experience.

**Key Users:** Cruise guests (pre-cruise, onboard, post-cruise), PCL product/engineering stakeholders, PCL leadership evaluating the RFP response.

**Opportunity:** Deliver an AI-augmented mobile app strategy that addresses navigation, commerce, analytics, CMS, compliance, and guest experience — demonstrating Thoughtworks' ability to modernize the app with measurable outcomes.

## Repo Layout

```
.                           — workspace root
├── CLAUDE.md               — this file (agentic context)
├── ARCHITECTURE.md         — living system design doc
├── .claude/                — agentic profiles, commands, settings
│   ├── settings.json       — permissions and env config
│   ├── agents/             — agent role definitions
│   └── commands/           — custom slash commands
├── conventions/            — naming, code style, testing, API design
│   └── adrs/               — architecture decision records
├── docs/                   — RFP analysis, pitch deck, research
├── src/                    — application source code (TBD)
└── tests/                  — test suites (TBD)
```

## Issue Tracking

We use **GitHub Issues** for all task tracking. Every piece of work must have an issue before implementation begins.

### Label Taxonomy

| Label | Purpose |
|---|---|
| `epic` | Large feature or initiative |
| `story` | User-visible deliverable |
| `task` | Technical work item |
| `bug` | Defect |
| `spike` | Research / time-boxed exploration |
| `blocked` | Waiting on external dependency |
| `priority:critical` | Must be done immediately |
| `priority:high` | Current sprint |
| `priority:medium` | Next sprint |
| `priority:low` | Backlog |

### Issue Conventions

- Title format: `[area] Short description` (e.g., `[prototype] Set up React Native scaffold`)
- Every issue must have acceptance criteria in the body
- Reference related issues with `Relates to #N` or `Blocks #N`
- Close issues via commit message: `Closes #N`

## Quick Start

```bash
# Clone and set up
git clone https://github.com/datagero/agentic-demo.git
cd agentic-demo

# Install dependencies (TBD based on tech stack selection)
# npm install / uv sync / etc.
```

## Agent Team Roles

| Role | Model | When to use |
|---|---|---|
| **Coordinator** | default | Orchestrates — dispatch-first, no app code |
| **IC** | opus | Persistent per-goal reasoning brain; resume via agent ID |
| **Planner** | opus | Decompose goal → GitHub issues |
| **Planner Helper** | sonnet | Codebase summaries, PR mechanics |
| **Implementer** | sonnet | Bounded code change per GitHub issue |
| **Implementer Complex** | opus | Last resort — non-decomposable tasks only |
| **Verifier** | haiku | Run gates, close or re-file |
| **Witness** | haiku | Stale issue alerts, PR CI monitoring, post-merge cleanup |

## Commands

| Command | Role | Purpose |
|---|---|---|
| `/triage-ready-work` | Coordinator | Survey GitHub issues, propose dispatch assignments |
| `/implement-task <id>` | Implementer | Claim, implement, hand off |
| `/verify-task <id>` | Verifier | Run gates, close or re-file |
| `/handoff-session` | Any role | Push sequence + handoff note |
| `/inception` | Planner | Analyse RFP, generate epics and stories |

## Quality Gates

Before any PR is merged:

1. **Lint** — code passes project linter (TBD)
2. **Tests** — all tests pass
3. **Review** — at least one approval
4. **No secrets** — no `.env`, credentials, or API keys committed

## Non-Negotiable Rules

1. Every code change requires a GitHub issue first
2. One commit per issue (squash if needed)
3. Files must stay ≤ 500 lines (soft limit), never > 800 (hard limit)
4. No direct pushes to `main` — all changes via PR
5. ARCHITECTURE.md must be updated when system design changes
6. Never commit secrets or credentials
