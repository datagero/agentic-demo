# PRD: V3 — Animation Variety

**Status:** Implemented

## Signature Animation Per Scene

| Scene | Signature | Technique |
|-------|-----------|-----------|
| Intro | Slow bloom reveals | `MOTION.reveal` with wide stagger |
| Problem | **Bouncy heartbeat** | `MOTION.bounce` (damping: 8) — risk words overshoot |
| Insight | **Easing strikethrough** | `Easing.out(Easing.quad)` on red line draw |
| Architecture | **Heavy counter spin-up** | `MOTION.heavy` (mass: 2) — numbers feel mechanical |
| Gap | **Instant appear** | No spring — headline jumps to opacity 1 |
| Until Now | **Scale from 0.97** | Single word, barely scales, on pure black |
| Pillars | **Glowing accent bar** | Left border gets `boxShadow` with accent glow |
| Magic Moment | **Typewriter** | Characters appear at 0.7/frame with blinking cursor |
| Policy | **Heavy counter** | Reuses `MOTION.heavy` for rule numbers |
| Outro | **Gradient shimmer** | Gradient angle animates 125deg→195deg across scene |

## Motion Techniques Now In Use
- `spring()` with 4 different configs (reveal, snap, bounce, heavy)
- `Easing.out(Easing.quad)` for non-spring acceleration
- Typewriter (string slicing by frame)
- Instant appear (no animation, frame threshold)
- Gradient angle interpolation (shimmer)
- Screen flash (opacity spike + decay)
- Cursor blink (frame modulo)
