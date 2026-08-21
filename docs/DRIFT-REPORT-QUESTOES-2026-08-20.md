# Drift report — questões local × Supabase

Data da verificação: 20/08/2026.

## Resultado consolidado

| Fonte | Total | Evidência |
|---|---:|---|
| Catálogo local `QUESTOES` | 1.359 | `npx.cmd tsx -e ... QUESTOES.map(...)` |
| Supabase `public.questao` | 1.072 | consulta somente leitura via Supabase MCP |
| Diferença local não presente no Supabase | 287 | 1.359 − 1.072; IDs locais são estáveis e únicos |

Não foi encontrado, nesta verificação, um conjunto de IDs no Supabase ausente do catálogo local. A diferença deve ser tratada como candidatos locais para reconciliação, não como duplicatas nem como autorização automática de inserção.

## Decomposição por prefixo

| Prefixo | Local | Supabase | Local-only estimado |
|---|---:|---:|---:|
| `go` | 133 | 113 | 20 |
| `ped` | 91 | 71 | 20 |
| `cir` | 130 | 110 | 20 |
| `inf` | 146 | 120 | 26 |
| `mfc` | 112 | 112 | 0 |
| `orig` | 10 | 10 | 0 |
| `cardio` | 183 | 163 | 20 |
| `pneumo` | 180 | 160 | 20 |
| `neuro` | 196 | 161 | 35 |
| `reumato` | 7 | 7 | 0 |
| `endocrino` | 3 | 3 | 0 |
| `gastro` | 11 | 11 | 0 |
| `hemato` | 15 | 15 | 0 |
| `nefro` | 6 | 6 | 0 |
| `onco` | 4 | 4 | 0 |
| `otorrino` | 4 | 4 | 0 |
| `derma` | 2 | 2 | 0 |
| `clm` | 20 | 0 | 20 |
| `nge` | 20 | 0 | 20 |
| `clin` | 44 | 0 | 44 |
| `psiq` | 42 | 0 | 42 |
| **Total** | **1.359** | **1.072** | **287** |

## Interpretação operacional

- O site/catálogo local contém 1.359 questões.
- O Supabase legado contém 1.072 questões.
- Os lotes `clm`, `nge`, `clin` e `psiq` são candidatos claros a reconciliação V2/legado, pois não aparecem no banco legado.
- Os 20–35 faltantes de GO, Pediatria, Cirurgia, Infectologia, Cardiologia, Pneumologia e Neurologia exigem comparação individual por ID, fonte, tags, alternativa correta e subtema.
- Nenhum `INSERT`, migração ou alteração de policy foi executado nesta auditoria.

## Próxima ação segura

1. Exportar somente metadados dos 287 IDs locais candidatos.
2. Comparar fonte, tags, subtema, alternativa correta e hash de conteúdo.
3. Separar `novo`, `duplicado`, `revisar` e `apto_para_migracao`.
4. Corrigir primeiro os candidatos sem fonte/tags.
5. Migrar somente após validação de qualidade e idempotência.

