# Plano de Conclusão — Próximos 100 Passos

> Criado em 2026-07-28 a partir de `PROXIMOS-PASSOS.md`, do plano mestre de
> extração, do handoff e da auditoria atual. A ordem é deliberada: primeiro
> segurança, proveniência e qualidade; depois integração; por último expansão.
> Material comercial, dados do SISCAD e credenciais nunca entram no repositório
> público. Cada lote clínico exige fonte atual, revisão de gabarito, licença e
> validação técnica antes de publicação.

## Marco de conclusão

O projeto estará operacionalmente concluído quando o acervo tiver proveniência e
estado rastreáveis; a camada privada do curso puder ser atualizada sem código; o
conteúdo publicado tiver passado por portão editorial; mídia, mapas e Anki forem
usáveis e auditáveis; e o site, a sincronização e a documentação forem validados
em produção. Isso não significa encerrar futuras atualizações médicas.

## 1. Fonte de verdade, inventário e privacidade (1–15)

> Requisito longitudinal adicionado: **todo material já acessado** — SISCAD, acervo local, Drive autorizado, PDFs, DOCX, caches Markdown, resumos, questões, casos, mapas e mídia — será ligado às matérias e períodos já cursados. Os arquivos privados `Fundamentos_MFC_por_Subtema_OMED_VI.md` e `Cross-Referencia_Ciencias_Basicas_por_Subtema_OMED_VI.md` são apenas duas fontes dessa matriz. Ciências Básicas do primeiro semestre permanecem uma camada de revisão permanente; MFC mantém seus fundamentos próprios de epidemiologia, SUS e abordagem familiar.

- [x] 1. Confirmar o snapshot inicial do repositório e do cofre privado antes do próximo lote.
- [x] 2. Criar manifesto unificado das fontes locais com caminho relativo, tamanho, tipo e data.
- [x] 3. Calcular hash dos arquivos elegíveis e registrar cópias idênticas sem apagar originais.
- [x] 4. Marcar cada fonte como privada, publicável, duplicada, protegida ou pendente de revisão.
- [x] 5. Relacionar cada cache Markdown à sua fonte e registrar limitações de extração/OCR.

> Bloco 1 concluído em 2026-07-29, em área privada: 1.161 arquivos inventariados, todos com SHA-256, cinco grupos de cópias idênticas preservadas e 253 ligações diretas com cache Markdown. O catálogo de conversão separa texto, extração parcial, páginas sem camada textual e erros históricos; nenhum conteúdo ou metadado pessoal foi publicado.
- [x] 6. Criar relatório de divergências entre ZIPs, PDFs soltos, cache e inventário histórico.
- [x] 7. Consolidar a matriz `fonte → componente/período do curso → disciplina → tema → subtema → destino permitido`, incluindo os eixos de Ciências Básicas quando forem pertinentes.
- [x] 8. Separar, no manifesto, evidência de estudo privado de material apto ao site público.
- [x] 9. Revisar o registro de figuras: IDs, arquivo físico, fonte, autoria, licença e âncora.
- [x] 10. Registrar as lacunas visuais honestas que continuam sem fonte aberta clinicamente adequada.
- [x] 11. Criar checklist único de privacidade para SISCAD, Drive, PDFs comerciais e imagens.
- [x] 12. Auditar `.gitignore` e o histórico recente para garantir que arquivos locais não entrem no Git.
- [ ] 13. Testar restauração do backup lógico do Supabase em ambiente seguro, sem dados pessoais.
- [x] 14. Documentar responsáveis, origem e data de revisão para cada artefato novo.
- [x] 15. Publicar somente a documentação sanitizada do inventário, quando o lote estiver revisado.

> Passo 15 concluído em 2026-07-29: o lote sanitizado de inventário, privacidade,
> lacunas visuais, responsáveis e restore preparado foi publicado sem acervo privado,
> dados pessoais ou credenciais.

## 2. Curso, SISCAD e atualização semestral privada (16–28)

- [ ] 16. Reconsultar o único plano de ensino do SISCAD que estava indisponível.
- [ ] 17. Converter esse plano para Markdown antes da leitura, se ele estiver em PDF.
- [ ] 18. Atualizar a matriz privada dos 12 períodos com origem, data e vínculos para conteúdos de revisão.
- [ ] 19. Comparar planos, ementas e objetivos com a matriz curricular e ligar cada matéria já cursada aos temas, resumos, questões, casos e mídia correspondentes.
- [ ] 20. Registrar somente diferenças curriculares relevantes, sem copiar dados pessoais ao repositório.
- [ ] 21. Definir o esquema da camada privada do curso: disciplina, período, status, datas e dificuldades.
- [ ] 22. Separar definitivamente o catálogo público de disciplinas do progresso acadêmico privado.
- [ ] 23. Criar formulário autenticado de atualização semestral para o próprio usuário.
- [ ] 24. Permitir importar atualização privada por Markdown e por CSV com pré-visualização.
- [ ] 25. Implementar edição manual, validação de campos e confirmação antes de salvar alterações.
- [ ] 26. Guardar histórico de alterações, origem e data sem expor informações sensíveis.
- [ ] 27. Exibir, no painel privado, disciplinas, documentos, lacunas, próximos estudos e materiais relacionados, inclusive das matérias já concluídas.
- [ ] 28. Criar rotinas reutilizáveis de abertura, acompanhamento, encerramento e revisão longitudinal por período/matéria.

## 3. Drive e acervo local: ingestão seletiva (29–42)

- [ ] 29. Conectar o Google Drive com autorização própria e IDs de pasta, sem reutilizar credenciais de terceiros.
- [ ] 30. Inventariar primeiro apenas metadados do Drive: árvore, nomes, datas, extensão e tamanho.
- [ ] 31. Comparar nomes e hashes do Drive com o manifesto local antes de baixar qualquer arquivo.
- [ ] 32. Priorizar a seleção de fontes por lacuna real do site, semestre atual, matérias já cursadas e peso da OMED.
- [ ] 33. Verificar Estrategia 2024 para Hematologia e Gastroenterologia apenas no recorte prioritário.
- [ ] 34. Catalogar Cirurgia, MEDCOF 2026 e Medcurso 2024 antes de qualquer conversão.
- [ ] 35. Triar as pastas Bagagem e verificar se BBPM I/II possuem conteúdo real distinto.
- [ ] 36. Baixar somente um lote aprovado por vez e manter origem, hash e cache de conversão.
- [ ] 37. Converter PDFs selecionados para Markdown e registrar páginas sem camada textual.
- [ ] 38. Aplicar OCR ou solicitar reexportação apenas onde a página relevante não for legível.
- [ ] 39. Reprocessar os PDFs com trailer malformado por rota segura, sem insistir em parser falho.
- [ ] 40. Deduplicar os quatro DOCX de questões contra o banco publicado antes de adaptar qualquer item.
- [ ] 41. Classificar os materiais restantes por componente curricular, disciplina, subtema, semestre, eixo básico, valor clínico e prioridade OMED.
- [ ] 42. Atualizar o Obsidian e o manifesto ao fechar cada fonte, inclusive as rejeitadas.

## 4. Portão editorial e conteúdo clínico prioritário (43–61)

- [x] 43. Estabelecer o relatório-base de qualidade por disciplina: comentários repetidos, curtos e sem fonte.

> Passo 43 concluído em 2026-07-29: `docs/RELATORIO-QUALIDADE-QUESTOES.md` e
> `npm run audit:questoes` registram uma linha de base reproduzível sem expor
> enunciados ou fontes privadas. A próxima frente é Infectologia (44–46).
- [ ] 44. Revisar primeiro o lote de Infectologia de maior peso OMED.
- [ ] 45. Diferenciar e ampliar os comentários das alternativas de Infectologia, mantendo uma correta.
- [ ] 46. Confirmar todas as condutas de Infectologia em diretrizes vigentes e nomeadas.
- [ ] 47. Revisar, depois, o lote prioritário de Ginecologia e Obstetrícia.
- [ ] 48. Atualizar condutas obstétricas e ginecológicas contra diretrizes vigentes antes de qualquer expansão.
- [ ] 49. Revisar o lote de Pediatria com o mesmo portão editorial.
- [ ] 50. Revisar Cirurgia, depois MFC, priorizando itens com maior risco de gabarito desatualizado.
- [ ] 51. Revisar Cardiologia, Neurologia e Pneumologia por alto rendimento e data de diretriz.
- [ ] 52. Revisar Nefrologia contra a versão vigente do KDIGO, incluindo recomendações de nefroproteção.
- [ ] 53. Revisar Gastroenterologia, Endocrinologia e Hematologia contra suas fontes primárias atuais.
- [ ] 54. Revisar Oncologia, Otorrinolaringologia, Reumatologia e Dermatologia em lotes pequenos.
- [ ] 55. Criar ou atualizar resumos somente para subtemas com lacuna confirmada pelo manifesto.
- [ ] 56. Usar conteúdo comercial apenas como orientação privada; redigir síntese original e verificável.
- [ ] 57. Garantir que todo resumo tenha referência clínica, data de revisão e ligação com a taxonomia.
- [ ] 58. Completar blocos clínicos insuficientes sem estender artificialmente o texto.
- [ ] 59. Registrar decisões editoriais, fontes rejeitadas e incertezas no Obsidian.
- [ ] 60. Atualizar o Raio-X OMED com contagem programática rastreável por disciplina e subtema.
- [ ] 61. Repriorizar o backlog usando o novo Raio-X, o semestre e os erros reais do usuário.

## 5. Questões, casos e simulados (62–73)

- [ ] 62. Produzir um relatório de duplicidade entre questões existentes, fontes locais e Drive.
- [ ] 63. Corrigir primeiro as questões com comentário repetido, curto ou sem referência.
- [ ] 64. Validar cada gabarito resolvendo a questão contra diretriz antes de vê-lo como definitivo.
- [ ] 65. Importar/adaptar somente questões com enunciado suficiente e proveniência registrada.
- [ ] 66. Gerar questões inéditas somente após a validação do resumo-base correspondente.
- [ ] 67. Trabalhar em lotes de até dez questões por tema/subtema, sem meta artificial de volume.
- [ ] 68. Criar casos clínicos originais para lacunas de raciocínio, com etapas reveláveis e referências.
- [ ] 69. Garantir cobertura mínima de casos nas disciplinas prioritárias antes de criar casos periféricos.
- [ ] 70. Converter as cinco questões discursivas de GO, se aprovadas editorialmente, em casos ou formato próprio.
- [ ] 71. Extrair provas OMED II–V somente quando a questão puder ser contextualizada e revalidada.
- [ ] 72. Montar simulados por peso OMED, dificuldade, tema e erros recentes, sem repetir itens respondidos.
- [ ] 73. Validar no navegador que a fila, revisão intencional, sincronização e dashboard refletem os dados reais.

## 6. Mídia clínica e biblioteca visual (74–83)

- [ ] 74. Localizar páginas candidatas a imagens nos caches Markdown por tema, legenda, contexto e vínculo com a matéria cursada.
- [ ] 75. Renderizar somente páginas selecionadas e registrar diagnóstico, modalidade e restrição de uso.
- [ ] 76. Manter separado o acervo privado de estudo e o acervo público licenciado.
- [ ] 77. Buscar equivalentes abertos somente para lacunas clínicas reais e de alto retorno.
- [ ] 78. Validar autoria, fonte, licença, tipo de arquivo e correlação clínica antes de baixar cada imagem.
- [ ] 79. Tratar imagens clínicas como recurso central: priorizar lacunas de GO, Pediatria, Cirurgia e as onze imagens ainda indisponíveis, sempre com licença verificável.
- [ ] 80. Ancorar toda figura pública em um bloco específico de resumo ou caso clínico.
- [ ] 81. Organizar a aba Mídia por disciplina, componente/período cursado, tema, subtema, modalidade e caso relacionado.
- [ ] 82. Criar filtros de fonte/licença e indicar claramente imagens apenas de referência visual.
- [ ] 83. Rodar auditoria de arquivos, IDs, âncoras, créditos e licenças antes de cada publicação.

## 7. Mapas mentais, Anki e segundo cérebro (84–91)

- [ ] 84. Manter a lista pública de 60 mapas ligada apenas a resumos já publicados e revisados, com filtro futuro por matéria/período já cursado.
- [ ] 85. Transformar os temas prioritários em mapas mentais verdadeiros, começando pelos dez já curados e incluindo as conexões de Ciências Básicas pertinentes.
- [ ] 86. Completar mapas individuais para os demais temas prioritários sem reduzir o mapa a uma lista de links.
- [ ] 87. Ligar cada mapa a resumo, questões, caso, mídia e referências no Obsidian.
- [ ] 88. Validar a ponte AnkiConnect com o aplicativo Anki Desktop aberto, sem enviar dados ao site.
- [ ] 89. Criar o primeiro deck de teste a partir de um resumo aprovado e confirmar que não há duplicação.
- [ ] 90. Criar fluxo de flashcards baseados em erros de questões e revisar a qualidade dos cartões.
- [ ] 91. Documentar backup/exportação nativa `.apkg`, CSV de contingência e recuperação do fluxo Anki.

## 8. Produto, autenticação e progresso (92–96)

- [ ] 92. Ajustar no painel do Supabase o Site URL e a allowlist de redirecionamento para o domínio público.
- [ ] 93. Testar, com a conta do usuário e sem registrar senha, login, recuperação de acesso e sessão persistente.
- [ ] 94. Realizar teste ponta a ponta de respostas, simulados, resumos e casos em dois dispositivos/sessões.
- [ ] 95. Confirmar RLS, ausência de chaves privilegiadas no cliente e tratamento de falhas de rede.
- [ ] 96. Melhorar feedback de sincronização, conflito e recuperação local no dashboard sem alterar dados indevidamente.

## 9. Fechamento, publicação e manutenção (97–100)

- [ ] 97. Rodar typecheck, lint, build, seed quando aplicável e auditoria de integridade antes de cada lote público.
- [ ] 98. Fazer revisão final de privacidade, direitos autorais, fontes, gabaritos, links e acessibilidade.
- [ ] 99. Atualizar handoff, plano mestre, próximos passos e Obsidian com evidências, limites e pendências reais.
- [ ] 100. Publicar somente o lote aprovado, confirmar o deploy em produção e registrar a versão de retorno.

## Regra de execução

Executar em blocos de 5 a 15 passos dependentes; fechar o bloco com evidência e atualização do
Obsidian antes de passar ao seguinte. Pedir autorização específica somente para ações externas ou
irreversíveis (painel do Supabase, download de material novo, publicação de conteúdo clínico ou
qualquer dado derivado do SISCAD).
