# Auditoria de release — 2026-08-09

## Escopo

Lote de 50 passos em cinco blocos: semana atual privada, vínculos de materiais,
auditoria de rotas, privacidade/performance e publicação controlada. Nenhum PDF,
DOCX, imagem comercial, dado do SISCAD, hash privado ou credencial entra no
bundle público.

## Gate local

- [x] TypeScript (`npm run typecheck`).
- [x] ESLint (`npm run lint`).
- [x] Auditoria editorial (`npm run audit:questoes`): 1.296 questões, zero
  duplicatas, comentários curtos/vazios, fontes ausentes ou contradições.
- [x] Auditoria pública (`npm run audit:privacidade`): 227 arquivos públicos e
  3 arquivos curriculares verificados.
- [x] Auditoria estrutural de rotas (`npm run audit:rotas`): oito rotas PASS,
  sem erro de aplicação, imagem sem alt, botão sem nome ou ID duplicado.
- [x] `robots.txt` bloqueia rotas privadas; `sitemap.xml` não as inclui.
- [x] Build Next.js: 402 rotas estáticas geradas em aproximadamente 205 s.
- [x] Bundle exportado medido antes de dependências: 41 assets, 4,57 MB.
- [x] `git diff --check` sem erro.
- [ ] Lighthouse/PageSpeed, axe/WCAG completo e QA autenticada real — portões
  separados, não disponíveis neste runner.

## Publicação

O commit e o run do GitHub Pages serão registrados nesta página somente depois
de push, merge e confirmação do workflow. Se a migration da semana ainda não
estiver aplicada no Supabase remoto, a interface mantém fallback local-first e
não anuncia sincronização em nuvem.

## Confirmacao pos-publicacao

- PR #5 foi mesclado na `main` pelo commit `bd98d584906792da9e70e02d9334a010eedd551d`.
- GitHub Pages `Deploy (GitHub Pages)` run `31341518573` terminou com sucesso.
- As rotas `/`, `/questoes/`, `/biblioteca/`, `/mapas-mentais/`, `/meu-curso/`,
  `/agenda/`, `/minha-midia/`, `/semestres/`, `/robots.txt` e `/sitemap.xml`
  responderam HTTP 200 sem marcadores de erro ou dados privados.
- Site: https://thiagotrajano-arch.github.io/MEDICINA-TT/

O texto de pre-publicacao acima fica preservado como gate historico; esta secao
e a fonte de verdade do deploy concluido. Os portoes explicitamente pendentes
continuam sem simulacao: migration remota, QA autenticada, Lighthouse/axe,
Drive, Anki e restore.
