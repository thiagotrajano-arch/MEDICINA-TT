/** Baixa apenas arquivos das pastas explicitamente permitidas no Drive. */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { GoogleDriveSource } from "../src/infra/drive/google-drive-source";
import { driveFolderIds } from "../src/infra/drive/config";

loadEnv();
const outArg = process.argv.indexOf("--out");
const out = resolve(outArg >= 0 ? process.argv[outArg + 1] : "_drive-private");
if (!driveFolderIds().length) throw new Error("DRIVE_FOLDER_IDS ausente; nenhum download foi iniciado");
mkdirSync(out, { recursive: true });
const source = new GoogleDriveSource();
const refs = await source.listFolder(driveFolderIds()[0]);
const manifest: unknown[] = [];
for (const ref of refs) {
  if (!/pdf|wordprocessingml\.document/i.test(ref.mime)) continue;
  const file = await source.download(ref);
  const safe = `${file.hashSha256}-${ref.nome.replace(/[^a-zA-Z0-9._-]+/g, "_")}`;
  writeFileSync(join(out, safe), file.bytes);
  manifest.push({ ...ref, hashSha256: file.hashSha256, caminho: join(out, safe) });
}
writeFileSync(join(out, "_manifest-download.json"), JSON.stringify({ total: manifest.length, manifest }, null, 2));
console.log(JSON.stringify({ total: manifest.length, out }, null, 2));
