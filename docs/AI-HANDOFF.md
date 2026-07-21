# Handoff para outra IA — Codex Medicus

Atualizado em 2026-07-21.

## Acessos públicos

- Site: https://thiagotrajano-arch.github.io/MEDICINA-TT/
- Repositório: https://github.com/thiagotrajano-arch/MEDICINA-TT
- Branch de publicação: `main`
- Deploy: GitHub Actions → GitHub Pages.

## Cópia de trabalho

Use um clone local do repositório. O arquivo `.env.local` contém as credenciais necessárias e é ignorado pelo Git. Nunca mostrar, registrar em logs, copiar para documentação ou commitar seu conteúdo.

Estado operacional em 2026-07-21: login por e-mail/senha ativo, sessão persistente e progresso local-first sincronizado com Supabase/RLS. Não reintroduzir autenticação anônima: ela está desabilitada no projeto.

## Antes de trabalhar

1. Ler `AGENTS.md`.
2. Ler `PROXIMOS-PASSOS.md`.
3. Ler `docs/PROMPTS-MASTER.md`.
4. Consultar o arquivo local `RAIO-X-OMED.md` quando disponibilizado pelo usuário.
5. Conferir `git status` e os commits recentes.

## Contexto consolidado

Thiago é estudante de medicina da UFMS. O Codex Medicus é sua plataforma pessoal de estudos médicos, inicialmente focada na OMED VI 2026 e posteriormente na graduação e residência.

Regra inegociável: custo zero. Usar camadas gratuitas e evitar APIs pagas em produção.

Prioridade de conteúdo: Infectologia → GO → Pediatria → Cirurgia → MFC/Preventiva → Clínica Médica. Dentro de cada área, priorizar assuntos de alto rendimento da OMED.

Nunca inventar fatos clínicos, gabaritos, fontes ou licenças. Preservar o conteúdo original do usuário e adicionar complementos em nova camada. Uma questão errada é pior que uma questão a menos.

## Fontes locais importantes

- PDFs do Estratégia MED já extraídos pelo usuário.
- Acervo médico local e materiais recebidos.
- Histórico local do Claude, quando autorizado e disponível.

Para extração, preferir Mapas Mentais; flashcards são úteis para questões. Muitos slides são imagens e exigem OCR ou inspeção própria.

## Operação

- Instalação: `npm ci`
- Desenvolvimento: `npm run dev`
- Typecheck: `npm run typecheck`
- Seed: `npm run seed`
- Sincronização do Drive: `npm run sync-drive`
- Migrações: `npx tsx scripts/apply-migration.mts`

Após alterar `src/content/**` ou a taxonomia, executar o seed antes de validar a versão que usa Supabase. Verificar IDs de subtemas, questões, casos e figuras para evitar vínculos órfãos.

Estado quantitativo validado: 36 disciplinas, 248 subtemas, 159 resumos, 528 questões, 21 casos e 66 figuras. A extração das fontes disponíveis foi encerrada; os 89 subtemas vazios são scaffolds. Os bancos exatos de Cirurgia 160 e MFC 80 não estão no disco e só têm páginas parciais no histórico; os acervos recuperados dos Resumos Absolutos (10 temas/100 questões por disciplina) já foram incorporados em `src/content/raw/`.

## Publicação

Mudanças em `main` acionam o workflow de GitHub Pages. Antes de publicar: typecheck, validação dos vínculos, seed quando aplicável e revisão de `git diff`. Não incluir `.env.local`.

## Segurança

Credenciais antigas aparecem em históricos do Claude. Elas podem ser usadas somente para a tarefa autorizada, mas não devem ser reproduzidas em prompts, relatórios, commits ou mensagens. Recomenda-se rotacioná-las quando a migração estiver estabilizada.
