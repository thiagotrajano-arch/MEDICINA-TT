# Plano Mestre — Extração, Curso e Fontes

> Fonte de verdade operacional criada em 2026-07-28. Este plano separa
> **inventariado**, **convertido**, **analisado**, **integrado** e **publicado**.
> Ter um arquivo em Markdown não significa que o conteúdo já foi revisado
> clinicamente ou incorporado ao site.

## 1. Diagnóstico honesto

| Fonte | Estado confirmado | O que ainda falta |
|---|---|---|
| SISCAD | Estrutura oficial dos 12 períodos mapeada; 37 componentes com estado explícito; 36 planos analisados e 1 indisponível em área privada | Reconsultar somente o plano indisponível e criar atualização semestral reutilizável |
| `Desktop\\MEDICINA` | 1.401 arquivos, 14,24 GB; 1.094 PDFs; nove pastas principais têm cache Markdown | Análise clínica completa, deduplicação, extração de imagens embutidas e integração seletiva |
| Estratégia local | 863 entradas nos ZIPs; 824 nomes iniciais; 34 variantes distintas recuperadas; 858 PDFs distintos preservados | Manifesto unificado e seleção por lacuna clínica; não confundir cobertura temática com extração página a página |
| `RESUMOS` | 30 arquivos, 2.862 páginas; triagem 30/30 concluída | Integração seletiva após validação clínica e respeito aos direitos autorais |
| BBPM/HCPM | HCPM, BBPM III/IV/VII/VIII, LANN, UE e Farmacologia triados | Integrar somente síntese clinicamente validada |
| Imagens clínicas do site | Acervo público existente e registro estruturado | Auditoria exata de IDs/arquivos/licenças; extrair candidatos embutidos e buscar equivalentes licenciados |
| Drive `Resumos e cursos` | Estrutura geral reconhecida em sessão anterior | Conectar o Drive, fazer inventário por metadados, deduplicar e baixar apenas lotes prioritários |

## 2. Regras permanentes

1. PDF entra no fluxo como `PDF -> Markdown em cache -> triagem -> validação -> integração`.
2. Não reler milhares de páginas: inventariar por metadados, priorizar e reutilizar o cache.
3. Material comercial pode orientar estudo privado, mas não deve ser republicado.
4. Imagem no site público exige fonte, autoria/licença e correlação clínica explícitas.
5. Dados pessoais, notas, credenciais e histórico individual ficam fora do repositório público.
6. Cada item terá cinco estados independentes: `inventariado`, `convertido`, `analisado`, `integrado` e `publicado`.
7. Toda publicação exige validação técnica, clínica, de privacidade e de licença.

## 3. Execução em blocos

### Bloco 0 — Fechar a fonte de verdade

- [x] Recontar os PDFs locais e explicar a divergência histórica: 863 entradas, 824 nomes e 858 PDFs distintos após recuperar 34 variantes; 871 era transcrição incorreta.
- [ ] Gerar manifestos com caminho relativo, tamanho, hash, tipo, cache e data de análise.
- [ ] Marcar explicitamente o que é privado, publicável, duplicado ou protegido.
- [ ] Fazer auditoria estrutural do registro atual de figuras e dos arquivos físicos.

**Saída:** inventário único e reproduzível, sem conteúdo pessoal nem credenciais.

### Bloco 1 — SISCAD completo e privado

- [x] Mapear a matriz oficial dos 12 períodos.
- [x] Analisar o desempenho desde o primeiro período em notas privadas do Obsidian.
- [x] Ler seis planos de ensino do período atual.
- [x] Capturar, disciplina por disciplina, plano, ementa, objetivos, programa e avaliação de todos os períodos em que esses dados estiverem disponíveis.
- [ ] Reconsultar o plano atual ainda indisponível.
- [ ] Se houver PDF, convertê-lo uma vez para Markdown antes da leitura.
- [x] Normalizar a coleta em arquivos privados versionados, com origem e data de atualização.

**Saída:** mapa curricular completo e atualizável, sem expor notas ou identificadores.

### Bloco 2 — Aba `Meu Curso` realmente atualizável

- [ ] Separar uma camada pública curricular de uma camada privada de progresso.
- [ ] Criar formulário autenticado para atualizar disciplina, status, datas, temas, documentos, dificuldades e observações.
- [ ] Permitir importação por Markdown/CSV e edição manual.
- [ ] Salvar histórico de alterações e sincronizar somente após revisar autenticação e políticas de acesso.
- [ ] Mostrar por período: disciplinas, planos, progresso, materiais relacionados e próximos estudos.
- [ ] Criar rotina de início de semestre e rotina de encerramento de semestre.

**Saída:** o usuário atualiza os semestres sem precisar editar código.

### Bloco 3 — Pasta local `MEDICINA`

- [x] Inventariar a pasta completa.
- [x] Criar cache Markdown para as nove fontes principais.
- [x] Triar HCPM e BBPM III/IV/VII/VIII.
- [x] Triar LANN, UE e Farmacologia, nesta ordem.
- [x] Triar os 30 arquivos de `RESUMOS`, começando por lacunas reais do site e do semestre.
- [ ] Deduplicar os quatro DOCX de questões contra o banco já publicado.
- [ ] Classificar os materiais restantes por disciplina, subtema, semestre, valor clínico e prioridade OMED.

**Saída:** fila clínica priorizada; nenhum arquivo será integrado apenas porque foi convertido.

### Bloco 4 — Drive `Resumos e cursos`

- [ ] Instalar/conectar o acesso ao Google Drive ou disponibilizar uma cópia local sincronizada.
- [ ] Fazer primeiro um inventário somente por metadados: árvore, contagens, tamanhos, extensões e datas.
- [ ] Comparar hashes/nomes com o acervo local antes de qualquer download.
- [ ] Priorizar: Estratégia 2024 Hematologia/Gastroenterologia; Cirurgia; MEDCOF 2026; Medcurso 2024; Bagagens.
- [ ] Verificar BBPM I/II na Bagagem do Jota, hoje vazios localmente.
- [ ] Baixar e converter apenas o lote escolhido, mantendo cache e proveniência.

**Saída:** catálogo do Drive e fila sem duplicações; não uma cópia indiscriminada de milhares de PDFs.

### Bloco 5 — Imagens clínicas

- [ ] Localizar páginas candidatas nos PDFs por tema, legenda e contexto clínico.
- [ ] Renderizar apenas as páginas relevantes e registrar diagnóstico, modalidade, origem e restrição de uso.
- [ ] Manter separadas as imagens de estudo privado e as autorizadas para publicação.
- [ ] Para material comercial, procurar equivalente aberto/licenciado antes de publicar.
- [ ] Priorizar imagens úteis ao semestre atual e às lacunas do Raio-X OMED.
- [ ] Organizar a aba de mídia por disciplina, tema, subtema, modalidade e caso clínico.
- [ ] Ancorar cada figura em um resumo ou caso, evitando galeria sem contexto.

**Saída:** coleção privada de candidatos e coleção pública auditada.

### Bloco 6 — Conteúdo, casos, questões, mapas e Anki

- [ ] Deduplicar cada descoberta contra a taxonomia e os resumos existentes.
- [ ] Validar condutas clínicas em fontes atuais e primárias antes de publicar.
- [ ] Criar casos clínicos e questões inéditas somente depois da validação do resumo-base.
- [ ] Trabalhar até dez questões por tema/subtema em lotes revisáveis, sem preencher quota com repetição.
- [ ] Criar mapas mentais dos temas prioritários.
- [ ] Gerar flashcards no aplicativo Anki do computador por meio da ponte local já arquitetada, sob pedido do usuário.

**Saída:** conteúdo estudável, rastreável e integrado ao ecossistema local.

### Bloco 7 — Controle de qualidade e publicação

- [ ] Rodar validações de tipos, lint, build e integridade dos dados.
- [ ] Revisar gabaritos, duplicidades, referências, datas clínicas e contradições.
- [ ] Revisar privacidade e direitos autorais.
- [ ] Atualizar Obsidian, handoff e roadmap com evidências do lote.
- [ ] Solicitar autorização específica quando a publicação envolver dados derivados do SISCAD.
- [ ] Publicar somente o lote aprovado e verificar o site no ar.

## 4. Ordem imediata recomendada

1. Bloco 0: reconciliação de inventário e auditoria de figuras.
2. Bloco 3: LANN, UE e Farmacologia.
3. Bloco 1: planos históricos disponíveis no SISCAD.
4. Bloco 2: arquitetura da atualização semestral privada.
5. Bloco 3: os 30 `RESUMOS`.
6. Bloco 4: conectar o Drive e inventariar sem baixar tudo.
7. Bloco 5: imagens clínicas orientadas pelas lacunas reais.
8. Blocos 6 e 7: integrar, validar e publicar em lotes.

## 5. Critério de conclusão

Uma fonte só será considerada **concluída** quando existir um manifesto completo,
os itens úteis tiverem sido analisados, duplicidades e restrições tiverem sido
registradas e os destinos tiverem sido decididos. “Convertido para Markdown” ou
“arquivo localizado” não equivale a “conteúdo concluído”.
