-- Triagem e vínculo opcional da biblioteca privada com a árvore de estudos.
alter table public.midia_privada_usuario
  add column if not exists subtema_id text references public.subtema(id) on delete set null,
  add column if not exists triagem_status text not null default 'revisao_pendente',
  add column if not exists triagem_motivo text not null default '';

alter table public.midia_privada_usuario
  drop constraint if exists midia_privada_triagem_status_check;

alter table public.midia_privada_usuario
  add constraint midia_privada_triagem_status_check
  check (triagem_status in ('util', 'contextual', 'revisao_pendente', 'nao_util'));

create index if not exists midia_privada_usuario_subtema_idx
  on public.midia_privada_usuario(owner_id, subtema_id)
  where subtema_id is not null;

create index if not exists midia_privada_usuario_subtema_fk_idx
  on public.midia_privada_usuario(subtema_id);

create index if not exists midia_privada_usuario_triagem_idx
  on public.midia_privada_usuario(owner_id, triagem_status, criado_em desc);
