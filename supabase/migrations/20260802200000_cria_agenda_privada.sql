-- Agenda privada do estudante. Nenhum evento ou descricao fica disponivel ao publico.
create table if not exists public.agenda_estudo_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  titulo text not null check (char_length(titulo) between 1 and 180),
  inicio timestamptz not null,
  fim timestamptz,
  tipo text not null default 'estudo' check (tipo in ('aula', 'estudo', 'revisao', 'prova', 'pessoal')),
  disciplina_id text not null default '' check (char_length(disciplina_id) <= 160),
  tema text not null default '' check (char_length(tema) <= 180),
  observacao text not null default '' check (char_length(observacao) <= 2000),
  concluido boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  check (fim is null or fim >= inicio)
);

create index if not exists agenda_estudo_usuario_owner_inicio_idx
  on public.agenda_estudo_usuario(owner_id, inicio asc);

revoke all on public.agenda_estudo_usuario from anon;
revoke all on public.agenda_estudo_usuario from authenticated;
grant select, insert, update, delete on public.agenda_estudo_usuario to authenticated;
alter table public.agenda_estudo_usuario enable row level security;

drop policy if exists agenda_estudo_usuario_owner on public.agenda_estudo_usuario;
create policy agenda_estudo_usuario_owner on public.agenda_estudo_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
