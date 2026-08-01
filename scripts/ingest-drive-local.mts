/**
 * Pipeline local para PDFs exportados do Drive.
 *
 * Uso:
 *   npm run drive:local -- <pasta-de-entrada> [--out <pasta-privada>]
 *
 * A pasta de entrada deve conter apenas arquivos que o usuário autorizou.
 * O script nunca publica, envia ou apaga arquivos do Drive: calcula SHA-256,
 * mantém uma cópia canônica por conteúdo e gera um manifesto JSON. Depois,
 * use `npm run fonte:md -- <pasta-privada>` para converter para Markdown.
 */
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

type Registro = { origem: string; canonico: string; sha256: string; bytes: number; duplicado: boolean };

function arquivos(dir: string): string[] {
  const saida: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) saida.push(...arquivos(p));
    else if ([".pdf", ".docx"].includes(extname(e.name).toLowerCase())) saida.push(p);
  }
  return saida;
}

const args = process.argv.slice(2);
const entrada = args.find((a) => !a.startsWith("--"));
const oi = args.indexOf("--out");
const saida = resolve(oi >= 0 ? args[oi + 1] : "_drive-private");
if (!entrada) throw new Error("uso: drive:local <pasta-de-entrada> [--out <pasta-privada>]");

const origem = resolve(entrada);
if (!statSync(origem).isDirectory()) throw new Error("a entrada precisa ser uma pasta");
mkdirSync(join(saida, "_files"), { recursive: true });
const porHash = new Map<string, string>();
const registros: Registro[] = [];
for (const arq of arquivos(origem)) {
  const bytes = readFileSync(arq);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  const anterior = porHash.get(sha256);
  if (anterior) {
    registros.push({ origem: arq, canonico: anterior, sha256, bytes: bytes.length, duplicado: true });
    continue;
  }
  const destino = join(saida, "_files", `${sha256}${extname(arq).toLowerCase()}`);
  copyFileSync(arq, destino);
  porHash.set(sha256, destino);
  registros.push({ origem: arq, canonico: destino, sha256, bytes: bytes.length, duplicado: false });
}
writeFileSync(join(saida, "_manifest-sha256.json"), JSON.stringify({ geradoEm: new Date().toISOString(), entrada: origem, total: registros.length, unicos: porHash.size, duplicatas: registros.filter((r) => r.duplicado).length, registros }, null, 2));
console.log(JSON.stringify({ total: registros.length, unicos: porHash.size, duplicatas: registros.filter((r) => r.duplicado).length, saida }, null, 2));
