# Plano de Conclusão — Próximos 100 Passos

> Criado em 2026-07-28 a partir de `PROXIMOS-PASSOS.md`, do plano mestre de
> extração, do handoff e da auditoria atual. A ordem é deliberada: primeiro
> segurança, proveniência e qualidade; depois integração; por último expansão.
> Material comercial, dados do SISCAD e credenciais nunca entram no repositório
> público. Cada lote clínico exige fonte atual, revisão de gabarito, licença e
> validação técnica antes de publicação.

> **Ordem de execução confirmada pelo usuário em 2026-07-29:** aplicar
> `docs/ORDEM-MESTRA-ACERVO-MIDIA-MAPAS-DESIGN.md`. Após os portões técnicos,
> a sequência é acervo/Drive → correlação com semestres cursados → conteúdo
> validado → mídia clínica → mapas conceituais reais → Anki → design visual.
> A numeração abaixo organiza dependências, mas não autoriza antecipar Anki ou
> redesign antes das etapas anteriores.

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
- [x] 18. Atualizar a matriz privada dos 12 períodos com origem, data e vínculos para conteúdos de revisão.
- [ ] 19. Comparar planos, ementas e objetivos com a matriz curricular e ligar cada matéria já cursada aos temas, resumos, questões, casos e mídia correspondentes.
- [ ] 20. Registrar somente diferenças curriculares relevantes, sem copiar dados pessoais ao repositório.
- [x] 21. Definir o esquema da camada privada do curso: disciplina, período, status, datas e dificuldades.
- [x] 22. Separar definitivamente o catálogo público de disciplinas do progresso acadêmico privado.
- [x] 23. Criar formulário autenticado de atualização semestral para o próprio usuário.
- [x] 24. Permitir importar atualização privada por Markdown e por CSV com pré-visualização.
- [x] 25. Implementar edição manual, validação de campos e confirmação antes de salvar alterações.
- [x] 26. Guardar histórico de alterações, origem e data sem expor informações sensíveis.
- [ ] 27. Exibir, no painel privado, disciplinas, documentos, lacunas, próximos estudos e materiais relacionados, inclusive das matérias já concluídas.
- [ ] 28. Criar rotinas reutilizáveis de abertura, acompanhamento, encerramento e revisão longitudinal por período/matéria.

> Passo 22 concluído em 2026-07-29: a rota pública de trilhas foi reduzida a
> ciclos genéricos e passou a ter auditoria estática. O mapa individual segue
> no cofre privado até existir uma camada autenticada revisada (23–28).

> Passos 21 e 23–26 concluídos em 2026-07-29: a rota autenticada `/meu-curso`
> ganhou tabela privada por conta, edição manual, rascunho local, importação
> Markdown/CSV com pré-visualização e confirmação, e histórico mínimo sem
> observações. As tabelas têm RLS por `owner_id`, acesso anônimo revogado e
> permissões autenticadas restritas às operações necessárias. Falta a matriz
> curricular privada completa e o painel ampliado de materiais/lacunas (27–28).

> Primeiro recorte do passo 27 entregue em 2026-07-29: o painel privado agora
> deriva, da taxonomia pública, contagens de resumos, questões, casos e figuras
> ancoradas; sugere um próximo tópico por status/dificuldade; e mostra lacunas
> de conteúdo publicado. O passo permanece aberto até incluir vínculos privados
> reais de materiais/documentos e a matriz curricular longitudinal (18–20).

> Passo 18 concluído em 2026-07-29 no cofre privado: [[Matriz Longitudinal -
> Cobertura Operacional 2026-07-29]] organiza os 12 semestres, os 37
> componentes catalogados e as famílias de fonte já acessadas por destino de
> revisão permitido. Ainda faltam os vínculos revisados plano → tema → subtema
> dos passos 19–20; nenhum documento privado foi enviado ao site.

## 3. Drive e acervo local: ingestão seletiva (29–42)

- [x] 29. Conectar o Google Drive com autorização própria e IDs de pasta, sem reutilizar credenciais de terceiros.
- [x] 30. Inventariar primeiro apenas metadados do Drive: árvore, nomes, datas, extensão e tamanho.
- [ ] 31. Comparar nomes e hashes do Drive com o manifesto local antes de baixar qualquer arquivo.
- [x] 32. Priorizar a seleção de fontes por lacuna real do site, semestre atual, matérias já cursadas e peso da OMED.
- [x] 33. Verificar Estrategia 2024 para Hematologia e Gastroenterologia apenas no recorte prioritário.
- [x] 34. Catalogar Cirurgia, MEDCOF 2026 e Medcurso 2024 antes de qualquer conversão.
- [x] 35. Triar as pastas Bagagem e verificar se BBPM I/II possuem conteúdo real distinto.
- [ ] 36. Baixar somente um lote aprovado por vez e manter origem, hash e cache de conversão.
- [ ] 37. Converter PDFs selecionados para Markdown e registrar páginas sem camada textual.
- [ ] 38. Aplicar OCR ou solicitar reexportação apenas onde a página relevante não for legível.
- [ ] 39. Reprocessar os PDFs com trailer malformado por rota segura, sem insistir em parser falho.
- [x] 40. Deduplicar os quatro DOCX de questões contra o banco publicado antes de adaptar qualquer item.
- [ ] 41. Classificar os materiais restantes por componente curricular, disciplina, subtema, semestre, eixo básico, valor clínico e prioridade OMED.
- [ ] 42. Atualizar o Obsidian e o manifesto ao fechar cada fonte, inclusive as rejeitadas.

> Atualização de 2026-08-01: o conector já autenticado percorreu o inventário
> paginado (1.705 PDFs e 157 DOCX) e fechou a triagem prioritária de OMED,
> Estratégia, MEDCOF, Medcurso e Bagagens sem novo login. O lote clínico mais
> recente catalogou 78 eixos em Pediatria, Cirurgia, Cardiologia, Pneumologia,
> Neurologia, MFC, Psiquiatria e Urgência/Emergência. Uma fonte foi bloqueada
> por proibição expressa de uso com IA. Os passos 31 e 36–39 continuam abertos:
> o conector fornece texto, mas não um binário local utilizável para SHA-256,
> deduplicação por bytes, OCR e renderização. Os quatro DOCX locais, por outro
> lado, tiveram SHA-256 confirmado, 420 questões únicas, caches completos e
> zero duplicatas textuais fortes contra as 1.072 questões publicadas.

> Reconciliação local complementar em 2026-08-01: 1.143 de 1.144 fontes da pasta
> médica principal já constam no manifesto; a exceção é um temporário inválido.
> Existem 253 caches íntegros e 878 fontes médicas sem cache. Foram identificadas
> 81 mídias em OOXML, 32 arquivos pequenos/médios ausentes do manifesto, 53
> arquivos grandes ainda apenas catalogados e dois PDFs estruturalmente
> anômalos. Os 32 incluem seis pares Markdown e dois pares PDF duplicados entre
> raízes; a cópia canônica ainda precisa ser escolhida. Isso mantém 36–39
> abertos e define a fila seletiva; não autoriza conversão em massa.

## 4. Portão editorial e conteúdo clínico prioritário (43–61)

- [x] 43. Estabelecer o relatório-base de qualidade por disciplina: comentários repetidos, curtos e sem fonte.

> Passo 43 concluído em 2026-07-29: `docs/RELATORIO-QUALIDADE-QUESTOES.md` e
> `npm run audit:questoes` registram uma linha de base reproduzível sem expor
> enunciados ou fontes privadas. A próxima frente é Infectologia (44–46).
- [ ] 44. Revisar primeiro o lote de Infectologia de maior peso OMED.
- [ ] 45. Diferenciar e ampliar os comentários das alternativas de Infectologia, mantendo uma correta.
- [ ] 46. Confirmar todas as condutas de Infectologia em diretrizes vigentes e nomeadas.

> Três micro-lotes clínicos foram registrados em 2026-07-29:
> `docs/REVISAO-INFECTOLOGIA-LOTE-1.md` atualiza quatro itens STORCH e
> `docs/REVISAO-INFECTOLOGIA-LOTE-2.md` revisa duas questões de imunizações,
> eliminando a única repetição normalizada, e
> `docs/REVISAO-INFECTOLOGIA-LOTE-3.md` revisa um item de sífilis. A auditoria
> atual marca 33 comentários curtos em 21 questões; os passos 44–46 continuam
> abertos até a revisão integral, item a item, do lote prioritário.
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
- [x] 63. Corrigir primeiro as questões com comentário repetido, curto ou sem referência.
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
- [x] 76. Manter separado o acervo público próprio/licenciado e a biblioteca privada autenticada, com arquivos fora do repositório e do GitHub Pages.
- [ ] 77. Buscar equivalentes abertos somente para lacunas clínicas reais e de alto retorno.
- [ ] 78. Validar autoria, fonte, licença, tipo de arquivo e correlação clínica antes de baixar cada imagem.
- [ ] 79. Tratar imagens clínicas como recurso central: priorizar lacunas de GO, Pediatria, Cirurgia e as onze imagens ainda indisponíveis, sempre com licença verificável.
- [ ] 80. Ancorar toda figura pública em um bloco específico de resumo ou caso clínico.
- [ ] 81. Organizar a aba Mídia por disciplina, componente/período cursado, tema, subtema, modalidade e caso relacionado.
- [ ] 82. Criar filtros de fonte/licença e indicar claramente imagens apenas de referência visual.
- [ ] 83. Rodar auditoria de arquivos, IDs, âncoras, créditos e licenças antes de cada publicação.

> Arquitetura obrigatória da biblioteca privada: reutilizar o login existente;
> bucket privado no Supabase Storage; objetos sob pasta do `auth.uid()`; metadados
> e políticas RLS por proprietário; URLs assinadas de curta duração. Capturas de
> PDFs comerciais registram origem/página. Imagens de pacientes só entram após
> anonimização e autorização apropriada. Nenhuma dessas imagens pode existir em
> `public/`, no Git, no bundle estático ou ser servida por URL pública permanente.
>
> Passo 76 concluído em 2026-07-29: `/minha-midia` usa bucket privado,
> metadados/objetos escopados ao proprietário e URLs assinadas por cinco minutos.
> A migration foi aplicada e validada estruturalmente; falta o teste funcional com
> a conta real e o primeiro lote curado de imagens.

## 7. Mapas mentais, Anki e segundo cérebro (84–91)

- [ ] 84. Manter a lista pública de 60 mapas ligada apenas a resumos já publicados e revisados, com filtro futuro por matéria/período já cursado.
- [ ] 85. Transformar os temas prioritários em mapas mentais verdadeiros, começando pelos dez já curados e incluindo as conexões de Ciências Básicas pertinentes.
- [ ] 86. Completar mapas individuais para os demais temas prioritários sem reduzir o mapa a uma lista de links.
- [ ] 87. Ligar cada mapa a resumo, questões, caso, mídia e referências no Obsidian.
- [x] 88. Validar a ponte AnkiConnect com o aplicativo Anki Desktop aberto, sem enviar dados ao site.
- [x] 89. Criar o primeiro deck de teste a partir de um resumo aprovado e confirmar que não há duplicação.
- [ ] 90. Criar fluxo de flashcards baseados em erros de questões e revisar a qualidade dos cartões.
- [ ] 91. Documentar backup/exportação nativa `.apkg`, CSV de contingência e recuperação do fluxo Anki.

> Anki foi reposicionado pelo usuário para o fim da construção educacional.
> Executar 88–91 somente depois de consolidar o acervo útil, a correlação
> curricular, a mídia clínica e os mapas mentais prioritários.

## 8. Produto, autenticação e progresso (92–96)

- [x] 92. Ajustar no painel do Supabase o Site URL e a allowlist de redirecionamento para o domínio público.
- [ ] 93. Testar, com a conta do usuário e sem registrar senha, login, recuperação de acesso e sessão persistente.
- [ ] 94. Realizar teste ponta a ponta de respostas, simulados, resumos e casos em dois dispositivos/sessões.
- [ ] 95. Confirmar RLS, ausência de chaves privilegiadas no cliente e tratamento de falhas de rede.
- [ ] 96. Melhorar feedback de sincronização, conflito e recuperação local no dashboard sem alterar dados indevidamente.

> Passo 92 concluído em 2026-07-29: o painel do Supabase confirma o domínio
> GitHub Pages como Site URL e permite o redirecionamento exato usado pelo
> aplicativo. Os testes reais de login, recuperação, sessão persistente e
> sincronização continuam separados nos passos 93–96, sem registrar senha.

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

## Fase posterior ao passo 100 — design visual

O redesign geral do site será feito somente após a consolidação funcional. Essa
fase deve melhorar hierarquia, organização, navegação, responsividade,
acessibilidade e consistência visual sem misturar mudanças clínicas, de banco ou
de sincronização no mesmo lote.
## Atualizacao operacional - 2026-08-01

O lote privado do Drive avancou sem encerrar a etapa inteira: houve inventario amplo, materializacao seletiva, SHA-256, cache Markdown, imagens extraidas, renderizacao/OCR seletivos e vinculos curriculares candidatos. Nao marcar os passos 31, 36 a 42 como concluidos globalmente: ainda faltam candidatos unicos, comparacao ampla de hashes e revisao manual. Nenhum material privado foi publicado.

Auditoria atual do banco publico: 1.072 questoes, zero repeticoes, comentarios curtos, comentarios vazios ou fontes ausentes. Os proximos itens editoriais sao revisao clinica por diretriz vigente e expansao somente de lacunas comprovadas.

## Reconciliação operacional — 2026-08-03

- Os passos 88 e 89 foram executados localmente via AnkiConnect e agora estão marcados como concluídos.
- Os passos 90 e 91 continuam pendentes: fluxo de cartões derivado de erros e documentação/teste de backup `.apkg` e CSV.
- O passo 97 continua pendente para o commit de integração do Anki porque a build local excedeu o limite de execução nesta rodada; não confundir os checks anteriores com uma validação final desse commit.
- O passo 100 continua pendente: o commit `f319ede` ainda precisa de publicação e confirmação do GitHub Actions antes de ser considerado entregue no site.
