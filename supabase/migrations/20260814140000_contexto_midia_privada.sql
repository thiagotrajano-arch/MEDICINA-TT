-- Contexto opcional para a biblioteca privada: período curricular e caso.
-- Nulos preservam o acervo existente até que cada item seja validado.
alter table public.midia_privada_usuario
  add column if not exists periodo smallint,
  add column if not exists caso text not null default '';

alter table public.midia_privada_usuario
  drop constraint if exists midia_privada_usuario_periodo_check;

alter table public.midia_privada_usuario
  add constraint midia_privada_usuario_periodo_check
  check (periodo is null or periodo between 1 and 12);

alter table public.midia_privada_usuario
  drop constraint if exists midia_privada_usuario_caso_check;

alter table public.midia_privada_usuario
  add constraint midia_privada_usuario_caso_check
  check (char_length(caso) <= 240);

create index if not exists midia_privada_usuario_owner_periodo_idx
  on public.midia_privada_usuario(owner_id, periodo, criado_em desc);

create index if not exists midia_privada_usuario_owner_caso_idx
  on public.midia_privada_usuario(owner_id, caso)
  where caso <> '';
