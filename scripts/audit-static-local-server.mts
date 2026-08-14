/** Serve o export estático localmente e executa o auditor de rotas/HTML. */
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, normalize, sep } from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "out");
const mime: Record<string, string> = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };
const resolvePublic = (urlPath: string): string | null => {
  const relative = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const candidate = normalize(join(root, relative));
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, "index.html");
  return existsSync(index) && statSync(index).isFile() ? index : null;
};

const server = createServer((request, response) => {
  const file = resolvePublic(request.url ?? "/");
  if (!file) { response.writeHead(404); response.end("not found"); return; }
  response.writeHead(200, { "content-type": mime[file.slice(file.lastIndexOf(".")).toLowerCase()] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
});

await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("Não foi possível iniciar o servidor local.");
process.env.SITE_BASE_URL = `http://127.0.0.1:${address.port}`;
const auditorUrl = new URL("./audit-static-routes.mts", import.meta.url).href;
try { await import(auditorUrl); } finally { await new Promise<void>((resolve) => server.close(() => resolve())); }
