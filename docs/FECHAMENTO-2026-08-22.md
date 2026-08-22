# Fechamento operacional — 2026-08-22

## Lote executado

- Corrigido o factory de conteúdo para usar o catálogo estático durante
  `next build`, evitando tentativas de rede Supabase em cada worker.
- O espelho Supabase continua disponível fora da fase de compilação quando
  `CONTENT_SOURCE=supabase` estiver configurado.
- A reconciliação sanitizada confirmou 1.359 questões locais, 1.072 remotas e
  287 candidatas locais sem duplicata por conteúdo. Nenhuma foi publicada.

## Evidências

- `npm.cmd run typecheck` — passou.
- `npm.cmd run build` — passou; 428 páginas estáticas geradas, incluindo 308
  rotas de estudo e 62 rotas de casos.
- `npm.cmd run audit:rotas:local` — passou nas rotas `/`, `/questoes/`,
  `/biblioteca/`, `/mapas-mentais/`, `/meu-curso/`, `/agenda/`, `/minha-midia/`
  e `/semestres/`.
- A auditoria HTML local encontrou zero imagens sem `alt`, zero botões sem nome,
  zero IDs duplicados e zero marcadores de erro proibidos.

## Limites

- Lint global excedeu o tempo sem emitir diagnóstico; não foi tratado como
  aprovado.
- QA autenticada, dois dispositivos, Drive, Supabase remoto e publicação ainda
  não foram executados nesta rodada.
- As 287 candidatas permanecem fora do banco até revisão editorial e de
  proveniência.

## Estado de publicação

O lote está somente no branch local `codex/f0-v2-diagnostico`. O commit precisa
ser publicado e verificado separadamente; HTTP local não é evidência de produção.
