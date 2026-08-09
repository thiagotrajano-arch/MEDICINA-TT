# Prompt operacional — imagens médicas de alta fidelidade

Este é o padrão do Codex Medicus para selecionar, gerar, revisar ou extrair uma
imagem médica. Ele complementa o `PROMPTS-MASTER.md` e não substitui revisão
clínica humana. A regra é aplicada somente quando existe uma lacuna clínica
comprovada e uma fonte rastreável.

## Ficha obrigatória

Antes de produzir ou importar uma imagem, preencher:

- patologia e nome técnico;
- classificação ou código CID-11, quando aplicável;
- modalidade (foto clínica, radiografia, TC, RM, ultrassom, endoscopia, ECG ou outra);
- topografia anatômica, plano, lateralidade e orientação;
- achados primários e secundários, estágio ou gravidade;
- diferenciais que podem ser confundidos;
- estilo de apresentação, rótulos, setas e conceitos-chave;
- fonte, autor, licença ou classificação `privada — acesso autenticado`.

## Requisitos por modalidade

- **Foto clínica:** somente caso anonimizado, sem identificadores, e com autorização quando necessário; descrever localização, morfologia, cor, distribuição e evolução.
- **TC:** informar região, plano, janela, espessura/reconstrução quando disponível, unidades HU quando relevantes e ausência de artefatos que alterem a interpretação.
- **RM:** informar sequência, plano, T1/T2/FLAIR/DWI/ADC/SWI, contraste e padrão de sinal ou realce.
- **Ultrassom:** informar órgão, transdutor/frequência quando conhecida, orientação, ecogenicidade, artefatos e modo utilizado.
- **Radiografia:** informar incidência/projeção, região, densidade e estruturas incluídas.
- **Endoscopia:** informar órgão, segmento, morfologia, superfície, limites e achados associados.
- **ECG:** informar derivações, ritmo, frequência, eixo, intervalos, ST/T, QT e bloqueios, com velocidade e calibração quando disponíveis.

## Restrições absolutas

1. Não inventar achados, anatomia, lateralidade, estágio, escala ou unidade.
2. Preservar a física e a convenção da modalidade; uma ilustração não pode ser apresentada como exame real.
3. Não inserir fantasia, elementos não médicos ou anatomia impossível.
4. Não trocar a patologia por outra apenas parecida e não omitir negativos relevantes.
5. Proteger privacidade: remover identificadores e manter material comercial, sensível ou de paciente na biblioteca autenticada.
6. Conferir contra atlas, diretriz, revisão ou livro-texto autorizado e registrar a referência.

## Metadados de saída e QA

Cada item deve registrar lacuna clínica, origem, página, modalidade, anatomia,
patologia, diferencial evitado, disciplina, semestre, tema, subtema, caso
relacionado, licença/destino permitido, status (`extraída`, `curada` ou
`ilustração didática gerada`) e notas de revisão. Imagens geradas por IA devem
ser rotuladas explicitamente como **ilustração didática gerada** e nunca como
fotografia ou exame de paciente. Antes de qualquer uso clínico, exigir revisão
por fonte ou profissional qualificado.

O resultado deve ser colocado no ponto de estudo correto: resumo, questão, caso,
mapa mental e registro de `Minha mídia`, com crédito visível quando público e
proveniência completa quando privado.
