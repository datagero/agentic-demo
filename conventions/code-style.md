# Code Style

## General

- Files must be ≤ 500 lines (soft limit), never > 800 (hard limit)
- Prefer composition over inheritance
- Keep functions focused — one responsibility per function
- No dead code — delete unused code rather than commenting it out

## TypeScript / JavaScript

- Use TypeScript strict mode
- Prefer `const` over `let`, never use `var`
- Use async/await over raw Promises
- Export types/interfaces from a shared contracts file

## Python

- Follow PEP 8
- Use type hints
- Use `ruff` for linting and formatting

## CSS / Styling

- Prefer utility-first CSS (Tailwind) or CSS modules
- No inline styles except for dynamic values
- Mobile-first responsive design
