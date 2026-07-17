# Próximos passos — Codex Medicus

> Atualizado em 2026-07-17 (rotina diária das 6h). Este arquivo é reescrito ao fim de cada sessão.

## Estado atual

| | |
|---|---|
| **Site** | https://thiagotrajano-arch.github.io/MEDICINA-TT/ |
| **Resumos** | **31** de 162 subtemas |
| **Questões** | **91** (GO 19 · Ped 22 · Inf 26 · MFC 14 · Cir 10) |
| **Casos clínicos** | 4 (GO, Ped, Inf, Cir) |
| **Figuras SVG** | 12 diagramas originais |
| **Ferramentas** | Dashboard, Simulado, Casos, Mídia, Questões, Biblioteca — todas funcionais, nenhum placeholder |

## O que foi feito nesta sessão (2026-07-17, rotina automática)

### Infectologia — `Infectologia_OMED_15_Temas (1).pdf` — **15/15 TEMAS COMPLETOS** ✅
Finalizados os 6 temas que faltavam: **hepatites virais**, **doenças exantemáticas**
(sarampo/rubéola/escarlatina/Kawasaki), **zoonoses e doenças emergentes** (raiva,
leptospirose, mpox — split em 3 subtemas), **parasitoses intestinais e protozooses**,
**antibioticoterapia** (mecanismos de resistência) e **imunizações e profilaxias
pós-exposição**. A taxonomia ganhou 3 temas novos (zoonoses, parasitoses,
exantemáticas-em-infectologia) para acomodar subtemas sem slot prévio.

Questões do simulado (`Infectologia_OMED_Simulado_160_Questoes_Gabarito_Comentado.pdf`):
completado sífilis (Q14–18) e HIV/AIDS (Q19–24), conferidas contra o gabarito
comentado — **Inf agora em Q1–24 de 160**.

### GO — `OMED_GO_Material_Completo_10_Temas.pdf` (155 págs, 10 temas, novo material)
4 resumos extraídos: **primeira metade da gestação** (abortamento, gravidez
ectópica — anatomia/fisiopatologia/critérios de MTX, mola hidatiforme),
**infecções congênitas TORCH** (padrão de calcificação como diferencial,
protocolos de tratamento materno/neonatal de sífilis e toxoplasmose),
**mecanismo e fases do parto** (7 movimentos cardinais, mudança ACOG/SMFM
2014 da fase ativa em 6cm) e **partograma/distocia** (DCP × distocia
funcional, protocolo HELPERR completo para distocia de ombro).

### Nova figura SVG
`inf-exantemas-padrao-temporal` — padrão temporal febre×exantema (sarampo ×
exantema súbito), ancorada no resumo de doenças exantemáticas.

### Bugs corrigidos
Nenhum bug de plataforma encontrado nesta sessão. Durante a extração,
autocorrigi 2 erros próprios antes de commitar: `estilo: "tratamento"` não
é um valor válido de `EstiloQuestao` (corrigido para `"conduta"`), e duas
figuras foram acidentalmente ancoradas em seções erradas (`go-dpp-vs-pp` e
`mfc-tabela-2x2` não tinham relação com o conteúdo) — removidas antes do
commit.

## ⚠️ MUDANÇA DE FONTE (2026-07-17, tarde) — os PDFs saíram do Downloads

A pasta `C:\Users\Adm\Downloads\` foi **limpa** — os PDFs OMED (`Infectologia_OMED_15_Temas`, `Cirurgia_Banco_160`, `MFC_Banco_80`, `Infectologia_Simulado_160`, etc.) **não estão mais lá**. Não tente extraí-los do Downloads: o `extract-pdf.mts` vai dar `ENOENT`.

**Fontes alternativas (usar nesta ordem):**
1. **Histórico desta conversa/sessão do Claude** — vários materiais foram colados nas mensagens e ainda estão no contexto (ex.: as 80 questões de GO do "Banco OMED GO", e o "Simulado de Pediatria 1 comentado" completo com gabarito de 68 questões). O usuário confirmou: "os temas que não achar na pasta Downloads estão nas conversas do Claude também."
2. **Google Drive do usuário** (ferramentas `mcp__9734b289...__search_files` / leitura de conteúdo). Google Docs encontrados no Drive raiz (`parentId 0AOuKO_XOjsM9Uk9PVA`):
   - `Banco de Questões OMED: Ginecologia e Obstetrícia` (Google Doc, id `1843iScXNAjOR8pj_LraTF-gzSEcX0xOR7Y2Silvc4Hk`)
   - `simulado indectologia` (Doc, id `1ICb-YzIKgIpgLMvEQZfxxBkSw-8fng7WNU8namooguE`)
   - `Simulado de Pediatria 1` (Doc, id `1LbjYvrqeF3N6u3ieuDAjlhxo7YrgGKblfVkhAy2vI_I`)
   - `omed abertas go ped` (Doc, id `19PczBChHRbjwOMBCyOUSpgBJzSy8UIeetl-nr8ds4mM`)
   - Para ler um Google Doc: usar a ferramenta de leitura de conteúdo do Drive (`read_file_content`/`download_file_content` — exportam como texto).
   - Pastas de multimídia (`Simulado_Multimídia_Radiologia`, `12. Simulados Multimídia`) estavam **vazias** — sem imagens aproveitáveis ali. Procurar imagens reais em `RESUMOS`/`MEDICINA` (ver Prioridade 2).

Progresso desta sub-sessão (tarde): +9 questões Inf (dengue Q25-29, sepse Q30-33) e +14 Ped (lote 2), do material já em contexto. **Total agora: 114 questões** (GO 19 · Ped 36 · Inf 35 · MFC 14 · Cir 10), 31 resumos.

## PRIORIDADE 1 — Terminar a extração (continuar daqui)

### Infectologia
Os 15 temas do resumo estão completos. Resta o banco de questões:

| Fonte | Feitas | Faltam |
|---|---|---|
| `Infectologia_OMED_Simulado_160_Questoes_Gabarito_Comentado.pdf` | Q1–24 (TB, meningites, sífilis, HIV) | **Q25–160** — próximo: Dengue/arboviroses (Q25–28 já no gabarito, ver abaixo), sepse (Q29–35), depois PAC/ITU/endocardite/hepatites/exantemáticas/zoonoses/parasitoses/antibioticoterapia/imunizações (Parte 1, Q36–80), depois toda a Parte 2 clínica (Q81–160) |

**Atalho útil:** o gabarito comentado de Q25–35 (dengue+sepse) já foi lido nesta
sessão (págs. 54–55 do PDF) — está registrado no scratchpad da sessão anterior,
mas não persistido em arquivo; refazer a extração é rápido (`npx tsx
scripts/extract-pdf.mts "Infectologia_OMED_Simulado_160_Questoes_Gabarito_Comentado.pdf"
54 55`). Perguntas (Parte 1) começam na pág. 4; gabarito comentado começa por
volta da pág. 52 (Q7) — a correspondência é ~1 página de gabarito por ~7
questões.

### GO — `OMED_GO_Material_Completo_10_Temas.pdf` (155 págs)
Sumário: 01 Pré-eclâmpsia✅ 02 Sangramento na Gravidez✅(parte) 03 Gravidez
Ectópica✅ **04 SOP** (pág. ~51–70, não extraído) **05 Distocia/Partograma**✅
**06 Endometriose** (pág. ~85–98, não extraído) **07 Infecções Congênitas**✅
**08 Câncer de Mama** (pág. ~116–130ish, não extraído) **09 Câncer de Colo**
(não extraído) **10 DIP** (não extraído).

- **SOP e Endometriose** não têm subtema na taxonomia ainda — precisa criar um
  tema novo em GO (ex: "Ginecologia geral" ou temas dedicados), como foi feito
  para zoonoses/parasitoses em infectologia.
- **Câncer de mama** e **Câncer de colo** já têm subtema pronto:
  `go--rastreamento-em-ginecologia--cancer-de-mama` e
  `go--rastreamento-em-ginecologia--cancer-de-colo-do-utero` — só extrair e
  escrever.
- **DIP** também precisa de tema novo (não existe em GO nem em infectologia).

Outros materiais de GO ainda intocados: `Síndromes_Hipert.pdf`, `Pré-Natal_.pdf`
(prováveis duplicatas/complementos do que já foi extraído do material completo),
`Cuidados_Neonatais.pdf` (pediatria).

### Outras disciplinas
- **Pediatria**: `Manual_OMED_Pediatria_Alta_Performance.pdf`,
  `omed_pediatria_vol1.pdf`, `omed_pediatria_vol3_v2.pdf` — não tocados ainda.
  22 questões já existem; resumos ainda escassos fora do que já foi feito.
- **Cirurgia**: `Cirurgia_Resumo_Absoluto_OMED_VI.pdf` (resumo) — não tocado.
  `Cirurgia_Banco_160_Questoes_Gabarito.pdf`: Q1–8 feitas, **Q9–160 faltam**
  (gabarito começa pág. 43).
- **MFC**: `MFC_Resumo_Absoluto_OMED_VI.pdf` — não tocado.
  `MFC_Banco_80_Questoes_Gabarito.pdf`: Q1–12 feitas, **Q13–80 faltam**
  (gabarito começa pág. 24).

## PRIORIDADE 2 — Imagens clínicas reais

Ainda não abordado nesta sessão (nenhuma imagem real adicionada). Continua
válido o plano do handoff anterior:

1. **Google Drive do usuário** (pastas "Resumos e cursos" e "MEDICINA") — uso
   livre, melhor opção. Ainda não explorado nesta sessão.
2. **Radiopaedia** — prefira **linkar** o caso a embutir a imagem.
3. **Wikimedia Commons** — domínio público/CC; se embutir, baixar para
   `public/img/` (nunca hotlink).
4. **Open-i (NIH)** / **PMC** open access — verificar licença de cada imagem.

Implementação sugerida: estender `src/components/figuras/registry.tsx` com um
tipo de figura externa (`url`, `fonte`, `licenca`, `autor`, crédito visível
obrigatório). Ver `midia.licenca` no schema Supabase.

## Armadilhas do ambiente (economize tempo)

- **O dev server lê do Supabase, não direto dos arquivos `.ts`** — depois de
  editar `src/content/conteudos/*.ts` ou `taxonomy.ts`, **rode `npm run seed`
  antes de verificar no navegador**, senão a página mostra "conteúdo a
  importar" mesmo com o resumo já escrito no código. Isso me custou uma
  verificação nesta sessão.
- **Cuidado ao anexar `figura` a um bloco de conteúdo**: o campo é uma string
  livre sem checagem de tipo — anexar o `id` errado (de uma figura de outro
  tema) não dá erro de build, só renderiza a figura errada. Sempre confirme
  contra `src/components/figuras/registry.tsx` que a figura escolhida
  realmente ilustra a seção. Cometi esse erro 2x nesta sessão (corrigidos
  antes do commit) — revisar visualmente no navegador antes de commitar.
- **Screenshot do navegador SEMPRE trava** → use `javascript_tool` /
  `get_page_text` / `read_page`.
- **Dev server dá 404 em tudo menos `/` quando o `.next` corrompe** →
  `rm -rf .next`.
- **Build e tsc estouram memória** → `NODE_OPTIONS=--max-old-space-size=6144`,
  e pare o dev server antes de buildar.
- **Não use crases em commit via bash** → use `git commit -F - <<'EOF'`.
- **Identidade git**: o ambiente às vezes não tem `user.name`/`user.email`
  configurado. O padrão do projeto é `Codex Medicus <noreply@local>`
  (repo-local, não global) — configure com `git config user.name`/`user.email`
  se o commit falhar por "Author identity unknown".
- `temConteudo` é **derivado** de CONTEUDOS em `taxonomy.ts` — nunca marcar à
  mão.
- **PDFs grandes**: a ferramenta Read não pagina (falta poppler) → use
  `npx tsx scripts/extract-pdf.mts "<arquivo>" <ini> <fim>`. Para achar onde
  um tema começa num PDF de "N temas" sem sumário com números de página,
  procure o marcador `TEMA 0X` no texto extraído (grep) — a busca binária por
  faixas de ~8 páginas é rápida.

## Checklist antes de commitar

1. `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit`
2. Validar que não há vínculo órfão (questão/resumo/caso → subtema
   inexistente) — script rápido: instanciar `DISCIPLINAS`/`CONTEUDOS`/
   `QUESTOES` e comparar os `id`s (ver exemplo nos commits desta sessão, não
   deixar o script no repo depois).
3. `npx tsx scripts/seed-supabase.mts` (repopula o Supabase) — **obrigatório
   mesmo se for só verificar visualmente**, ver armadilha acima.
4. Verificar visualmente no navegador (`preview_start` + `get_page_text`) que
   cada resumo novo renderiza como esperado, especialmente figuras ancoradas.
5. `git push origin main` ao final de cada bloco — dispara o redeploy.

## Regra de ouro

**Nunca inventar fato clínico.** Toda afirmação vem do material do usuário ou
de diretriz (MS, FEBRASGO, SBP, ACOG, IDSA, Surviving Sepsis, TG18, WSES).
Conferir o gabarito antes de marcar a alternativa correta. Uma questão errada
é pior que uma questão a menos — o usuário memoriza o erro e o leva para a
prova.
