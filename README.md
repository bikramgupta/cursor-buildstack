# cursor-buildstack

The buildstacks.dev landing page, writing hub, and project showcase for agent-native infrastructure. It is an Astro static site based on the in-repo sources in `docs/design/`.

## Local development

Node 20 or newer is required.

```bash
npm install
npm run dev
```

Astro serves the local site at `http://localhost:4321`. Run the full quality gate before opening a pull request:

```bash
npm test
npm run lint
```

`npm test` type-checks the Astro project, builds the static site into `dist/`, and runs the site acceptance suite.

## Operon next steps

This milestone is merge-only. Deployment, CI/CD, nginx, Cloudflare, DNS, and secrets remain intentionally deferred to the deferred deploy milestone. When that milestone is approved, add the release mechanism to Operon through its human-ratified proposal workflow; do not edit `.operon/config.yaml` as part of ordinary feature work.
