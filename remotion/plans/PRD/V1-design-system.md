# PRD: V1 — Design System & Motion Constants

**Status:** Implemented
**File:** `src/AgenticOps/design.ts`

## What Was Built

A centralized design system that eliminates all hardcoded visual values from scene files.

### Spacing Scale
`xs(4) → sm(8) → md(16) → lg(32) → xl(48) → xxl(80) → hero(120)`

### Typography Scale
`hero(120/800) → headline(58/700) → title(32/700) → body(22/400) → caption(15/400) → mono(17/400) → whisper(20/300)`

### Motion Vocabulary
| Name | Config | Use Case |
|------|--------|----------|
| `reveal` | `{ damping: 200 }` | Statements, headlines |
| `snap` | `{ damping: 20, stiffness: 200 }` | Data, clinical UI |
| `bounce` | `{ damping: 8 }` | Heartbeat emphasis |
| `heavy` | `{ damping: 15, stiffness: 80, mass: 2 }` | Counters, mechanical |

### Entrance Presets
- `enter(progress)` — translateY + opacity
- `enterScale(progress)` — scale + opacity
- `instant(progress)` — hard cut, no animation
- `breathe(frame)` — ambient orb pulsing
- `drift(frame)` — slow positional wandering

### Timing Constants
- `sceneLead: 15` — pause before first element
- `stagger: 20` — gap between elements
- `quickStagger: 8` — fast list stagger
- `dramaticPause: 45` — tension beats
- `enterDistance: 25` — standard translateY
- `softEnter: 12` — subtle entrance
