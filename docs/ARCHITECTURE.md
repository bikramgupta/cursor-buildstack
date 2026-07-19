# Architecture - cursor-buildstack

## Current Shape

- Static HTML entry point served locally by `scripts/server.mjs`.
- Strict TypeScript domain code in `src/domain.ts`.
- Browser rendering in `src/client.ts`.
- Node built-in tests in `test/domain.test.ts`.

## Evolution

The first Planner pass should decide whether the product needs a backend,
database, auth, queue, or third-party integrations. Add those only when a ticket
has explicit acceptance criteria and matching gates.
