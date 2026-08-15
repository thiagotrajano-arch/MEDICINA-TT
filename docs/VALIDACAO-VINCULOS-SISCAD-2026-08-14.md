# Validacao dos vinculos SISCAD -> conteudo (2026-08-14)

## Resposta curta

Nao existe ainda um plano granular validado para cada componente. O inventario
privado registra 37 componentes do curso: 36 planos foram analisados e um
registro permaneceu sem plano acessivel, com status institucional de submissao.
Por decisao do usuario, esse caso e tratado junto ao eixo BBPM VI; nao sera
criada uma fila ou ementa independente de HCPM VI.

## Evidencia executada

- npm.cmd run curso:sync-private (modo leitura): 37 registros reconhecidos,
  30 concluidos, 7 cursando e 37 registros preservados no banco privado.
- npm.cmd run curso:mapa-private -- --manifest
  exports/private/curriculo-granular-20260810.json (dry-run): manifesto valido,
  sem gravacao, com 26 componentes, 55 modulos, 374 subtemas, 98 vinculos a
  subtemas publicos, 276 lacunas de vinculo, 64 resumos e 59 bancos de
  questoes publicos encontrados.
- npm.cmd run audit:cobertura: 37 disciplinas publicas, 234 resumos, 1.332
  questoes e 56 casos; 70 subtemas sem resumo, 149 sem questao e 266 sem caso.
- O importador rejeita automaticamente subtema publico inexistente ou
  pertencente a disciplina diferente. Nenhum manifesto foi aplicado nesta
  validacao.

## Cobertura atual do mapa granular

O mapa detalhado existente cobre:

- 6 componentes BBPM (I-IV, VII e VIII);
- 8 componentes HCPM, mantendo HCPM VI como registro-alias de BBPM VI;
- 6 componentes de APS;
- 3 componentes de Cirurgia;
- 3 componentes de Urgencia e Emergencia.

Ainda faltam subtemas granulares para 11 componentes do inventario de 37:

- BBPM V e BBPM VI;
- Bases Complementares I-VI;
- Topicos Especiais em Saude I e IV;
- Topicos em Saude da Mulher.

Esses 11 itens sao lacunas de mapeamento, nao autorizacao para inventar
conteudo. O proximo passo e localizar os planos/Markdown privados
correspondentes, extrair objetivos e aulas, e somente depois propor vinculos.

## Regra para HCPM VI

HCPM VI continua registrado para preservar o historico institucional, mas nao
tera plano separado. Seus temas serao estudados pelo eixo BBPM VI quando houver
evidencia de que o conteudo e o mesmo; qualquer diferenca concreta sera anotada
como subtema especifico, com fonte. Nenhum tema foi inferido nesta rodada.

## Proxima validacao manual

1. Conferir cada plano privado dos 11 componentes ausentes.
2. Separar modulo/aula, objetivo, avaliacao e subtema, mantendo a origem.
3. Vincular somente subtemas publicos existentes; registrar candidatos como
   parcial ate revisao.
4. Relacionar resumos, questoes, casos, mapas e midia por ID, nunca por nome
   aproximado.
5. Rodar o dry-run novamente e so aplicar no banco privado apos QA autenticada.

Dados pessoais, historico individual, URLs do SISCAD e documentos de origem
continuam fora do repositorio publico.
## Atualizacao operacional — 2026-08-15

- [x] A camada de componentes foi sincronizada em modo privado: 37 registros,
  30 concluídos e 7 cursando; os 37 já existentes foram preservados.
- [x] O mapa granular foi completado estruturalmente para os 37 componentes:
  68 módulos, 439 subtemas e 123 vínculos de recursos privados/públicos.
- [x] Os 11 componentes que faltavam no mapa granular foram adicionados com
  `evidenceStatus: parcial`, a partir da síntese curricular já registrada:
  BBPM V/VI, Bases Complementares I–VI, Tópicos Especiais em Saúde I/IV e
  Tópicos em Saúde da Mulher.
- [x] Os 276 vínculos candidatos foram revisados sem aplicação automática.
  Nenhum vínculo foi criado somente por semelhança de nome; cada candidato foi
  marcado para revisão manual ou como sem correspondência pública exata.
- [x] A aplicação privada terminou sem erro, preservando progresso. O estado
  pós-aplicação confirmou um proprietário, 27 migrations e mídia privada íntegra
  (399 registros, 399 objetos, HTTP 206 para assinatura).
- [ ] Permanecem pendentes os planos oficiais granulares dos 11 componentes e a
  confirmação manual dos 276 candidatos; a camada está pronta para receber a
  evidência sem inventar ementas.

### Subtemas neurológicos sem semestre comprovado

Os dez subtemas abaixo foram identificados na auditoria editorial neurológica,
mas continuam sem prova de período no SISCAD. Eles foram preservados com estado
`curriculo::semestre-pendente`; nenhum período foi inferido a partir de nome,
deck, resumo ou semelhança curricular:

1. AVC isquêmico — diagnóstico e conduta;
2. AVC hemorrágico/HSA e hemorragia intraparenquimatosa — diagnóstico e conduta;
3. Crise convulsiva e status epilepticus — diagnóstico e conduta;
4. Cefaleias primárias e sinais de alarme — diagnóstico e conduta;
5. Síndrome de Guillain-Barré — diagnóstico e conduta;
6. Miastenia gravis — diagnóstico e conduta;
7. Compressão medular aguda e síndrome de cauda equina — diagnóstico e conduta;
8. Delirium — diagnóstico e conduta;
9. Amnésias e síndromes demenciais — diagnóstico e conduta;
10. Síndromes vestibulares — diagnóstico e conduta.

Aceite futuro: somente remover o estado pendente quando houver plano/registro
SISCAD identificável e conferência manual do vínculo.
