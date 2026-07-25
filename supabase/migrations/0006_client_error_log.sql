-- Monitoramento real de erro do cliente — sem depender de servico terceiro
-- (nao posso criar conta em Sentry/etc. em nome do usuario). Qualquer erro
-- capturado no navegador (falha de sincronizacao, excecao nao tratada,
-- promise rejeitada) e gravado aqui, alem do console.error local, para que
-- uma falha silenciosa fique visivel sem precisar de alguem com DevTools
-- aberto no momento exato em que ela acontece.
create table if not exists public.client_error_log (
  id          uuid primary key default gen_random_uuid(),
  criado_em   timestamptz not null default now(),
  nivel       text not null default 'error' check (nivel in ('error', 'warn')),
  contexto    text not null,
  mensagem    text not null,
  detalhes    jsonb,
  pagina      text,
  owner_id    uuid
);

create index if not exists client_error_log_criado_em_idx
  on public.client_error_log(criado_em desc);

alter table public.client_error_log enable row level security;

-- Somente insercao pelo cliente (anon ou autenticado) — telemetria write-only
-- do ponto de vista da API publica. Leitura fica restrita ao service role
-- (scripts de diagnostico), nunca exposta via anon/authenticated.
drop policy if exists client_error_log_insert on public.client_error_log;
create policy client_error_log_insert on public.client_error_log
  for insert
  with check (true);
