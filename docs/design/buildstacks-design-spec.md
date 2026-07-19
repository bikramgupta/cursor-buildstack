# buildstacks.dev — Design & Build Spec

A spec for a coding agent to build the buildstacks.dev site. It defines the stack, information architecture, design system, page layouts, content model, publishing workflow, and deployment. The companion file `buildstacks-prototype.html` is the visual reference — match its aesthetic.

---

## 1. What this is

buildstacks.dev is the landing page, blog, and project showcase for a solo founder building agent-native tooling for infrastructure, security, and availability. Priorities, in order:

1. **Fast** — top-percentile load times; ships near-zero JS on content pages.
2. **Clean & content-first** — calm, editorial, nothing flashy. Content quality is the product.
3. **Agent-maintainable** — publishing a post = an agent writes a markdown file, commits, CI deploys. GitHub is the source of truth.
4. **Extensible** — a clean path to real interactivity later (product demos, dashboards) without a rewrite.

The site is content today; it must not box in the interactive products that come later.

---

## 2. Stack: Astro (static site + separate services)

**Use Astro. Keep every content page static and served as flat files. The three server-flavored needs do *not* require server-rendering this site — post audio is generated at build time, the agent-ops page reads agent-published JSON, and the live demo is a separate sandboxed service (see §8b). Add an Astro server endpoint later only if you need to hide a key or proxy the demo. The products are separate services this site links to and calls — never web apps inside this repo.**

Rationale against the alternatives the founder was weighing:

- **vs. Next.js / React** — Next is the right tool for an *app* (auth, server actions, lots of client interactivity). For a content site it ships a React runtime to render static prose and forces a choice between running a Node server on the droplet (ops overhead) or static export (at which point Astro does the same job leaner). Keep Next in the back pocket for the actual products if they become full web apps. Astro still lets you drop React components in as islands — so React skills carry over and there's no lock-out.
- **vs. HTMX + a backend** — HTMX's superpower is server-rendered *dynamic* partial updates without a JS framework; it presumes a running backend (Go/FastAPI/Flask) generating HTML fragments per request. A landing page + blog + project pages are fundamentally static — there's nothing to fetch dynamically. HTMX would mean maintaining a server process to serve what should be flat files. It becomes interesting *inside* a product with server-driven UI, not for the marketing site.
- **vs. Hugo / 11ty / plain HTML** — genuinely fast and fine, but Go templates (Hugo) are less pleasant than JSX and the interactivity escape-hatch is worse. Astro gives the same static speed with a nicer authoring model and a clean upgrade path.

**Astro fits every stated constraint:** zero-JS-by-default (fastest content loads), Markdown/MDX **content collections** (blog posts and projects are just files in the repo — perfect for the agent workflow), file-based routing that maps to the path structure, React islands when interactivity is needed, and a `dist/` of static files that serves behind nginx + Cloudflare with no server to babysit.

Toolchain: Astro + `@astrojs/mdx` + `@astrojs/sitemap` + `@astrojs/rss`. Node 20+. Package manager: pnpm.

---

## 3. Information architecture

Path-based (not subdomains) for v1 — simpler DNS/TLS/deploy, one build, one repo. Revisit subdomains only if a product needs isolation.

```
/                     home — hero + trust ladder + latest writing + featured projects
/blog                 post index (reverse-chronological)
/blog/[slug]          a post
/projects             project index (cards)
/projects/[slug]      a project (detail + link out to GitHub)
/about                about me
/rss.xml              feed (generated)
/sitemap-index.xml    generated
```

Global nav: `blog` · `projects` · `about` · `github ↗`. Wordmark left, links right, all lowercase in mono.

---

## 4. Design system

The identity is **"engineered calm"**: clean systems paper, a monospace utility voice threading through everything, one confident signal-green accent, and the founder's actual thesis — the trust ladder — as the signature element. Deliberately *not* the warm-cream + serif + terracotta look (that palette reads as AI-default, and terracotta ≈ Claude's own accent).

### Tokens (centralize in `src/styles/tokens.css`)

```css
:root{
  --paper:#F5F6F5;      /* cool near-white, "clean systems" not "cozy cream" */
  --raise:#FBFCFB;      /* raised surfaces: cards, rungs */
  --ink:#14181A;        /* cool near-black */
  --muted:#5B6467;      /* secondary text */
  --faint:#8A9195;      /* metadata, eyebrows */
  --line:#E2E5E4;       /* hairline dividers/borders */
  --accent:#155C4E;     /* pine / "system healthy" green — the one bold choice */
  --accent-soft:#E4EFEA;/* accent tint: tags, selection */
}
@media (prefers-color-scheme:dark){
  :root{ --paper:#0E1213; --raise:#161B1C; --ink:#EAEEEC; --muted:#9AA3A2;
         --faint:#6B7473; --line:#242A2A; --accent:#4FBE9B; --accent-soft:#12251F; }
}
```

The accent is the whole risk — used only for links-on-hover, the active ladder rung, tags, and status. Keep everything else quiet.

### Type — three roles

| Role | Face | Use |
|---|---|---|
| Display | **Space Grotesk** (600) | h1, post/project titles. Tight, engineered, characterful. |
| Body | **IBM Plex Sans** (400/500) | prose, ledes. Humane but technical. |
| Utility | **IBM Plex Mono** (400/500) | eyebrows (`// writing`), dates, tags, nav, footer, ladder. The connective tissue. |

Mono-as-utility is the signature typographic move and grounds the site in the infra/dev world. Eyebrows read like code comments (`// section`). Dates render ISO (`2026-06-28`).

**Production:** self-host and subset these (via `@fontsource-variable/*` or Fontsource) — do **not** ship Google Fonts `<link>` in prod (the prototype uses the CDN only for preview). Limit to the weights above.

### Spacing, structure, motion
- Reading measure ~44rem; generous vertical rhythm; hairline rules between sections.
- Radius: 3px on cards/rungs (soft, product-y — not zero-radius broadsheet).
- Motion: minimal. Link underlines animate on hover; the trust ladder does one staggered reveal on load. Everything else is still. Respect `prefers-reduced-motion`.

### Components
`Header` (sticky, blurred, hairline base) · `TrustLadder` (signature; a real 3-step sequence, so the numbering is earned) · `PostRow` (mono date / display title / muted dek) · `ProjectCard` (title / one-liner / mono tags / `→ github`) · `Footer` (mark, links, mono copyright) · `BaseHead` (meta/OG/canonical).

### Quality floor
Responsive to 360px; visible `:focus-visible`; reduced-motion honored; dark mode via `prefers-color-scheme`; semantic HTML; alt text on the logo mark.

---

## 5. Page specs

**Home** — hero eyebrow (`// infrastructure for the agent-native era`), h1, one-line lede, two text-link CTAs. Below: the **trust ladder** signature. Then **Latest writing** (3 most recent posts + `all writing →`). Then **Projects** (featured cards). Then a one-paragraph **About** teaser + link. Match `buildstacks-prototype.html` exactly.

**/blog** — mono eyebrow, full reverse-chron `PostRow` list, no pagination until ~30 posts.

**/blog/[slug]** — centered prose column (~44rem). Title (display), mono date + reading time, then MDX body. Type scale for h2/h3, blockquotes, and fenced code (syntax highlighting via Shiki, a light+dark theme pair). Prev/next links at the foot. This is where "top-5% content" lives — typography must be excellent.

**/projects** — mono eyebrow + `ProjectCard` grid (2-up desktop, 1-up mobile).

**/projects/[slug]** — title, tagline, status, tags, prominent GitHub button, then MDX detail (what it is, why, how to try it). The page is context; the repo is the artifact.

**/about** — short, first-person, real. Founder story, what buildstacks is for, contact/GitHub.

---

## 6. Content model

Two collections. Publishing is: **create/edit a Markdown file → commit → CI deploys.** No CMS, no database.

`src/content/config.ts`:
```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),          // the dek shown in lists + meta
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.enum(['active','experimental','archived']).default('experimental'),
    tags: z.array(z.string()).default([]),
    repo: z.string().url(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
```

Example post — `src/content/blog/trust-ladder.md`:
```md
---
title: The trust ladder for autonomous ops
description: Why read-only comes before reversible, and reversible before autonomous.
pubDate: 2026-06-28
tags: [autonomy, trust, ops]
draft: false
---

Body in Markdown / MDX…
```

Example project — `src/content/projects/operon.md`:
```md
---
name: Operon
tagline: A multi-agent operating model for organizations.
status: active
tags: [multi-agent, orchestration]
repo: https://github.com/buildstacks/operon
featured: true
order: 1
---

What it is, why it exists, how to try it…
```

Lists filter out `draft: true` in prod; home shows the 3 newest posts and `featured` projects by `order`.

---

## 7. Repository structure

```
buildstacks/
├─ src/
│  ├─ components/  Header, Footer, TrustLadder, PostRow, ProjectCard, BaseHead
│  ├─ layouts/     Base.astro, Post.astro, Project.astro
│  ├─ pages/       index, blog/index, blog/[slug], projects/index,
│  │               projects/[slug], about, rss.xml.js
│  ├─ content/     blog/*.md(x), projects/*.md(x), config.ts
│  └─ styles/      tokens.css, base.css
├─ public/         favicon, og-default.png, fonts/ (self-hosted, subset)
├─ astro.config.mjs
├─ .github/workflows/deploy.yml
└─ package.json
```

---

## 8. Agent-driven publishing workflow

1. Agent (or you) writes/edits a Markdown file in `src/content/blog/` or `src/content/projects/` with valid frontmatter.
2. Commit to a branch → open PR. **CI runs a content check** (`astro check` + build) so bad frontmatter fails *before* merge — this is the guardrail that lets an agent publish safely (a read-only/reversible rung of your own trust ladder).
3. Merge to `main` → deploy workflow builds and ships.

Give the agent a short `CONTENT.md` in the repo: the frontmatter schema, slug rules (filename = slug, kebab-case), image path conventions, and "never touch `src/layouts` or `astro.config` in a content PR." That boundary is what makes agent commits low-consequence.

---

## 8b. Server-flavored capabilities (without server-rendering the site)

Needing compute is not the same as SSR-ing the site. Each of the three needs maps to a build step, a data file, or a separate service — the content pages stay static.

### A. Listen to a post (TTS) — build-time pipeline
- On publish, the agent pipeline calls a TTS API **once**, stores the MP3 in object storage (**Cloudflare R2** pairs cleanly with the Cloudflare edge), and records the URL + duration.
- The post page renders a small custom `<audio>` player (a client island).
- Regenerate audio only when the post body hash changes, so you don't re-bill on every edit.
- Why not on-demand: on-demand would regenerate the same audio every play — per-play cost + latency for zero benefit. Build-time is cheaper, faster, and CDN-cacheable.
- Frontmatter addition (optional): `audio: { src: string, durationSec: number }`.

### B. "How this blog runs" — agent-ops page from JSON
- Each agent emits a structured **run event** per action; append to a JSON log committed to the repo or pushed to R2.
- Event shape:
  ```json
  { "ts": "2026-07-09T10:22:00Z", "actor": "writer-agent",
    "action": "draft_post", "target": "trust-ladder.md",
    "reviewTier": "human-review", "status": "merged" }
  ```
- The page bakes the latest events at build time (instant first paint), and a client island **optionally fetches the live JSON** (static file or R2 URL) to refresh — "fresh as of the last run," no server.
- Visualization: keep it legible — a run timeline plus a simple agent/handoff diagram. This is dogfooding: the blog explaining its own operating model, on-brand with the trust ladder.

### C. Live product demo — separate sandboxed service
- This is the **only real backend**. Own repo, own deploy (container / droplet or serverless). It holds the secrets; the static site holds none.
- Project page "Open live demo" → loads a small client that calls the service (or embeds it via iframe). If the demo breaks, the marketing site doesn't notice.
- Contract: CORS locked to `buildstacks.dev`; per-session/IP rate limits; hard request timeouts; ephemeral sessions; a graceful "demo at capacity" empty-state (per the design system's failure-as-direction rule).
- Blast radius: demo failure never touches the site — your tiered-consequence model applied to your own infra.

---

## 9. CI/CD + deployment

**Target:** DigitalOcean droplet, nginx serving static files, Cloudflare in front.

Build in GitHub Actions, rsync `dist/` to the droplet. (No Node runs on the droplet — it only serves files.)

`.github/workflows/deploy.yml`:
```yaml
name: deploy
on:
  push: { branches: [main] }
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm astro check && pnpm build
      - name: Deploy to droplet
        uses: burnett01/rsync-deployments@7.0.2
        with:
          switches: -avzr --delete
          path: dist/
          remote_path: /var/www/buildstacks
          remote_host: ${{ secrets.DROPLET_HOST }}
          remote_user: ${{ secrets.DROPLET_USER }}
          remote_key: ${{ secrets.DROPLET_SSH_KEY }}
```

nginx (`/etc/nginx/sites-available/buildstacks`):
```nginx
server {
  listen 80;
  server_name buildstacks.dev;
  root /var/www/buildstacks;
  index index.html;

  # Cloudflare handles TLS at the edge (Full/Strict with an origin cert).
  location / { try_files $uri $uri/ $uri.html /404.html; }

  gzip on; gzip_types text/css application/javascript image/svg+xml;
  # brotli on; brotli_types ...;   # if the brotli module is available

  location ~* \.(css|js|woff2|svg|png|jpg|webp)$ {
    expires 1y; add_header Cache-Control "public, immutable";
  }
  location = /index.html { add_header Cache-Control "no-cache"; }
}
```

Cloudflare: proxied (orange-cloud) DNS → droplet IP; SSL/TLS **Full (Strict)** with a Cloudflare Origin Certificate on the droplet; cache static assets, bypass HTML or set a short edge TTL. This gives global CDN + TLS + DDoS in front of a tiny origin.

> Note for later: **Cloudflare Pages** would build+host this static site with zero droplet and near-identical speed. Sticking with the droplet is the right call if you want to co-host the products there or keep control of the origin — just know the simpler path exists if the droplet ever becomes a chore.

---

## 10. Performance & SEO checklist

- Lighthouse targets: 100 / 100 / 100 / 100 on the home + a post (realistic given static + zero-JS).
- Self-hosted, subset fonts; `font-display:swap`; no render-blocking JS.
- Per-page `<title>`, meta description (from frontmatter `description`), canonical URL.
- Open Graph + Twitter tags; a default `og-default.png` plus optional per-post OG.
- `sitemap` + `rss.xml` (via `@astrojs/rss` off the blog collection).
- Semantic headings; one `h1` per page; descriptive link text.

---

## 11. Build order (for the coding agent)

1. Scaffold Astro + MDX + sitemap + rss; add `tokens.css` / `base.css` and the three fonts (self-hosted).
2. `Base.astro` layout + `Header` + `Footer` + `BaseHead`.
3. Home page — port `buildstacks-prototype.html` into components (hero, `TrustLadder`, writing list, project cards, about teaser). This locks the design system.
4. Content collections + `config.ts`; seed 2–3 real posts and the two projects (Operon, Responsible Citizen).
5. `/blog` + `/blog/[slug]` with Shiki code highlighting and excellent prose typography.
6. `/projects` + `/projects/[slug]`; `/about`.
7. `rss.xml`, sitemap, OG image, favicon, 404.
8. `deploy.yml` + nginx + Cloudflare; first deploy.
9. `CONTENT.md` + PR content-check workflow (the agent guardrail).
10. Dynamic features (§8b), in order of leverage: audio pipeline + player → agent-ops JSON page → live-demo service contract (built in the demo's own repo).

---

## 12. Open decisions (founder's call)

- **Accent color** — pine-green `#155C4E` is proposed (reads "healthy/up," true to the availability domain, distinct from the AI-default clay). It's one token; swap freely.
- **Display face** — Space Grotesk proposed; Söhne / a tighter grotesk are fine swaps if you want less character.
- **Path vs subdomain** — spec'd as paths; subdomains only if a product needs isolation.
- **Dark mode** — included via `prefers-color-scheme`. Drop it if you'd rather ship light-only first.
- **Repo-as-CMS vs. a CMS** — spec'd as Markdown-in-repo (best for the agent flow + versioning). Only add a CMS if a non-technical author ever needs it.
