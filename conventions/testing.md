# Testing Conventions

## Test Structure

- Tests live alongside source files: `foo.ts` → `foo.test.ts`
- Or in a parallel `tests/` directory mirroring `src/` structure
- Name tests descriptively: `it("should display guest itinerary when logged in")`

## Test Types

| Type | Purpose | Speed |
|---|---|---|
| Unit | Individual functions/components | Fast |
| Integration | Component interactions, API routes | Medium |
| E2E | Full user flows | Slow |

## Rules

- Every new feature must include tests
- Tests must be deterministic — no flaky tests
- Mock external services, not internal modules
- Use fixtures for test data — never hardcode
