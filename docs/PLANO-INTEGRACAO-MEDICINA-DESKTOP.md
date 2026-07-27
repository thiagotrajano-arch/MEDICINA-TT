# Plano de Integração — `Desktop\MEDICINA\`

> Documento vivo. Criado em 2026-07-25 para catalogar o que existe em
> `C:\Users\Adm\Desktop\MEDICINA\` (e pastas que o usuário for adicionando depois),
> mapear o que já foi lido/está pronto para virar conteúdo do site, e propor um
> plano de execução em etapas. Atualizar este arquivo conforme novas pastas
> chegarem ou etapas forem concluídas, em vez de recomeçar do zero.
>
> **Atualizado em 2026-07-26**: a fase de execução começou. Ver seção 13 (pipeline
> de conversão + triagem completa das 254 fontes) — ela reordena as prioridades das
> seções 2 e 5, porque fontes muito melhores apareceram e Nefrologia finalmente
> saiu do "sem fonte encontrada".
>
> Ver também: `PROMPTS-MASTER.md` (fontes de conteúdo, regras de extração,
> template de resumo) e `C:\Users\Adm\Desktop\med\RAIO-X-OMED.md` (frequência
> real das disciplinas na OMED, seção 0.1 e 0.2 — usar para priorizar).

---

## 1. Inventário de pastas — status atual

| Pasta | PDFs | Tamanho | Status | Ação |
|---|---:|---:|---|---|
| `_pdfs-estrategia` | 824 | 6,8 GB | ✅ **já 100% extraído** (2026-07-21, 125/125 tópicos — GO, Obstetrícia, Pediatria, Preventiva, Infectologia) | **Não retocar** |
| `livros gerais` | 13 | 980 MB | 📕 Livros publicados protegidos por direito autoral (Harrison, Guyton, Moore, Junqueira, Goodman & Gilman, Tortora, Neves...) | **Nunca extrair/republicar texto** — usar só como conhecimento de fundo (já domino esse conteúdo) |
| `certificados` | 12 | 5,7 MB | Certificados pessoais (LAMACC, extensão), não é conteúdo de estudo | Ignorar para extração de conteúdo |
| `RESUMOS` | 30 | 833 MB | 🟡 Parcialmente extraído — produto licenciado (Esther Santos, Medicina Unimontes), uso autorizado pelo usuário em 2026-07-25. 1 arquivo lido por completo (`TABELAS+DE+REVISÃO+-+CASOS+CLÍNICOS.pdf`) → virou Reumatologia (4 subtemas, já no site). 6 arquivos com amostra lida (Dermatologia, Anemia, Metabolismo, Oncologia, Dor Abdominal, Geriatria — só páginas iniciais, conteúdo básico/pré-clínico, não o clínico). 22 arquivos não tocados. Backlog completo na seção 3. | Continuar triagem (seção 5) |
| `IMUNO RADIO E FARMACOLOGIA.docx` | — | 45 KB texto | ✅ **Lido por completo nesta sessão** — 90 questões comentadas (Imunologia oncológica, Radiologia, Farmacologia) | Mapeado na seção 2, pronto pra integrar |
| `NEOPLASIA TUDO.docx` | — | 115 KB texto | ✅ **Lido por completo nesta sessão** — ~220 questões comentadas (tireoide, emergências oncológicas, pulmão, pele, linfomas/glândulas salivares, orofaringe, básico de neoplasias, neoplasias hematológicas) | Mapeado na seção 2, pronto pra integrar |
| `OTORRINO QUESTOES PROVA.docx` | — | 22 KB texto | ✅ **Lido por completo nesta sessão** — 40 questões comentadas (rinite, rinossinusite, otite, síndrome do respirador oral) | Mapeado na seção 2, pronto pra integrar |
| `RESTOS DAS CONF.docx` | — | 34 KB texto | ✅ **Lido por completo nesta sessão** — 70 questões comentadas (anemias, indicações de transfusão, manejo de tonturas) | Mapeado na seção 2, pronto pra integrar |
| `BBPM I` | 0 | 4 KB | Só `proxy.js` (artefato de sync) — pasta vazia na prática | Nada a fazer |
| `BBPM II` | 0 | 0 | Vazia | Nada a fazer |
| `BBPM III` | 37 | 535 MB | Currículo próprio da faculdade — subpastas `INTEGRADA 1`, `LIVROS GERAIS`, `TUTORIA`, `genetica`, `imuno` + `MANUAL DO ESTUDANTE` | **Não triado ainda** |
| `BBPM IV` | 60 | 1,3 GB | Subpastas `CONFERÊNCIAS`, `DERMATO`, `INFECTO`, `PARASITO`, `TUTORIAS`, `aps`, `integrada 1/2` + manual | **Não triado ainda** — `DERMATO` e `TUTORIAS` são as apostas mais fortes |
| `BBPM VII` | 34 | 2,1 GB | Estrutura ainda não vista (pasta com nome de export do Drive) | **Não triado ainda** |
| `BBPM VIII` | 54 | 994 MB | Subpastas `AMBULATORIOS`, `CONFERENCIAS`, `IMUNOLOGIA`, `PATOLOGIA`, `RADIOLOGIA`, `TUTORIAS` + manual | **Não triado ainda** — `PATOLOGIA`/`TUTORIAS` são as apostas mais fortes |
| `HCPM` | 5 | 65 MB | `DOENÇAS EXANTEMATICAS.pdf`, 2× material de **prova OSCE real** (`HCPM IV - OSCE`, `PROVA OSCE HCPM IV`, `LISTA DE QUESTÕES OSCE HCPM IV`), `RESUMO HCPM IV P2.pdf` | **Não lido ainda** — pasta pequena, alto valor (prova real + gabarito) |
| `LANN` | 8 | 129 MB | Módulo de Neuro — subpastas `AVC`, `TCE`, `anato e semiologia`, `cefaleias` | **Não triado ainda** — Neuro já tem conteúdo completo no site, mas `TCE` é tema novo |
| `Farmacologia` | 11 | 627 MB | Subpastas `FARMACO BASICA`, `SIST. NERVOSO CENTRAL` | **Não triado ainda** — baixa prioridade (Farmacologia não é foco de peso na OMED) |
| `UE` | 7 | 128 MB | Subpastas `UE II`, `UE III` (Urgência e Emergência) + 1 imagem solta | **Não triado ainda** — disciplina "Urgência e Emergência" está vazia no site |
| *(pasta nova a ser enviada)* | — | — | Aguardando | Adicionar linha aqui quando chegar |

**Sem arquivos de imagem soltos** em nenhuma pasta (só 1 em `UE`). Qualquer "imagem clínica" vem embutida dentro dos PDFs (slides, provas OSCE) — precisa ser extraída página a página, não existe como arquivo solto pra aprovar direto.

---

## 2. Conteúdo já mapeado (pronto pra integrar, aguardando autorização)

Os 4 `.docx` da raiz somam **~420 questões comentadas** (gabarito com justificativa por questão, não só a letra certa), organizadas por tópico. Nenhum tem marca d'água de licença de terceiro (diferente do RESUMOS) — tratados como material do próprio usuário. Mapeamento proposto por disciplina/subtema:

### Hematologia (hoje 100% vazia — prioridade real #3, ~7 questões/4 edições)
| Subtema proposto | Fonte | Qtd. questões-fonte |
|---|---|---:|
| Anemias — Investigação e Classificação | `RESTOS DAS CONF.docx` § Anemias | 30 |
| Leucemias Agudas e Crônicas | `NEOPLASIA TUDO.docx` § Neoplasias Hematológicas (parte 1) | ~10 |
| Linfomas (Hodgkin e Não-Hodgkin) | `NEOPLASIA TUDO.docx` § Linfomas (dentro de "Linfomas e Câncer de Glândulas Salivares") | ~15 |
| Mieloma Múltiplo e Neoplasias Mieloproliferativas/Mielodisplásicas | `NEOPLASIA TUDO.docx` § Neoplasias Hematológicas (parte 2) | ~15 |
| Medicina Transfusional — Indicações de Hemocomponentes | `RESTOS DAS CONF.docx` § Indicações de Transfusão | 20 |

### Oncologia (não existe como disciplina no site ainda — prioridade real #4, ~6 questões)
| Subtema proposto | Fonte | Qtd. questões-fonte |
|---|---|---:|
| Emergências Oncológicas (SVCS, hipercalcemia, lise tumoral, neutropenia febril, compressão medular, mets cerebrais, derrame pleural maligno) | `NEOPLASIA TUDO.docx` § Emergências em Oncologia | 20 |
| Câncer de Pulmão | `NEOPLASIA TUDO.docx` § Neoplasia Pulmão | 20 |
| Princípios Básicos de Oncologia (nomenclatura, TNM, disseminação, síndromes paraneoplásicas) | `NEOPLASIA TUDO.docx` § Básico de Neoplasias | 15 |
| Farmacologia Oncológica e Imunoterapia (quimioterápicos, antieméticos, checkpoint inhibitors, CAR-T) | `IMUNO RADIO E FARMACOLOGIA.docx` § Imunologia + § Farmacologia | ~50 |

*Decisão a validar com o usuário: criar disciplina nova "Oncologia" (grupo Clínica Médica) já que ela não existe no site hoje, mesmo a OMED às vezes classificando questão de câncer dentro da disciplina de origem (ex.: pulmão em Pneumo).*

### Otorrinolaringologia (hoje 100% vazia — prioridade real #4, ~6 questões)
| Subtema proposto | Fonte | Qtd. questões-fonte |
|---|---|---:|
| Rinite e Rinossinusite | `OTORRINO QUESTOES PROVA.docx` § Rinite + § Rinossinusite | 20 |
| Otite (Média, Externa, Colesteatoma, Mastoidite) | `OTORRINO QUESTOES PROVA.docx` § Otite | 10 |
| Síndrome do Respirador Oral / Hipertrofia Adenotonsilar | `OTORRINO QUESTOES PROVA.docx` § SRO | 10 |
| Tumores de Glândulas Salivares e Câncer de Orofaringe | `NEOPLASIA TUDO.docx` § Glândulas Salivares + § Orofaringe | ~25 |
| Tontura e Vertigem (VPPB, Ménière, Neurite Vestibular, HINTS) | `RESTOS DAS CONF.docx` § Manejo de Tonturas | 20 |

### Endocrinologia (hoje 100% vazia — prioridade real #2, ~8 questões)
| Subtema proposto | Fonte | Qtd. questões-fonte |
|---|---|---:|
| Nódulo e Câncer de Tireoide (PAAF, Bethesda, cintilografia, TI-RADS) | `NEOPLASIA TUDO.docx` § CCP + § Patologia Tireoide | 50 |

### Dermatologia (já tem conteúdo real — Reumatologia usou o mesmo lote de fontes; Dermato em si segue vazia)
| Subtema proposto | Fonte | Qtd. questões-fonte |
|---|---|---:|
| Piodermites (Impetigo, Ectima, SSSS) | `RESUMOS/DERMATOLOGIA.pdf` págs. 1-4 (já lido nesta sessão, precisa re-extrair pra confirmar) | — (resumo, não banco de questões) |
| Neoplasias Cutâneas (CBC, CEC, Melanoma) | `NEOPLASIA TUDO.docx` § CA de Pele | 25 |

**Total: 17 subtemas novos propostos, ~420 questões-fonte pra adaptar (não usar todas — selecionar as mais representativas por subtema, ~2-4 cada, no padrão já usado no resto do banco: comentário genuinamente distinto por alternativa).**

---

## 3. Backlog já documentado do RESUMOS (não repetir, só continuar)

Já registrado em `C:\Users\Adm\Desktop\med\RAIO-X-OMED.md` seção 0.2 e em `Reumatologia.md` (Obsidian):
- Do arquivo `TABELAS+DE+REVISÃO+-+CASOS+CLÍNICOS.pdf` (já lido por completo): sobram **Síndrome de Sjögren, Doença de Behçet, Vasculite Crioglobulinêmica, Vasculite por IgA, Miopatias Inflamatórias (Dermatomiosite/Polimiosite)** — Reumato/Dermato — e **Doença de Wilson, Doença Hepática Alcoólica** — Gastroenterologia.
- 22 arquivos do RESUMOS nunca abertos: `AMBULATÓRIOS`, `ANATOMIA`, `CRONOGRAMA`, `DOR`, `DOR+TORÁCICA`, `ELETROCARDIOGRAMA+2` (o `+1` veio corrompido na extração — provável conteúdo em imagem/diagrama, não texto), `EMBRIOLOGIA`, `FISIOLOGIA`, `GINECOLOGIA` (só amostra anatômica lida), `HISTOPATOLOGIA`, `IMUNOLOGIA`, `LOCOMOÇÃO`, `NEUROANATOMIA`, `NEUROLOGIA`, `OBSTETRÍCIA+E+PEDIATRIA`, `PSIQUIATRIA` (amostra lida, sem prioridade real confirmada na OMED), `RADIOLOGIA`, `RADIOLOGIA+TORÁCICA`, `SEMIOLOGIA`, `SISTEMA+ÚNICO+DE+SAÚDE`.

---

## 4. Mudanças de taxonomia propostas (ainda não aplicadas)

- **Nova disciplina "Oncologia"** (`id: onco`, grupo Clínica Médica) — hoje não existe no site.
- **Hematologia**: trocar o scaffold (`Anemias/Leucemias/Distúrbios da hemostasia` genéricos) por 5 temas reais (seção 2).
- **Endocrinologia**: trocar scaffold por 1 tema real (Tireoide) + manter `Diabetes`/`Adrenal` vazios por enquanto.
- **Otorrinolaringologia**: trocar scaffold (`Otites/Rinossinusites/Vertigem` genéricos) por 5 temas reais.
- **Dermatologia**: adicionar 2 temas reais (Piodermites, Neoplasias Cutâneas) ao scaffold existente.

Mesmo padrão já usado para Reumatologia (`src/content/taxonomy.ts`, `src/content/conteudos/<disc>.ts`, `src/content/questoes/<disc>.ts`, registrados nos agregadores `conteudos.ts`/`questoes.ts`).

---

## 5. Plano de execução em etapas (proposto — aguardando autorização do usuário)

**Etapa A — Fechar a triagem do que falta em `MEDICINA/`**
1. Ler HCPM por completo (pasta pequena, prova OSCE real + gabarito).
2. Amostrar `BBPM III/IV/VII/VIII`, priorizando `TUTORIA`/`TUTORIAS` (casos PBL → caso clínico) e `DERMATO`/`PATOLOGIA` (disciplinas com lacuna real).
3. Amostrar `UE II/III` (disciplina "Urgência e Emergência" vazia no site).
4. Amostrar `LANN` (checar se `TCE` traz algo novo além do que Neuro já tem) e `Farmacologia` (baixa prioridade).
5. Re-extrair `RESUMOS/DERMATOLOGIA.pdf` págs. 1-4 pra confirmar o conteúdo de piodermites antes de escrever o subtema.
6. Incorporar a pasta nova que o usuário vai enviar.

**Etapa B — Construir o conteúdo mapeado na seção 2** (17 subtemas, ~420 questões-fonte → seleção de 2-4 por subtema)
1. Escrever os resumos completos (16 seções, mesmo padrão de Cardio/Pneumo/Neuro/Reumato) por disciplina.
2. Adaptar as questões selecionadas pro formato do banco (comentário distinto por alternativa).
3. Atualizar `taxonomy.ts` com os temas/disciplinas novas (seção 4).
4. Registrar os arquivos novos nos agregadores.

**Etapa C — Verificação e publicação**
1. `npm run typecheck && npm run lint && npm run build`.
2. Script de integridade (órfãos, IDs duplicados, alternativa correta única).
3. Conferir 2-3 páginas novas no navegador.
4. Commit local — **pedir autorização antes de `git push`** (padrão desta sessão, sempre).

**Etapa D — Continuar o backlog do RESUMOS** (seção 3) com o tempo/prioridade que sobrar.

**Etapa E — Atualizar Obsidian** (Dashboard, hubs de disciplina, `OMED Raio-X.md`) refletindo tudo.

---

## 6. Cronograma de revisão — Agosto 2026 (foco no que mais cai na OMED)

> Objetivo do mês: revisar **todo o conteúdo já pronto** (Cardio/Pneumo/Neuro/Infecto/GO/Pediatria/
> Cirurgia/MFC/Reumato) e **incorporar o conteúdo novo assim que ele for construído** (seção 2),
> sempre priorizando pelo peso real (seção 0.1/0.2 do `RAIO-X-OMED.md`), não por ordem alfabética.
> Resto do semestre (setembro em diante) cobre o que sobrar: Oftalmologia, Geriatria, Psiquiatria,
> Farmacologia, e o restante de RESUMOS/BBPM ainda não extraído — ver seção 7.
>
> **Pré-condição:** as semanas 3 e 4 assumem que a Etapa B (seção 5) já foi executada e autorizada
> antes de chegar a data — ou seja, **construir Hematologia/Endocrinologia/Oncologia/Otorrino/
> Dermatologia precisa acontecer na semana 1**, não na semana em que o usuário for revisar. Se a
> construção atrasar, adiar o conteúdo novo pra semana seguinte e preencher com revisão extra do que
> já existe, nunca deixar o dia vazio.
>
> Rotina diária sugerida (~60-90 min, ajustável): 1) reler o resumo dos temas `altoRendimento` do dia
> no site; 2) responder ~15-20 questões do banco daquele tema; 3) registrar erros/dúvidas em
> `[[Estudo Diário]]` (duplicar a nota do dia); 4) 1x/semana (sábado), simulado cronometrado misturando
> os temas da semana.

### Semana 1 — 02/08 (dom) a 08/08 (sáb) — Infectologia + Cardiologia + Reumatologia
| Dia | Foco | O que fazer |
|---|---|---|
| Dom 02/08 | Infectologia (peso real #1, 17 questões/4 edições) | Temas `altoRendimento`: HIV/AIDS, Tuberculose, Sepse, Dengue. 15-20 questões. |
| Seg 03/08 | Infectologia | ITU, Pneumonias, Endocardite, Meningites. 15-20 questões + revisar erros de domingo. |
| Ter 04/08 | Cardiologia (peso real #2, 16 questões) | SCA/IAM, Dissecção Aórtica, FA/ECG. 15-20 questões. |
| Qua 05/08 | Cardiologia | Insuficiência Cardíaca, Hipertensão (resistente/secundária), Taquiarritmias/ACLS. 15-20 questões. |
| Qui 06/08 | Reumatologia (novo, pronto desde 2026-07-25) | Vasculites (grandes/médios + ANCA), Esclerose Sistêmica, Espondiloartrites — os 4 subtemas completos. 4 questões (1 por subtema) + reler resumos inteiros (é conteúdo novo, merece leitura completa, não só revisão). |
| Sex 07/08 | Revisão livre | Refazer só as questões erradas de seg-qui. Sem conteúdo novo. |
| Sáb 08/08 | **Simulado misto** | 25 questões cronometradas (Infecto+Cardio+Reumato), corrigir e classificar cada erro por tema/motivo (padrão do Raio-X, seção 6). |

### Semana 2 — 09/08 (dom) a 15/08 (sáb) — Neurologia + Pneumologia + Materno-Infantil
| Dia | Foco | O que fazer |
|---|---|---|
| Dom 09/08 | Neurologia (peso real #3, 14 questões) | AVC isquêmico e hemorrágico, Crise Convulsiva/Status. 15-20 questões. |
| Seg 10/08 | Neurologia | Guillain-Barré, Miastenia Gravis, Cefaleias (sinais de alarme). 15-20 questões. |
| Ter 11/08 | Pneumologia (peso real #4, 13 questões) | TEP, Pneumotórax, PAC, Asma/DPOC. 15-20 questões. |
| Qua 12/08 | Ginecologia & Obstetrícia (peso qualitativo Alto) | Pré-natal, síndromes hipertensivas da gestação, hemorragias da gestação (subtemas `altoRendimento`). 15-20 questões. |
| Qui 13/08 | Pediatria (peso qualitativo Alto) | Neonatologia (reanimação), emergências pediátricas, desidratação/convulsão febril. 15-20 questões. |
| Sex 14/08 | Revisão livre | Só erros da semana. |
| Sáb 15/08 | **Simulado misto** | 25 questões (Neuro+Pneumo+GO+Pediatria). Classificar erros. |

### Semana 3 — 16/08 (dom) a 22/08 (sáb) — Conteúdo novo: Hematologia + Endocrinologia + Oncologia
*(depende da Etapa B ter sido concluída — ver pré-condição acima)*
| Dia | Foco | O que fazer |
|---|---|---|
| Dom 16/08 | Hematologia (peso real #5, 7 questões — **hoje vazia, será construída na Etapa B**) | Anemias — investigação e classificação. Ler resumo completo (conteúdo novo) + questões. |
| Seg 17/08 | Hematologia | Leucemias, Linfomas. Ler resumo completo + questões. |
| Ter 18/08 | Hematologia | Mieloma/Neoplasias mieloproliferativas + Medicina Transfusional. Ler resumo completo + questões. |
| Qua 19/08 | Endocrinologia (peso real #6 empatado, 8 questões — **hoje vazia**) | Nódulo e Câncer de Tireoide. Ler resumo completo + questões. |
| Qui 20/08 | Oncologia (peso real #7 empatado, 6 questões — **disciplina nova**) | Emergências Oncológicas + Princípios Básicos. Ler resumo completo + questões. |
| Sex 21/08 | Oncologia | Câncer de Pulmão + Farmacologia Oncológica/Imunoterapia. Ler resumo completo + questões. |
| Sáb 22/08 | **Simulado misto** | 25 questões (Hemato+Endócrino+Onco) — primeira vez vendo essas 3 juntas, esperar mais erros que o normal, é normal pra conteúdo recém-visto. |

### Semana 4 — 23/08 (dom) a 29/08 (sáb) — Otorrino + Dermatologia + Cirurgia + MFC
| Dia | Foco | O que fazer |
|---|---|---|
| Dom 23/08 | Otorrinolaringologia (peso real #7 empatado, 6 questões — **disciplina nova**) | Rinite/Rinossinusite, Otite. Ler resumo completo + questões. |
| Seg 24/08 | Otorrinolaringologia | SRO/Hipertrofia Adenotonsilar, Tontura/Vertigem, Tumores de Glândula Salivar/Orofaringe. Ler resumo completo + questões. |
| Ter 25/08 | Dermatologia (peso real #8 empatado, 4 questões — hoje só piodermites, +neoplasias cutâneas na Etapa B) | Piodermites + Neoplasias Cutâneas. Ler resumo completo + questões. |
| Qua 26/08 | Cirurgia (peso qualitativo Médio-alto) | Abdome Agudo, ATLS/Trauma. 15-20 questões. |
| Qui 27/08 | MFC & Atenção Primária (peso qualitativo Médio) | Epidemiologia (testes diagnósticos, tipos de estudo — cai toda edição segundo o Raio-X), Rastreamentos. 15-20 questões. |
| Sex 28/08 | Revisão livre | Só erros da semana. |
| Sáb 29/08 | **Simulado geral final do mês** | 40-50 questões misturando TODAS as disciplinas do mês (Infecto→MFC). É o teste real de retenção do mês inteiro. |

### 30-31/08 (dom-seg) — Fechamento do mês
- Revisar só as questões erradas do simulado geral de 29/08.
- Registrar em `[[Codex Medicus Dashboard]]` um resumo do mês: % de acerto por disciplina, quais temas ainda estão fracos — isso vira o ponto de partida do cronograma de setembro.

---

## 7. Depois de agosto — resto do semestre

Ordem sugerida (ainda por prioridade real, mas com menos urgência que o mês 1):
1. **Nefrologia** (peso real #1 dentro das vazias — ~9 questões, mas **sem fonte identificada ainda** em nenhuma pasta lida até agora — depende da pasta nova que o usuário vai mandar, ou de abrir os 22 arquivos do RESUMOS ainda não tocados).
2. **Gastroenterologia** (Wilson + hepatopatia alcoólica já lidos, prontos pra virar subtema — backlog seção 3).
3. Completar o backlog de Reumatologia/Dermatologia (Sjögren, Behçet, crioglobulinemia, IgA, miopatias inflamatórias — seção 3).
4. Continuar a triagem de `BBPM III/IV/VII/VIII`, `HCPM`, `LANN`, `UE`, `Farmacologia` (Etapa A) e integrar o que aparecer.
5. Oftalmologia, Geriatria, Psiquiatria — só depois, por serem o menor peso real confirmado até agora.
6. Revisão espaçada contínua: repetir semanalmente 1 simulado geral misturando tudo que já foi visto (evita esquecer o que foi estudado em agosto).

---

## 8. Regras permanentes desta fase (aplicam em toda sessão futura sobre este plano)

- **Obsidian sempre atualizado** ao final de qualquer rodada de construção de conteúdo: `Codex Medicus Dashboard.md` (relatório), hub da disciplina (temas/casos como wikilink), `Codex Medicus.md` (tabela de números), `OMED Raio-X.md` se mudar prioridade.
- **Eficiência de tokens**: preferir bash/grep/head a `Read` de arquivo inteiro quando só preciso de uma parte; usar scripts temporários (`scripts/_*-tmp.mts`) e apagar depois; não reler arquivo que acabei de escrever.
- **Usar conectores/skills disponíveis** em vez de trabalho manual quando fizer sentido — ex.: conector do Google Drive pra checar as pastas "Resumos e cursos"/"MEDICINA" ainda não exploradas (citadas em `PROMPTS-MASTER.md` como fonte pendente), skill do Obsidian pra manter formatação/wikilinks consistentes. Perguntar antes de usar um conector que ainda não foi autorizado nesta sessão.
- **Nunca inventar fato clínico** — regra de ouro do projeto, vale também pro cronograma (não citar número de questões/peso que não vem de uma extração real registrada no Raio-X).
- **Diretrizes médicas sempre atuais** (reforçado 2026-07-25, parte 4): todo conteúdo novo, adaptado
  ou corrigido — resumo, questão, caso clínico — precisa refletir a diretriz **vigente**, não a
  conduta antiga só porque é a que aparece na fonte (RESUMOS, Estratégia MED, bagagem de colega
  podem estar desatualizados). Antes de publicar qualquer conduta, checar se a sociedade responsável
  (MS, FEBRASGO, SBP, ACOG, IDSA, AHA/ESC/ACC, ADA, KDIGO, GOLD, GINA, Surviving Sepsis, TG18, WSES
  etc. — lista completa em `PROMPTS-MASTER.md`) já revisou aquele protocolo. Se a fonte e a diretriz
  atual divergirem, vale a diretriz — nunca replicar o desatualizado só por fidelidade à fonte.
- **Pedir autorização antes de `git push`** — sempre, mesmo em rodadas autônomas.

---

## 9. Segunda leva de fontes (2026-07-25, parte 2) — simulados, ZIPs Estratégia MED, Drive

> Usuário autorizou expressamente o uso de fontes de terceiros nesta leva (colegas de turma e conta
> que hospeda cursos pagos) — confirmado por pergunta direta antes de catalogar. Mesma regra de ouro
> continua valendo: nunca inventar fato clínico, sempre fundamentar em diretriz nomeada ao adaptar.

### 9.1 — `Desktop\cursos\simulado_omed_ciclo_clinico-v2.md` a `v7.md` (lidos por completo)
6 simulados, **175 questões inéditas com gabarito comentado**, já organizados por disciplina e
proporcionais ao peso real (Clínica Médica sempre a maior fatia, depois Cirurgia/GO/Pediatria quase
empatados, Medicina Preventiva a menor). Cobrem praticamente todas as disciplinas do ciclo clínico
em vinhetas curtas, estilo mais próximo do formato real da prova que os `.docx` da primeira leva.
**Pronto para uso direto** — só adaptar pro formato do banco (`Questao`) e casar com o `subtemaId`
certo. Sem marca de licença de terceiro.

### 9.2 — 15 ZIPs em Downloads = 3 cursos completos da Estratégia MED nunca extraídos
Mesmo curso já usado (e aprovado) para GO/Obstetrícia/Pediatria/Preventiva/Infectologia — mas estas
partes (Cardiologia, Neurologia, Cirurgia) **ainda não foram extraídas para `_pdfs-estrategia`**.
Estrutura: pasta por tópico, com PDF de Resumo/Slide (extrair) + Mapa Mental + Flashcard (extrair) +
Videoaulas em `.mp4` (**não analisar**, por instrução do usuário — só ficam de backup).

| Lote (prefixo do zip) | Disciplina | PDFs | Tópicos | Observação |
|---|---|---:|---|---|
| `20260718T214227Z-1-00{1..4}` | **Cardiologia** | 105 | BRADIARRITMIA, Cardiomiopatias, Choque, Dislipidemia, ECG, Fibrilação Atrial, HAS (Diagnóstico/Tratamento), IAM/SCASSST, Insuficiência Cardíaca, PCR, Pericardiopatia, Taquiarritmias, Valvopatias, Semiologia | Disciplina já 100% completa no site (fonte diferente) — usar aqui **principalmente para extrair imagens** (ECG, ecocardiograma) e enriquecer/verificar o que já existe, não para reconstruir do zero |
| `20260718T214155Z-1-00{1..7}` | **Neurologia** | 80 | Anatomia/Fisiologia/Semiologia, Cefaleias, Coma, Demências, Epilepsias, AVC, Doenças Neuromusculares, **Distúrbios do Movimento**, **TCE**, **Distúrbios do Sono**, **Doenças Desmielinizantes e Encefalites Autoimunes**, **Tumores Intracranianos** | 5 tópicos em **negrito não existem** na taxonomia atual (14 temas) — expansão real, não só imagem |
| `20260718T214114Z-1-00{1..4}` | **Cirurgia** | 172 | 33 tópicos: Trauma (avaliação inicial, choque, abdominal/pélvico, face/cervical, vascular/musculoesquelético, populações especiais, queimaduras), Abdome Agudo (inflamatório/vascular/hemorrágico/perfurativo/obstrutivo — 5 subtipos!), Vesícula/Vias Biliares, Complicações Pós-op, Hérnias, **Cirurgia Vascular**, **Cirurgia Torácica**, **Cirurgia Plástica**, **Urologia**, **Cirurgia Infantil** (partes I e III), **Proctologia**, Neoplasias do Apêndice, Nutrição em Cirurgia, Cicatrização, **Cirurgia Bariátrica**, Medicina Perioperatória | A disciplina Cirurgia do site hoje tem ~13 temas — este lote **quase triplica** a cobertura possível. Maior oportunidade de expansão de toda a segunda leva |

*(Faltam ~18 dos 33 ZIPs originais do lote 2026-07-18 — provavelmente outras disciplinas ainda em
Downloads ou nunca baixadas. Conferir se aparecem mais ZIPs quando o usuário mandar a próxima pasta.)*

### 9.3 — Google Drive (reconhecimento feito via conector, nada baixado ainda)
- **"Resumos e cursos"** (pasta raiz, dono `xxmedxx29@gmail.com` — conta de terceiro que hospeda
  cursos pagos, compartilhada com o usuário): contém `MEDCOF 2026`, `Estratégia 2025 extensivo`,
  `Estratégia 2024 Extensivo`, `Medcurso 2024`, `Farmacologia`. Só `Estratégia [ano] Extensivo` tem
  precedente de uso confirmado no projeto — **MEDCOF e MedCurso são cursos novos**, ainda não
  explorados, potencialmente com disciplinas/tópicos que nem a Estratégia MED nem o RESUMOS cobrem.
- **"BAGAGEM DO JOTA"** (dono `joao.ricartes@ufms.br`, colega de turma): estrutura em espelho às
  pastas `BBPM I-VIII`/`HCPM`/`UE`/`Farmacologia` do próprio usuário — `BBPM 3`, `BBPM 4`, `Tutoria
  1`, `Tutoria 2`, `APS 1/3`, `HCPM 3`, `UE 1`, `Anatomia 1`, `Habilidades Clínicas 1`, `Integrada
  1/2`, provas (`T1`-`T10`, `RESPOSTA DAS DISSERTATIVAS INTEGRADA`), organizado por `1º-4º Semestre`
  + `B7`/`B8` à parte. **Importante**: as pastas `BBPM I` e `BBPM II` do próprio usuário estão vazias
  — a cópia do João pode preencher exatamente essa lacuna, mais provas reais (`T1`-`T10`) com
  respostas, que o usuário sozinho não tem.
- **"BAGAGEM GABS"**, **"Bagagem Gabriel Peres"**, **"BAGAGEM DA Bia"**: não abertas ainda (mesmo
  padrão esperado — bagagem pessoal de colega). Conteúdo de qualidade variável por ser nota pessoal
  informal, não curso comercial — tratar com o mesmo rigor de conferência que o resto (nunca herdar
  erro de terceiro sem checar contra diretriz).
- Arquivos soltos como `Eletrocardiograma ESTRATÉGIA.pdf` (de colega): provavelmente duplicata do que
  já está nos ZIPs de Cardiologia — checar antes de reprocessar.
- **Atualização — reconhecimento completo do Drive (2026-07-25, parte 3):** todas as pastas de
  terceiros confirmadas com **uso liberado pelo usuário**.
  - `Estratégia 2024 Extensivo` (dentro de "Resumos e cursos") tem subpastas **Hematologia**,
    **Cirurgia**, **Gastrologia**, **Cardiologia**, **Neurologia** — ou seja, existe curso completo
    da Estratégia MED pra **Hematologia e Gastroenterologia**, as duas disciplinas que eu só tinha
    fonte via `.docx`/RESUMOS até agora. Prioridade alta pra abrir antes de escrever os subtemas
    dessas duas disciplinas — pode ser fonte mais rica que a atual.
  - `MEDCOF 2026` tem ao menos `Cirurgia` e `00. Materiais` — não aberto em profundidade ainda.
  - `BAGAGEM GABS` (Gabriel Jacinto) revela algo importante sobre as pastas do PRÓPRIO usuário:
    **`BBPM7 - CARDIO, PNEUMO E VASCULAR`** e **`BBPM8 - CCP, ORL e HEMATO`** — ou seja, `BBPM VII` e
    `BBPM VIII` do usuário (34 e 54 PDFs, ainda não triados) provavelmente cobrem exatamente essas
    disciplinas. **BBPM VIII em especial pode ter conteúdo nativo de Otorrino e Hematologia**,
    complementando (ou até substituindo com mais autoridade) o que viria só da Estratégia MED/docx.
  - `Bagagem Gabriel Peres`: Neuroanato, GO, Farmacologia Clínica, Clínica 5/6, Patologia, Medcurso
    aulas e apostilas, 4º semestre — valor misto, menor prioridade que os achados acima.

### 9.4 — Plano de extração de imagens clínicas (a pergunta central desta rodada)
Não existe nenhum arquivo de imagem solto em nenhuma fonte encontrada até agora — tudo está embutido
dentro de PDFs de slide/resumo. Caminho proposto:
1. Priorizar os PDFs de **Slide/Resumo** (não Mapa Mental/Flashcard, que são texto-denso e raramente
   têm imagem própria) dos lotes de maior valor: Cardiologia (ECG, ecocardiograma), Neurologia (TC/RM
   de AVC, tumores), Cirurgia (radiografias de abdome agudo, feridas/cicatrização), mais o que
   `MEDCOF`/`Estratégia [novos anos]` trouxerem.
2. Usar a ferramenta de PDF já disponível na sessão (render de página/região) pra renderizar cada
   página como imagem, olhar visualmente quais são fotos/exames clínicos reais (não diagrama
   genérico redesenhado) e recortar a região relevante.
3. Aplicar a mesma régua de licença já usada no projeto (`PROMPTS-MASTER.md` → seção "IMAGENS
   REAIS"): imagem do próprio material do usuário (aqui, cursos que ele tem acesso confirmado) é a
   melhor opção — igual ao que já foi feito com as 11 imagens aprovadas em julho.
4. Ancorar cada imagem aprovada no bloco certo do resumo correspondente (nunca só em galeria solta —
   já é a prática do projeto, ver `Codex Medicus Dashboard.md`, item de mídia clínica).
5. **Tentativa real feita em 2026-07-25 (parte 3), bloqueada por limitação técnica:**
   - Testei com o ECG (Cardiologia) e o TCE (Neurologia) — extraí os PDFs dos ZIPs (`RE -
     Eletrocardiograma.pdf`, `Material...traumatismo Cran-2-slide.pdf`).
   - **PDF Tools MCP** (`render_pdf_page`, `get_page_analysis`) rejeita os 4 PDFs testados do lote
     Cardiologia: `Failed to parse PDF object` no offset final do arquivo — o trailer/xref está
     malformado (artefato comum de export Google Drive → PDF). O script próprio do projeto
     (`extract-pdf.mts`, usa `unpdf`/pdf.js) abre o mesmo arquivo sem problema pra **texto**, então
     não é corrupção real — é só um parser mais rígido que não tolera o desvio do padrão.
   - **Screenshot via Browser pane**: o visualizador de PDF do Chrome abre o arquivo perfeitamente
     (confirmei visualmente — capa "Cardiologia — Resumo Estratégico" e miniaturas das 47 páginas
     carregaram certinho). Mas navegar pra uma página específica e capturar print ficou instável
     nesta sessão (`Screenshot timed out — the Browser pane is not displayed`), de forma
     intermitente — parece depender do painel estar em foco visível do lado do usuário, fora do meu
     controle.
   - **Conclusão**: dá pra ler texto de qualquer PDF dessas fontes sem problema (já uso isso o tempo
     todo), mas **extrair imagem de dentro delas está bloqueado nesta sessão** por essas duas
     limitações combinadas. Não é falta de autorização — é ferramenta.
   - **Alternativas pra próxima tentativa**: (a) usuário abrir/focar o painel do Browser antes de eu
     tentar de novo; (b) usuário re-exportar 1-2 PDFs de teste via "Imprimir → Salvar como PDF" no
     próprio visualizador dele (costuma normalizar o trailer e destravar o PDF Tools MCP); (c) tentar
     de novo em uma sessão nova, já que pode ser um problema pontual desta janela do Browser pane.

### 9.5 — Como isso muda a priorização
- **Cirurgia** passa de "conteúdo parcial" pra "maior oportunidade de expansão única" — 33 tópicos
  reais disponíveis contra ~13 já existentes. Vale a pena entrar na Etapa B antes do que estava
  planejado, não só ficar pra "resto do semestre".
- **Neurologia** ganha 5 temas novos de fonte pronta (TCE, Distúrbios do Movimento, Tumores
  Intracranianos, Doenças Desmielinizantes, Distúrbios do Sono) — baixo esforço, alto retorno, pode
  entrar na mesma leva de Hematologia/Oncologia/Otorrino da Etapa B.
- **Cardiologia** não precisa de conteúdo novo (já completa) — o lote serve só pra imagem e para
  cruzar/verificar o que já existe, prioridade baixa de tempo.
- **BBPM I/II** (vazias no usuário) podem ser preenchidas via "BAGAGEM DO JOTA" — mas só faz sentido
  investigar depois de entender que matéria BBPM I/II cobre (não checado ainda).
- Os 175 questões dos simulados (seção 9.1) servem qualquer subtema já existente ou a ser criado —
  não mudam prioridade, só engordam o banco de questões em paralelo à Etapa B.

---

## 10. Nova funcionalidade registrada — aba "Mapas Mentais" (backlog, NÃO construir ainda)

> Pedido do usuário em 2026-07-25 (parte 4): nova aba no site com mapas mentais bonitos e completos
> das principais matérias/temas que caem na OMED. **Só registro — não construir sem autorização
> explícita.** Task rastreada no sistema de tarefas da sessão (#39).

**Escopo proposto, a refinar quando for construir:**
- Nova rota no site (ex.: `/mapas-mentais`), item novo na navegação principal.
- Conteúdo prioriza pela **frequência real** (seção 0/9.5): começar pelas disciplinas já completas e
  de maior peso — Infectologia, Cardiologia, Neurologia, Pneumologia — antes de disciplinas novas
  ainda em construção (Hemato/Onco/Otorrino/Endócrino), pra não gerar mapa mental de conteúdo que
  ainda não existe como resumo no site.
- Cada mapa mental deriva do **resumo já existente/aprovado** daquele subtema — nunca um mapa mental
  solto sem lastro no `ConteudoSubtema` real (mesma regra de ouro do resto do projeto: nunca inventar
  fato clínico, e sujeito à regra de diretriz atual da seção 8).
- Decisão técnica em aberto: gerar como SVG próprio por tema (mais trabalho, mais controle visual e
  mais fácil de manter "bonito e completo") vs. biblioteca de grafo/árvore (mais rápido de escalar
  pras 195+ subtemas, mas visual mais genérico). Avaliar quando for implementar.
- Reaproveitar a mesma estrutura de seções do resumo (Definição → Fisiopatologia → Diagnóstico →
  Condutas → Pegadinhas) como esqueleto do mapa mental, não recriar taxonomia nova do zero.

---

## 11. Passo a passo consolidado — sessão completa (2026-07-25)

> Visão única de tudo, do que já foi construído em rodadas anteriores até o que ficou só planejado
> hoje. Serve de ponto de partida pra próxima sessão (sua ou de outra IA) sem precisar reler a
> conversa inteira — o Obsidian (`Codex Medicus Dashboard.md`) tem a versão espelhada disso.

### O que já está PRONTO no site (construído, verificado, commitado — algumas partes já com push)
- Monitoramento de erro real (tabela Supabase própria, sem conta terceira).
- Extração completa das 4 edições da OMED (II–V) — frequência real por disciplina, base de toda a
  priorização deste documento.
- **Reumatologia**: 4 subtemas completos (Vasculites Grandes/Médios Vasos, Vasculites ANCA,
  Esclerose Sistêmica, Espondiloartrites) + 4 questões — commitado e com push (`ec02ca5`).
- Cardiologia, Pneumologia, Neurologia, Infectologia, GO, Pediatria, MFC — já completos de rodadas
  anteriores a esta sessão.
- Grafo do Obsidian (hubs de disciplina) e Dashboard mantidos atualizados a cada rodada.

### O que está MAPEADO mas NÃO construído (aguardando autorização pra Etapa B)
- 17 subtemas novos com fonte já lida e organizada (seção 2): Hematologia (5), Oncologia (4, disciplina
  nova), Otorrinolaringologia (5), Endocrinologia (1), Dermatologia (2 adicionais).
- Backlog do RESUMOS já lido (seção 3): 5 subtemas de Reumato/Dermato + 2 de Gastro, prontos pra
  escrever sem precisar reler PDF.
- Mudanças de taxonomia correspondentes (seção 4) — nenhuma aplicada ainda no `taxonomy.ts`.

### O que está DESCOBERTO mas NÃO triado (fontes novas, ainda sem leitura de conteúdo)
- `HCPM`, `BBPM III/IV/VII/VIII`, `LANN`, `UE`, `Farmacologia` (pastas do próprio usuário).
- 15 ZIPs em Downloads = Cardiologia/Neurologia/Cirurgia da Estratégia MED (357 PDFs) — só o índice
  de tópicos foi visto, nenhum conteúdo lido ainda.
- `MEDCOF 2026`, `Medcurso 2024`, `Estratégia 2024 Extensivo` (Hemato/Gastro), `Bagagem GABS/Gabriel
  Peres/Bia` no Google Drive — reconhecimento de pastas feito, conteúdo interno não aberto.
- 22 arquivos do RESUMOS nunca abertos.

### O que está BLOQUEADO tecnicamente (não é falta de autorização)
- Extração de imagem clínica dos PDFs Estratégia MED: PDF Tools MCP rejeita o trailer malformado
  desses arquivos; captura de tela via Browser pane ficou instável nesta sessão. 3 caminhos
  documentados pra destravar (seção 9.4).

### O que está REGISTRADO como pedido futuro (não iniciar sem autorização)
- Nova aba "Mapas Mentais" (seção 10, task #39).

### Ordem de execução recomendada pra próxima rodada de trabalho
1. Confirmar com o usuário: autorizar a Etapa B (construir os 17 subtemas mapeados)? Autorizar
   também expandir Cirurgia com o lote de 172 PDFs (33 tópicos, maior oportunidade encontrada)?
2. Se sim: Etapa A rápida primeiro (ler HCPM, abrir `Estratégia 2024 Extensivo` pra Hemato/Gastro
   antes de escrever esses dois — pode ser fonte melhor que a atual) → Etapa B (escrever conteúdo) →
   Etapa C (verificar/publicar) → Etapa E (Obsidian).
3. Paralelo, sem depender do resto: continuar o cronograma de agosto (seção 6) já vale a partir de
   02/08 independente do estado da Etapa B (só os dias de semana 3–4 dependem dela).
4. Retomar a extração de imagem quando um dos 3 caminhos da seção 9.4 estiver disponível.
5. Mapas Mentais fica pro fim da fila — só depois que o conteúdo textual das disciplinas prioritárias
   estiver fechado, já que cada mapa depende do resumo já existir.

---

## 12. Pendências abertas

- [x] ~~Confirmar se posso usar pastas de terceiros (Resumos e cursos, Bagagem\*) no site público~~ — autorizado 2026-07-25.
- [ ] Pasta(s) novas do usuário — aguardando envio (mensagem mais recente disse "mandarei mais daqui a pouco").
- [ ] Confirmar com o usuário se quer mesmo uma disciplina "Oncologia" separada, ou se prefere distribuir esse conteúdo pelas disciplinas de origem (pulmão→Pneumo, pele→Dermato, etc.) — ver nota na seção 2.
- [ ] HCPM, BBPM III/IV/VII/VIII, LANN, UE, Farmacologia (pastas do próprio usuário) — não triados, ver Etapa A.
- [ ] Extrair os 15 ZIPs (Cardio/Neuro/Cirurgia) pra `_pdfs-estrategia` — ver seção 9.2, ainda não feito.
- [ ] Abrir `MEDCOF 2026` e `Medcurso 2024` no Drive (cursos novos, nunca explorados) — ver seção 9.3.
- [ ] Abrir `BAGAGEM GABS`, `Bagagem Gabriel Peres`, `BAGAGEM DA Bia` no Drive — só o índice de `BAGAGEM DO JOTA` foi conferido até agora.
- [ ] Checar se `BBPM I`/`BBPM II` (vazias no usuário) têm conteúdo real em `BAGAGEM DO JOTA` antes de decidir se vale importar de lá.
- [ ] Extração de imagens clínicas (seção 9.4) — plano definido, execução não iniciada.
- [ ] Checar duplicidade entre arquivos soltos de colegas (ex.: `Eletrocardiograma ESTRATÉGIA.pdf`) e o que já está nos ZIPs, antes de reprocessar.
- [ ] Aba "Mapas Mentais" (seção 10, task #39) — registrado, não iniciar sem autorização explícita.

---

## 13. Pipeline de conversão e triagem completa (2026-07-26)

### 13.1 Por que mudou o jeito de ler as fontes

Até aqui, cada consulta a uma fonte significava reabrir o PDF e gastar leitura cara nele.
Agora existe um pipeline de duas etapas que faz isso uma vez só:

| Script | O que faz |
|---|---|
| `scripts/fonte-para-md.mts` | Converte PDF (via `unpdf`) e DOCX (lendo o zip e o `word/document.xml`, sem dependência nova) em Markdown, com cache por data de modificação. Gera `_manifest.json`/`_manifest.md` dizendo, arquivo por arquivo, quantas páginas têm camada de texto e quantas são slide-imagem que exigiriam OCR. |
| `scripts/triar-fontes.mts` | Roda sobre os Markdown gerados e conta termos-âncora de 17 disciplinas. Responde "onde está o material de Nefrologia?" sem abrir arquivo nenhum. Gera `_triagem.md`/`_triagem.json`. |

Saída em `C:\Users\Adm\Desktop\MEDICINA\_md-cache\` (fora do repositório, não versionado).
**254 arquivos convertidos** — HCPM, BBPM III/IV/VII/VIII, LANN, UE, Farmacologia, RESUMOS e os 4 `.docx` da raiz.

Para reconverter só o que mudou: `npx tsx scripts/fonte-para-md.mts "<pasta>" --out "<cache>"`.
Para retriar: `npx tsx scripts/triar-fontes.mts "<cache>" --min 15`.

### 13.2 Achado que reordena a prioridade: Nefrologia saiu do escuro

Nefrologia é a **maior frequência real ainda sem conteúdo** (9 questões nas 4 edições, acima de
Gastro e Endócrino) e até 2026-07-25 constava como "sem fonte encontrada". A triagem achou duas:

- `RESUMOS/AMBULATÓRIOS.md` linhas 8016+ — síndromes glomerulares (nefrítica × nefrótica, GNPE,
  nefropatia por IgA, GESF, lesão mínima, membranosa).
- `RESUMOS/ANEMIA.md` linhas 10681+ — o nome do arquivo engana: a parte final é IRA e DRC, com
  estadiamento KDIGO. **Cita KDIGO 2013** — precisa ser escrito na versão vigente, incluindo
  inibidor de SGLT2 na nefroproteção, que não existia naquela versão.

### 13.3 Achado que melhora o que já estava planejado: BBPM VIII

`BBPM VIII` é praticamente o mapa dos subtemas que a seção 2 propôs — só que como material de
curso organizado por tema, não como banco de questões:

| Pasta | Cobre |
|---|---|
| `AMULATORIOS/HEMATOLOGIA/` | ANEMIAS (micro, macro, hemolíticas, introdução), HEMOSTASIA, LEUCEMIAS (agudas, crônicas), Mieloma |
| `AMULATORIOS/ONCOLOGIA/` | CA colorretal, câncer de mama, neoplasia de pulmão, pólipos |
| `AMULATORIOS/CABEÇA E PESCOÇO/tireoide/` | Tireoide clínica, cirúrgica e fisiologia |
| `AMULATORIOS/OTORRINO/resumos/` | Infecções de via aérea, otoneurologia, resumo com questões |
| `CONFERENCIAS/oncologia/` | Emergências oncológicas, cabeça e pescoço, pulmão |
| `PATOLOGIA/` | Neoplasias de pele, linfoma, neoplasias em geral |

Além disso, dois arquivos grandes do RESUMOS que nunca tinham sido abertos se revelaram ricos:
`RESUMOS/ONCOLOGIA.md` (432 KB) e `RESUMOS/DERMATOLOGIA.md` (425 KB — muito além das "páginas 1-4"
que a seção 2 supunha).

### 13.4 Achado de proveniência: livro de terceiro fora da pasta esperada

A regra antiga tratava só `livros gerais` como intocável. A triagem mostrou **16 livros de editora
espalhados dentro de pastas de matéria** — `Veronesi - Tratado de Infectologia` (11,8 GB de texto
convertido) em `BBPM IV/INFECTO/`, `Abbas - Imunologia` e `Male - Imunologia` em `BBPM III/imuno/`,
`Otorrino - Piltcher` e `Miniti/Bento/Butugan` em `BBPM VIII/.../OTORRINO/livros/`, além de
Zugaib, Moore, Thompson e Parasitologia Neves.

`triar-fontes.mts` agora detecta isso por nome (autor conhecido, "Tratado", "N ed", pasta `livros/`)
**e por tamanho** (acima de 1,5 MB de texto convertido não é resumo de aula). Esses arquivos ficam
fora de todo ranking de fonte e aparecem numa lista própria no fim do relatório.

**Regra reafirmada:** livro de editora é conhecimento de fundo. Nunca vira texto extraído,
parafraseado de perto ou republicado no site.

### 13.5 Ordem de construção corrigida pela frequência real

A seção 2 propunha 17 subtemas com base nas fontes conhecidas em 2026-07-25. Com as fontes novas,
a ordem correta por frequência real na OMED passa a ser:

| Ordem | Disciplina | Questões/4 edições | Fonte | Situação |
|---|---|---:|---|---|
| 1 | Nefrologia | 9 | `AMBULATÓRIOS.md`, `ANEMIA.md` | Etapa B2 |
| 2 | Gastroenterologia | 8 | `MEDCURSO HEPATOLOGIA`, `DOR+ABDOMINAL.md` | Etapa B2 |
| 3 | Endocrinologia | 8 | `NEOPLASIA TUDO`, BBPM VIII tireoide | Etapa B1 |
| 4 | Hematologia | 7 | `RESTOS DAS CONF`, BBPM VIII hemato | Etapa B1 |
| 5 | Oncologia | 6 | `RESUMOS/ONCOLOGIA.md`, BBPM VIII onco | Etapa B3 |
| 6 | Otorrinolaringologia | 6 | BBPM VIII otorrino, `OTORRINO QUESTOES` | Etapa B3 |
| 7 | Dermatologia | 4 | `RESUMOS/DERMATOLOGIA.md` | Etapa B3 |

### 13.6 Como o conteúdo é escrito agora

`scripts/gerar-conteudo.mts` fecha o circuito: cada subtema é escrito como um JSON próprio (um
agente por subtema, sem conflito de escrita), o script valida e emite o TypeScript final.

A validação **falha o build** se: faltar qualquer uma das 17 seções, houver ID de subtema duplicado,
uma questão tiver zero ou mais de uma alternativa correta, dois comentários da mesma questão forem
iguais, ou um comentário tiver menos de 40 caracteres. Isso trava na origem os defeitos que já
apareceram antes no banco (comentário copiado entre alternativas, seção faltando).

Cada subtema passa ainda por uma **revisão adversarial** — um segundo agente cuja tarefa é achar
erro, não aprovar: diretriz desatualizada, fato incorreto, gabarito errado (ele resolve a questão
antes de olhar o gabarito), comentário repetido, referência fabricada. As correções são aplicadas
no JSON antes da geração.

### 13.7 Bloco 1 entregue (2026-07-26) — e por que agora trabalha em blocos menores

Os dois primeiros workflows (6 subtemas de Endócrino/Hemato + 5 de Nefro/Gastro, rodando em
paralelo) bateram no limite de sessão do Claude no meio do caminho — a maioria dos agentes de
revisão falhou. Depois de retomar via cache, ainda sobrou trabalho pela metade. **O usuário pediu
pra desacelerar**: blocos menores, atualizar tudo a cada bloco fechado, pedir autorização antes do
próximo. A partir daqui é assim que este plano avança.

**Bloco 1 — integrado no site, typecheck limpo, zero órfãos, não commitado:**
- Endocrinologia → Nódulo e Câncer de Tireoide
- Hematologia → Anemias, Medicina Transfusional, Leucemias Agudas e Crônicas

3 correções reais pegas pela revisão adversarial antes de entrar: referência de diretriz com
coautoria incorreta (carcinoma anaplásico de tireoide), corte de gravidade de anemia da OMS
aplicado de forma genérica a adulto (é específico de gestante/criança), nome de medicamento errado
(gentuzumabe → gemtuzumabe ozogamicina).

**Escrito mas NÃO integrado — aguardando terminar a revisão adversarial (regra: nunca publicar
conteúdo clínico sem essa checagem) e autorização para o próximo bloco:**
- Hematologia → Linfomas (Hodgkin/Não-Hodgkin), Mieloma Múltiplo e Neoplasias Mieloproliferativas
- Nefrologia → Síndromes Glomerulares, Injúria Renal Aguda e Doença Renal Crônica (⚠️ fonte cita
  KDIGO 2013, precisa confirmar se o texto já foi pra versão vigente na revisão)
- Gastroenterologia → Cirrose e Complicações, Pancreatite Aguda (escritos); Hepatites Virais (nem
  chegou a ser escrito — falhou na primeira etapa)

Os JSONs de tudo isso estão em
`C:\Users\Adm\AppData\Local\Temp\claude\...\scratchpad\conteudo-json\` (caminho de sessão, não
persiste — se a sessão for perdida antes do próximo bloco, esses 5 subtemas precisam ser
reescritos, não só revisados).
