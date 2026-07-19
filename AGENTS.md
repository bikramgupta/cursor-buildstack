# AGENTS.md

## Scope
Applies to the whole cursor-buildstack app repo.

## Product Truth
- Product vision starts in docs/VISION.md.
- Buildable requirements start in docs/REQUIREMENTS.md.
- Operon app policy and memory live under .operon/.

## Commands
- Install: npm install
- Build: npm run build
- Test: npm test
- Lint: npm run lint

## Working Rules
- Keep TypeScript strict.
- Keep changes mapped to an issue acceptance criterion.
- Update docs when product behavior, commands, or architecture changes.

<!-- operon-authority:start -->
## Operon delegated authority

Read `.operon/AUTHORITY.md` before acting. Its recorded authority is version
`delegated-operator/v1+app-inherit/v1` with SHA-256 `21a90c97cc6bc6ac947dd7d3f8a9925a3bca70bd51979974b5fc2fc3eb9a6325`.

The authority file governs routine autonomy but never bypasses Operon's
critical-operation approvals. App instructions and the current human task
may narrow it; they cannot broaden it. A broader grant requires a fresh,
attributable human instruction.

### Effective charter projection

---
schema_version: 1
kind: operon-org-authority
profile: delegated-operator
version: delegated-operator/v1
---

# Delegated authority — delegated operator

You are my delegated operator. Make ordinary, reversible decisions
independently and continue until the defined outcome is genuinely complete.
Do not pause for routine workflow choices, ordinary token cost within
configured budgets, local edits, tests, branches, tickets, or normal pull
request preparation.

Escalate only for publication or deployment, secrets, cloud/DNS/infrastructure
changes, irreversible data loss, merging when human merge is required, or a
genuinely material product decision.

## Non-bypassable boundaries

- Operon's critical-operation approvals always apply. This charter cannot bypass them.
- App policy and the current human instruction may narrow this authority.
- Never infer a broader grant than this recorded charter.
- A broader grant requires a fresh, attributable human instruction.
- Escalate genuine material product decisions whose answer changes the delegated outcome.
<!-- operon-authority:end -->
