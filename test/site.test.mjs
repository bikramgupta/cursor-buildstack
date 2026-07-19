import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(path, "utf8");

test("site/package-and-integration-configuration", async () => {
  const pkg = JSON.parse(await read("package.json"));
  for (const name of ["astro", "@astrojs/mdx", "@astrojs/sitemap", "@astrojs/rss"]) assert.ok(pkg.dependencies[name]);
  const config = await read("astro.config.mjs");
  assert.match(config, /mdx\(\)/);
  assert.match(config, /sitemap\(\)/);
  assert.match(config, /site:\s*["']https:\/\/buildstacks\.dev/);
});

test("site/gate-script-contract", async () => {
  const pkg = JSON.parse(await read("package.json"));
  assert.match(pkg.scripts.test, /^astro check && astro build/);
  assert.ok(pkg.scripts.lint);
});

test("site/static-dist-build", async () => {
  await access("dist/index.html");
  await access("dist/about/index.html");
});

test("site/exact-design-token-contract", async () => {
  const css = await read("src/styles/tokens.css");
  for (const token of ["--paper:#F5F6F5", "--ink:#14181A", "--muted:#5B6467", "--line:#E2E5E4", "--accent:#155C4E"]) assert.ok(css.includes(token));
  assert.match(css, /@media\s*\(prefers-color-scheme:\s*dark\)[\s\S]*--accent:#4FBE9B/);
});

test("site/home-section-order", async () => {
  const source = await read("src/pages/index.astro");
  const sections = ["hero", "trust-ladder", "latest-writing", "projects", "about-teaser"].map((name) => source.indexOf(`data-section="${name}"`));
  assert.ok(sections.every((position) => position >= 0));
  assert.deepEqual(sections, [...sections].sort((a, b) => a - b));
});

test("site/home-hero-heading-contract", async () => {
  const html = await read("dist/index.html");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.match(html, /\/\/ infrastructure for the agent-native era/);
});

test("site/three-rung-trust-ladder", async () => {
  const html = await read("dist/index.html");
  assert.equal((html.match(/class="rung(?: here)?"/g) ?? []).length, 3);
  assert.match(html, /class="rung here"/);
});

test("site/shared-shell-component-usage", async () => {
  for (const page of ["src/pages/index.astro", "src/pages/about.astro"]) assert.match(await read(page), /import Base from/);
  const layout = await read("src/layouts/Base.astro");
  for (const component of ["BaseHead", "Header", "Footer"]) assert.match(layout, new RegExp(`<${component}`));
});

test("site/header-navigation-contract", async () => {
  const header = await read("src/components/Header.astro");
  assert.match(header, />blog<.*>projects<.*>about<.*>github</s);
});

test("site/about-route-and-shared-shell", async () => {
  const html = await read("dist/about/index.html");
  assert.match(html, /<header class="site">/);
  assert.match(html, /<footer class="site">/);
  assert.match(html, /<title>About — buildstacks<\/title>/);
});

test("site/single-h1-per-built-page", async () => {
  for (const page of ["dist/index.html", "dist/about/index.html"]) assert.equal(((await read(page)).match(/<h1(?:\s|>)/g) ?? []).length, 1);
});

test("site/accessibility-and-motion-floor", async () => {
  const header = await read("src/components/Header.astro");
  const css = await read("src/styles/base.css");
  assert.match(header, /aria-label="buildstacks home"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*no-preference\)/);
  assert.doesNotMatch(css.replace(/@media\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*/, ""), /animation\s*:/);
});

test("site/self-hosted-font-output", async () => {
  const output = `${await read("dist/index.html")}\n${await read("dist/about/index.html")}`;
  assert.doesNotMatch(output, /fonts\.(?:googleapis|gstatic)\.com/);
  assert.match(await read("src/layouts/Base.astro"), /@fontsource\//);
});

test("site/placeholder-scaffold-removed", async () => {
  for (const path of ["index.html", "styles.css", "src/domain.ts", "src/client.ts", "scripts/lint.mjs", "scripts/server.mjs", "test/domain.test.ts"]) {
    await assert.rejects(access(path));
  }
});

test("site/readme-local-setup-and-deploy-next-steps", async () => {
  const readme = await read("README.md");
  for (const command of ["npm install", "npm run dev", "npm test"]) assert.match(readme, new RegExp(command));
  assert.match(readme, /deferred deploy milestone/i);
});
