/** Baixa apenas arquivos das pastas explicitamente permitidas no Drive. */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { GoogleDriveSource } from "../src/infra/drive/google-drive-source";
import { driveFolderIds } from "../src/infra/drive/config";

loadEnv();
const outArg = process.argv.indexOf("--out");
const out = resolve(outArg >= 0 ? process.argv[outArg + 1] : "_drive-private");
const includeArg = process.argv.indexOf("--include");
const includes = includeArg >= 0
  ? (process.argv[includeArg + 1] ?? "").split(",").map((value) => value.trim()).filter(Boolean)
  : [];
if (!driveFolderIds().length) throw new Error("DRIVE_FOLDER_IDS ausente; nenhum download foi iniciado");
if (!includes.length) {
  throw new Error("--include e obrigatorio; informe termos separados por virgula para evitar download em massa");
}
mkdirSync(out, { recursive: true });
const source = new GoogleDriveSource();
const refs = (await Promise.all(driveFolderIds().map((folderId) => source.listFolder(folderId)))).flat();
const manifest: unknown[] = [];
for (const ref of refs) {
  if (!/pdf|wordprocessingml\.document/i.test(ref.mime)) continue;
  const nomeNormalizado = ref.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (!includes.some((term) => nomeNormalizado.includes(term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))) continue;
  const file = await source.download(ref);
  const safe = `${file.hashSha256}-${ref.nome.replace(/[^a-zA-Z0-9._-]+/g, "_")}`;
  writeFileSync(join(out, safe), file.bytes);
  manifest.push({ ...ref, hashSha256: file.hashSha256, caminho: join(out, safe) });
}
writeFileSync(join(out, "_manifest-download.json"), JSON.stringify({ total: manifest.length, includes, manifest }, null, 2));
console.log(JSON.stringify({ total: manifest.length, includes, out }, null, 2));
