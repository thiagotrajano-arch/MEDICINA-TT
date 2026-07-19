# Próximos passos — Codex Medicus

> Atualizado em 2026-07-19 (madrugada) — rotina diária das 6h (18/07) + 3 sessões interativas (imagens reais; curso Estratégia MED; skills/Obsidian/tentativa de workflow em massa). Este arquivo é reescrito ao fim de cada sessão.

## Estado atual

| | |
|---|---|
| **Site** | https://thiagotrajano-arch.github.io/MEDICINA-TT/ |
| **Resumos** | **43** de 170 subtemas |
| **Questões** | **224** (GO 79 · Ped 55 · Inf 60 · MFC 12 · Cir 8 · originais 10) |
| **Casos clínicos** | 4 (GO, Ped, Inf, Cir) — **MFC e Cirurgia ainda com zero casos** |
| **Figuras** | 20 (12 diagramas SVG + 8 imagens reais licenciadas) |
| **Ferramentas** | Dashboard, Simulado, Casos, Mídia, Questões, Biblioteca — todas funcionais, nenhum placeholder |

## O que foi feito nesta sessão (2026-07-18, rotina automática)

### Descoberta: gap real na Infectologia apesar do "15/15 temas completos"
O subtema `inf--infeccoes-congenitas--storch-visao-infectologica` (Infecções
congênitas — STORCH) **não tinha resumo nem questões**, apesar do handoff
anterior registrar Infectologia como 15/15 temas completos. Só o lado GO
(`go--infeccoes-congenitas-storch--...`) tinha conteúdo. Corrigido nesta
sessão — ver abaixo.

### Infectologia — resumo STORCH (visão infectológica) + 27 questões
Escrito o resumo faltante pelo eixo **infectológico** (agente/microbiologia/
mecanismo de transmissão), complementar ao resumo já existente em GO (eixo
obstétrico) — evita duplicação, aborda o mesmo grupo de doenças por ângulo
diferente. Cobre patógenos além do TORCH clássico que a OMED cobra: Chagas
congênito, hepatites B/C verticais, TB congênita, GBS, malária gestacional,
listeriose, arboviroses periparto (dengue/chikungunya), HIV vertical.

27 questões extraídas do banco "Exame Nacional de Infectologia Perinatal e
Medicina Fetal" (Google Doc do usuário, sem gabarito anexado — respostas
determinadas e comentadas por alternativa com base em diretrizes MS/CDC/
FEBRASGO/PCDT, já que o material não trouxe gabarito pronto). Cobre toxo,
sífilis, CMV, rubéola, herpes, varicela, parvovírus B19, Zika, Chagas,
HBV/HCV, TB congênita, GBS, malária, listeriose, HIV neonatal.

### GO — 63 questões completando os 4 blocos do Banco OMED GO
O "Banco de Questões OMED: Ginecologia e Obstetrícia" (Google Doc do
usuário) já estava parcialmente extraído em sessões anteriores (17
questões, uma amostra de cada bloco). Nesta sessão foram extraídas **todas
as questões restantes** dos 4 blocos:
- Bloco 1 (Pré-Natal): +13 (Q4,6,7,8,9,10,11,12,14,15,18,19,20)
- Bloco 2 (Pré-eclâmpsia): +14 (Q3,4,5,8-15,18-20)
- Bloco 3 (Sangramentos na gestação): +18 (Q1-5,8-20)
- Bloco 4 (Gravidez ectópica): +17 (Q1,2,4,6-14,16-20)

GO passa de 17 para **79 questões** — banco de GO agora completo para esse
material-fonte (Bloco 5, discursivas, não extraído — formato diferente,
não mapeia diretamente para `Questao` de múltipla escolha; considerar para
`CasoClinico` numa sessão futura).

### Fontes usadas (Google Drive, não estavam mapeadas no PROMPTS-MASTER.md ainda)
- `infec congenita` (Doc, id `13qqz-DGY0bfKaTfJmW5dULQBMNMswLSLet0IzCI-tzs`) — 45 questões (40 MC + 5 discursivas) de infectologia perinatal, usadas parcialmente (27/40 MC extraídas — restam 13).
- `Banco de Questões OMED: Ginecologia e Obstetrícia` (id `1843iScXNAjOR8pj_LraTF-gzSEcX0xOR7Y2Silvc4Hk`) — **100% das 80 questões MC extraídas** nesta e em sessões anteriores; resta só o Bloco 5 (5 discursivas).
- `Simulado de Pediatria 1` (id `1LbjYvrqeF3N6u3ieuDAjlhxo7YrgGKblfVkhAy2vI_I`) — **NÃO tocado nesta sessão**: 60 questões MC (desidratação/reidratação, bronquiolite/crupe, e mais não lidas) — próxima prioridade de Pediatria.
- `simulado indectologia` (id `1ICb-YzIKgIpgLMvEQZfxxBkSw-8fng7WNU8namooguE`) — **vazio** (0 bytes de conteúdo útil), não usar.

### Bugs / erros corrigidos durante a sessão
Um erro de digitação próprio (`nem seguraem` → `nem segura em`) corrigido
antes do commit. Nenhum bug de plataforma encontrado.

## O que foi feito nesta sessão (2026-07-18, interativa — imagens clínicas reais)

Sessão separada da rotina automática acima (mesma data, execução interativa).
Foco: a "PRIORIDADE 2" abaixo, cobrada repetidamente pelo usuário ("imagens
reais de casos clínicos... raio-x, ressonância, tomografia, sintomas") e
ainda não executada até esta sessão.

### Sistema de figuras estendido para imagens reais (não só SVG)
`src/components/figuras/registry.tsx`: o tipo `Figura` ganhou um segundo modo,
`imagem?: ImagemReal` (src/alt/fonte/licenca/autor/url), mutuamente exclusivo
com o `render?: () => ReactNode` (diagrama SVG) que já existia. `Figura.tsx`
renderiza `<img>` com crédito visível obrigatório (fonte, autor, licença,
link) quando é imagem real, e mantém o SVG quando é diagrama.

`BlocoConteudo.figura` passou de `string` para `string | string[]` — uma
seção agora pode ancorar diagrama **e** foto real juntos (novo componente
`Figuras`, plural, ao lado do `Figura` original, usado em
`estudar/[subtemaId]/page.tsx`). Seed e leitura do Supabase
(`seed-supabase.mts`, `supabase-repository.ts`) atualizados para gravar/ler
múltiplas figuras concatenadas por vírgula na coluna `text` já existente —
sem migração de schema nova.

### 5 imagens reais com licença verificada, ancoradas em Infectologia
Todas verificadas via API do Wikimedia Commons (`extmetadata.LicenseShortName`
/ `Artist`) **antes** de baixar, salvas em `public/img/clinicas/` (nunca
hotlink):

| Imagem | Achado | Licença | Ancorada em |
|---|---|---|---|
| `tb-miliar-rx.jpg` | RX tórax, padrão miliar | CC BY 4.0 | Tuberculose (+ diagrama já existente) |
| `sifilis-cancro-duro.jpg` | Cancro duro (sífilis 1ª) | Domínio público (CDC PHIL) | Sífilis (+ diagrama já existente) |
| `sifilis-secundaria-exantema.jpg` | Exantema palmoplantar (sífilis 2ª) | Domínio público (CDC PHIL) | Sífilis |
| `sarampo-exantema.jpg` | Exantema morbiliforme | Domínio público (CDC PHIL) | Doenças exantemáticas (+ diagrama já existente) |
| `pneumonia-consolidacao.jpg` | Consolidação lobar + broncograma | Domínio público (CDC/EID) | PAC — **1ª figura desse resumo, antes não tinha nenhuma** |

### Bug real encontrado e corrigido: basePath do GitHub Pages não chegava em `<img>`
`next/image` e `next/link` recebem o prefixo `/MEDICINA-TT` automaticamente
no build de export; uma tag `<img src="...">` crua, não. Sem correção, as 5
imagens (e qualquer imagem real futura) dariam 404 no site publicado, mesmo
funcionando perfeitamente em `next dev`. Corrigido com um helper novo,
`src/lib/asset.ts`, e a env var `NEXT_PUBLIC_BASE_PATH` adicionada em
`next.config.ts` — usado em todo `<img src>` de imagem real (`Figura.tsx`,
`MidiaClient.tsx`).

### Verificação feita
- `tsc --noEmit` — 0 erros.
- Navegador (dev server, pós-seed): páginas de Sífilis, Tuberculose e PAC —
  as 3 mostram os diagramas antigos **e** as fotos reais juntos, com selo
  "imagem real" e linha de crédito (fonte/autor/licença) correta.
- Página `/midia` (Biblioteca visual): 17 figuras listadas (12 + 5), os 5
  cards de imagem real com crédito e link "Estudar X" de volta ao resumo.
- As 5 imagens conferidas por `fetch()` direto no navegador: HTTP 200,
  `image/jpeg`, tamanho em bytes batendo com o arquivo local — nenhuma
  corrompida.
- Commit `0b99873`, push feito para `main`. Deploy do GitHub Actions/Pages
  confirmado com sucesso; site publicado testado ao vivo (não só dev
  local) — as 5 imagens e a galeria `/midia` carregam corretamente sob o
  basePath `/MEDICINA-TT/`.

### Bug de plataforma encontrado (não relacionado a imagens): `backup.yml` falhava 100% desde a criação
Ao checar o deploy, notei o workflow "Backup e keep-alive" com status de
falha em **todos** os pushes desde que foi criado (2026-07-16) — nunca
tinha sido notado porque não bloqueia o site. Causa: `if:` de step
referenciando `secrets.*` diretamente não é permitido pelo GitHub Actions
("Unrecognized named-value: 'secrets'") — o arquivo inteiro ficava
inválido (0 jobs, falha instantânea a cada push). Corrigido movendo os
secrets para `env:` no nível do job e trocando os `if:` para `env.*`
(mesmo padrão já correto em `sync-drive.yml`). Commit `864bfd5`.
Confirmado: o workflow agora aparece com o nome próprio ("Backup e
keep-alive") em vez do path do arquivo — sinal de que o parse passou a
funcionar. O `pg_dump` semanal (segunda 05h UTC) e o ping anti-hibernação
do Supabase estavam ambos mortos até agora; a partir desta correção
devem rodar de verdade.

## O que foi feito nesta sessão (2026-07-18, interativa — curso Estratégia MED)

Terceira sessão do dia (mesma data). O usuário enviou **33 ZIPs** (Google
Drive export completo de um curso — Estratégia MED, aulas "Extensivo") em
5 disciplinas: GINECOLOGIA (7 partes), OBSTETRÍCIA (6), PEDIATRIA (9),
PREVENTIVA (6), INFECTOLOGIA (5) — mais 3 ZIPs antigos que ainda não
tinham sido processados (`00. Materiais`, `BAGAGEM DO JOTA`, `BAGAGEM
GABS`). Pedido: "mais conteudo para vc, siga os prompts, e atualize a
rotina."

### Extração — só os PDFs, nunca os vídeos
Cada ZIP contém, por tópico: `Videoaulas/*.mp4` (enorme — é isso que
fazia cada ZIP ter ~2 GB — sem transcrição disponível, **não extraído**)
e `Slide/Mapa Mental/Flashcard/*.pdf` (pequeno, denso). Com só 64 GB
livres em disco, extrair tudo teria estourado o espaço — a solução foi
extrair cada ZIP inteiro para uma pasta temporária, copiar só os `*.pdf`
para fora, apagar a pasta temporária, e repetir ZIP a ZIP (nunca mais de
~2 GB de pico). **871 PDFs** copiados no total para
`C:\Users\Adm\Desktop\MEDICINA\_pdfs-estrategia\<DISCIPLINA>\` (pasta
plana, nome do tópico já vem no nome do arquivo). Os ZIPs originais
continuam intactos em Downloads (backup do usuário, não apagar).

**Qualidade por tipo de PDF** (testado com `scripts/extract-pdf.mts`):
**Mapa Mental é a melhor fonte** — texto rico, denso, já estruturado
(definição/epidemiologia/fisiopatologia/diagnóstico/tratamento/tabelas
comparativas), pronto para virar resumo quase direto. **Flashcard** é
bom para questões de fixação rápida (formato pergunta/resposta, uma por
página). **Slide ("Material-da-aula")** é majoritariamente **imagem**,
não texto — a camada de texto do PDF captura só cabeçalho/rodapé,
o conteúdo real não vem. **Não usar Slide como fonte de texto.**

Inventário por disciplina (arquivos totais / Mapas Mentais ≈ tópicos únicos):
- GINECOLOGIA: 162 arquivos / 24 tópicos
- OBSTETRÍCIA: 136 arquivos / 25 tópicos
- PEDIATRIA: 236 arquivos / 25 tópicos
- INFECTOLOGIA: 107 arquivos / 20 tópicos
- PREVENTIVA: 30 arquivos / 4 tópicos (zips com bem menos PDF por vídeo — ver nota abaixo)

### Mapeamento de disciplina (já registrado no PROMPTS-MASTER.md)
GINECOLOGIA + OBSTETRÍCIA → disciplina existente "Ginecologia &
Obstetrícia"; PEDIATRIA → "Pediatria"; INFECTOLOGIA → "Infectologia";
**PREVENTIVA → mesclar em "MFC & Atenção Primária"** (não criar
disciplina nova — o conteúdo de Preventiva é essencialmente Saúde
Coletiva/Epidemiologia/SUS, que já é o escopo do MFC na taxonomia; a
disciplina "Saúde Pública" isolada existente é só um scaffold vazio, não
usar).

### Conteúdo escrito nesta sessão — 11 resumos
**GO (8 resumos, todos em temas/subtemas NOVOS)** — a taxonomia de GO
era quase só obstétrica; ginecologia geral estava praticamente vazia.
Criados os temas "Distúrbios endócrino-menstruais", "Infecções
ginecológicas", "Oncologia ginecológica", "Mastologia", "Miomatose e
adenomiose", "Uroginecologia", "Climatério": síndrome dos ovários
policísticos, vulvovaginites, DIP, câncer de colo uterino, câncer de
mama, incontinência urinária, climatério/terapia hormonal, miomatose
uterina.

**Infectologia (3 resumos, preenchendo subtemas que já existiam vazios
na taxonomia)**: malária (tema inteiro estava sem conteúdo), zika e
chikungunya, COVID-19 e influenza (manejo).

Todos com fonte real citada (FEBRASGO, SOBRAC 2024, MS, CDC, FIGO) —
nenhum fato inventado; onde o PDF do curso não trazia detalhe suficiente
(ex. chikungunya, mais fraco no material extraído), complementado com
diretriz nomeada (MS), nunca "chutado".

### Bug de plataforma encontrado e corrigido: MiniMarkdown não processava `***negrito+itálico***`
Ao escrever os resumos de malária com nomes de espécie em itálico dentro
de frases em negrito (convenção médica padrão — *Plasmodium*, *P.
falciparum* etc.), percebi asteriscos literais sobrando na tela.
Causa: o parser (`src/components/content/MiniMarkdown.tsx`) usa uma
regex que **não aceita nenhum asterisco dentro de um span** — então
`***texto***` (negrito+itálico aninhado) quebra a contagem e vaza
asterisco cru. **Não é bug só do conteúdo novo** — já afetava conteúdo
publicado de sessões anteriores (Infectologia: PAC, endocardite,
parasitoses; Pediatria: crupe×epiglotite; GO: gravidez ectópica) com
`***S. aureus***`, `***Leptospira***`, `***H. influenzae***` etc.

Corrigido o parser para o caso limpo — `***span único sem asterisco no
meio***` agora vira `<strong><em>`. Casos mais complexos (negrito
envolvendo *parte* itálica no meio de uma frase, tipo `**texto *itálico*
mais texto**`) são ambíguos até para esse parser melhorado — precisariam
de um parser recursivo de verdade, desproporcional para um componente
"deliberadamente mínimo" (comentário já existente no arquivo). Esses
poucos casos (contados: 1 em go.ts, 1 em pediatria.ts, 4 em
infectologia.ts, 3 nos resumos novos de malária) foram simplificados à
mão (removido o itálico aninhado, mantido só o negrito).
**Recomendação para sessões futuras: não aninhar `*itálico*` dentro de
`**negrito**` — use só um nível de ênfase por trecho, ou o `***ambos***`
quando o span inteiro (sem texto extra antes/depois) for itálico+negrito.**

### Verificação feita
- `tsc --noEmit` — 0 erros.
- Script de validação (`scripts/_validate-tmp.mts`, apagado depois): 0
  órfãos, 0 duplicados, 170 subtemas / 43 conteúdos / 43 com conteúdo.
- Navegador (dev server, pós-seed): resumo de miomatose e câncer de mama
  (com tabelas) renderizando corretamente; resumo de malária confirmado
  SEM asterisco solto após o fix do parser; resumo de PAC (conteúdo
  antigo, tinha `***S. aureus***`) também confirmado corrigido
  retroativamente pelo mesmo fix.
- Commit `654218e`, push feito para `main`.
- `docs/PROMPTS-MASTER.md` e o SKILL.md da rotina diária
  (`C:\Users\Adm\.claude\scheduled-tasks\codex-medicus-daily-dev\SKILL.md`)
  atualizados com a nova fonte, sua estrutura e o mapeamento de
  disciplinas — a rotina de amanhã já vai saber usar isso.

### O que ficou pronto para a próxima sessão usar direto
- **OBSTETRÍCIA** (136 PDFs/25 tópicos): nada escrito ainda nesta sessão
  além do que já mapeava para temas existentes. Tópicos vistos no
  inventário: TPP/prematuridade, partograma e distocias, infecções
  congênitas na gestação (já existe resumo do lado GO — checar
  duplicação), alteração do volume de líquido amniótico, abortamento de
  repetição — e mais ~20 não inspecionados ainda.
- **PEDIATRIA** (236 PDFs/25 tópicos): maior volume de todos, nada
  escrito nesta sessão. Vistos no inventário: cuidados neonatais,
  deficiências vitamínicas e profilaxias, anafilaxia e urticária, DNPM,
  cefaleias na infância, púrpura de Henoch-Schönlein — e mais ~19 não
  inspecionados.
- **PREVENTIVA** (30 PDFs/4 tópicos — bem menor): testes diagnósticos
  (já existe subtema em MFC — enriquecer, não duplicar), marcos legais
  do SUS (idem), processos epidêmicos/epidemiologia das doenças
  infecciosas, saúde do trabalhador (novo).
- **GINECOLOGIA**: ainda restam ~16 tópicos não escritos desta leva
  (Adenomiose, Endometriose, Cervicites, Doenças de vulva e vagina,
  Úlceras genitais, Doenças benignas da mama, Câncer do corpo do útero,
  Tumores anexiais/câncer de ovário, Prolapso de órgãos pélvicos,
  Infertilidade conjugal, Sexualidade, SPM, Abdome agudo em ginecologia,
  Assistência a vítima de violência sexual, Rastreamento — já existe
  tema, conferir se falta subtema — Anatomia/embriologia do trato
  genital). Extração de conteúdo já feita para Miomatose via Flashcard
  (Mapa Mental deu erro de parse "Illegal character: 41" — tentar de
  novo ou usar só o Flashcard, que funcionou).
- **INFECTOLOGIA**: temas novos vistos no inventário sem equivalente na
  taxonomia ainda — Animais Peçonhentos, IRAS, Micoses Invasivas,
  Neutropenia Febril/FOI, Hepatoesplenomegalias Infecciosas, Síndrome
  Febril Íctero-hemorrágica — precisam de tema/subtema novo antes de
  virar resumo. TB latente e HIV/infecções oportunistas (subtemas já
  existentes, vazios) podem estar cobertos dentro dos Mapas Mentais de
  Tuberculose/HIV já extraídos — não verificado ainda.

## O que foi feito nesta sessão (2026-07-19, madrugada — skills, Obsidian, tentativa de workflow em massa)

Quarta sessão (após a de imagens reais e a do curso Estratégia MED). Pedido do
usuário: extrair "tudo" (o usuário perguntou, corretamente, se eu tinha
extraído todos os resumos/questões da sessão anterior — a resposta foi não,
só 11 de ~98 tópicos disponíveis viraram resumo), adicionar mais questões e
casos clínicos "de todos os conteúdo", instalar skills úteis, conectar a um
vault do Obsidian, e buscar 60 imagens clínicas reais. O usuário tinha
"ultracode" ativado nesse momento, o que autorizou usar o Workflow tool
(orquestração multi-agente) em vez de fazer tudo manualmente.

### Skills instaladas
- `obsidian-vault` (mattpocock/skills, 143.9K installs) e `obsidian-markdown`
  (kepano/obsidian-skills — kepano é o desenvolvedor-líder do Obsidian, 59.8K
  installs) — via `npx skills add ... -g -y`.
- `token-efficiency` (delphine-l/claude_global, 1.8K installs).
- Pesquisado e **descartado** por falta de qualidade (poucos installs, < 150):
  skills de PDF processing, git-commit-workflow, e "medical/clinical" — nenhum
  bateu a barra de qualidade (1K+ installs preferencial) nem agregava algo que
  já não fazemos manualmente (extract-pdf.mts, convenção de commit já
  estabelecida).

### Vault do Obsidian criado
Não existia nenhum vault no computador (verificado em Desktop/Documents/
OneDrive — nada). Criado do zero em `C:\Users\Adm\Desktop\Obsidian Vault\`,
seguindo as convenções do skill instalado (flat, sem pastas, wikilinks, notas
`Index`): `Index.md`, `OMED Index.md`, `OMED Raio-X.md` (trazido de
`RAIO-X-OMED.md`), `Codex Medicus.md` (explica a relação site×vault — o site
é a base estruturada, o vault é espaço pessoal solto), `Estudo Diário.md`
(modelo de log de estudo). O SKILL.md do `obsidian-vault` foi editado para
apontar pro caminho real (o arquivo original tinha um path de exemplo do
autor original, `/mnt/d/Obsidian Vault/AI Research/`, que não existe aqui).

### Tentativa de gerar questões/casos/imagens via Workflow em massa — FALHOU por limite de sessão
Duas Workflows grandes foram lançadas (43 tópicos × 4 questões + 8 casos
clínicos; busca+verificação de 60 imagens reais), cada uma com uma etapa de
verificação cética separada por item. **Ambas foram atingidas por um limite
de sessão/uso** ("session limit", reset aliás **23h America/Sao_Paulo**) logo
no início — a maioria dos agentes falhou com a mesma mensagem de limite, não
por um bug de conteúdo. Isso derrubou quase todo o proveito das duas
Workflows:
- Questões: só 5 de 43 tópicos tiveram a etapa de escrita concluída, **zero**
  sobreviveu à etapa de verificação (que também foi atingida pelo limite) —
  resultado final vazio.
- Imagens: só 3 de 60 tiveram busca+download concluídos.

**Bug real encontrado nos dois scripts** (corrigido, arquivos ainda existem
no disco para reuso): quando o agente da etapa de **verificação** falhava
(retornava `null`, incluindo por causa do limite de sessão), o `.then(...)`
seguinte não tratava esse `null` e quebrava o pipeline inteiro com erro tipo
`"null is not an object (evaluating 'veredito.aprovado')"` — mascarando o
resultado real (que já tinha itens aprovados de verdade, perdidos pelo
crash). Corrigido nos dois arquivos de script (`if (!v) return null` antes de
desreferenciar). Os scripts corrigidos ficam em:
- `C:\Users\Adm\.claude\projects\C--Users-Adm-Desktop-med-codex-medicus\179bffe7-7924-4554-87af-89d84f9b519f\workflows\scripts\gerar-questoes-casos-omed-wf_d6d32d8a-1e2.js`
- `C:\Users\Adm\.claude\projects\C--Users-Adm-Desktop-med-codex-medicus\179bffe7-7924-4554-87af-89d84f9b519f\workflows\scripts\buscar-60-imagens-clinicas-wf_eaaf18c5-f98.js`

**Recuperado do que sobreviveu:**
- As 3 imagens que tinham completado busca+download foram **verificadas de
  novo manualmente** (re-consulta independente da licença via API do
  Wikimedia) antes de aceitar: `mola-hidatiforme-us.jpg` (CC0), `colo-uterino-
  colposcopia.gif` (CC BY 4.0), `cancer-mama-mamografia.jpg` (domínio público,
  NCI/NIH) — todas confirmadas, registradas em `registry.tsx`, ancoradas nos
  resumos de hemorragias da 1ª metade (mola), câncer de colo e câncer de
  mama, e no mapa de navegação do `/midia`. Commit `89b46d6`.
- As 5 questões que tinham só a etapa de escrita (sem verificação) **não
  foram usadas** — ficam no journal da Workflow
  (`...\subagents\workflows\wf_d6d32d8a-1e2\journal.jsonl`) caso alguém queira
  revisá-las manualmente depois, mas não devem ser tratadas como prontas
  (nunca passaram pela checagem cética).

### Decisão para o resto da sessão
Dado que gerar subagentes está bloqueado até o reset (23h), e que o modo
"ultracode" também foi desativado no meio da sessão (voltou a regra padrão de
só usar Workflow quando pedido explicitamente), **não relancei as duas
Workflows**. O trabalho de escrever questões/casos/buscar imagens **continua
pendente** — praticamente do zero (só 3 imagens novas, 0 questões novas desta
leva).

## PRIORIDADE 0 (nova, mais urgente que tudo abaixo) — Terminar o que essa sessão não conseguiu

1. **Questões + casos clínicos para os 43 resumos existentes** — o pedido do
   usuário foi "adicione mais questões e casos clínicos de todos os
   conteúdo". Ainda não iniciado de verdade (a tentativa via Workflow não
   produziu nada aproveitável). Duas opções pra próxima sessão:
   a. **Relançar as duas Workflows corrigidas** (`Workflow({scriptPath: ...,
      resumeFromRunId: ...})` nos dois `runId` acima) depois de 23h — os
      scripts já estão certos, só rodar de novo. **Ou**, mais seguro: rodar
      script novo (não resume) já que o resume pode reaproveitar respostas
      cacheadas de agentes que "completaram" com erro de limite — checar o
      journal.jsonl antes de confiar em qualquer cache.
   b. **Escrever manualmente** (como foi feito para os 11 resumos e as
      imagens desta sessão) — mais lento, mas não depende de cota de
      subagente. Priorizar por raio-x: Infectologia (21 tópicos com resumo,
      nenhuma questão nova ainda desta leva) → GO (15 tópicos, 8 são novos
      desta sessão) → Pediatria (5) → Cirurgia/MFC (1 cada, mas são os que
      mais precisam: **zero casos clínicos em ambas**).
2. **57 imagens clínicas reais restantes** — a lista completa dos 60 alvos
   (com query de busca em inglês, legenda em português, disciplina) está
   nos dois arquivos de script linkados acima (variável `ALVOS`), ou pode
   ser reconstruída a partir do texto desta seção. 3 já feitas: mola
   hidatiforme, colposcopia, mamografia.
3. **Continuar a extração de resumos do curso Estratégia MED** — ver seção
   "CURSO ESTRATÉGIA MED" no PROMPTS-MASTER.md. Ainda faltam: Obstetrícia (25
   tópicos), Pediatria (25), Preventiva (quase tudo), ~16 de Ginecologia.

## PRIORIDADE 1 — Continuar a extração (nesta ordem)

### Estratégia MED — a fonte mais densa agora disponível
Ver seção acima + `docs/PROMPTS-MASTER.md` ("CURSO ESTRATÉGIA MED") para
localização exata, estrutura e o que já foi/falta escrever por
disciplina. Ordem sugerida: Infectologia (poucos tópicos novos, resto é
enriquecimento) → Pediatria (maior volume) → Obstetrícia → resto de
Ginecologia → Preventiva (mesclar em MFC).

### Infectologia — 13 questões restantes do doc "infec congenita"
Questões não extraídas ainda (números do doc original): 5, 15, 18, 23, 25,
28, 30, 31, 33, 35, 36, 37, 39 — cobrem HIV pós-natal (proscrições),
avidez alta de toxo, pênfigo sifilítico, herpes com eletrodo de escalpo
(já usei uma versão similar), calcificação "em pipoca", varicela
congênita (janela de risco), dengue perinatal, chikungunya periparto,
via de parto na hepatite B, sífilis (sinal de Higouménakis), seguimento
de VDRL neonatal. Mais as 5 questões discursivas (Q41-45) — considerar
adaptar para `CasoClinico` em vez de `Questao`.

### Pediatria — Simulado de Pediatria 1 (Drive, 60 questões MC não tocadas)
Doc já lido nesta sessão (fileId `1LbjYvrqeF3N6u3ieuDAjlhxo7YrgGKblfVkhAy2vI_I`),
conteúdo confirmado: **Parte 1** tem pelo menos duas seções — "I. Desidratação
e Diarreia Aguda" (Q1-12) e "II. Bronquiolite Viral Aguda e Crupe" (Q13-24) —
60 questões no total, seção completa não lida além de Q13-14. Mapeia bem
para subtemas já existentes: `ped--emergencias-pediatricas--desidratacao-e-reidratacao`,
`ped--infeccoes-respiratorias-na-infancia--bronquiolite`,
`ped--infeccoes-respiratorias-na-infancia--crupe-laringotraqueobronquite`.
**Sem gabarito no doc** — responder com base em diretrizes SBP/MS/AAP,
como feito para Infectologia/GO nesta sessão.

### GO — Bloco 5 discursivo (5 questões) do Banco OMED GO
Não mapeia para `Questao` (múltipla escolha) — avaliar se vira `CasoClinico`
(etapas reveláveis) ou uma seção nova de "questões dissertativas" no
resumo. Temas: pré-natal (RCF vs. feto constitucional), pré-eclâmpsia grave,
PP vs. DPP, gestação de localização desconhecida, caso integrado (HAS
crônica + pré-eclâmpsia sobreposta).

### Outras disciplinas (ainda não abordadas nesta leva de sessões)
- **Cirurgia**: só 8 questões, nenhum resumo novo. `Cirurgia_Resumo_Absoluto_OMED_VI`
  e o banco de 160 questões — fontes locais (Downloads) foram removidas;
  buscar no Drive (ainda não pesquisado nesta sessão) ou no histórico de
  conversas do Claude.
- **MFC**: só 12 questões. Mesma situação — buscar no Drive.
- Considerar pesquisar Drive por `title contains 'Cirurgia'` e
  `title contains 'MFC'` na próxima sessão (não feito ainda).

## PRIORIDADE 2 — Imagens clínicas reais

**Começado nesta sessão** (ver seção acima) — 5 imagens reais ancoradas em
Infectologia (TB, sífilis ×2, sarampo, PAC). O sistema (`registry.tsx` com
`imagem?: ImagemReal`, `asset()`/basePath, figuras múltiplas por seção) está
pronto para reuso — falta aplicar às outras disciplinas:

1. **GO**: DPP × placenta prévia, pré-eclâmpsia, gravidez ectópica (US) —
   hoje só têm diagrama SVG, nenhuma foto/exame real ainda.
2. **Pediatria**: crupe/epiglotite (RX cervical em "sinal do polegar"),
   icterícia neonatal (foto clínica), desidratação (sinais ao exame).
3. **Cirurgia**: vias biliares/Mirizzi (colangio-RM ou US) — só diagrama.
4. **MFC**: tabela 2×2 é conceitual, não pede imagem real.
5. Explorar o Google Drive do usuário (pastas "Resumos e cursos"/
   "MEDICINA") com esse fim específico — ainda não feito. O usuário
   mencionou que vai enviar imagens próprias; essas têm prioridade sobre
   qualquer imagem de terceiros e devem substituir/complementar as atuais
   quando chegarem.

Fontes por ordem de preferência (ver `docs/PROMPTS-MASTER.md`): imagens do
próprio usuário > Radiopaedia (linkar, não embutir) > Wikimedia Commons
(baixar e verificar licença antes, como feito agora) > Open-i (NIH)/PMC
open access. Nunca Google Images, AMBOSS, UpToDate ou fotos de livro
escaneado — risco de direito autoral.

## Armadilhas do ambiente (confirmadas/reforçadas nesta sessão)

- **Sem gabarito nos docs do Drive é a norma, não exceção** — nenhum dos
  3 bancos de questões usados nesta sessão (GO, infec congenita) trouxe
  gabarito. A conduta adotada: responder como médico-especialista, citando
  a diretriz (MS/FEBRASGO/ACOG/CDC) no comentário de cada alternativa, sem
  jamais inventar o mecanismo/fato clínico. Continuar assim.
- **Bash tool no Windows**: escrever scripts temporários de validação em
  `scripts/_nome-tmp.mts` dentro do repo (não em `/tmp`, que resolve para
  um path Windows inválido no ambiente) e apagar depois de usar.
- **`npm run seed` demorou > 2 min** nesta sessão (rodar em background e
  aguardar notificação, não bloquear o turno).
- **O dev server lê do Supabase** — sempre `npm run seed` antes de
  verificar no navegador.
- `temConteudo` é **derivado** de CONTEUDOS — nunca marcar à mão.
- **PDFs grandes**: Read não pagina → `npx tsx scripts/extract-pdf.mts`.
  Mas nesta sessão os PDFs do Downloads continuam ausentes — Drive foi a
  fonte primária, com sucesso.
- **Verificar `<img loading="lazy">` no navegador automatizado**: os eventos
  `load`/`error` não disparam de forma confiável (a imagem nunca entra no
  viewport da aba headless, então o IntersectionObserver não ativa) —
  `naturalWidth`/`complete` ficam presos em 0/false mesmo com o arquivo
  correto. Não é bug de verdade. Confirmar servindo certo com `fetch(url)`
  direto no console (status 200, `content-type`, `content-length`) em vez
  de esperar o evento de load da tag `<img>`.
- **`MiniMarkdown` não aceita asterisco aninhado** — nunca escrever
  `**negrito com *itálico* no meio**`; use só um nível de ênfase, ou
  `***span inteiro***` quando o trecho inteiro (sem texto extra antes/
  depois dentro do mesmo span) for negrito+itálico junto. Ver "bug de
  plataforma" nesta sessão para o porquê.
- **`unzip` neste ambiente não casa wildcard (`*.pdf`) com `/`** — não
  adianta `unzip arquivo.zip "*.pdf" -d dest` nem `-x "*.mp4"`; extrai
  tudo pra uma pasta temporária e filtra depois com
  `find tmp -iname "*.pdf" -exec cp {} dest \;`, apagando a temporária no
  fim. Testado e confirmado nesta sessão.
- **Dev server pode morrer sozinho sob I/O de disco pesado** (ex.: unzip
  grande rodando em paralelo) — se `preview_start`/`navigate` falhar sem
  motivo aparente, rodar `preview_list` para conferir se o processo
  ainda existe; se não, só chamar `preview_start` de novo (não precisa
  investigar mais que isso).
- **`npx tsx ...` frequentemente cai sozinho em background** neste
  ambiente (mesmo sem pedir `run_in_background`) — normal, só aguardar a
  notificação em vez de re-tentar em primeiro plano.
- **Workflows grandes (muitos agentes em pouco tempo) podem bater um "session
  limit"** com reset em horário fixo (visto: 23h America/Sao_Paulo). Quando
  isso acontece, TODOS os agentes daquele momento em diante falham com a
  mesma mensagem — não é bug de conteúdo. Sinais: `agents_error` alto no
  resumo da Workflow, mensagem literal "You've hit your session limit".
  **Antes de relançar uma Workflow grande, considerar se o horário está perto
  de um limite recente.** E sempre que uma etapa de pipeline chama `agent()`
  de novo depois da primeira (ex.: escrever → verificar), tratar o `null` de
  QUALQUER chamada, não só da primeira — `agent()` pode retornar `null` em
  qualquer etapa, e não tratar isso quebra o pipeline inteiro e mascara
  resultados parciais bons que já existiam.

## Checklist antes de commitar (reforçado, seguido nesta sessão)

1. `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit` — ok, 0 erros.
2. Validar vínculos órfãos (script `scripts/_validate-tmp.mts`, apagado
   depois): 0 órfãos, 0 IDs duplicados, 170 subtemas / 43 conteúdos.
3. `npx tsx scripts/seed-supabase.mts` — ok (36 disciplinas, 43 resumos,
   224 questões).
4. Verificado visualmente no navegador (pós-seed, dev server): resumos de
   miomatose e câncer de mama (tabelas), resumo de malária (confirmando o
   fix de markdown), resumo de PAC (confirmando o fix retroativo em
   conteúdo antigo) — todos renderizando corretamente, sem asterisco
   solto, sem erros de console.
5. Push feito e confirmado (`654218e` em `origin/main`, nada pendente).

## Regra de ouro

**Nunca inventar fato clínico.** Toda afirmação vem do material do usuário
ou de diretriz (MS, FEBRASGO, SBP, ACOG, IDSA, CDC, Surviving Sepsis, TG18,
WSES). Quando o material não trouxer gabarito, a resposta é determinada e
justificada com base em diretriz nomeada — nunca "chutada". Uma questão
errada é pior que uma questão a menos.
