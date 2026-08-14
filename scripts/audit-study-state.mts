import { Client } from "pg";
import { loadEnv } from "./load-env.mjs";

loadEnv();

const url = process.env.SUPABASE_DB_URL;
if (!url) throw new Error("SUPABASE_DB_URL ausente; auditoria remota não executada.");

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

try {
  const { rows: [table] } = await client.query<{
    rls: boolean;
    total: number;
    owners: number;
    invalid_states: number;
    missing_fields: number;
  }>(`
    select
      c.relrowsecurity as rls,
      count(t.*)::int as total,
      count(distinct t.owner_id)::int as owners,
      count(*) filter (where t.estado not in ('planejado','em_andamento','revisao_devida','concluido','bloqueado'))::int as invalid_states,
      count(*) filter (where t.prioridade is null or t.recursos is null or t.reaberturas is null)::int as missing_fields
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
    left join public.tarefa_estudo_usuario t on true
    where c.relname = 'tarefa_estudo_usuario'
    group by c.relrowsecurity
  `);
  const { rows: policies } = await client.query<{ policyname: string; roles: string[] }>(`
    select policyname, roles
    from pg_policies
    where schemaname = 'public' and tablename = 'tarefa_estudo_usuario'
    order by policyname
  `);
  const { rows: states } = await client.query<{ estado: string; quantidade: number }>(`
    select estado, count(*)::int as quantidade
    from public.tarefa_estudo_usuario
    group by estado
    order by estado
  `);
  const { rows: [column] } = await client.query<{ column_default: string | null }>(`
    select column_default
    from information_schema.columns
    where table_schema = 'public' and table_name = 'tarefa_estudo_usuario' and column_name = 'estado'
  `);

  const passed = Boolean(table?.rls) && table.invalid_states === 0 && table.missing_fields === 0 && policies.length > 0 && column?.column_default === "'planejado'::text";
  console.log(JSON.stringify({ passed, table, defaultState: column?.column_default ?? null, policies: policies.map((item) => item.policyname), states }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await client.end();
}
