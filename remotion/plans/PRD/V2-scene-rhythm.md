# PRD: V2 — Scene Rhythm Overhaul

**Status:** Implemented

## Rhythm Profiles Applied

| Scene | Profile | Key Change |
|-------|---------|-----------|
| Intro | **Slow bloom** | 20-frame gaps between elements |
| Problem | **Pulse** | Risk words use `MOTION.bounce` — overshoot springs |
| Insight | **Cathedral** | Stripped to 2 elements only. 40-frame gap before punchline. No context line, no analogy. |
| Architecture | **Cascade** | Stats use `MOTION.heavy` (mechanical). Bars stagger at 6 frames (racing). |
| Gap | **Confrontation** | Headline is INSTANT — no spring. Data rows use `MOTION.snap` (clinical). |
| Until Now | **Silence** | NEW SCENE. 60 frames of black, then one word: "Until now." Pure black bg. |
| Pillars | **Measured** | 20-frame gaps between cards. Left-accent bars glow. |
| Magic Moment | **Theatrical** | TYPEWRITER effect on terminal command. Cursor blinks. Red screen flash on BLOCKED. |
| Policy | **Quiet confidence** | Numbers use `MOTION.heavy` for mechanical count-up. |
| Outro | **Stillness** | 40 frames before first word. Gradient SHIMMERS (angle rotates 125→195deg). |

## Transition Vocabulary

| Transition | Type | Duration | Why |
|-----------|------|----------|-----|
| Intro → Problem | Fade | 20 frames | Gentle |
| Problem → Insight | Fade | 20 frames | Building |
| Insight → Architecture | **Wipe from-left** | 15 frames | "We built something" — action shift |
| Architecture → Gap | Fade | 20 frames | Standard |
| Gap → Until Now | **Hard cut** | 8 frames | Jarring — tension peak |
| Until Now → Pillars | **Hard cut** | 8 frames | Release from silence |
| Pillars → Magic Moment | Fade | 20 frames | Building to climax |
| Magic Moment → Policy | Fade | 20 frames | Settling |
| Policy → Outro | Fade | 20 frames | Closing |
