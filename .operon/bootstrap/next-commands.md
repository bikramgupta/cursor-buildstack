# Next Commands

Run these from the generated app repo after reviewing the scaffold.

```bash
git init
git add .
git commit -m "Bootstrap cursor-buildstack"
gh repo create bikramgupta/cursor-buildstack --private --source . --remote origin --push
gh issue create --repo bikramgupta/cursor-buildstack --title "Build first usable product slice" --label op:ready --label p2 --body-file .operon/bootstrap/initial-issue.md
```

Then run these from any directory:

```bash
operon plan cursor-buildstack --topic "Refine the greenfield PRD and decompose the first milestone" --workdir /Users/bikram/Build/cursor-buildstack
operon loop --app cursor-buildstack --once
```
