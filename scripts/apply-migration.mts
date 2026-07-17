/**
 * Aplica as migrations SQL pendentes no Postgres do Supabase (conexão direta).
 *
 *   npx tsx scripts/apply-migration.mts
 *
 * Rastreia o que já foi aplicado numa tabela `schema_migrations`, então rodar
 * várias vezes é seguro (idempotente): só executa o que ainda falta, na ordem
 * do nome do arquivo. Cada migration roda dentro de uma transação — se falhar,
 * nada daquela migration fica aplicado pela metade.
 *
 * Usa o protocolo de query simples do node-postgres, que executa o arquivo
 * inteiro de uma vez — preservando funções e blocos DO com dollar-quoting.
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

  // Registro do que já foi aplicado.
  await client.query(`
    create table if not exists public.schema_migrations (
      versao      text primary key,
      aplicada_em timestamptz not null default now()
    )
  `);
  const arquivos = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  // Baseline: o schema inicial foi aplicado antes de existir o rastreamento.
  // Se as tabelas já existem mas o registro está vazio, adota a 0001 como
  // aplicada em vez de tentar recriá-la (o que falharia).
  const { rows: [{ existe }] } = await client.query<{ existe: boolean }>(
    "select to_regclass('public.disciplina') is not null as existe"
  );
  const { rows: [{ n }] } = await client.query<{ n: number }>(
    "select count(*)::int as n from public.schema_migrations"
  );
  if (existe && n === 0 && arquivos[0]) {
    await client.query(
      "insert into public.schema_migrations (versao) values ($1) on conflict do nothing",
      [arquivos[0]]
    );
    console.log(`[migration] baseline: ${arquivos[0]} marcada como já aplicada.`);
  }

  const { rows: aplicadas } = await client.query<{ versao: string }>(
    "select versao from public.schema_migrations"
  );
  const jaAplicadas = new Set(aplicadas.map((r) => r.versao));

  const pendentes = arquivos.filter((f) => !jaAplicadas.has(f));
  if (pendentes.length === 0) {
    console.log(`[migration] nenhuma pendente (${arquivos.length} já aplicadas).`);
  }

  for (const arquivo of pendentes) {
    const sql = readFileSync(join(MIGRATIONS_DIR, arquivo), "utf8");
    process.stdout.write(`[migration] aplicando ${arquivo} ... `);
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query("insert into public.schema_migrations (versao) values ($1)", [arquivo]);
      await client.query("commit");
      console.log("ok");
    } catch (e) {
      await client.query("rollback");
      console.log("FALHOU");
      throw e;
    }
  }

  // PostgREST: recarrega o cache de schema para expor as mudanças na API.
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
