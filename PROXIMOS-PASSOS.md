# Próximos passos — Codex Medicus

> Atualizado em 2026-07-16. Este arquivo é reescrito ao fim de cada sessão.
> A rotina diária das 6h lê isto primeiro para saber onde continuar.

## Estado atual

| | |
|---|---|
| **Site** | https://thiagotrajano-arch.github.io/MEDICINA-TT/ |
| **Resumos** | **19** de 158 subtemas |
| **Questões** | **80** (GO 19 · Ped 22 · Inf 15 · MFC 14 · Cir 10) |
| **Casos clínicos** | 4 (GO, Ped, Inf, Cir) |
| **Figuras SVG** | 11 diagramas originais |
| **Ferramentas** | Dashboard, Simulado, Casos, Mídia, Questões, Biblioteca — todas funcionais, nenhum placeholder |

## PRIORIDADE 1 — Terminar a extração

### Infectologia — `Infectologia_OMED_15_Temas (1).pdf` (65pp)
Resumos **feitos (9/15)**: Tuberculose, Meningites, Sífilis, HIV/AIDS, Dengue, Sepse, PAC, ITU, Endocardite.

**Faltam (6/15)** — continuar daqui:
| Tema | Páginas aprox. |
|---|---|
| **Hepatites virais** (interpretação sorológica) | ~41–45 |
| **Doenças exantemáticas** | ~45–49 |
| **Zoonoses** (raiva, leptospirose, monkeypox) | ~49–53 |
| **Parasitoses intestinais e protozooses** | ~53–57 |
| **Antibioticoterapia e resistência** | ~57–60 |
| **Imunizações e profilaxias pós-exposição** | ~60–65 |

Subtemas já existentes na taxonomia para estes: `inf--hepatites-virais--interpretacao-sorologica`, `inf--antibioticoterapia--principios-de-antibioticoterapia-empirica`, `inf--imunizacoes-no-adulto--vacinas-do-adulto`, `inf--malaria--diagnostico-e-tratamento`, `inf--leptospirose--fases-e-manejo`. Para exantemáticas/parasitoses pode ser necessário **criar o tema** (como foi feito com Pneumonias e ITU).

### Questões
| Fonte | Feitas | Faltam |
|---|---|---|
| `Infectologia_OMED_Simulado_160_Questoes_Gabarito_Comentado.pdf` (75pp) | Q1–13 | Q14–160 · Parte 1 começa p4; gabarito no fim |
| `Cirurgia_Banco_160_Questoes_Gabarito.pdf` (59pp) | Q1–8 | Q9–160 · questões pp3–42, **gabarito começa p43** |
| `MFC_Banco_80_Questoes_Gabarito.pdf` (32pp) | Q1–12 | Q13–80 · **gabarito começa p24** |
| `questoes all go 1.pdf` / `2.pdf` | parcial | gabarito em `gabarito_omed_go.pdf` |
| `Simulado_OMED_Pediatria_80Q_5Disc_Gabarito.pdf` | — | tudo |

### Outros resumos
- **GO**: `OMED_GO_Material_Completo_10_Temas.pdf`, `Síndromes_Hipert.pdf`, `Pré-Natal_.pdf`
- **Pediatria**: `Manual_OMED_Pediatria_Alta_Performance.pdf`, `Cuidados_Neonatais.pdf`
- **Cirurgia**: `Cirurgia_Resumo_Absoluto_OMED_VI.pdf`

## PRIORIDADE 2 — Imagens clínicas reais

O usuário quer TC, RM, raio-X e fotos de sinais nos resumos/casos. Hoje só há diagramas SVG originais.

Ordem de preferência (**licença primeiro, sempre**):
1. **Imagens do próprio usuário** — Google Drive, pastas "Resumos e cursos" e "MEDICINA". Uso livre. Melhor opção.
2. **Radiopaedia** — maioria CC BY-NC-SA. **Prefira LINKAR o caso** a embutir.
3. **Wikimedia Commons** — domínio público/CC. Se embutir, **baixe para `public/img/`** e sirva local (hotlink consome banda de terceiros e quebra).
4. **Open-i (NIH)** / **PMC** open access — verificar a licença de **cada** imagem.

**Nunca:** Google Imagens, livro escaneado, AMBOSS, UpToDate, banco comercial.

Implementação: estender `src/components/figuras/registry.tsx` com um tipo de figura externa (`url`, `fonte`, `licenca`, `autor`) renderizando o **crédito visível**. O schema já prevê (`midia.licenca`).

## Armadilhas do ambiente (economize tempo)

- **Screenshot do navegador SEMPRE trava** → use `javascript_tool` / `get_page_text`.
- **Dev server dá 404 em tudo menos `/` quando o `.next` corrompe** → `rm -rf .next`.
- **Build e tsc estouram memória** → `NODE_OPTIONS=--max-old-space-size=6144`, e pare o dev server antes de buildar.
- **Não use crases em commit via bash** → use `git commit -F - <<'EOF'`.
- `temConteudo` é **derivado** de CONTEUDOS em `taxonomy.ts` — nunca marcar à mão.
- **PDFs grandes**: a ferramenta Read não pagina (falta poppler) → use `npx tsx scripts/extract-pdf.mts "<arquivo>" <ini> <fim>`.

## Checklist antes de commitar

1. `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit`
2. Validar que não há vínculo órfão (questão/resumo/caso → subtema inexistente)
3. `npx tsx scripts/seed-supabase.mts` (repopula o Supabase)
4. `git push origin main` → dispara o deploy automático

## Regra de ouro

**Nunca inventar fato clínico.** Toda afirmação vem do material do usuário ou de diretriz (MS, FEBRASGO, SBP, ACOG, IDSA, Surviving Sepsis, TG18, WSES). Conferir o gabarito antes de marcar a alternativa correta. Uma questão errada é pior que uma questão a menos — o usuário memoriza o erro e o leva para a prova.
