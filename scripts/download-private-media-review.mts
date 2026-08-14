/** Baixa uma cópia de revisão local do catálogo privado, sem publicar objetos. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { loadEnv } from "./load-env.mjs";
import { getSupabaseAdmin } from "../src/infra/supabase/client";

loadEnv();
const args = process.argv.slice(2);
const flag = (name: string) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const out = resolve(flag("--out") ?? "C:/Users/Adm/Desktop/MEDICINA/_media-review/20260814-visual-validation");
const concurrency = Math.max(1, Math.min(8, Number(flag("--concurrency") ?? "5")));

type Row = {
  id: string; owner_id: string; object_path: string; titulo: string; tipo_origem: string;
  disciplina: string; tema: string; subtema: string; diagnostico: string; modalidade: string;
  fonte: string; pagina: number | null; observacao: string; triagem_status: string; triagem_motivo: string;
};

async function main() {
  const db = getSupabaseAdmin();
  await mkdir(out, { recursive: true });
  const { data, error } = await db.from("midia_privada_usuario")
    .select("id,owner_id,object_path,titulo,tipo_origem,disciplina,tema,subtema,diagnostico,modalidade,fonte,pagina,observacao,triagem_status,triagem_motivo")
    .order("criado_em", { ascending: true }).limit(1000) as { data: Row[] | null; error: { message: string } | null };
  if (error) throw new Error(error.message);
  const rows = data ?? [];
  let downloaded = 0; let skipped = 0; let errors = 0;
  let cursor = 0;
  async function worker() {
    while (true) {
      const row = rows[cursor++];
      if (!row) return;
      const extension = extname(row.object_path).toLowerCase() || ".img";
      const target = resolve(out, `${row.id}${extension}`);
      try {
        let exists = false;
        try { await readFile(target); exists = true; } catch { /* novo */ }
        if (!exists) {
          const result = await db.storage.from("midia-privada").download(row.object_path);
          if (result.error || !result.data) throw new Error(result.error?.message ?? "download vazio");
          await writeFile(target, Buffer.from(await result.data.arrayBuffer()));
          downloaded += 1;
        } else skipped += 1;
      } catch (error) {
        errors += 1;
        console.error(`[media-review] ${row.id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, rows.length) }, () => worker()));
  await writeFile(resolve(out, "catalogo.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ out, rows: rows.length, downloaded, skipped, errors }, null, 2));
  if (errors) process.exitCode = 1;
}

main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : String(error)); process.exit(1); });
