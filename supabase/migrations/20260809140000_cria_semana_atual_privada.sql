-- Semana atual privada: sinais de rotina, foco confirmado e tarefas.
-- Esta migration é aditiva; nenhum dado público ou material bruto é copiado.

create table if not exists public.semana_estudo_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  inicio date not null,
  fim date not null,
  periodo smallint check (periodo between 1 and 12),
  objetivo text not null default '' check (char_length(objetivo) <= 500),
  estado text not null default 'ativa' check (estado in ('ativa', 'concluida', 'arquivada')),
  origem text not null default 'manual' check (origem in ('manual', 'agenda', 'curso', 'pdf', 'atividade')),
  confirmada boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, inicio, fim),
  unique (owner_id, id),
  check (fim >= inicio)
);

create index if not exists semana_estudo_usuario_owner_fim_idx
  on public.semana_estudo_usuario(owner_id, fim desc, atualizado_em desc);

create table if not exists public.foco_semana_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  semana_id uuid not null,
  disciplina_id text not null default '' check (char_length(disciplina_id) <= 160),
  tema text not null default '' check (char_length(tema) <= 180),
  subtema text not null default '' check (char_length(subtema) <= 180),
  prioridade text not null default 'media' check (prioridade in ('alta', 'media', 'baixa')),
  origem text not null default 'manual' check (origem in ('manual', 'agenda', 'curso', 'pdf', 'atividade', 'omed')),
  confianca numeric(3,2) not null default 1.00 check (confianca >= 0 and confianca <= 1),
  estado text not null default 'sugerido' check (estado in ('confirmado', 'sugerido', 'rejeitado')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, semana_id, disciplina_id, tema, subtema)
);

alter table public.foco_semana_usuario
  add constraint foco_semana_usuario_owner_fk
  foreign key (owner_id, semana_id)
  references public.semana_estudo_usuario(owner_id, id)
  on delete cascade;

create index if not exists foco_semana_usuario_owner_semana_idx
  on public.foco_semana_usuario(owner_id, semana_id, atualizado_em desc);

create table if not exists public.tarefa_estudo_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  semana_id uuid not null,
  data date not null,
  titulo text not null check (char_length(titulo) between 1 and 180),
  atividade text not null default 'outro' check (atividade in ('resumo', 'questoes', 'caso', 'revisao', 'mapa', 'pdf', 'outro')),
  recurso_id text not null default '' check (char_length(recurso_id) <= 180),
  disciplina_id text not null default '' check (char_length(disciplina_id) <= 160),
  tema text not null default '' check (char_length(tema) <= 180),
  duracao_min smallint check (duracao_min is null or duracao_min between 1 and 720),
  estado text not null default 'pendente' check (estado in ('pendente', 'em_andamento', 'concluida', 'adiada')),
  origem text not null default 'manual' check (origem in ('manual', 'agenda', 'curso', 'pdf', 'atividade')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.tarefa_estudo_usuario
  add constraint tarefa_estudo_usuario_owner_fk
  foreign key (owner_id, semana_id)
  references public.semana_estudo_usuario(owner_id, id)
  on delete cascade;

create index if not exists tarefa_estudo_usuario_owner_data_idx
  on public.tarefa_estudo_usuario(owner_id, data asc, estado);

create table if not exists public.vinculo_recurso_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  semana_id uuid not null,
  material_id uuid references public.material_privado_usuario(id) on delete set null,
  recurso_tipo text not null default 'material_privado' check (recurso_tipo in ('material_privado', 'resumo', 'questao', 'caso', 'mapa', 'midia')),
  recurso_id text not null default '' check (char_length(recurso_id) <= 240),
  disciplina_id text not null default '' check (char_length(disciplina_id) <= 160),
  tema text not null default '' check (char_length(tema) <= 180),
  subtema text not null default '' check (char_length(subtema) <= 180),
  confianca numeric(3,2) not null default 1.00 check (confianca >= 0 and confianca <= 1),
  estado text not null default 'sugerido' check (estado in ('confirmado', 'sugerido', 'rejeitado')),
  origem text not null default 'manual' check (origem in ('manual', 'pdf', 'agenda', 'curso', 'atividade')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, semana_id, recurso_tipo, recurso_id)
);

alter table public.vinculo_recurso_usuario
  add constraint vinculo_recurso_usuario_owner_fk
  foreign key (owner_id, semana_id)
  references public.semana_estudo_usuario(owner_id, id)
  on delete cascade;

create index if not exists vinculo_recurso_usuario_owner_semana_idx
  on public.vinculo_recurso_usuario(owner_id, semana_id, estado);

-- O ID do material sozinho não prova que ele pertence à mesma conta. O
-- trigger impede que um vínculo aponte para material privado de outro usuário.
create or replace function public.validar_vinculo_material_privado_owner()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if new.material_id is not null and not exists (
    select 1 from public.material_privado_usuario material
    where material.id = new.material_id and material.owner_id = new.owner_id
  ) then
    raise exception 'material privado não pertence ao proprietário do vínculo';
  end if;
  return new;
end;
$$;

revoke all on function public.validar_vinculo_material_privado_owner() from public;
grant execute on function public.validar_vinculo_material_privado_owner() to authenticated;
drop trigger if exists vinculo_recurso_material_owner_check on public.vinculo_recurso_usuario;
create trigger vinculo_recurso_material_owner_check
  before insert or update on public.vinculo_recurso_usuario
  for each row execute function public.validar_vinculo_material_privado_owner();

revoke all on public.semana_estudo_usuario from anon;
revoke all on public.foco_semana_usuario from anon;
revoke all on public.tarefa_estudo_usuario from anon;
revoke all on public.vinculo_recurso_usuario from anon;
revoke all on public.semana_estudo_usuario from authenticated;
revoke all on public.foco_semana_usuario from authenticated;
revoke all on public.tarefa_estudo_usuario from authenticated;
revoke all on public.vinculo_recurso_usuario from authenticated;
grant select, insert, update, delete on public.semana_estudo_usuario to authenticated;
grant select, insert, update, delete on public.foco_semana_usuario to authenticated;
grant select, insert, update, delete on public.tarefa_estudo_usuario to authenticated;
grant select, insert, update, delete on public.vinculo_recurso_usuario to authenticated;

alter table public.semana_estudo_usuario enable row level security;
alter table public.foco_semana_usuario enable row level security;
alter table public.tarefa_estudo_usuario enable row level security;
alter table public.vinculo_recurso_usuario enable row level security;

drop policy if exists semana_estudo_usuario_owner on public.semana_estudo_usuario;
create policy semana_estudo_usuario_owner on public.semana_estudo_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists foco_semana_usuario_owner on public.foco_semana_usuario;
create policy foco_semana_usuario_owner on public.foco_semana_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists tarefa_estudo_usuario_owner on public.tarefa_estudo_usuario;
create policy tarefa_estudo_usuario_owner on public.tarefa_estudo_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists vinculo_recurso_usuario_owner on public.vinculo_recurso_usuario;
create policy vinculo_recurso_usuario_owner on public.vinculo_recurso_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
