# Checklist de Privacidade e Publicação

Use esta lista antes de integrar ou publicar qualquer lote do Codex Medicus.

## Dados e fontes privadas

- [ ] Não incluir identificadores, notas, frequência, matrículas, docentes ou URLs internas do SISCAD.
- [ ] Não versionar PDFs, DOCX, caches Markdown, material comercial, conteúdo integral de Drive ou caminhos pessoais.
- [ ] Manter segredos somente em variáveis locais/Secrets do GitHub; nunca registrar valores em código, documentação, logs ou commits.
- [ ] Tratar fonte comercial como evidência privada: publicar somente síntese original validada em fonte clínica atual.

## Conteúdo e mídia pública

- [ ] Confirmar fonte clínica atual, data de revisão e taxonomia para cada resumo, questão ou caso novo.
- [ ] Conferir gabarito, alternativas, referências e ausência de duplicidade antes de publicar questão.
- [ ] Para cada imagem: arquivo local, fonte, autoria, licença e âncora clínica explícita.
- [ ] Não usar imagem de curso, livro, busca genérica ou galeria sem contexto como mídia pública.

## Revisão técnica antes de publicar

- [ ] Revisar `git status`, `git diff` e `git diff --check`.
- [ ] Confirmar que `.env*`, artefatos locais gerados e exports permanecem ignorados.
- [ ] Procurar por anexos privados, caminhos locais e valores de segredo no conjunto a commitar.
- [ ] Executar as validações proporcionais ao lote: tipos, lint, build, seed quando aplicável e integridade de vínculos.
- [ ] Atualizar handoff, próximos passos e Obsidian com evidências e limitações reais.

## Ações externas

- [ ] Drive: inventariar metadados e deduplicar antes de baixar qualquer lote.
- [ ] SISCAD: separar currículo confirmável de qualquer dado individual.
- [ ] Supabase: ações de painel, restore e alterações de autenticação exigem ambiente seguro e confirmação de impacto.
- [ ] Publicar somente documentação sanitizada ou lote aprovado; confirmar o deploy depois.
