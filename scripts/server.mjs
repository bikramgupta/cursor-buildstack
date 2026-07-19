import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
]);

createServer(async (req, res) => {
  const rawPath = req.url === "/" ? "/index.html" : (req.url ?? "/index.html").split("?")[0] ?? "/index.html";
  const safePath = normalize(rawPath).replace(/^\.\.(\/|$)/, "");
  const filePath = join(root, safePath);
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("not a file");
    res.setHeader("content-type", types.get(extname(filePath)) ?? "application/octet-stream");
    createReadStream(filePath).pipe(res);
  } catch {
    res.statusCode = 404;
    res.end("not found");
  }
}).listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
