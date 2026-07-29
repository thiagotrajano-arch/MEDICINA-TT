-- Camada privada do curso: cada registro pertence exclusivamente a uma conta.
-- IDs de disciplina sao texto para permitir rastrear componentes curriculares que
-- ainda nao existem na taxonomia publica do site.
create table if not exists public.curso_disciplina_usuario (
  owner_id      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  disciplina_id text not null check (char_length(disciplina_id) between 1 and 160),
  periodo       smallint check (periodo between 1 and 12),
  status        text not null default 'planejada'
                check (status in ('planejada', 'cursando', 'concluida', 'revisar')),
  data_inicio   date,
  data_fim      date,
  dificuldade   smallint check (dificuldade between 1 and 5),
  observacao    text not null default '' check (char_length(observacao) <= 2000),
  origem        text not null default 'manual'
                check (origem in ('manual', 'markdown', 'csv')),
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  primary key (owner_id, disciplina_id),
  check (data_fim is null or data_inicio is null or data_fim >= data_inicio)
);

create index if not exists curso_disciplina_usuario_owner_periodo_idx
  on public.curso_disciplina_usuario(owner_id, periodo, status);

-- Historico minimo: guarda origem, data e campos alterados, nunca a observacao
-- ou o documento privado que levou a mudanca.
create table if not exists public.curso_disciplina_evento (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  disciplina_id text not null,
  tipo          text not null check (tipo in ('criada', 'atualizada', 'importada', 'removida')),
  origem        text not null check (origem in ('manual', 'markdown', 'csv')),
  campos        text[] not null default '{}',
  criado_em     timestamptz not null default now()
);

create index if not exists curso_disciplina_evento_owner_criado_idx
  on public.curso_disciplina_evento(owner_id, criado_em desc);

revoke all on public.curso_disciplina_usuario from anon;
revoke all on public.curso_disciplina_evento from anon;
grant select, insert, update, delete on public.curso_disciplina_usuario to authenticated;
grant select, insert, update, delete on public.curso_disciplina_evento to authenticated;

alter table public.curso_disciplina_usuario enable row level security;
alter table public.curso_disciplina_evento enable row level security;

drop policy if exists curso_disciplina_usuario_owner on public.curso_disciplina_usuario;
create policy curso_disciplina_usuario_owner
  on public.curso_disciplina_usuario
  for all
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists curso_disciplina_evento_owner on public.curso_disciplina_evento;
create policy curso_disciplina_evento_owner
  on public.curso_disciplina_evento
  for all
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
