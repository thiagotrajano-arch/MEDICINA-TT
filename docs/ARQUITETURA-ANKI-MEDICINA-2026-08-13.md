# Arquitetura do Anki de Medicina — 2026-08-13

## Estrutura aplicada

Os 16 decks clínicos foram migrados sem apagar cartões nem agendamentos para:

```text
MEDICINA
├── Ciclo Básico
│   └── área → disciplina
└── Ciclo Clínico
    └── área → disciplina
        ├── Clínica Médica
        ├── Materno-Infantil
        ├── Cirurgia
        ├── Saúde Coletiva e Emergência
        └── Psiquiatria e Diagnóstico
```

O deck é deliberadamente amplo. Anki recomenda evitar uma árvore enorme de
subdecks, porque ela cria contexto previsível e piora a navegação. O recorte
fino deve ocorrer por tags e decks filtrados temporários.

## Tags que devem existir em cada cartão novo

- `ciclo::basico` ou `ciclo::clinico`
- `area::<area>` e `disciplina::<disciplina>`
- `subtema::<subtema>`
- quando aplicável: `eixo::epidemiologia`, `eixo::fisiopatologia`,
  `eixo::sinais-sintomas`, `eixo::diagnostico`, `eixo::tratamento`,
  `eixo::complicacoes`, `eixo::imagem`
- `fonte::<diretriz-ou-entidade>` e `revisao::<aaaa-mm>`

Os subtemas são tags, não subdecks. Antes de prova, use um deck filtrado por
disciplina/subtema/eixo em vez de deslocar cartões e reiniciar sua programação.

## Padrão editorial

1. Uma pergunta testável por cartão; frente curta, resposta curta e contexto
   suficiente para evitar decoreba sem compreensão.
2. Cloze somente para uma relação atômica, com dica quando ela reduz ambiguidade.
3. Um cartão clínico deve testar decisão, achado ou relação, não uma lista de
   condutas.
4. Imagem Occlusion é indicada para anatomia, traçado, TC/RM/RX, lâmina,
   algoritmo e esquema, apenas quando a figura for licenciada/anonimizada e
   tiver fonte, modalidade, diagnóstico/estrutura e objetivo declarados.
5. Cartões de imagem devem ter `eixo::imagem`, subtema e referência; nunca usar
   imagem clínica comercial ou sensível sem destino privado autorizado.

## Estado e próxima revisão

- Backup `.apkg` com agendamentos: `exports/anki/backups/2026-08-13T21-39-16-541Z`.
- Auditoria: 1.721 notas; 14 grupos de duplicata exata; 4 frentes ambíguas;
  885 versos longos; zero sem referência. As etiquetas de auditoria foram
  aplicadas para permitir revisão em lotes, sem exclusão.
- Próximo lote editorial: primeiro duplicatas exatas, depois frentes ambíguas e
  cartões longos por disciplina, preservando IDs e histórico. Não reescrever em
  massa sem revisar o conteúdo clínico da fonte.
- A migração foi conferida novamente após a reorganização: 2.829 cartões foram
  reclassificados pelas tags de disciplina, sem exclusão. O script passou a
  ignorar pastas-pai do Anki, evitando que uma árvore de decks seja confundida
  com um deck de cartões.

## Uso responsável do OpenEvidence

OpenEvidence pode servir para localizar diretrizes e evidência recente durante
a revisão de um cartão. Não é fonte final automática: cada recomendação precisa
ser conferida na diretriz primária/órgão oficial citada e datada. Não enviar
dados identificáveis de pacientes, credenciais, PDFs comerciais ou conteúdo
privado para serviços externos. A integração é um fluxo editorial, não uma
chave/API embutida no site ou no Anki.

## Base de decisão

Anki recomenda cartões curtos, campos separados e tags para classificação fina,
em vez de excesso de subdecks. Evidência em educação médica apoia recuperação
ativa e repetição espaçada, mas não dispensa entendimento clínico e fontes
vigentes. Ver [Manual do Anki](https://docs.ankiweb.net/editing.html),
[opções de deck](https://docs.ankiweb.net/deck-options.html) e a
[revisão sistemática de repetição espaçada em educação médica](https://asmepublications.onlinelibrary.wiley.com/doi/full/10.1111/tct.70353).
