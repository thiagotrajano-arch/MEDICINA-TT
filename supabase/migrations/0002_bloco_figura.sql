-- ════════════════════════════════════════════════════════════════════════
-- 0002 — Figura ancorada ao bloco de conteúdo
--
-- Cada seção de um resumo pode ter uma figura (diagrama SVG) ancorada a ela,
-- para que a imagem apareça exatamente no trecho em que ajuda a compreensão —
-- nunca numa galeria separada (requisito do briefing).
--
-- Guarda apenas o ID da figura no registry do front (src/components/figuras),
-- não o SVG em si: o desenho é código versionado, o banco só referencia.
-- ════════════════════════════════════════════════════════════════════════

alter table public.bloco_conteudo
  add column if not exists figura text;

comment on column public.bloco_conteudo.figura is
  'ID da figura no registry do front (src/components/figuras/registry.tsx). Nulo = seção sem figura.';
