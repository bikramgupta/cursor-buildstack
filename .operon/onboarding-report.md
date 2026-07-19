# Operon Onboarding Report — cursor-buildstack

This report inventories existing documentation and setup signals. It does not infer product truth from source code.

Gaps are onboarding guidance, not blockers unless `.operon/config.yaml` or `.operon/policy.yaml` says so.

## Documentation Inventory

### Product / overview

- README.md

### Architecture / decisions

- docs/ARCHITECTURE.md

### Specs / requirements

- docs/REQUIREMENTS.md

### Operations / runbook

- docs/RUNBOOK.md

### Agent / contributor docs

- AGENTS.md

### Testing / quality

- docs/TESTING.md
- package.json

## Missing Recommended Categories

- None detected

## Setup Signals

- Build: npm run build (package.json scripts.build)
- Test: npm run test (package.json scripts.test)
- Lint: npm run lint (package.json scripts.lint)
- CI: none detected
- Deploy hints: none detected
- GitHub remote: none detected

## Role Readiness Notes

- all (info): No role-specific onboarding gaps detected from the supplied answers and repo scan.

## Delegated Operator Authority

- App selection: inherit
- Effective version: delegated-operator/v1+app-inherit/v1
- Effective SHA-256: 21a90c97cc6bc6ac947dd7d3f8a9925a3bca70bd51979974b5fc2fc3eb9a6325

### Automatic

- ordinary reversible decisions
- local edits and tests
- branches, tickets, and normal PR preparation
- ordinary token spend within configured budgets

### Human-gated

- publication or deployment
- secrets and credentials
- cloud, DNS, or infrastructure changes
- irreversible data loss
- merge when human merge is required
- genuinely material product decisions
