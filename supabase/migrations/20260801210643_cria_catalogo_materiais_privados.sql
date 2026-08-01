-- Catalogo privado das fontes processadas. Guarda apenas metadados e decisoes
-- de curadoria; o arquivo bruto e o texto comercial nao entram nesta tabela.
create table if not exists public.material_privado_usuario (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  titulo text not null check (char_length(titulo) between 1 and 240),
  tipo_arquivo text not null check (tipo_arquivo in ('pdf', 'docx', 'markdown', 'imagem', 'outro')),
  origem text not null check (origem in ('drive', 'local', 'obsidian', 'manual')),
  disciplina text not null default '' check (char_length(disciplina) <= 160),
  tema text not null default '' check (char_length(tema) <= 180),
  subtema text not null default '' check (char_length(subtema) <= 180),
  semestre smallint check (semestre between 1 and 12),
  prioridade text not null default 'media' check (prioridade in ('alta', 'media', 'baixa')),
  estado text not null default 'inventariado'
    check (estado in ('inventariado', 'lido', 'catalogado', 'validacao', 'integrado', 'bloqueado')),
  destino text not null default 'privado'
    check (destino in ('privado', 'sintese_autoral', 'publico_licenciado', 'nao_publicar')),
  fonte text not null default '' check (char_length(fonte) <= 600),
  tamanho_bytes bigint check (tamanho_bytes is null or tamanho_bytes >= 0),
  paginas integer check (paginas is null or paginas > 0),
  hash_sha256 text check (hash_sha256 is null or hash_sha256 ~ '^[0-9a-f]{64}$'),
  observacao text not null default '' check (char_length(observacao) <= 3000),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (owner_id, origem, titulo, fonte)
);

create index if not exists material_privado_usuario_owner_prioridade_idx
  on public.material_privado_usuario(owner_id, prioridade, atualizado_em desc);

revoke all on public.material_privado_usuario from anon;
revoke all on public.material_privado_usuario from authenticated;
grant select, insert, update, delete on public.material_privado_usuario to authenticated;
alter table public.material_privado_usuario enable row level security;

drop policy if exists material_privado_usuario_owner on public.material_privado_usuario;
create policy material_privado_usuario_owner
  on public.material_privado_usuario
  for all
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
