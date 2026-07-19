# Architecture - cursor-buildstack

## Current shape

- Astro renders a zero-JavaScript-by-default static site into `dist/`.
- `src/layouts/Base.astro` owns the shared document shell and composes `BaseHead`, `Header`, and `Footer`.
- `src/styles/tokens.css` is the canonical design-token source; `base.css` applies the shared visual system.
- Home and about routes live in `src/pages/`. Blog and project routes are deferred.
- Fontsource packages self-host the display, body, and utility typefaces in the build.

The configured MDX and sitemap integrations establish the static content foundation. `@astrojs/rss` is installed for the later feed route; RSS is a route-generation utility rather than an Astro config integration.
