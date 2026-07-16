/**
 * Aplica as migrations SQL no Postgres do Supabase (conexão direta).
 *
 *   npx tsx scripts/apply-migration.mts
 *
 * Usa o protocolo de query simples do node-postgres, que executa o arquivo
 * inteiro de uma vez — preservando funções e blocos DO com dollar-quoting.
 * Ao final, pede ao PostgREST para recarregar o cache de schema, para que a API
 * REST enxergue as tabelas recém-criadas imediatamente.
 */
import { loadEnv } from "./load-env.mjs";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { Client } from "pg";

loadEnv();

const MIGRATIONS_DIR = join(process.cwd(), "supabase", "migrations");

async function main() {
  const url = process.env.SUPABASE_DB_URL;
  if (!url) {
    console.log("[migration] SUPABASE_DB_URL ausente — defina em .env.local. Abortando.");
    return;
  }

  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }, // Supabase exige TLS
  });
  await client.connect();
  console.log("[migration] conectado.");

  const arquivos = readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql")).sort();
  for (const arquivo of arquivos) {
    const sql = readFileSync(join(MIGRATIONS_DIR, arquivo), "utf8");
    process.stdout.write(`[migration] aplicando ${arquivo} ... `);
    await client.query(sql);
    console.log("ok");
  }

  // PostgREST: recarrega o cache de schema para expor as tabelas novas na API.
  await client.query("notify pgrst, 'reload schema'");
  console.log("[migration] cache do PostgREST recarregado.");

  const { rows } = await client.query(
    "select count(*)::int as n from information_schema.tables where table_schema='public'"
  );
  console.log(`[migration] tabelas em public: ${rows[0].n}`);

  await client.end();
  console.log("[migration] concluído.");
}

main().catch((e) => {
  console.error("[migration] erro:", e.message ?? e);
  process.exit(1);
});
