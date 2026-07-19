import { access, readFile } from "node:fs/promises";

const required = ["src/domain.ts", "src/client.ts", "docs/VISION.md", "docs/REQUIREMENTS.md"];
for (const path of required) await access(path);

for (const path of required) {
  const text = await readFile(path, "utf8");
  if (text.includes("\r\n")) throw new Error(`${path} uses CRLF line endings`);
  if (text.trim().length === 0) throw new Error(`${path} is empty`);
}

console.log("lint: scaffold checks passed");
