-- Biblioteca de imagens privadas. Os arquivos nunca entram no repositorio
-- publico: ficam em bucket privado e cada conta acessa apenas sua propria pasta.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('midia-privada', 'midia-privada', false, 20971520,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.midia_privada_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  object_path text not null check (char_length(object_path) between 3 and 500),
  titulo text not null check (char_length(titulo) between 1 and 180),
  tipo_origem text not null check (tipo_origem in ('pdf_comercial', 'paciente', 'propria_privada')),
  disciplina text not null default '' check (char_length(disciplina) <= 160),
  tema text not null default '' check (char_length(tema) <= 180),
  subtema text not null default '' check (char_length(subtema) <= 180),
  diagnostico text not null default '' check (char_length(diagnostico) <= 240),
  modalidade text not null default '' check (char_length(modalidade) <= 120),
  fonte text not null default '' check (char_length(fonte) <= 500),
  pagina integer check (pagina is null or pagina > 0),
  observacao text not null default '' check (char_length(observacao) <= 2000),
  paciente_anonimizado boolean not null default false,
  autorizacao_paciente boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, object_path),
  check (tipo_origem <> 'paciente' or (paciente_anonimizado and autorizacao_paciente))
);

create index if not exists midia_privada_usuario_owner_criado_idx
  on public.midia_privada_usuario(owner_id, criado_em desc);

revoke all on public.midia_privada_usuario from anon;
revoke all on public.midia_privada_usuario from authenticated;
grant select, insert, update, delete on public.midia_privada_usuario to authenticated;
alter table public.midia_privada_usuario enable row level security;

drop policy if exists midia_privada_usuario_owner on public.midia_privada_usuario;
create policy midia_privada_usuario_owner on public.midia_privada_usuario
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists midia_privada_storage_select_owner on storage.objects;
create policy midia_privada_storage_select_owner on storage.objects
  for select to authenticated using (
    bucket_id = 'midia-privada'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists midia_privada_storage_insert_owner on storage.objects;
create policy midia_privada_storage_insert_owner on storage.objects
  for insert to authenticated with check (
    bucket_id = 'midia-privada'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists midia_privada_storage_update_owner on storage.objects;
create policy midia_privada_storage_update_owner on storage.objects
  for update to authenticated
  using (bucket_id = 'midia-privada' and (storage.foldername(name))[1] = (select auth.uid()::text))
  with check (bucket_id = 'midia-privada' and (storage.foldername(name))[1] = (select auth.uid()::text));

drop policy if exists midia_privada_storage_delete_owner on storage.objects;
create policy midia_privada_storage_delete_owner on storage.objects
  for delete to authenticated using (
    bucket_id = 'midia-privada'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );
