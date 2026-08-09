# Fechamento operacional — 2026-08-09

## Publicação concluída

- Branch: `agent/auditoria-integracoes-2026-08-09`.
- Commits do redesign: `70c2d6c`, `f48cefc`, `3b9a30b`.
- PR: https://github.com/thiagotrajano-arch/MEDICINA-TT/pull/2 (mesclado em `c260ef8`).
- Deploy GitHub Pages: workflow `31338545947`, build e deploy concluídos com sucesso.
- Rotas públicas verificadas após o deploy: `/`, `/questoes/`, `/biblioteca/`, `/mapas-mentais/` e `/meu-curso/` responderam HTTP 200 sem marcadores de erro.

## Portões aprovados

- `npm.cmd run audit:questoes`: 1.296 questões, zero duplicatas, comentários vazios/curtos, fontes ausentes ou comentários semanticamente contraditórios em respostas corretas.
- `npm.cmd run audit:privacidade`: 220 arquivos públicos e 3 curriculares verificados.
- `npm.cmd run typecheck` e `npm.cmd run lint`: aprovados.
- `npm.cmd run build`: aprovado; 402 rotas estáticas geradas. Algumas rotas excederam 60 s na primeira tentativa e foram reprocessadas com sucesso.

## Integrações verificadas

- Supabase: 10 migrations aplicadas no projeto. Advisors ainda apontam extensões no schema público, leaked-password protection desativada e índices sem uso; ficam pendentes de decisão/migração explícita.
- Drive: o conector autenticado localiza pastas médicas, EstrategiaMED, Memorex e MEDCOF por metadados. O job remoto falhou com `configuracao-incompleta` porque os Secrets/Variables do workflow não têm a allowlist/credencial configuradas. Nenhum arquivo foi baixado pelo workflow.
- Anki: snapshot local de 2026-08-09 = 226 decks, 1.703 cartões, 210 decks vazios legados. AnkiConnect responde v6, mas `deckNames` retorna `collection is not available`; não alterar decks até uma única coleção estar aberta.

## Próximo lote executável

1. Configurar a conexão própria do Drive e a allowlist de pastas, sem registrar valores.
2. Materializar GO/Obstetrícia em área privada, calcular SHA-256, deduplicar e converter PDF para Markdown antes da leitura.
3. Renderizar somente páginas clínicas relevantes, registrar imagens/páginas/licença e atualizar a biblioteca autenticada.
4. Repetir por Pediatria, Infectologia, Cirurgia/MFC e Clínica Médica.
5. Executar QA autenticada de login, recuperação, sessão, upload, URL assinada, logout e exclusão.
6. Reabrir o Anki com uma coleção única e validar progresso/duplicatas sem apagar cartões.
7. Rodar Lighthouse, axe/WCAG e teste móvel antes do próximo deploy.

## Limites preservados

PDFs comerciais, imagens de pacientes, credenciais, IDs do Drive e dados curriculares individuais continuam fora do repositório e do site público.

## Correção posterior do Anki — 2026-08-09

- O AnkiConnect voltou a responder com a coleção aberta.
- Foi criado backup local `.apkg` antes da reorganização.
- O estilo `OMED Bonito` recebeu títulos compactos; os 1.703 cartões foram
  conferidos antes/depois sem alteração de quantidade.
- Após autorização explícita, os 210 decks legados vazios foram removidos sem
  apagar cartões; a verificação final manteve 1.703 cartões.

## Resultado final da organização de títulos — 2026-08-09

- Backup pré-limpeza: `exports/anki/backup-before-deck-cleanup-20260809.apkg`.
- Estado pós-limpeza: 108 decks totais, 16 decks Codex monitorados e 1.703
  cartões; nenhum nome legado restante.
- Snapshot: `exports/anki/progresso-after-cleanup.json`.
