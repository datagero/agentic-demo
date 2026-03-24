# Competitor Cruise App Research

**Purpose:** Inform Princess Cruises (PCL) mobile app differentiation strategy for the Thoughtworks RFP response.
**Date:** March 2026
**Issue:** Closes #12

---

## Overview Comparison Table

| Dimension | Carnival HUB | Royal Caribbean | MSC for Me |
|---|---|---|---|
| **App Store Rating (iOS)** | ~4.6 / 5 (170K+ ratings, Google Play) | **4.8 / 5 (1.2M+ ratings)** | 4.8 / 5 (62K ratings) |
| **Check-in** | In-app check-in; dining waitlist via app | eMuster (digital safety drill); stateroom digital key on newer ships | Pre-cruise check-in; ID scan + photo upload (crash-prone) |
| **Navigation / Maps** | Deck-by-deck interactive maps; searchable venue icons | Daily planner; activity bookmarks replacing print Cruise Compass | Interactive ship map; activity search and notifications |
| **Commerce** | Excursions, spa, drink packages; dining waitlist | Excursions, specialty dining, drink packages, photos, flights (Air2Sea), RoyalUp upgrade bidding | Activities, shore excursions, onboard spend tracking via cruise card |
| **Onboard Communication** | Paid chat add-on (~$5/device); no push notifications | **Free chat for all guests** (since 2023) | Free in-app chat without internet package |
| **AI / Personalization** | Aspirational — 100+ Gen AI pilots, only ~6 in production (2025); no in-app AI features shipped broadly | **Most advanced** — AI-generated hyper-personalized daily itineraries; Netflix-style dining/activity recommendations; predictive staffing | Virtual assistant onboard; basic activity recommendations; AI quality is poor (frequent wrong answers) |
| **Digital Key / Smart Room** | Not available | Digital key + room controls (lights, temp, curtains) on Odyssey/Icon of the Seas | Not available |
| **Offline / No Wi-Fi Use** | Core app works without internet package | Core features require connectivity; chat is free | Core app works without internet package |

---

## Per-App Detail

### 1. Carnival HUB

**Key Strengths**
- Deck-by-deck maps with searchable venues are highly rated — guests consistently call this the app's best feature.
- Dining waitlist integration (Your Time Dining check-in via app) removes front-desk queues.
- Pre-cruise booking (excursions, spa, packages) is well-established.
- No internet package required for core features.

**Key Weaknesses**
- Chat is a paid add-on with no push notifications — users must manually check the app for messages. This is a widely criticised design choice.
- Session management is poor: app resets login when switching to another app to retrieve a verification PIN.
- AI/personalization is entirely aspirational — CIO publicly confirmed a "measured approach" with very few pilots in production as of 2025.
- Performance degrades on slow ship Wi-Fi, which is common.

**AI / Personalization**
Minimal in production. Carnival's stated vision (connecting booking signals to recommendations, e.g., cooking excursion → wine tasting upsell) exists at the strategy layer but has not shipped in the HUB app at scale.

---

### 2. Royal Caribbean International App

**Key Strengths**
- Industry-leading AI: real-time hyper-personalised daily schedules generated from past cruise data and in-app behaviour. Netflix-style activity and dining recommendations.
- Digital key + smart room controls (lights, temperature, curtains) on Icon-class and Odyssey ships sets a hardware-software integration benchmark.
- Free onboard chat for all guests since 2023 — removes a competitor pain point entirely.
- RoyalUp stateroom upgrade bidding drives ancillary revenue directly through the app.
- Highest volume of ratings (1.2M+) signals the widest adoption in the cruise industry; bookings via app doubled year-on-year among loyalty members.
- eMuster digital safety drill streamlines embarkation day.

**Key Weaknesses**
- Reliability complaints persist: slow loads, frequent connection drops, messaging notifications arriving with no content.
- Multi-reservation navigation is cumbersome — guests managing multiple cabins or bookings struggle to switch contexts.
- Account balance / charges update slowly, causing pre-disembarkation anxiety.
- Smart room and digital key features are limited to the newest ships; older fleet lacks parity.

**AI / Personalization**
Most mature in the cruise industry. Personalised push notifications for deals and itinerary nudges, AI-driven wine pairing in dining, dynamic staffing prediction to reduce pool/theater wait times. This is the benchmark PCL must respond to.

---

### 3. MSC for Me

**Key Strengths**
- Free access without an internet package (same as Carnival) — guests appreciate not being forced into a Wi-Fi purchase.
- Pre-cruise check-in and activity pre-booking are integrated.
- Onboard spend tracking via cruise card pairing gives guests financial visibility.
- Free in-app messaging between guests.

**Key Weaknesses**
- Check-in experience is the most complained-about feature: ID scanning, photo uploads, and form data frequently fail or reset between sessions. Guest quotes describe it as a "rabbit hole."
- Virtual assistant gives factually incorrect answers — a significant trust and safety risk for a travel app.
- Navigation flow is described as "confusing and archaic" in reviews; repeated credential entry loops frustrate users.
- Smallest rating base (62K) among the three suggests lower adoption or engagement.
- No digital room key or smart room integration.

**AI / Personalization**
Surface-level only. Virtual assistant exists but is unreliable. No evidence of ML-driven personalization of itineraries or recommendations at the depth Royal Caribbean has achieved.

---

## Differentiation Opportunities for Princess Cruises

| Gap to Exploit | Why It Matters |
|---|---|
| **Reliable real-time messaging with push notifications** | All three competitors have meaningful gaps here (Carnival paid/no-push; RCL unreliable; MSC navigation issues). PCL can set the standard. |
| **Trustworthy AI assistant** | MSC's virtual assistant is actively hurting NPS. RCL's AI is back-end driven (recommendations), not conversational. A well-grounded LLM concierge for PCL is a genuine whitespace. |
| **Seamless check-in with resilient offline handling** | MSC's check-in failure is a brand risk. PCL should invest in a robust offline-first check-in flow with graceful error recovery. |
| **Fleet-wide digital key parity** | RCL's digital key is flagship-only. PCL could commit to fleet-wide rollout as a differentiator. |
| **Transparent onboard commerce with spend controls** | MSC's cruise card tracking is popular. PCL can go further with budget alerts, itemised receipts, and family spend management. |
| **Pre/post-cruise continuity** | No competitor strongly owns the post-cruise phase (photo access, loyalty, next-cruise inspiration). PCL has an opportunity to extend the app journey beyond disembarkation. |

---

*Sources: Apple App Store, Google Play Store, Royal Caribbean Blog, CruiseHive, Cruzely, Fortune (Carnival CIO interview), D2iQ Royal Caribbean case study, Digital Travel EU (RCL AI), appshunter.io (MSC reviews), MSC Cruises official site.*
