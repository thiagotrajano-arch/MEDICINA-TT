-- Progresso local-first de resumos e casos clinicos.
-- Um unico registro por item preserva tambem remocoes de favorito/anotacao
-- durante periodos offline, usando atualizado_em para reconciliacao.
create table if not exists public.progresso_conteudo (
  owner_id           uuid not null default auth.uid(),
  alvo_tipo          text not null check (alvo_tipo in ('resumo', 'caso')),
  alvo_id            text not null,
  primeiro_acesso_em timestamptz not null default now(),
  ultimo_acesso_em   timestamptz not null default now(),
  etapa              integer not null default 0 check (etapa >= 0),
  concluido          boolean not null default false,
  favorito           boolean not null default false,
  anotacao           text not null default '',
  atualizado_em      timestamptz not null default now(),
  primary key (owner_id, alvo_tipo, alvo_id)
);

create index if not exists progresso_conteudo_owner_atualizado_idx
  on public.progresso_conteudo(owner_id, atualizado_em desc);

alter table public.progresso_conteudo enable row level security;

drop policy if exists progresso_conteudo_owner on public.progresso_conteudo;
create policy progresso_conteudo_owner on public.progresso_conteudo
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
