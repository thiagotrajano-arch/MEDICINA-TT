-- O rastreador customizado e infraestrutura interna, nao uma tabela cliente.
-- A conexao administrativa usada pelo executor local continua podendo le-la.
create table if not exists public.schema_migrations (
  versao text primary key,
  aplicada_em timestamptz not null default now()
);
revoke all on public.schema_migrations from public, anon, authenticated;
alter table public.schema_migrations enable row level security;

-- Reconciliacao pontual de migrations aplicadas pelo historico nativo do
-- Supabase, evitando que o executor legado tente reaplica-las depois.
insert into public.schema_migrations (versao)
values
  ('20260729194500_cria_biblioteca_midia_privada.sql'),
  ('20260801210643_cria_catalogo_materiais_privados.sql'),
  ('20260801211608_protege_rastreador_e_estatisticas.sql')
on conflict (versao) do nothing;

-- A view passa a executar com os privilegios/RLS do usuario que consulta.
alter view public.questao_stat set (security_invoker = true);

-- Fixa o search_path das funcoes apontadas pelo Security Advisor.
alter function public.imutavel_unaccent(text) set search_path = pg_catalog, public;
alter function public.tg_touch_updated_at() set search_path = pg_catalog, public;
alter function public.search_conteudo(text) set search_path = pg_catalog, public;
