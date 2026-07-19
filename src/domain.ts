export type ProductAreaStatus = "planned" | "building" | "done";

export interface ProductArea {
  id: string;
  title: string;
  description: string;
  status: ProductAreaStatus;
}

export const productGoal = "Cursor Buildstack: landing, blog, and project showcase for agent-native tooling — Astro static site per design docs in terra-org/docs/design";

export const starterProductAreas: ProductArea[] = [
  {
    id: "prd",
    title: "Product definition",
    description: "Turn the bootstrap vision into a reviewed PRD and milestone plan.",
    status: "planned",
  },
  {
    id: "first-slice",
    title: "First usable slice",
    description: "Implement the smallest workflow that proves the product can be used end to end.",
    status: "planned",
  },
  {
    id: "operations",
    title: "Operations baseline",
    description: "Keep build, test, lint, docs, and runbook checks green from the first commit.",
    status: "planned",
  },
];

export function openWorkItems(areas: readonly ProductArea[] = starterProductAreas): ProductArea[] {
  return areas.filter((area) => area.status !== "done");
}

export function summarizeGoal(): string {
  return `${productGoal} (${starterProductAreas.length} starter areas)`;
}
