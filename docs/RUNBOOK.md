# Runbook - cursor-buildstack

## Local Start

```bash
npm install
npm start
```

## Quality Gates

```bash
npm test
npm run lint
```

## Operon Loop

After this repo is pushed and an `op:ready` issue exists, run from any
directory (Operon resolves the active org home):

```bash
operon loop --app cursor-buildstack --once
```
