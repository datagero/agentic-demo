# Agentic Ops Workspace — Strategic Review
**Date:** 2026-03-22
**Author:** Coordinator (Product Leader hat)
**Lens:** Full-spectrum — architecture, market, UX, AI capabilities, growth

---

## Executive Summary

Agentic Ops Workspace is architecturally complete but operationally asleep. Across 18 sprints, four epics, and 43/45 issues, the team built a 7-layer operations stack that — on paper — rivals enterprise-grade platforms: OPA-backed governance, Docker isolation, cost enforcement, persistent agent state, policy-aware dispatch, and compliance-ready Policy Packs. The engineering is real. The tests pass (271+). The TypeScript compiles clean.

But here is the uncomfortable truth: **not a single tool call has ever been blocked in production.** OPA has never run. The enforcement hooks exist but have never fired. The decisions endpoint returns empty. The platform built the plumbing for governance — then forgot to turn on the water.

This isn't a failure. It's a coiled spring. The biggest opportunity isn't building more features — it's **operationalizing what already exists** and proving the thesis: that agent governance is a product category, not an infrastructure checkbox. The first blocked tool call will be this platform's founding moment.

---

## The Story

### Act 1: The Observation

A developer running four Claude agents simultaneously noticed something alarming: any of them could `rm -rf /`, blow $500 on a single task, read `.env` files, or force-push to main — and nothing would stop them. Not the runtime. Not the platform. Not even a warning.

Cloud platforms solved this a decade ago. AWS has IAM. GCP has Organization Policies. Azure has Azure Policy. Every serious infrastructure platform ships with governance baked in.

Agent platforms? Zero. Agents run as local processes with full filesystem access, unlimited budgets, and no audit trail. The most powerful AI tools in history are deployed with less governance than a junior developer's first day.

### Act 2: The Build

The team didn't build an incremental improvement. They built a **category**.

Two sub-projects emerged:
- **obs-server** — a Python/Bash container orchestration platform that takes 10 lines of YAML and generates a complete, isolated Docker environment for each agent. 789 lines of generator code. 131 tests. Spec-driven, conflict-free port allocation, centralised logging via Alloy→Loki→Grafana.
- **agentic-ops** — a TypeScript monorepo that processes raw Claude session data into analytics, routes it through an OPA policy engine with 6 Rego rule types, and surfaces everything in a 13+ page React dashboard. 77+ API endpoints. 9 ADRs documenting every major decision.

The architecture isn't a prototype. It's a seven-layer stack:

| Layer | What it does |
|-------|-------------|
| Docker Isolation | `cap_drop: ALL`, read-only hook overlays |
| Container Orchestration | Spec-driven generation, lifecycle management |
| Observability | Alloy → Loki → Grafana, structured logging |
| Analytics & API | Session parsing, 77+ endpoints, daily snapshots |
| OPA Policy Engine | 6 Rego rule types, enforcement hooks |
| Governance Dashboard | Policy Packs, decision timeline, dispatch UI |
| Agent Coordination | 7 specialist roles, persistent state, smart dispatch |

Four epics shipped end-to-end:
1. **S1: Enforcement Loop** — OPA env vars, health checks, hooks, decisions endpoint
2. **S2: Persistent Agent State** — crash recovery in 60 seconds via `.agent-state/`
3. **S3: Policy-Aware Dispatch** — smart routing with substitution maps and rationale
4. **S13: Policy Packs** — one-click compliance bundles (SOC2, security, cost governance)

### Act 3: The Gap

And then — the story stalls. Not for lack of code. For lack of a single binary.

**OPA has never been downloaded.** The `setup-opa.sh` script exists but has never run. Every enforcement capability — the hooks, the decisions endpoint, the dispatch evaluator, the policy packs — is wired, tested, and waiting. But without OPA on port 8181, it's all theoretical.

Seven of thirteen core capabilities are **code-complete but operationally inert:**

| Capability | Code | Running |
|-----------|------|---------|
| OPA env vars in containers | ✅ | ✅ (logs "unreachable") |
| Enforcement hooks | ✅ | ❌ Never executed |
| Policy Packs API | ✅ | ✅ |
| Dispatch evaluator | ✅ | ❌ No OPA to evaluate |
| Decisions endpoint | ✅ | ❌ Returns empty |
| Agent state schema | ✅ | ❌ Never written |
| Compliance attestation | ❌ | ❌ |

This is the most important strategic finding: **the platform's value is locked behind a 15-minute operational task.**

### Act 4: The Opportunity

This is not a weakness. It's a narrative.

The first time an agent exceeds its budget and OPA blocks the next tool call — the first time an operator sees exactly what the agent was trying to do when it was stopped — that is the **magic moment**. Every line of code written in 18 sprints exists to create that moment.

And beyond that moment lies a category. Not agent orchestration (others do that). Not analytics (that's table stakes). **Agent operations** — the discipline of making AI agents reliable, governed, and trustworthy at scale.

---

## Platform Maturity Scorecard

| Dimension | Score | Key Finding |
|-----------|-------|-------------|
| Architecture | 4.5/5 | Seven-layer stack, 9 ADRs, clean separation. Only gap: OPA binary not deployed. |
| Product-Market Fit | 4.0/5 | Policy Packs are a genuine differentiator. No market validation yet. Single-user. |
| User Experience | 3.5/5 | 13+ dashboard pages, but split across two UIs. 5 CLI scripts. No unified onboarding. |
| AI/Agent Capabilities | 3.5/5 | 7-role agent team is a reference architecture. Persistent state ready. No autonomous coordinator yet. |
| Growth Readiness | 2.0/5 | Single-user, hardcoded paths, no auth/RBAC, no multi-tenant isolation. |
| Operational Readiness | 1.5/5 | **Critical gap.** OPA not running. No `opa test` in CI. No linting. No metrics. No startup reconciliation. |
| **Overall** | **3.2/5** | **Code-complete, operationally immature. One sprint from proving the thesis.** |

---

## Five Strategic Lenses

### 1. Architecture & Technical Foundation

**Strengths:**
- Clean package boundaries in the monorepo (7 packages, clear dependency graph)
- Spec-driven generation in obs-server eliminates config drift (10 lines YAML → 7 outputs)
- Typed error hierarchy with global middleware (6 error subclasses, request tracing)
- Cold-start non-blocking pattern (API serves stale snapshot instantly, refreshes async)
- OPA-first mandate with TypeScript fallback (ADR-004) is the right long-term bet

**Concerns:**
- **Two dashboards problem.** obs-server (:7700) and agentic-ops (:5173) are separate UIs. Operators context-switch between them. The R6 PRD (unified operational summary) addresses this but hasn't been built.
- **SQLite Delta DB (ADR-001) is still "Proposed."** The JSONL-parsing pipeline re-scans everything on cold start. This is fine for 100 sessions but will break at 10,000. The four-phase migration plan exists but hasn't started.
- **No metrics/monitoring for the platform itself.** Grafana is configured for agent container logs, but there's no dashboard for API server health, OPA latency, policy evaluation counts, or dashboard error rates.
- **Hardcoded paths in platform.yml.** `repos_dir`, `workspace_dir`, `container_dir` all point to one developer's machine. Not portable without refactoring.

**Technical Debt Inventory:**
1. `test_executable_bit` — 1 test failing in obs-server (pre-existing, env-dependent)
2. No ESLint/Prettier enforcement in CI (TypeScript compiles but style isn't gated)
3. No `opa test` step in either CI pipeline
4. Webhook HMAC verification exists but no integration test exercises it
5. Dashboard build warnings (unused imports, any types) not treated as errors

### 2. Product-Market Fit & Differentiation

**What makes this different:**
- **Policy Packs are the killer feature.** No other agent platform offers one-click governance bundles. SOC2 compliance as a checkbox — not a 6-month project — is a genuine differentiator. This is governance-as-a-product, not governance-as-infrastructure.
- **OPA-backed governance is composable and testable.** Rego rules can be versioned, shared, and audited — unlike hardcoded rule engines. This matters for enterprise adoption.
- **Docker isolation is table stakes but nobody else does it.** Gastown runs agents as local processes. This platform drops all capabilities and uses read-only overlays. Defense in depth.

**What's table stakes (not a differentiator):**
- Session analytics (every tool has this)
- Dashboard with charts (expected, not exciting)
- Container orchestration (Docker Compose wrapper — not novel)

**The magic moment:** An agent tries to `rm -rf /` and gets blocked. The operator sees exactly what happened, why it was blocked, and which policy caught it. This is the demo that wows.

**Shortest path to that demo:** Operationalize OPA (R1). Literally 4 issues, all Small, one sprint.

### 3. User Experience & Journey

**Current state:**
- **Onboarding:** Edit `platform.yml` with local paths → run `./app.sh start` → open two browser tabs. No guided setup, no first-run wizard.
- **Daily workflow:** Check obs-server (:7700) for container health → check agentic-ops (:5173) for analytics → manage policies in dashboard → run agents via CLI scripts.
- **Friction points:**
  1. Two dashboards (context switching)
  2. Five CLI scripts (app.sh, run-claude.sh, ctl.sh, generate.py, setup-opa.sh) with different invocation patterns
  3. No notification when a policy blocks something — you have to check the decisions panel
  4. No mobile/responsive design

**What a power user wants:**
- Single pane of glass (one dashboard, both systems)
- Push notifications on policy violations (Slack, email, webhook)
- Policy simulation mode ("what would happen if I applied this policy?")
- Cost forecasting ("at current burn rate, budget exhausts in X hours")

### 4. AI/Agent Capabilities

**What works today:**
- 7-role agent team is a genuine reference architecture (Coordinator, IC, Planner, Planner Helper, Implementer, Implementer Complex, Verifier, Witness)
- Cost-optimized model selection (Haiku for verification, Sonnet for implementation, Opus for architecture)
- Persistent state protocol enables crash recovery
- Dispatch evaluation enables smart routing

**What's imagined but not built:**
- **Autonomous Coordinator** — today the Coordinator is human-driven. An autonomous loop that triages, dispatches, and monitors without human intervention is H3 but transformative.
- **Graduated autonomy** — agents earn trust over time based on track record. Low-risk tasks run unattended; high-risk tasks require approval. This is the long game.
- **Cross-project learning** — an agent that performed well on Project A gets higher trust scores on similar Project B. No infrastructure for this exists.

**Non-obvious insight:** The agent team framework itself is the best validation of the platform's thesis. The team was built *using* the platform's governance model — cost-optimized roles, bounded scope, verification gates. If the framework works for building the platform, it works for any engineering team. **The team structure is the product demo.**

### 5. Growth & Ecosystem

**Current reality:** Single-user, single-machine, hardcoded paths. This is a personal tool, not a product.

**Multi-user readiness:** Zero. No auth, no RBAC, no tenant isolation. The API server has no authentication middleware. Anyone on the network can hit `:3000` and modify policies.

**What would unlock growth:**
1. **Auth + RBAC** — table stakes for any multi-user deployment
2. **Remote OPA** — centralized policy server for teams (not per-machine sidecar)
3. **Policy Pack marketplace** — organizations publish and share governance bundles
4. **Agent SDK** — an npm package that any Claude Code user can install to get governance without the full platform

---

## Opportunity Map

| # | Initiative | Impact | Feasibility | Strategic | Effort | Horizon |
|---|-----------|--------|-------------|-----------|--------|---------|
| R1 | **Operationalize OPA** | 5 | 5 | 5 | S | H1 |
| R2 | **First Blocked Tool Call (E2E demo)** | 5 | 5 | 5 | S | H1 |
| R3 | **Unified Dashboard** | 4 | 4 | 3 | M | H1 |
| R4 | **Compliance Attestation Reports** | 5 | 3 | 5 | M | H2 |
| R5 | **Push Notifications on Violations** | 4 | 4 | 3 | S | H2 |
| R6 | **Policy Simulation Mode** | 4 | 3 | 4 | M | H2 |
| R7 | **SQLite Delta DB (Phase 1)** | 3 | 3 | 2 | L | H2 |
| R8 | **Cost Forecasting & Budget Alerts** | 4 | 3 | 4 | M | H2 |
| R9 | **Auth + RBAC** | 3 | 3 | 4 | L | H3 |
| R10 | **Autonomous Coordinator** | 5 | 2 | 5 | XL | H3 |
| R11 | **Policy Pack Marketplace** | 4 | 2 | 5 | XL | H3 |
| R12 | **Graduated Autonomy Engine** | 5 | 2 | 5 | XL | H3 |

### Horizon Summary

**H1 (Now — next 2 sprints):** Turn on the lights. OPA runs. A tool call gets blocked. An operator sees it happen. One dashboard tells the whole story. This is the founding demo.

**H2 (Next — 3–6 sprints):** Make governance intelligent. Compliance reports generate automatically. Policy violations push to Slack. Operators can simulate policy changes before deploying them. The analytics pipeline scales beyond 1,000 sessions.

**H3 (Later — vision):** Make governance autonomous. Agents earn trust. The Coordinator dispatches without human input. Organizations share Policy Packs in a marketplace. The platform becomes the Kubernetes of agent operations.

---

## PRD: R1 — Operationalize OPA

### Problem Statement

The entire governance thesis — enforcement hooks, policy evaluation, dispatch routing, compliance evidence — depends on OPA running on port 8181. It has never run. 7 of 13 capabilities are code-complete but inert. Every conversation about this platform starts with "when OPA is running..." — it's time to make that true.

### Proposed Solution

Four atomic tasks that take OPA from absent to operational:

1. **setup-opa.sh** — Platform-aware binary download (darwin-arm64 / linux-amd64), checksum verification, install to `~/.local/bin/opa`.
2. **app.sh integration** — `start` command launches OPA with `--server --addr :8181`, loads `policies/agentic/`, health-checks before proceeding.
3. **Startup reconciliation** — On first boot, `POST /api/policies/sync-to-opa` pushes the JSON policy store into OPA's data namespace.
4. **CI gate** — Add `opa test policies/ -v` to both CI pipelines. Rego tests must pass to merge.

### Success Metrics

| Metric | Target |
|--------|--------|
| `./app.sh start` boots OPA | OPA health check passes within 5s |
| `curl localhost:8181/health` | Returns `{"status": "ok"}` |
| `opa test policies/ -v` in CI | All Rego tests pass |
| Container entrypoint log | Shows "OPA ✓ reachable" |
| Decisions endpoint | Returns non-empty after first policy evaluation |

### Key Risks

- **Binary portability:** OPA releases binaries per platform. `setup-opa.sh` must detect darwin-arm64 vs linux-amd64 correctly.
- **Port conflict:** Port 8181 may be in use. Fail with clear message, don't silently skip.
- **Policy sync ordering:** API server must wait for OPA to be healthy before syncing. Race condition if both start simultaneously.

### Dependencies

None. This is the dependency everything else is waiting for.

### Rough Scope

| Stream | Effort | Description |
|--------|--------|-------------|
| OPA binary setup script | S | Download, verify, install |
| app.sh lifecycle integration | S | Start/stop/health-check OPA |
| Startup policy sync | S | Push JSON store to OPA on boot |
| CI gate for Rego tests | S | Add `opa test` step to both pipelines |

---

## PRD: R2 — First Blocked Tool Call (E2E Demo)

### Problem Statement

The platform has never blocked a tool call. Until it does, the governance story is aspirational. The team needs a reproducible, demonstrable moment where: (1) an agent attempts a dangerous action, (2) OPA evaluates the policy, (3) the hook blocks the tool call, (4) the decision appears in the dashboard. This is the founding demo.

### Proposed Solution

A scripted E2E scenario that runs against a live stack:

1. **Ensure OPA is running** (depends on R1)
2. **Install `security-baseline` policy pack** via API
3. **Trigger a Claude agent session** in a test container
4. **Agent attempts `rm -rf /`** (or similar destructive command)
5. **`opa_enforce.sh` hook fires** → queries OPA → receives `{ allow: false, violations: [...] }`
6. **Hook blocks the tool call** → agent sees "blocked by policy" message
7. **Decision logged to `decisions.jsonl`** → streamed to dashboard
8. **Operator sees the blocked call** in the Decisions panel with timestamp, agent, tool, policy, and violation details

Package this as:
- A runbook in `docs/demo-enforcement.md`
- A shell script `scripts/demo-first-block.sh` that runs the whole sequence
- A 60-second screen recording showing the demo

### Success Metrics

| Metric | Target |
|--------|--------|
| Time from `./app.sh start` to first blocked call | < 120 seconds |
| Decisions panel shows blocked event | Within 5 seconds of block |
| Demo script is idempotent | Can run repeatedly without side effects |
| Screen recording exists | Shareable proof of concept |

### Key Risks

- **Hook execution environment:** `opa_enforce.sh` runs inside the container but must reach OPA on the host via `host.docker.internal:8181`. Network routing must be verified.
- **Fail-open default:** `OPA_ENFORCEMENT_MODE=permissive` means the hook warns but doesn't block. Demo must use `strict` mode.
- **Agent behavior:** Claude may not attempt a destructive command predictably. The demo should use a scripted test, not rely on agent behavior.

### Dependencies

- R1 (Operationalize OPA) must be complete

### Rough Scope

| Stream | Effort | Description |
|--------|--------|-------------|
| Demo script | S | Automated sequence: start stack, install pack, trigger block |
| Enforcement mode toggle | S | Ensure `strict` mode blocks (not just warns) |
| Demo runbook | S | Step-by-step guide for manual reproduction |
| Screen recording | S | 60-second video of the magic moment |

---

## PRD: R3 — Unified Dashboard

### Problem Statement

Operators context-switch between two browser tabs: obs-server (:7700) for container health and agentic-ops (:5173) for analytics and governance. This fractures the user experience and makes it impossible to correlate container events with policy decisions. An operator seeing a blocked tool call should also see the container's status, logs, and recent git activity — in the same view.

### Proposed Solution

Embed cross-cutting status into the agentic-ops dashboard (the richer UI) and add deep links to obs-server for container-specific operations:

1. **Platform Status Bar** — persistent top bar in the agentic-ops dashboard showing: OPA health (green/red), active containers (count + status dots), policy count, recent violations (last 5 min).
2. **Agent Cards with Container Context** — each agent's analytics page includes a mini-card showing container status, uptime, port, and a deep link to obs-server's container detail page.
3. **Unified Event Feed** — merge enforcement decisions and container events (start/stop/crash/health-check) into a single timeline. Both systems write to `decisions.jsonl` format.
4. **One-command start** — `./app.sh start` already does this, but add a "System Status" page at `/status` that shows the health of all services (API, OPA, Grafana, Loki, obs-server) with one-click restart buttons.

### Success Metrics

| Metric | Target |
|--------|--------|
| Time to understand system state | < 10 seconds (one page, not two) |
| Clicks to see blocked call + container status | ≤ 2 (from any page) |
| obs-server tab opens reduced | 50%+ reduction in context-switching |

### Key Risks

- **CORS / API routing:** agentic-ops dashboard needs to fetch from obs-server API (:7700). May need a proxy or CORS configuration.
- **Scope creep:** This is a "just enough" integration, not a full rewrite. Deep container management stays in obs-server.

### Dependencies

- None (can start in parallel with R1/R2, but more valuable after)

### Rough Scope

| Stream | Effort | Description |
|--------|--------|-------------|
| Platform Status Bar component | S | Top bar with OPA/container/policy status |
| Agent card container context | M | Fetch + display container state per agent |
| Unified event timeline | M | Merge decisions + container events |
| System Status page | S | Health overview with service cards |

---

## Creative Provocations

### 1. What if Policy Packs were the entire product?

Forget the dashboard. Forget the container orchestration. What if agentic-ops shipped as a single npm package — `npx agentic-ops init` — that drops a `.claude/hooks/` directory and an OPA sidecar into any Claude Code project? No monorepo. No Docker. Just governance. Policy Packs become distributable artifacts that any developer can install in 30 seconds. The platform becomes a package manager for agent governance — the "ESLint for AI agents."

**Why this matters:** The current platform requires adopting an entire infrastructure stack. Most developers won't do that. But most developers *would* install a hook that prevents `rm -rf /`. Start with the smallest useful thing, not the biggest impressive thing.

### 2. What if the platform governed itself?

The agent team (7 roles, 18 sprints, 43 issues) was built *using* the governance model the platform provides. But the governance was enforced by convention, not by the platform itself. What if the next sprint was built *under* live OPA enforcement? Every Implementer session runs with `security-baseline` and `cost-governance` packs active. Every budget breach, every destructive command attempt, every off-hours session gets caught.

**Why this matters:** The most convincing demo isn't a scripted test. It's the platform eating its own dog food. "We built the last 45 issues under policy enforcement, and here's what the audit trail looks like" is a story no competitor can tell.

### 3. What if governance was the onboarding?

New developers joining a team don't read CLAUDE.md. They don't check conventions. They run Claude and hope for the best. What if the first thing that happened when a new agent session started was a 30-second governance briefing? "You're running under the security-baseline pack. These commands are blocked: [...]. Your session budget is $20. Your audit trail is active." Not a warning. A welcome.

**Why this matters:** Governance is usually punitive — you find out about the rules when you break them. What if it was invitational? The agent tells you the boundaries *before* you hit them. This reframes governance from "the thing that blocks you" to "the thing that keeps you safe."

### 4. What if the compliance report wrote itself?

SOC2 auditors want evidence that controls are in place and working. Today, this means months of manual documentation. What if the platform generated a compliance report automatically? "From March 1–22, the security-baseline pack was active on 4 agents. 127 tool calls were evaluated. 3 were blocked. 0 were overridden. Mean evaluation latency: 12ms. Pack version: 1.0.0." Export as PDF. Send to auditor. Done.

**Why this matters:** Compliance is the pain point that opens enterprise budgets. If a CISO can point to an automatically generated report that proves agent governance is active, this platform becomes a line item on the security budget — the most defensible kind of revenue.

### 5. What if agents could negotiate their own governance?

An Implementer hits a budget limit mid-task. Today: blocked. The operator has to manually raise the limit. What if the agent could request a budget extension? "I've used $18 of my $20 budget. I estimate I need $5 more to complete this task. Here's why: [3 files remaining, tests not run yet]." The Coordinator (or a human) approves or denies in real-time. Policy becomes a conversation, not a wall.

**Why this matters:** Static governance is brittle. Dynamic governance — where agents can request exceptions with justification — is more realistic and more useful. It also generates richer audit data: not just "was blocked" but "requested extension because..." This is graduated autonomy in action.

---

## Recommended Next Steps

### Sprint 1 (This Week)

1. **R1: Operationalize OPA** — Download binary, integrate into `app.sh`, add CI gate. 4 Small issues. One day.
2. **R2: First Blocked Tool Call** — Write demo script, run under `strict` mode, capture screen recording. 4 Small issues. One day.
3. **Dog-food it** — Run the next sprint under live policy enforcement. Install `security-baseline` + `cost-governance` packs. See what breaks.

### Sprint 2 (Next Week)

4. **R3: Unified Dashboard** — Platform status bar + unified event feed. 4 issues (2S + 2M).
5. **R4: Compliance Attestation** — Generate first automated compliance report from pack install + enforcement data.

### Sprint 3 (Week After)

6. **Creative provocation test** — Prototype `npx agentic-ops init` as a standalone package. Validate whether governance-as-a-package resonates more than governance-as-a-platform.

---

*This review was produced by reading ARCHITECTURE.md (both sub-projects), all 9 ADRs, conventions/, product-wishlist.md, all 5 strategic plans, 3 PRDs, 7 agent definitions, CI/CD pipelines, test coverage patterns (271+ tests, 33 test files), and 40 commits of git history. Every claim is grounded in evidence from the codebase.*
