import assert from "node:assert/strict";
import test from "node:test";
import { openWorkItems, productGoal, starterProductAreas, summarizeGoal } from "../src/domain.js";

test("product goal is preserved", () => {
  assert.equal(productGoal, "Cursor Buildstack: landing, blog, and project showcase for agent-native tooling — Astro static site per design docs in terra-org/docs/design");
});

test("starter areas are actionable", () => {
  assert.equal(starterProductAreas.length, 3);
  assert.equal(openWorkItems().length, 3);
});

test("summary mentions the starter area count", () => {
  assert.match(summarizeGoal(), /3 starter areas/);
});
