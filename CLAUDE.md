# Codex Medicus — contexto para Claude

Leia nesta ordem antes de alterar o projeto:

1. `AGENTS.md`
2. `docs/AI-HANDOFF.md`
3. `docs/MEMORIA-CONSOLIDADA.md`
4. `docs/PROMPTS-MASTER.md`
5. `PROXIMOS-PASSOS.md`
6. `docs/PLANO-INTEGRACAO-MEDICINA-DESKTOP.md`
7. `docs/ROADMAP-50-PASSOS.md`

## Regras permanentes

- Nunca registrar, exibir, copiar ou commitar credenciais, arquivos `.env*`, senhas, tokens ou chaves.
- O conteúdo médico deve ser verificável, atualizado por diretrizes vigentes e revisado antes de publicação.
- Preserve alterações locais de outros agentes. Confira `git status` e o diff antes de editar ou publicar.
- O site publica a partir de `main` por GitHub Pages. Antes de publicar: `npm run typecheck`, `npm run lint`, `npm run build` e revisão de `git diff`.
- Após cada lote de até 15 blocos de trabalho, atualize o `Codex Medicus Dashboard.md` no cofre Obsidian com estado, validações, pendências e próximo passo.

## Estado recuperado em 2026-07-26

Os arquivos gerados pelo Claude para Endocrinologia, Hematologia, Nefrologia e Gastroenterologia foram recuperados do scratchpad temporário e integrados localmente. A validação de produção gerou 351 páginas sem erro. Uma correção clínica foi aplicada em Pancreatite Aguda: a hidratação deve ser precoce, moderada e guiada por metas, não "vigorosa" como regra fixa.

Pendências clínicas prioritárias: Hepatites Virais, revisão dirigida dos demais subtemas novos e continuidade da extração planejada. A integração com Anki permanece pendente e só deve ser iniciada quando solicitada explicitamente.
