import { productGoal, starterProductAreas, summarizeGoal } from "./domain.js";

const app = document.querySelector<HTMLElement>("#app");
if (!app) throw new Error("Missing #app root");

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const cards = starterProductAreas
  .map(
    (area) => `
      <section class="item">
        <h2>${escapeHtml(area.title)}</h2>
        <p>${escapeHtml(area.description)}</p>
        <p>Status: ${escapeHtml(area.status)}</p>
      </section>
    `,
  )
  .join("");

app.innerHTML = `
  <section class="surface">
    <h1>Greenfield Product</h1>
    <p>${escapeHtml(productGoal)}</p>
    <p>${escapeHtml(summarizeGoal())}</p>
    <div class="grid">${cards}</div>
  </section>
`;
