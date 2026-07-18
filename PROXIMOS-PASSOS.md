# Próximos passos — Codex Medicus

> Atualizado em 2026-07-18 — rotina diária das 6h + sessão interativa (imagens reais). Este arquivo é reescrito ao fim de cada sessão.

## Estado atual

| | |
|---|---|
| **Site** | https://thiagotrajano-arch.github.io/MEDICINA-TT/ |
| **Resumos** | **32** de 162 subtemas |
| **Questões** | **203** (GO 79 · Ped 34 · Inf 60 · MFC 12 · Cir 8 · originais 10) |
| **Casos clínicos** | 4 (GO, Ped, Inf, Cir) |
| **Figuras** | 17 (12 diagramas SVG + 5 imagens reais licenciadas) |
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
- Commit `0b99873`, push feito para `main`. Falta confirmar o deploy do
  GitHub Actions/Pages (próxima sessão deve checar se as imagens carregam
  no site publicado, não só no dev local).

## PRIORIDADE 1 — Continuar a extração (nesta ordem)

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

## Checklist antes de commitar (reforçado, seguido nesta sessão)

1. `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit` — ok, 0 erros.
2. Validar vínculos órfãos (script `scripts/_validate-tmp.mts`, apagado
   depois): 0 órfãos, 0 IDs duplicados, 203 questões / 32 resumos.
3. `npx tsx scripts/seed-supabase.mts` — ok (36 disciplinas, 32 resumos,
   203 questões).
4. Verificado visualmente no navegador: resumo STORCH de Infectologia e
   página de questões de GO (hemorragias 1ª metade, 28 questões) — ambos
   renderizando corretamente, sem erros de console.
5. Push feito (confirmado na sessão seguinte: `origin/main` sincronizado
   até o commit das imagens reais, nada pendente).

## Regra de ouro

**Nunca inventar fato clínico.** Toda afirmação vem do material do usuário
ou de diretriz (MS, FEBRASGO, SBP, ACOG, IDSA, CDC, Surviving Sepsis, TG18,
WSES). Quando o material não trouxer gabarito, a resposta é determinada e
justificada com base em diretriz nomeada — nunca "chutada". Uma questão
errada é pior que uma questão a menos.
