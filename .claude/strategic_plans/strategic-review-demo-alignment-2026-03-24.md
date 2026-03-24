# Strategic Review — Demo App ↔ Presentation Alignment

**Date:** 2026-03-24
**Scope:** Cross-reference our React prototype (`src/`) with the Cloud-PCL-Suite presentation (landing page, user journey, pain points) to identify gaps and recommend next actions.

---

## 1. Presentation Narrative vs. Demo App Mapping

The Cloud-PCL-Suite landing page presents a 6-section pitch flow: **Problem → Key Users → Opportunity → Journey → Prototype → Live Demo**. Here's how our current demo app aligns:

### Problem Section (Landing Page)

| Problem Identified | Our Demo Coverage | Gap? |
|---|---|---|
| No clear app ownership → Slow delivery | Not demo-able (process issue) | N/A — pitch narrative only |
| Weak analytics instrumentation → Blind to guest failures | **Analytics screen** — KPI cards, funnel, alerts | ✅ Covered |
| Fragmented CMS & AEM gaps → Stale content | **Not in demo** | ⚠️ Gap — Cloud-PCL-Suite has CMS screens (D1, D2) we don't |
| No commerce foundation → Revenue left onboard | **Commerce screen** — products, cart, Medallion pricing | ✅ Covered |
| Medallion data idle → NPS & spend unimproved | **Home + Itinerary** — AI recommendations, "For You" badges | ✅ Covered |

### Key Users (Landing Page)

| User | Represented in Demo? | Gap? |
|---|---|---|
| **The Guest** (primary) | ✅ All 5 screens are guest-facing | Covered |
| **PCL Operations** (internal) | ❌ No CMS/notification management screen | ⚠️ Missing |
| **Product & Engineering** | N/A — not demo-able | N/A |
| **PCL Executives** | ✅ Analytics dashboard is stakeholder view | Covered |

### Opportunity Section (Landing Page)

The presentation quantifies friction costs:

| Friction Category | Cost | Our Demo Response |
|---|---|---|
| Technical & Infrastructure (39%) | $2.2M | Error boundaries in demo (shows resilience) |
| Usability & UX / OceanReady (28%) | $525K | Navigator accessibility, clean UX |
| Connectivity & Performance (17%) | $483K | Not addressed (offline/PWA) |
| Hardware & IoT / Medallion (12%) | $1.1M | Medallion data shown in itinerary + commerce |
| Compliance & Accessibility (4%) | $1.5M | Navigator WCAG 2.2 toggle |

---

## 2. Journey Friction Points vs. Demo Screens

The landing page identifies specific friction per journey phase. Here's what our demo addresses:

### Pre-Cruise / OceanReady ⚠️ HIGH FRICTION
| Friction Point | Demo Coverage |
|---|---|
| Auth & Account Sync failures | ❌ Not shown |
| Family/Companion payment friction | ❌ Not shown |
| Profile "Internal errors" blocking OceanReady | ❌ Not shown |

**Our demo covers:** Pre-cruise home dashboard (countdown, recommendations) and commerce (pre-cruise booking). But **we don't show the OceanReady check-in flow** — a major friction point.

### Onboard Experience ⚠️ HIGH FRICTION
| Friction Point | Demo Coverage |
|---|---|
| iOS crashes disrupting MedallionClass workflows | ✅ Error boundaries show resilience |
| OceanNow content load failures / order failures | ❌ Not shown |
| Event Discovery — dated UI, no sorting/filtering | ✅ Itinerary has day selector, port toggle, AI badges |

### Shore Days
| Friction Point | Demo Coverage |
|---|---|
| Excursion state loss (filters/scroll reset) | ❌ Not shown (commerce has filters but no excursion booking detail) |

### Post-Cruise
| Friction Point | Demo Coverage |
|---|---|
| Profile errors blocking feedback | ❌ Not shown |

---

## 3. Cloud-PCL-Suite Prototype Spec vs. Our Demo

The Cloud-PCL-Suite spec describes a **14-screen prototype** across 4 modules. Our demo has **5 screens**. Gap analysis:

| Module | Cloud-PCL-Suite Screens | Our Demo | Status |
|---|---|---|---|
| **A: Onboard** | A1: Home Dashboard | ✅ Home screen | Aligned |
| | A2: Ship Navigation Map | ✅ Navigator screen | Aligned |
| | A3: Activity Schedule | ✅ Itinerary screen | Aligned |
| **B: Pre-Cruise** | B1: Pre-Cruise Hub | ⚠️ Partially (Home has countdown) | Gap |
| | B2: Shore Excursions | ⚠️ Partially (Commerce has products) | Gap |
| | B3: Dining Reservations | ❌ Missing | Gap |
| | B4: Cart & Checkout | ⚠️ Cart button exists, no checkout flow | Gap |
| **C: Analytics** | C1: Executive KPI Overview | ✅ Analytics screen | Aligned |
| | C2: Guest Journey Analytics | ❌ Missing (no drill-down) | Gap |
| **D: CMS** | D1: Content Manager Home | ❌ Missing entirely | Gap |
| | D2: Push Notification Composer | ❌ Missing entirely | Gap |

**Our demo covers 5 of 14 screens (36%).** The key gaps are:
1. **CMS/Content Management** — operations user story entirely missing
2. **Pre-Cruise Hub** as a dedicated experience (not just home)
3. **Cart & Checkout** end-to-end flow
4. **Journey Analytics** drill-down from KPI dashboard

---

## 4. Design System Alignment

| Aspect | Cloud-PCL-Suite | Our Demo | Gap? |
|---|---|---|---|
| Color scheme | Dark navy (#0A1628), teal/seafoam accents | Light (#F5F5F5), navy headers | ⚠️ Different aesthetic |
| Typography | Cormorant Garamond + DM Sans + DM Mono | Inter + Georgia | ⚠️ Different fonts |
| Phone frame | 390×844px with device chrome, rounded corners | 430px max-width, no device chrome | Minor |
| Icons | Phosphor Icons (line style) | Emoji placeholders | ⚠️ Different |
| Animations | Slide transitions with direction (forward/back) | Fade + slide up (200ms) | Minor |

**The visual language is different.** Cloud-PCL-Suite uses a premium dark theme; our demo uses a lighter Princess Cruises brand palette. If these need to feel like the same product, we need alignment.

---

## 5. Recommended Next Actions (Prioritized)

### Critical — Must align for pitch coherence

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | **Add CMS/Notifications screen** — even a simplified version shows we address the Operations user | Fills biggest user journey gap | Medium |
| 2 | **Add Guest Journey drill-down** from Analytics KPI card | Matches the "tap card → journey analytics" demo flow | Medium |
| 3 | **Link demo app from landing page** — the Cloud-PCL-Suite landing page should link to our React prototype | Seamless demo experience | Low |

### High — Improve pitch alignment

| # | Action | Impact | Effort |
|---|---|---|---|
| 4 | **Add OceanReady check-in screen** — even a progress tracker showing "3 of 5 steps complete" addresses the #1 pre-cruise friction | Directly addresses top pain point | Medium |
| 5 | **Switch to dark theme** to match Cloud-PCL-Suite design system | Visual consistency | Medium |
| 6 | **Replace emoji icons with Phosphor Icons** | Professional appearance | Low |

### Medium — Polish

| # | Action | Impact | Effort |
|---|---|---|---|
| 7 | Add cart checkout flow (even 2 steps) | Commerce story completeness | Medium |
| 8 | Add dining reservation screen | Pre-cruise module completeness | Medium |
| 9 | Match typography to Cormorant Garamond + DM Sans | Design system alignment | Low |

---

## 6. Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| **Two prototypes tell different stories** — Cloud-PCL-Suite and our React demo have different designs, different screens, different data | **High** | Decide: merge into one, or position them as complementary (landing = pitch, React = live demo) |
| **CMS gap undermines "we understand all users"** | **Medium** | Add even a simple CMS screen to show awareness |
| **Pre-cruise friction not addressed** | **Medium** | Add OceanReady progress tracker |
| **Design inconsistency looks uncoordinated** | **Medium** | Align color scheme or explicitly present as "two views" |

---

## 7. Recommendation

**Option A (Recommended): Complementary positioning**
- Cloud-PCL-Suite landing page = pitch narrative (Problem → Opportunity → Journey)
- Our React demo = interactive live demo (the "Live Demo" button on the landing page links to our app)
- Add 2-3 missing screens (CMS, Journey Analytics, OceanReady) to our demo to close the biggest gaps

**Option B: Full merge**
- Port all 14 screens from the Cloud-PCL-Suite spec into our React app
- Adopt the dark theme and Phosphor Icons
- Highest quality but highest effort

**I recommend Option A** — it lets both prototypes play to their strengths while the landing page provides the narrative wrapper. The key action is linking them together and closing the 3 biggest screen gaps.

---

*Next review: after CMS screen and journey analytics drill-down are implemented.*
