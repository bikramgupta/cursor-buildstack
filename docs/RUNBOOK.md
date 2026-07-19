# Runbook - cursor-buildstack

## Local start

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm test
npm run lint
```

## Static build

`npm run build` writes the deployable site to `dist/`. Deployment is deferred to a later milestone; this repository currently declares no release command.

## Operon loop

With an `op:ready` issue available, run `operon loop --app cursor-buildstack --once` from any directory in the active organization.
