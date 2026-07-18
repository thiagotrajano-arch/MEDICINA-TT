# Prompts-Master — Codex Medicus

> Documento de referência permanente. A rotina diária das 6h e qualquer sessão
> de trabalho devem consultá-lo. Reescrito só quando o usuário pedir.

---

## REGRA DE ORDEM (vale para TODOS os prompts)

Priorizar sempre pela **relevância na OMED** conforme o **Raio-X** (`../RAIO-X-OMED.md`
e `C:\Users\Adm\Desktop\med\RAIO-X-OMED.md`): foco no **Ciclo Clínico, fases 1 e 2**.

**Ordem de disciplinas por peso/rendimento:**
1. **Infectologia** (maior volume/densidade)
2. **Ginecologia & Obstetrícia**
3. **Pediatria**
4. **Cirurgia**
5. **MFC / Medicina de Família / Metodologia**
6. Clínica Médica (transversal)

Dentro de cada disciplina, priorizar os subtemas marcados `altoRendimento` na taxonomia.

---

## FONTES DE CONTEÚDO (usar nesta ordem)

1. **Estratégia MED — PDFs já extraídos** (fonte mais nova e mais densa; ver seção própria
   abaixo "CURSO ESTRATÉGIA MED" para estrutura completa e mapeamento por disciplina):
   `C:\Users\Adm\Desktop\MEDICINA\_pdfs-estrategia\<DISCIPLINA>\` — Slides, Mapas Mentais e
   Flashcards em PDF, um arquivo por tópico, nome do arquivo já contém o nome do tópico.
2. **Histórico das conversas do Claude** — muitos PDFs foram colados nas mensagens e
   permanecem no contexto (bancos de questões OMED, simulados comentados, resumos).
3. **Google Drive do usuário** (ferramentas `mcp__…__search_files` / `read_file_content`):
   - Pastas-chave: **"Resumos e cursos"**, **"MEDICINA"** (aba do site), **"RESUMOS"**, **"HCPM"**.
   - Google Docs OMED já mapeados: `Banco de Questões OMED: Ginecologia e Obstetrícia`
     (`1843iScXNAjOR8pj_LraTF-gzSEcX0xOR7Y2Silvc4Hk`), `simulado indectologia`
     (`1ICb-YzIKgIpgLMvEQZfxxBkSw-8fng7WNU8namooguE`), `Simulado de Pediatria 1`
     (`1LbjYvrqeF3N6u3ieuDAjlhxo7YrgGKblfVkhAy2vI_I`), `omed abertas go ped`
     (`19PczBChHRbjwOMBCyOUSpgBJzSy8UIeetl-nr8ds4mM`).
4. **Pastas locais** (via Cowork / filesystem):
   - `C:\Users\Adm\Desktop\MEDICINA\` (RESUMOS, HCPM, Farmacologia, BBPM I–VIII, UE, livros gerais, `NEOPLASIA TUDO.docx`, `IMUNO RADIO E FARMACOLOGIA.docx`, `OTORRINO QUESTOES PROVA.docx`).
   - `C:\Users\Adm\Downloads\Estratégia 2024 Extensivo\` (Extensivo + Atualizações Residência/Revalida — pasta antiga, verificar se ainda existe).
   - ZIPs em Downloads: `BAGAGEM GABS`, `BAGAGEM DO JOTA`, `00. Materiais` (extrair sob demanda).
     ⚠️ **Downloads volta a ser uma fonte válida** (o usuário repovoou a pasta em 2026-07-18
     com os 33 ZIPs do Estratégia MED — a advertência antiga de "pasta vazia, não usar" não
     vale mais para esse lote). Os ZIPs em si (~2 GB cada, contêm videoaulas) continuam em
     Downloads só como backup do usuário — **não precisa reabri-los**, os PDFs relevantes já
     foram extraídos para `_pdfs-estrategia` (ver acima).
5. **Diretrizes e livros** (para complementar/atualizar — MBE): MS, FEBRASGO, SBP, ACOG,
   IDSA, AHA/ESC/ACC, ADA, KDIGO, GOLD, GINA, Surviving Sepsis, TG18, WSES; Harrison,
   Sabiston, Nelson, Zugaib, Williams, Robbins, etc.

---

## CURSO ESTRATÉGIA MED (novo, 2026-07-18 — 33 ZIPs, ~66 GB brutos)

O usuário enviou o export completo do Google Drive de um curso (Estratégia MED, aulas
"Extensivo") em 5 disciplinas: GINECOLOGIA, OBSTETRÍCIA, PEDIATRIA, PREVENTIVA, INFECTOLOGIA.
Cada ZIP é uma fatia (Google Drive quebra pastas grandes em partes `-1-NNN.zip`); dentro,
a estrutura é **por tópico**:

```
<DISCIPLINA>/NN. Nome do Tópico-<hash>/NN. Nome do Tópico/
  Videoaulas (N)/*.mp4        ← videoaulas — NÃO extrair (enorme, sem transcrição disponível)
  Slide (N)/*.pdf             ← slide de aula e/ou "slide resumo" (mais denso)
  Mapa Mental (N)/*.pdf       ← mapa mental do tópico
  Flashcard (N)/*.pdf         ← flashcards de revisão rápida
```

**Só os PDFs foram extraídos** (os `.mp4` ficam nos ZIPs originais em Downloads — não
apagar os ZIPs, são o backup do usuário) para:
`C:\Users\Adm\Desktop\MEDICINA\_pdfs-estrategia\<DISCIPLINA>\` — pasta **plana** (sem
subpastas), o nome do tópico já vem no nome do arquivo (ex.: `Slide Aula - Bronquiolite.pdf`,
`Mapa Mental - Cefaleias na Infância.pdf`, `Flashcard - Amenorreia.pdf`). Use o nome do
arquivo para casar com o subtema certo na taxonomia.

**Mapeamento disciplina do curso → disciplina da plataforma:**
- `GINECOLOGIA` + `OBSTETRÍCIA` → disciplina existente **"Ginecologia & Obstetrícia"**.
- `PEDIATRIA` → disciplina existente **"Pediatria"**.
- `INFECTOLOGIA` → disciplina existente **"Infectologia"**.
- `PREVENTIVA` → **não criar disciplina nova** — mesclar na disciplina existente
  **"MFC & Atenção Primária"** (Saúde Coletiva & Emergência), criando temas novos conforme
  necessário (ex.: Epidemiologia/Testes Diagnósticos — já existe um subtema parecido, checar
  antes de duplicar —, Políticas de Saúde/SUS, Saúde do Trabalhador, Bioestatística).

**Antes de usar como fonte:** os PDFs de Slide costumam ser texto extraível (slides de
apresentação) — confirmar com `scripts/extract-pdf.mts` num arquivo de teste; se vier vazio
ou só imagem, é slide escaneado/exportado como imagem e precisa de outra abordagem (não
inventar o conteúdo nesse caso — pular e registrar em PROXIMOS-PASSOS.md).

**Ordem de prioridade dentro do lote** (por peso OMED, ver Raio-X): Infectologia → GO →
Pediatria → Preventiva/MFC. Dentro de cada disciplina, não há como saber de antemão quais
tópicos são `altoRendimento` — cruzar com a taxonomia existente e com o Raio-X ao decidir
a ordem de extração.

**Regra de ouro:** nunca inventar fato clínico. Toda afirmação vem do material do usuário
ou de diretriz. Conferir o gabarito antes de marcar a alternativa correta. Preservar o
resumo original do usuário; complementos entram como camada versionada, nunca sobrescrevem.

---

## IMAGENS REAIS (prioridade absoluta do usuário)

Ordem de preferência — **licença sempre primeiro**:
1. **Imagens do próprio usuário** (Drive: `Simulado_Multimídia_Radiologia`, `Simulados Multimídia`,
   `RESUMOS`, `MEDICINA`; ou enviadas na conversa) — uso livre. **Melhor opção.**
2. **Radiopaedia** (maioria CC BY-NC-SA) — preferir **LINKAR** o caso a embutir.
3. **Wikimedia Commons** (domínio público/CC) — se embutir, **baixar para `public/img/`** (nunca hotlink).
4. **Open-i (NIH)** / **PMC** open access — verificar a licença de **cada** imagem.

Nunca: Google Imagens, livro escaneado, AMBOSS, UpToDate, banco comercial.

Implementação: figura externa em `src/components/figuras/registry.tsx` (campos `url`,
`fonte`, `licenca`, `autor`, crédito visível). As imagens aparecem **no trecho do resumo**
em que ajudam, nunca só em galeria. O usuário mencionou fotos: *"URLs externas não violam
CSP no GitHub Pages"* — imagens reais são viáveis; o limite é licença, não técnico.

---

## PROMPT MASTER A — Visão da plataforma (contrato do projeto)

Construir a melhor plataforma pessoal de estudos de medicina — para toda a graduação, OMED,
residência e prática clínica. Referências: AMBOSS, Osmosis, UpToDate, Medway, Whitebook,
Notion, Obsidian, Geeky Medics, Radiopaedia, TeachMeSeries. **Não é um site de resumos** —
é o banco definitivo de conhecimento médico do usuário.

- **Stack:** Next.js + React + TypeScript + TailwindCSS + shadcn/UI + Framer Motion; Supabase
  (Postgres) + Google Login; deploy Vercel/GitHub Pages. Clean Architecture, SOLID, DRY, KISS.
- **Design:** minimalista, elegante, moderno (Apple, Linear, Vercel, Notion, Arc). Animações
  suaves, transições fluidas. Nada de aparência acadêmica.
- **Organização em árvore:** Disciplina → Tema → Subtema. Cada subtema tem: resumo completo,
  rápido, de revisão e de véspera; fluxogramas; algoritmos; tabelas; pontos importantes;
  pegadinhas; erros comuns; questões; casos; imagens; vídeos; referências.
- **Cada resumo segue a ESTRUTURA DE SEÇÕES** (ver Prompt Master B).
- **Funcionalidades:** estudo, revisão rápida, banco de milhares de questões, casos clínicos,
  imagens médicas no ponto certo do texto, vídeos, busca instantânea (doença/sintoma/síndrome/
  fármaco/CID/exame/imagem/palavra), dashboard de progresso, favoritos/notas/etiquetas, modo
  prova (cronometrado, embaralhado, correção automática, relatório por disciplina), modos
  claro/escuro/foco/leitura/impressão, responsivo, performático, backup e versionamento.
- **Importação contínua:** PDF/Word/PPT/TXT/MD/HTML/imagens/OCR/anotações, com organização
  automática (disciplina/tema/subtema/tags/dificuldade) e sem duplicar. Sincronização com o
  Google Drive (pastas "Resumos e cursos" e "MEDICINA") detectando novos/atualizados/removidos.
- **Atualização científica:** verificar periodicamente novas diretrizes; comparar com os
  resumos; mostrar o que mudou, com data e referência; preservar a versão anterior; **nunca
  substituir automaticamente** o conteúdo do usuário.
- **Custo zero** (regra do usuário): só camadas gratuitas; processamento de IA feito em sessão.

---

## PROMPT MASTER B — Resumo definitivo por tema (template de produção)

> Use este template ao escrever cada resumo novo. Adapte a profundidade ao peso OMED do tema.
> Não precisa preencher as 18 seções para temas menores — mas as marcadas com ⭐ são obrigatórias.

Você é médico, professor e membro de banca elaboradora de olimpíadas médicas, com domínio das
diretrizes nacionais e internacionais. Produza o material mais completo possível sobre o TEMA,
em nível de excelência para a OMED. Não é resumo comum — é um capítulo focado em alta
performance em prova. Explique o **porquê** de cada conceito, do fundamento ao detalhe.

**Estrutura (cada seção termina com "O que a OMED costuma cobrar"):**
1. ⭐ **Definição** — conceito, importância clínica, epidemiologia (incidência/prevalência/
   mortalidade/morbidade), relevância para provas.
2. **Revisão anatômica** — apenas a necessária para entender a doença.
3. **Revisão fisiológica** — mecanismos envolvidos.
4. ⭐ **Etiologia** — por categorias, com mecanismo de cada causa.
5. ⭐ **Fatores de risco** — modificáveis, não modificáveis, protetores.
6. ⭐ **Fisiopatologia** — em cadeia: fator desencadeante → molecular → celular → tecidual →
   funcional → sinais/sintomas → complicações. Explicar o mecanismo de cada etapa.
7. **Classificações** — indicação, interpretação, aplicação, limitações.
8. ⭐ **Quadro clínico** — sintomas/sinais/típicas/atípicas/leves/graves/evolução (tabelas),
   com o porquê de cada manifestação.
9. ⭐ **Diagnóstico** — história, exame físico (cada manobra), laboratório (indicação/achados/
   interpretação/armadilhas), imagem (quando pedir/melhor exame/achados), critérios.
10. ⭐ **Diagnóstico diferencial** — tabela: doença | semelhanças | diferenças | como distinguir.
11. ⭐ **Tratamento** — conduta inicial, estabilização, definitivo, farmacológico (mecanismo/
    indicação/contraindicação/efeitos/interações/pontos de prova), cirúrgico, seguimento, prognóstico.
12. **Complicações** — mecanismo, diagnóstico, prevenção, tratamento.
13. **Situações especiais** — crianças, idosos, gestantes, imunossuprimidos, críticos.
14. **Emergências relacionadas** — reconhecimento, estabilização, conduta imediata, definitivo.
15. **Integração com outras especialidades** — casos que cruzam áreas.
16. **Medicina baseada em evidências** — diretrizes e estudos que mudaram a prática.
17. ⭐ **Fluxogramas** — investigação, diagnóstico, tratamento, emergência, seguimento (em texto).
18. ⭐ **Tabelas comparativas** — diferenciais, fármacos, classificações, exames, condutas.
19. ⭐ **Pontos de prova / Pegadinhas / Erros comuns** — em negrito o de maior chance de cobrança.

**Qualidade:** Markdown, títulos claros, tabelas onde ajudam, conceito antes do detalhe,
raciocínio > memorização, negrito nos pontos-chave, sempre o mecanismo por trás do achado.
Quando diretrizes divergirem, apresentar as opções justificando a mais aceita. Trazer imagens
reais pertinentes (raio-X, TC, RM, US, ECG, fotos de sinais/lesões) quando disponíveis e
licenciadas, ancoradas no trecho certo.

---

## Mapeamento no código (como o template vira dado)

- Resumo → `src/content/conteudos/<disc>.ts` (`ConteudoSubtema` com `blocos[]`; cada bloco tem
  `secao`, `corpo` markdown e `figura?`). As seções do template viram `blocos`.
- Questão → `src/content/questoes/<disc>.ts` (`Questao` com enunciado, 4 alternativas com
  comentário por alternativa, `estilo`, `dificuldade`, `tags`, `fonte`).
- Caso clínico → `src/content/casos.ts` (`CasoClinico` com `etapas[]` reveláveis).
- Figura → `src/components/figuras/registry.tsx`, ancorada por `bloco.figura`.
- Taxonomia → `src/content/taxonomy.ts`. `temConteudo` é **derivado** (não marcar à mão).
- Após editar conteúdo: `npx tsx scripts/seed-supabase.mts`, depois `git push` (deploy automático).
