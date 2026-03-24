# Strategic Review — 2026-03-24

## Executive Summary

This review analyses two input documents — the **Princess Cruises Mobile App RFP** and the **Pod Pitch Practice 3-3 Task Brief** — to define our prototype scope, pitch strategy, and execution plan. The core tension: the RFP describes a 12-month consulting engagement; we have **90 minutes** to deliver a prototype + pitch + demo that proves we understand the problem deeply and can deliver.

---

## 1. Document Analysis

### Task Brief (Pod Pitch Practice 3-3)

| Dimension | Detail |
|---|---|
| **Time** | 90 minutes total |
| **Deliverables** | Prototype (functional or simulated), Pitch (3–4 min), Demo (1 min walkthrough) |
| **Tools** | Gemini (research), UX Pilot (user flows), Replit (prototype) |
| **Evaluation** | Understanding (problem depth), Concept Strength (innovation + feasibility), Storytelling (narrative + demo impact) |
| **Pitch Structure** | 5 pillars: Problem Statement → Opportunity → Proposed Concept → User Journey → Prototype Demo |

### RFP — Princess Cruises Mobile App Transition

| Dimension | Detail |
|---|---|
| **Client** | Princess Cruise Lines (PCL), Carnival Corporation |
| **Scope** | End-to-end mobile app product development transition |
| **Timeline** | 12-week initial delivery, Year 1–3 roadmap |
| **Key Contacts** | Rosie Nwakanma (rnwakanma@carnival.com) |

**Five pillars of work from the RFP:**

1. **Transition Planning** — discovery, org assessment, DevOps continuity
2. **Platform & Technical Assessment** — architecture audit, API review, React Native vs Flutter evaluation
3. **Product & Experience Strategy** — competitor benchmarking, guest feedback analysis, usability fixes
4. **Roadmap Development** — Year 1 non-negotiables, Year 2–3 enhancements, KPI definition
5. **Team & Managed Services** — structure, skillset gaps, sourcing

**12-week technical deliverables:**

| Area | Key Deliverables |
|---|---|
| Tech Foundations | Codebase audit, architecture docs, environment setup |
| Analytics | Adobe Analytics/CDP instrumentation, KPI dashboards, baseline report |
| CMS | AEM assessment, content publishing workflow |
| Usability | Quick-win fixes (navigation, onboarding), feedback integration |
| Commerce | Pre-cruise sales integration, messaging platform |
| Team | Skillset sourcing, agile ceremonies, transition sessions |
| Compliance | Privacy review, WCAG 2.2 assessment, security fixes |

---

## 2. Strategic Assessment

### What the Evaluators Want to See

Based on the Task Brief's three evaluation dimensions:

| Dimension | What wins | How we demonstrate it |
|---|---|---|
| **Understanding** | Deep RFP analysis, not surface-level parroting | Show we identified the *real* pain — fragmented guest experience across pre-cruise/onboard/post-cruise, weak analytics, and commerce leakage |
| **Concept Strength** | Feasible, differentiated, innovative | AI-augmented app strategy + Medallion data activation (NPS uplift) — not just "we'll build an app" |
| **Storytelling** | Compelling narrative arc + demo impact | Guest persona journey from frustrating current state → transformed experience |

### The Real Problem (our thesis)

The RFP reveals several deeper issues beyond "improve the app":

1. **Fragmented guest journey** — pre-cruise booking, onboard navigation, and post-cruise engagement are disconnected experiences
2. **Underleveraged Medallion data** — PCL has wearable IoT data (Medallion) but isn't using it to personalize the app experience or drive NPS
3. **Commerce leakage** — web-based merchandising doesn't flow into mobile; pre-cruise upsell opportunities are missed
4. **Observability gap** — no real-time KPI dashboards; can't measure what they can't see
5. **Technical debt** — unclear architecture documentation, platform assessment needed (React Native vs Flutter vs native)

### Our Differentiator

**AI-augmented product development transition** — we don't just audit and document, we:
- Use AI to accelerate codebase assessment and architecture documentation
- Deploy analytics instrumentation with AI-powered anomaly detection
- Personalize the guest journey using Medallion data + ML models
- Demonstrate measurable impact (NPS, booking rate, app store ratings) from day one

---

## 3. Prototype Scope Recommendation

### Must-Have for Demo (fits in 90 min build + 1 min demo)

Focus on **one compelling guest journey** that touches multiple RFP requirements:

**Scenario: "Sarah's Pre-Cruise to Onboard Experience"**

| Screen | What it shows | RFP alignment |
|---|---|---|
| 1. **Home / Dashboard** | Personalized pre-cruise countdown, upcoming excursion recommendations | Product & Experience Strategy |
| 2. **Smart Itinerary** | AI-curated daily plan using Medallion preferences | Medallion data activation, Roadmap Year 2 |
| 3. **Commerce Hub** | Pre-cruise upsell (spa, dining, excursions) with personalized pricing | Commerce & Merchandising |
| 4. **Onboard Navigator** | Ship map with real-time wayfinding + accessibility mode | Usability, WCAG 2.2 compliance |
| 5. **Analytics Dashboard** (stakeholder view) | Real-time KPIs: bookings, NPS, engagement, app performance | Analytics & Performance Tracking |

### Nice-to-Have (if time permits)
- Push notification preview (messaging platform)
- CMS content preview (AEM workflow)
- Check-in flow optimization

### Out of Scope for Prototype
- Actual backend integration
- Authentication flows
- Full competitor benchmark (mention in pitch only)

---

## 4. Pitch Strategy (3–4 minutes)

### Recommended Structure

| Section | Time | Content |
|---|---|---|
| **Problem Statement** | 30s | "PCL's mobile app is the primary guest touchpoint — but today it's a collection of disconnected features, not a unified experience. Guests abandon pre-cruise bookings, struggle with onboard navigation, and PCL can't measure what matters." |
| **Opportunity** | 30s | "$X billion cruise industry, mobile is the control center. Medallion gives PCL a data advantage no competitor has — but only if the app activates it. Every 1-point NPS increase = $Y revenue impact." |
| **Proposed Concept** | 60s | "We propose a 3-phase approach: Phase 1 (12 weeks) — foundations, analytics, quick-win usability. Phase 2 — AI-personalized guest journey using Medallion data. Phase 3 — unified commerce + predictive engagement. Our differentiator: we use AI not just in the product but in the delivery — accelerating codebase assessment, automating test coverage, and generating architecture docs from day one." |
| **User Journey** | 45s | Walk through Sarah's journey: pre-cruise browsing → personalized recommendations → onboard wayfinding → post-trip engagement. Show pain points and how each screen solves them. |
| **Prototype Demo** | 60s | Live walkthrough of the 5 screens. End on the analytics dashboard — "And here's how PCL leadership sees the impact in real-time." |

---

## 5. Risks & Gaps

| Risk | Severity | Mitigation |
|---|---|---|
| **Scope creep** — trying to show too much in 90 min | High | Lock prototype to 5 screens max. Simulated data only. |
| **Tech stack indecision** — time lost choosing frameworks | High | Decide now: use Replit + React (fast prototyping, aligns with Task Brief tools). |
| **Shallow RFP understanding** — looks like we just summarized | Medium | Lead with insight ("the real problem is..."), not requirements echo. |
| **Demo failure** — prototype crashes during pitch | Medium | Record a backup video walkthrough. Have screenshots as fallback. |
| **Missing competitive context** — competitors' app capabilities | Low | Quick research on Carnival, Royal Caribbean, MSC apps for 2–3 comparison points. |

---

## 6. Recommended Execution Plan

### Phase 1: Inception (first 20 min)

1. **Finalize prototype scope** — confirm the 5-screen approach above
2. **Create GitHub issues** — one per screen + pitch deck + demo recording
3. **Assign work** — prototype screens can be parallelized

### Phase 2: Build (next 50 min)

| Track | Owner | Deliverable |
|---|---|---|
| Prototype screens 1–3 | Implementer A | Home, Itinerary, Commerce |
| Prototype screens 4–5 | Implementer B | Navigator, Analytics Dashboard |
| Pitch deck | Planner | 5-pillar narrative with speaker notes |
| Research | Spike | Competitor app comparison (3 data points) |

### Phase 3: Polish & Rehearse (final 20 min)

1. **Connect screens** — ensure navigation flow works end-to-end
2. **Rehearse pitch** — time it, cut anything over 4 minutes
3. **Record backup** — screen recording of the demo flow
4. **Final check** — does every screen map to an RFP requirement?

---

## 7. Recommended Next Actions (Prioritized)

| # | Action | Agent | Priority |
|---|---|---|---|
| 1 | Decide tech stack for prototype (recommend: React + Replit or Vite) | IC | Critical |
| 2 | Create epic + stories as GitHub issues for the 5-screen prototype | Planner | Critical |
| 3 | Create pitch deck outline with speaker notes | Planner | High |
| 4 | Research competitor apps (Carnival, Royal Caribbean, MSC) — 3 comparison points | Spike | High |
| 5 | Build Screen 1: Home/Dashboard with personalized pre-cruise experience | Implementer | High |
| 6 | Build Screen 5: Analytics Dashboard (most impressive for stakeholders) | Implementer | High |
| 7 | Build Screens 2–4: Itinerary, Commerce, Navigator | Implementer | Medium |
| 8 | Record backup demo video | Any | Medium |
| 9 | Rehearse and time the pitch | All | Medium |

---

## 8. Success Criteria

The pitch succeeds if:

- [ ] Evaluators say "they really understood the problem" (Understanding)
- [ ] The Medallion data / AI angle feels differentiated, not generic (Concept Strength)
- [ ] The demo flows naturally and the audience follows the guest journey (Storytelling)
- [ ] Every prototype screen maps to a specific RFP requirement
- [ ] The pitch stays under 4 minutes
- [ ] The demo stays under 1 minute

---

*Next review: after inception issues are filed and tech stack is decided.*
