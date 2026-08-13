-- Mapa curricular privado e granular.
-- Estrutura aditiva: preserva disciplinas, agenda, semana atual e progresso.

create table if not exists public.curriculo_componente_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  codigo text not null check (char_length(codigo) between 1 and 64),
  nome text not null check (char_length(nome) between 1 and 180),
  periodo smallint check (periodo is null or periodo between 1 and 12),
  categoria text not null default 'outro' check (categoria in ('bbpm', 'hcpm', 'aps', 'cirurgia', 'urgencia', 'outro')),
  situacao text not null default 'concluida' check (situacao in ('planejada', 'cursando', 'concluida', 'revisar')),
  evidencia_status text not null default 'parcial' check (evidencia_status in ('confirmado', 'parcial', 'ausente')),
  fonte_rotulo text not null default '' check (char_length(fonte_rotulo) <= 240),
  observacao text not null default '' check (char_length(observacao) <= 2000),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, codigo),
  unique (owner_id, id)
);

create table if not exists public.curriculo_modulo_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  componente_id uuid not null,
  ordem smallint not null check (ordem between 1 and 500),
  tipo text not null default 'modulo' check (tipo in ('modulo', 'aula', 'tutoria', 'pratica', 'conferencia', 'osce', 'eixo')),
  titulo text not null check (char_length(titulo) between 1 and 240),
  evidencia_status text not null default 'parcial' check (evidencia_status in ('confirmado', 'parcial', 'ausente')),
  fonte_localizacao text not null default '' check (char_length(fonte_localizacao) <= 500),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, componente_id, ordem, titulo),
  unique (owner_id, id),
  foreign key (owner_id, componente_id)
    references public.curriculo_componente_usuario(owner_id, id)
    on delete cascade
);

create table if not exists public.curriculo_subtema_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  modulo_id uuid not null,
  ordem smallint not null check (ordem between 1 and 1000),
  titulo text not null check (char_length(titulo) between 1 and 300),
  objetivo text not null default '' check (char_length(objetivo) <= 1200),
  disciplina_publica_id text not null default '' check (char_length(disciplina_publica_id) <= 160),
  subtema_publico_id text not null default '' check (char_length(subtema_publico_id) <= 180),
  evidencia_status text not null default 'parcial' check (evidencia_status in ('confirmado', 'parcial', 'ausente')),
  estado_estudo text not null default 'pendente' check (estado_estudo in ('pendente', 'em_estudo', 'revisar', 'dominado')),
  dificuldade smallint check (dificuldade is null or dificuldade between 1 and 5),
  prioridade_omed text not null default 'nao_classificado' check (prioridade_omed in ('alta', 'media', 'baixa', 'nao_classificado')),
  modalidades_imagem text[] not null default '{}'::text[],
  fontes_questoes text[] not null default '{}'::text[],
  ultima_revisao date,
  proxima_revisao date,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, modulo_id, ordem, titulo),
  unique (owner_id, id),
  foreign key (owner_id, modulo_id)
    references public.curriculo_modulo_usuario(owner_id, id)
    on delete cascade
);

create table if not exists public.curriculo_recurso_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  subtema_id uuid not null,
  recurso_tipo text not null check (recurso_tipo in ('resumo', 'questao', 'caso', 'mapa', 'midia', 'material_privado')),
  recurso_id text not null check (char_length(recurso_id) between 1 and 240),
  estado text not null default 'sugerido' check (estado in ('sugerido', 'confirmado', 'rejeitado')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, subtema_id, recurso_tipo, recurso_id),
  foreign key (owner_id, subtema_id)
    references public.curriculo_subtema_usuario(owner_id, id)
    on delete cascade
);

create index if not exists curriculo_componente_owner_periodo_idx
  on public.curriculo_componente_usuario(owner_id, periodo, categoria);
create index if not exists curriculo_modulo_owner_componente_idx
  on public.curriculo_modulo_usuario(owner_id, componente_id, ordem);
create index if not exists curriculo_subtema_owner_modulo_idx
  on public.curriculo_subtema_usuario(owner_id, modulo_id, ordem);
create index if not exists curriculo_subtema_revisao_idx
  on public.curriculo_subtema_usuario(owner_id, estado_estudo, proxima_revisao);
create index if not exists curriculo_recurso_owner_subtema_idx
  on public.curriculo_recurso_usuario(owner_id, subtema_id, recurso_tipo);

revoke all on public.curriculo_componente_usuario from anon;
revoke all on public.curriculo_modulo_usuario from anon;
revoke all on public.curriculo_subtema_usuario from anon;
revoke all on public.curriculo_recurso_usuario from anon;
revoke all on public.curriculo_componente_usuario from authenticated;
revoke all on public.curriculo_modulo_usuario from authenticated;
revoke all on public.curriculo_subtema_usuario from authenticated;
revoke all on public.curriculo_recurso_usuario from authenticated;
grant select, insert, update, delete on public.curriculo_componente_usuario to authenticated;
grant select, insert, update, delete on public.curriculo_modulo_usuario to authenticated;
grant select, insert, update, delete on public.curriculo_subtema_usuario to authenticated;
grant select, insert, update, delete on public.curriculo_recurso_usuario to authenticated;

alter table public.curriculo_componente_usuario enable row level security;
alter table public.curriculo_modulo_usuario enable row level security;
alter table public.curriculo_subtema_usuario enable row level security;
alter table public.curriculo_recurso_usuario enable row level security;

drop policy if exists curriculo_componente_owner on public.curriculo_componente_usuario;
create policy curriculo_componente_owner on public.curriculo_componente_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists curriculo_modulo_owner on public.curriculo_modulo_usuario;
create policy curriculo_modulo_owner on public.curriculo_modulo_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists curriculo_subtema_owner on public.curriculo_subtema_usuario;
create policy curriculo_subtema_owner on public.curriculo_subtema_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists curriculo_recurso_owner on public.curriculo_recurso_usuario;
create policy curriculo_recurso_owner on public.curriculo_recurso_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
