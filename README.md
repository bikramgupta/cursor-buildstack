# cursor-buildstack

Cursor Buildstack: landing, blog, and project showcase for agent-native tooling — Astro static site per design docs in terra-org/docs/design

This repo was scaffolded by `operon new-app` as a greenfield product target.
It is intentionally small: product docs, a strict TypeScript web shell, tests,
and Operon bootstrap artifacts.

## Local Development

```bash
npm install
npm test
npm run lint
npm start
```

The local server builds the app and serves it at http://localhost:4173.

## Operon

- GitHub repo slug: `bikramgupta/cursor-buildstack`
- App charter: `.operon/TASTE.md`
- App registry entry: `.operon/config.yaml`
- Initial issue body: `.operon/bootstrap/initial-issue.md`
- Planner seed: `.operon/planning/0001-greenfield-seed.md`

After creating and pushing the private GitHub repo, create the initial issue
from `.operon/bootstrap/initial-issue.md` and label it `op:ready`.
