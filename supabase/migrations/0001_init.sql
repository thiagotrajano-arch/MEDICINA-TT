-- ════════════════════════════════════════════════════════════════════════
-- Codex Medicus — schema inicial (0001)
-- Fiel a ARQUITETURA.md §3. Modelo profissional, versionado e escalável.
-- Convenções: ids uuid (gen_random_uuid) exceto taxonomia (slugs estáveis text);
-- created_at/updated_at em tudo; RLS habilitada; conteúdo com leitura pública
-- (base pessoal do usuário) e atividade do usuário escopada por owner_id.
-- ════════════════════════════════════════════════════════════════════════

-- ── Extensões ────────────────────────────────────────────────────────────
create extension if not exists pgcrypto;      -- gen_random_uuid()
create extension if not exists pg_trgm;        -- busca aproximada / typo-tolerante
create extension if not exists unaccent;       -- busca sem acento
create extension if not exists vector;         -- pgvector (busca semântica)

-- Remoção de acentos determinística e IMUTÁVEL (requisito para uso em índices).
-- Usa translate() em vez da extensão unaccent: o unaccent de 1 argumento é
-- apenas STABLE (depende do dicionário) e a forma de 2 argumentos exige o
-- schema da extensão, que varia no Supabase. translate() é imutável e cobre
-- os acentos do português.
create or replace function public.imutavel_unaccent(txt text)
returns text language sql immutable parallel safe strict as $$
  select translate(
    txt,
    'áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ',
    'aaaaaeeeeiiiiooooouuuucnAAAAAEEEEIIIIOOOOOUUUUCN'
  )
$$;

-- Timestamp updated_at automático.
create or replace function public.tg_touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ════════════════════════════════════════════════════════════════════════
-- TAXONOMIA
-- ════════════════════════════════════════════════════════════════════════
create table public.disciplina (
  id          text primary key,
  slug        text not null unique,
  nome        text not null,
  grupo       text not null,
  marca       text not null,
  omed        boolean not null default false,
  ordem       integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.tema (
  id             text primary key,
  disciplina_id  text not null references public.disciplina(id) on delete cascade,
  slug           text not null,
  nome           text not null,
  ordem          integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index tema_disciplina_idx on public.tema(disciplina_id);

create table public.subtema (
  id               text primary key,
  tema_id          text not null references public.tema(id) on delete cascade,
  slug             text not null,
  nome             text not null,
  dificuldade      text not null default 'intermediaria',
  tem_conteudo     boolean not null default false,
  alto_rendimento  boolean not null default false,
  ordem            integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index subtema_tema_idx on public.subtema(tema_id);
create index subtema_nome_trgm on public.subtema using gin (imutavel_unaccent(nome) gin_trgm_ops);

-- ════════════════════════════════════════════════════════════════════════
-- CONTEÚDO — versionamento append-only (original nunca sobrescrito)
-- ════════════════════════════════════════════════════════════════════════
create table public.resumo (
  id          uuid primary key default gen_random_uuid(),
  subtema_id  text not null references public.subtema(id) on delete cascade,
  tipo        text not null default 'completo',  -- completo|rapido|revisao|vespera|...
  titulo      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (subtema_id, tipo)
);
create index resumo_subtema_idx on public.resumo(subtema_id);

create table public.resumo_versao (
  id           uuid primary key default gen_random_uuid(),
  resumo_id    uuid not null references public.resumo(id) on delete cascade,
  numero       integer not null,
  titulo       text,
  origem       text not null default 'usuario_original',
                 -- usuario_original|complemento_ia|atualizacao_diretriz|edicao_manual
  autor        text,
  fonte_id     uuid,          -- FK adicionada após tabela fonte (abaixo)
  referencias  text[] not null default '{}',
  imutavel     boolean not null default false,   -- true p/ o material original do usuário
  is_atual     boolean not null default true,
  criado_em    timestamptz not null default now(),
  unique (resumo_id, numero)
);
create index resumo_versao_atual_idx on public.resumo_versao(resumo_id) where is_atual;

create table public.bloco_conteudo (
  id          uuid primary key default gen_random_uuid(),
  versao_id   uuid not null references public.resumo_versao(id) on delete cascade,
  secao       text not null,      -- Definição, Fisiopatologia, ... (estrutura fixa)
  corpo_mdx   text not null,
  ordem       integer not null default 0,
  created_at  timestamptz not null default now()
);
create index bloco_versao_idx on public.bloco_conteudo(versao_id);
create index bloco_fts on public.bloco_conteudo
  using gin (to_tsvector('portuguese', imutavel_unaccent(corpo_mdx)));

-- ════════════════════════════════════════════════════════════════════════
-- MÍDIA — arquivo pesado mora no Drive; aqui ficam metadados + âncora no texto
-- ════════════════════════════════════════════════════════════════════════
create table public.midia (
  id            uuid primary key default gen_random_uuid(),
  tipo          text not null,     -- rx|tc|rm|us|ecg|histologia|foto_clinica|video|...
  titulo        text,
  descricao     text,
  drive_file_id text,              -- fonte canônica no Google Drive (custo zero)
  storage_path  text,              -- opcional: thumbnail leve no Supabase Storage
  fonte         text,
  licenca       text not null default 'pessoal',  -- pessoal|dominio_publico|cc|embed_oficial
  disciplina_id text references public.disciplina(id) on delete set null,
  tema_id       text references public.tema(id) on delete set null,
  subtema_id    text references public.subtema(id) on delete set null,
  largura       integer,
  altura        integer,
  duracao_seg   integer,
  tags          text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index midia_subtema_idx on public.midia(subtema_id);

create table public.midia_ancora (
  id        uuid primary key default gen_random_uuid(),
  bloco_id  uuid not null references public.bloco_conteudo(id) on delete cascade,
  midia_id  uuid not null references public.midia(id) on delete cascade,
  posicao   integer not null default 0
);

-- ════════════════════════════════════════════════════════════════════════
-- QUESTÕES E SIMULADOS
-- ════════════════════════════════════════════════════════════════════════
create table public.questao (
  id             text primary key,
  subtema_id     text references public.subtema(id) on delete set null,
  disciplina_id  text not null references public.disciplina(id) on delete cascade,
  enunciado      text not null,
  estilo         text not null default 'intermediaria',
  dificuldade    text not null default 'intermediaria',
  tags           text[] not null default '{}',
  fonte          text,
  imagem_id      uuid references public.midia(id) on delete set null,
  status         text not null default 'publicada',  -- rascunho|publicada
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index questao_disciplina_idx on public.questao(disciplina_id);
create index questao_subtema_idx on public.questao(subtema_id);
create index questao_tags_idx on public.questao using gin (tags);
create index questao_fts on public.questao
  using gin (to_tsvector('portuguese', imutavel_unaccent(enunciado)));

create table public.alternativa (
  id          uuid primary key default gen_random_uuid(),
  questao_id  text not null references public.questao(id) on delete cascade,
  letra       text not null,
  texto       text not null,
  correta     boolean not null default false,
  comentario  text not null default '',
  ordem       integer not null default 0
);
create index alternativa_questao_idx on public.alternativa(questao_id);

create table public.simulado (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid(),
  titulo      text not null,
  config      jsonb not null default '{}',
  created_at  timestamptz not null default now()
);
create table public.simulado_questao (
  simulado_id uuid not null references public.simulado(id) on delete cascade,
  questao_id  text not null references public.questao(id) on delete cascade,
  ordem       integer not null default 0,
  primary key (simulado_id, questao_id)
);
create table public.simulado_resultado (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null default auth.uid(),
  simulado_id   uuid references public.simulado(id) on delete set null,
  iniciado_em   timestamptz,
  finalizado_em timestamptz,
  acertos       integer not null default 0,
  total         integer not null default 0,
  relatorio     jsonb not null default '{}'
);

create table public.resposta_usuario (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null default auth.uid(),
  questao_id    text not null references public.questao(id) on delete cascade,
  correta       boolean not null,
  tempo_seg     integer,
  respondido_em timestamptz not null default now()
);
create index resposta_questao_idx on public.resposta_usuario(questao_id);

-- Estatística agregada por questão (percentual de acertos) — view derivada.
create view public.questao_stat as
  select q.id as questao_id,
         count(r.*)                                             as tentativas,
         count(r.*) filter (where r.correta)                    as acertos,
         coalesce(round(100.0 * count(r.*) filter (where r.correta)
                        / nullif(count(r.*), 0)), 0)            as percentual
  from public.questao q
  left join public.resposta_usuario r on r.questao_id = q.id
  group by q.id;

-- ════════════════════════════════════════════════════════════════════════
-- CASOS CLÍNICOS (estilo Einstein)
-- ════════════════════════════════════════════════════════════════════════
create table public.caso_clinico (
  id              uuid primary key default gen_random_uuid(),
  subtema_id      text references public.subtema(id) on delete set null,
  disciplina_id   text references public.disciplina(id) on delete set null,
  titulo          text not null,
  estilo_einstein boolean not null default true,
  created_at      timestamptz not null default now()
);
create table public.caso_secao (
  id        uuid primary key default gen_random_uuid(),
  caso_id   uuid not null references public.caso_clinico(id) on delete cascade,
  tipo      text not null,  -- historia|anamnese|exame_fisico|hipoteses|laboratorio|...
  corpo_mdx text not null,
  ordem     integer not null default 0
);

-- ════════════════════════════════════════════════════════════════════════
-- EVIDÊNCIA CIENTÍFICA (humano no loop)
-- ════════════════════════════════════════════════════════════════════════
create table public.fonte (
  id         uuid primary key default gen_random_uuid(),
  tipo       text not null,   -- diretriz|livro|artigo|sociedade|orgao
  titulo     text not null,
  autores    text,
  ano        integer,
  doi        text,
  url        text,
  editora    text,
  edicao     text,
  created_at timestamptz not null default now()
);
alter table public.resumo_versao
  add constraint resumo_versao_fonte_fk
  foreign key (fonte_id) references public.fonte(id) on delete set null;

create table public.proposta_atualizacao (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid not null default auth.uid(),  -- fila de revisão do usuário
  resumo_id      uuid not null references public.resumo(id) on delete cascade,
  fonte_id       uuid references public.fonte(id) on delete set null,
  o_que_mudou    text not null,
  diff           text,
  status         text not null default 'pendente',  -- pendente|aprovada|rejeitada
  criado_em      timestamptz not null default now(),
  decidido_em    timestamptz
);

-- ════════════════════════════════════════════════════════════════════════
-- ESTUDO — SRS, progresso, favoritos, notas, etiquetas
-- ════════════════════════════════════════════════════════════════════════
create table public.srs_card (
  id               uuid primary key default gen_random_uuid(),
  owner_id         uuid not null default auth.uid(),
  alvo_tipo        text not null,   -- subtema|questao
  alvo_id          text not null,
  ease             real not null default 2.5,
  intervalo_dias   integer not null default 0,
  proxima_revisao  date,
  lapsos           integer not null default 0,
  created_at       timestamptz not null default now()
);
create index srs_owner_prox_idx on public.srs_card(owner_id, proxima_revisao);

create table public.sessao_estudo (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null default auth.uid(),
  disciplina_id text references public.disciplina(id) on delete set null,
  tipo          text,
  duracao_seg   integer not null default 0,
  iniciada_em   timestamptz not null default now()
);

create table public.meta (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid(),
  descricao   text not null,
  alvo_num    integer not null default 0,
  atual_num   integer not null default 0,
  prazo       date,
  created_at  timestamptz not null default now()
);

create table public.favorito (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null default auth.uid(),
  alvo_tipo  text not null,
  alvo_id    text not null,
  created_at timestamptz not null default now(),
  unique (owner_id, alvo_tipo, alvo_id)
);

create table public.nota_pessoal (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null default auth.uid(),
  alvo_tipo  text not null,
  alvo_id    text not null,
  corpo_mdx  text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.etiqueta (
  id       uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  nome     text not null,
  cor      text not null default '#0f766e'
);
create table public.etiqueta_alvo (
  etiqueta_id uuid not null references public.etiqueta(id) on delete cascade,
  alvo_tipo   text not null,
  alvo_id     text not null,
  primary key (etiqueta_id, alvo_tipo, alvo_id)
);

-- ════════════════════════════════════════════════════════════════════════
-- INGESTÃO E SINCRONIZAÇÃO (Google Drive) — rastreabilidade + dedupe
-- ════════════════════════════════════════════════════════════════════════
create table public.arquivo_importado (
  id                uuid primary key default gen_random_uuid(),
  origem            text not null default 'upload',   -- upload|drive|local
  drive_file_id     text unique,
  nome              text not null,
  mime              text,
  tamanho           bigint,
  hash_sha256       text unique,                       -- dedupe exato
  storage_path      text,
  status            text not null default 'recebido',
                      -- recebido|extraindo|classificando|dedupe|concluido|erro
  erro              text,
  drive_modified_at timestamptz,
  importado_em      timestamptz not null default now()
);
create index arquivo_status_idx on public.arquivo_importado(status);

create table public.extracao (
  id                 uuid primary key default gen_random_uuid(),
  arquivo_id         uuid not null references public.arquivo_importado(id) on delete cascade,
  texto              text,
  paginas            integer,
  imagens_extraidas  integer not null default 0,
  created_at         timestamptz not null default now()
);

create table public.sync_drive (
  id           uuid primary key default gen_random_uuid(),
  executado_em timestamptz not null default now(),
  page_token   text,
  novos        integer not null default 0,
  atualizados  integer not null default 0,
  removidos    integer not null default 0,
  log          jsonb not null default '{}'
);

-- ════════════════════════════════════════════════════════════════════════
-- EMBEDDINGS (busca semântica, pgvector) — genérico por alvo
-- ════════════════════════════════════════════════════════════════════════
create table public.conteudo_embedding (
  id         uuid primary key default gen_random_uuid(),
  alvo_tipo  text not null,   -- subtema|bloco|questao|midia
  alvo_id    text not null,
  embedding  vector(1536),
  created_at timestamptz not null default now(),
  unique (alvo_tipo, alvo_id)
);
create index conteudo_embedding_idx on public.conteudo_embedding
  using hnsw (embedding vector_cosine_ops);

-- ════════════════════════════════════════════════════════════════════════
-- BUSCA — RPC híbrida (texto + trigram) devolvendo o formato SearchHit
-- ════════════════════════════════════════════════════════════════════════
create or replace function public.search_conteudo(termo text)
returns table (tipo text, titulo text, contexto text, href text)
language sql stable as $$
  with q as (select imutavel_unaccent(lower(termo)) as t)
  -- disciplinas
  select 'disciplina', d.nome, d.grupo, '/biblioteca/' || d.slug
  from public.disciplina d, q
  where imutavel_unaccent(lower(d.nome)) like '%' || q.t || '%'
  union all
  -- temas
  select 'tema', tm.nome, d.nome, '/biblioteca/' || d.slug
  from public.tema tm join public.disciplina d on d.id = tm.disciplina_id, q
  where imutavel_unaccent(lower(tm.nome)) like '%' || q.t || '%'
  union all
  -- subtemas
  select 'subtema', s.nome, d.nome || ' · ' || tm.nome,
         '/estudar/' || s.id
  from public.subtema s
  join public.tema tm on tm.id = s.tema_id
  join public.disciplina d on d.id = tm.disciplina_id, q
  where imutavel_unaccent(lower(s.nome)) like '%' || q.t || '%'
  union all
  -- questões
  select 'questao', left(qn.enunciado, 80) || '…', 'Questão', '/questoes'
  from public.questao qn, q
  where imutavel_unaccent(lower(qn.enunciado)) like '%' || q.t || '%'
  limit 30;
$$;

-- ════════════════════════════════════════════════════════════════════════
-- TRIGGERS updated_at
-- ════════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  foreach t in array array[
    'disciplina','tema','subtema','resumo','midia','questao','nota_pessoal'
  ] loop
    execute format(
      'create trigger tg_%1$s_touch before update on public.%1$s
       for each row execute function public.tg_touch_updated_at();', t);
  end loop;
end $$;

-- ════════════════════════════════════════════════════════════════════════
-- RLS
--  · Conteúdo/taxonomia: leitura pública (base pessoal, sem segredo entre
--    tenants). Escrita apenas por service_role (seed/ingestão) — anon/auth não
--    escrevem conteúdo pela API.
--  · Atividade do usuário (owner_id): cada um só vê e altera o que é seu.
--  Quando houver multiusuário real, basta trocar a policy de leitura de
--  conteúdo para escopar por owner — nenhuma outra mudança é necessária.
-- ════════════════════════════════════════════════════════════════════════
do $$
declare t text;
begin
  -- Tabelas de conteúdo: RLS on + SELECT liberado a todos.
  foreach t in array array[
    'disciplina','tema','subtema','resumo','resumo_versao','bloco_conteudo',
    'midia','midia_ancora','questao','alternativa','caso_clinico','caso_secao',
    'fonte','conteudo_embedding'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('create policy %I_read on public.%I for select using (true);', t, t);
  end loop;

  -- Tabelas de atividade do usuário: RLS on + tudo escopado por owner_id.
  foreach t in array array[
    'simulado','simulado_resultado','resposta_usuario','srs_card',
    'sessao_estudo','meta','favorito','nota_pessoal','etiqueta',
    'proposta_atualizacao'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format(
      'create policy %I_owner on public.%I using (owner_id = auth.uid())
       with check (owner_id = auth.uid());', t, t);
  end loop;
end $$;

-- Ingestão/sync: apenas service_role (jobs). RLS on sem policy p/ anon/auth.
alter table public.arquivo_importado enable row level security;
alter table public.extracao          enable row level security;
alter table public.sync_drive         enable row level security;
alter table public.simulado_questao   enable row level security;
alter table public.etiqueta_alvo      enable row level security;
create policy simulado_questao_read on public.simulado_questao for select using (true);
create policy etiqueta_alvo_read on public.etiqueta_alvo for select using (true);
