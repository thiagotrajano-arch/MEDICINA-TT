# Padrão de resumo clínico — Codex Medicus

Este é o modelo editorial para novos resumos e para a migração gradual dos
atuais. O padrão evita textos longos sem decisão clínica e liga cada eixo a
questões, casos, mapas e mídia quando houver evidência.

## Eixos

1. Objetivos
2. Pré-requisitos
3. Síntese OMED
4. Anatomia e fisiologia relevante
5. Fisiopatologia
6. Epidemiologia e fatores de risco
7. Sinais e sintomas
8. Diagnóstico e diferenciais
9. Exames e interpretação
10. Tratamento e conduta
11. Complicações e prognóstico
12. Armadilhas de prova
13. Mapa mental
14. Questões de fixação
15. Casos relacionados

Nem todo subtema precisa de texto extenso em todos os eixos. Quando um eixo
não se aplica, registrar explicitamente “não aplicável” ou “lacuna de fonte”,
em vez de preencher com conteúdo genérico.

## Leitura progressiva

A página de estudo exibe um índice por seção. Cada seção pode ser marcada como
lida e recebe um identificador estável (`subtemaId::secao`). O estado é salvo no
mesmo fluxo local-first do resumo e sincroniza na conta autenticada quando
disponível. Marcar uma seção não marca automaticamente o resumo inteiro.

## Regra editorial

Conteúdo novo só entra quando houver lacuna comprovada, fonte clínica atual e
revisão do gabarito/conduta. Material comercial pode orientar a triagem privada,
mas a publicação é síntese autoral com referência rastreável.
