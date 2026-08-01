# Plano pré-arquitetado — passos 26 a 40

> Atualizado em 2026-07-27 após auditoria estrutural. Este arquivo é o contrato de execução para a próxima sessão: cada bloco só avança quando sua saída e sua validação estiverem registradas.

## Diagnóstico de partida

- Estrutura aprovada: 37 disciplinas, 293 subtemas, 225 resumos e 1.072 questões; sem IDs duplicados ou vínculos órfãos.
- Segurança pedagógica: toda questão tem exatamente uma alternativa correta e todo resumo possui referência.
- Dívida editorial: 685 questões com comentários repetidos entre alternativas, 81 comentários curtos e 48 questões sem fonte; 151 resumos têm menos de 12 blocos (159 menos de 17).
- Conclusão: o acervo é utilizável como plataforma de estudo, mas material legado deve receber revisão editorial dirigida antes de ser tratado como banco final de prova.

## Portão obrigatório de qualidade

Antes de importar nova leva de questões, executar a revisão em ordem de peso OMED: Infectologia → GO → Pediatria → Cirurgia → MFC → Clínica Médica.

**Saída por lote:** comentários distintos e explicativos, fonte nomeada, exatamente uma correta, referência do resumo preservada.

**Validação:** zero alternativas sem/mais de uma correta; relatório de comentários repetidos reduzido para o lote tratado; typecheck, lint e vínculos órfãos zerados.

## Bloco A — fontes pequenas e de alto retorno (26–28)

| Passo | Entrada | Saída esperada | Critério de fechamento |
|---|---|---|---|
| 26 HCPM | 5 arquivos já convertidos em `_md-cache` | Índice de OSCE, questões reaproveitáveis, lacunas e proveniência | Nenhum texto de livro publicado; mapa de cada arquivo no Obsidian e no plano |
| 27 BBPM III/IV/VII/VIII | `_triagem.md` e Markdown cacheado | Matriz disciplina → arquivo → tema → prioridade, excluindo livros | Amostra clínica lida de cada fonte elegível; duplicidades marcadas |
| 28 LANN/UE/Farmacologia | Markdown cacheado | Mapa dos temas inéditos e dos que complementam conteúdo existente | Só tópicos com fonte e pertinência OMED entram no backlog |

## Bloco B — cursos grandes sem retrabalho (29–34)

1. Abrir Estratégia 2024 Extensivo para Hemato/Gastro e comparar com os 7 resumos atuais.
2. Indexar os 15 ZIPs de Cardio/Neuro/Cirurgia sem extrair vídeo; extrair somente PDFs úteis em diretório temporário validado.
3. Calcular hash/nome/tópico para eliminar duplicidades antes de qualquer escrita.
4. Triar MEDCOF, Medcurso e Bagagem; registrar licença/origem e rejeitar livros de editora.
5. Conferir BBPM I/II na bagagem autorizada de colega A somente se houver conteúdo distinto.

**Critério de fechamento:** planilha/Markdown de proveniência por arquivo, sem PDF duplicado entrando no pipeline e sem conteúdo copiado de livro protegido.

## Bloco C — provas, mídia e evidência (35–40)

1. Extrair OMED II–V questão por questão apenas quando houver enunciado e contexto suficientes; cada gabarito é refeito contra diretriz atual.
2. Atualizar o Raio-X OMED somente com contagem programática rastreável.
3. Para PDFs com trailer malformado, tentar leitura textual existente e renderização reexportada pelo usuário; não insistir em parser que falhe.
4. Buscar imagem apenas para lacuna clínica real; registrar autor, fonte, licença e vínculo do bloco antes de baixar.
5. Rodar auditoria final de IDs, arquivos, licenças, fonte e âncora antes de publicar.

## Ordem recomendada da próxima sessão

1. Portão de qualidade: Infectologia, depois GO.
2. Passo 26 HCPM (menor lote, maior retorno imediato).
3. Passos 27 e 28 em triagem, sem ainda escrever conteúdo.
4. Passo 29 antes de expandir Hemato/Gastro.
5. Passos 30–40 somente depois do inventário e da deduplicação.

## Rotina de encerramento de cada bloco

1. Atualizar `PROXIMOS-PASSOS.md`, este plano, `docs/ROADMAP-50-PASSOS.md` e Obsidian.
2. Rodar typecheck, lint, auditoria estrutural e build/CI proporcional ao risco.
3. Registrar limites, fontes rejeitadas e pendências sem ocultá-las.
4. Publicar apenas conteúdo clínico com fonte verificável e revisão de gabarito.
