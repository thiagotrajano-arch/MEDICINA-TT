# Plano de alinhamento — Anki, site e questões curriculares

Atualizado em 2026-08-13. Este documento organiza uma única rotina de estudo;
ele não cria uma segunda agenda nem transfere AnkiConnect para o navegador.

## Modelo único

| Camada | Fonte de prioridade | Ação | Registro |
| --- | --- | --- | --- |
| Hoje | Semana atual e Agenda privadas confirmadas | entender o foco da disciplina atual | tarefa/agenda privada |
| Praticar | subtema do mapa curricular | resolver questões do próprio subtema | progresso local-first + Supabase autenticado |
| Revisar | Anki + fila de questões | revisar vencidos, depois erros | Anki local e histórico de questões |
| OMED | prioridade declarada na taxonomia | selecionar banco OMED e casos/imagens reais | tags/links, sem duplicar a agenda |

## Padrão aplicado

- **Anki:** `MEDICINA → ciclo → área → disciplina`. Subtema e eixo clínico ficam
  em tags; isso evita uma árvore com centenas de decks. A UI do cartão segue os
  mesmos tokens clínicos escuros do site.
- **Questões:** links curriculares sempre preservam disciplina e subtema. A fila
  de revisão agora usa D1, D3, D7, D21, D45 e D90 para acertos consecutivos; um
  erro volta a D1.
- **Mapa curricular:** cada subtema mostra o caminho `Entender → Praticar →
  Revisar no Anki`, além de abrir somente resumo, questões e mídia realmente
  vinculados.
- **Agenda e Semana:** continuam a ser a fonte privada do que está acontecendo
  agora. Não se infere semestre, aula ou dificuldade a partir do Anki.

## Fechamento do Anki desta sessão

1. Fazer revisões vencidas antes de introduzir novos cartões.
2. Introduzir no máximo 30 cartões novos/dia; revisões não recebem teto
   artificial.
3. Usar os passos de aprendizagem 5 min → 5 h → 3 d → 7 d, reentrada de 10 min
   e FSRS com retenção alvo 0,90.
4. Cartões sem fonte e cópias repetidas ficam **suspensos**, não apagados. Eles
   permanecem preservados para revisão editorial futura e não contaminam a fila.
5. Novo PDF: PDF → Markdown privado → vínculo ao subtema da semana → questões
   e revisões D0/D1/D7/D21. Flashcards só são produzidos depois de fonte e
   conteúdo clínico aprovados.

## Próximas melhorias deliberadamente pendentes

- Confirmar visualmente o tema Onigiri e as extensões na própria janela do Anki.
- Reescrever, por lacuna clínica comprovada, somente cartões curtos e atômicos;
  Cloze é reservado a fatos isolados e Image Occlusion a imagem autorizada ou
  anonimizada.
- Consolidar o painel privado de prioridade única quando a validação curricular
  e a QA autenticada de Agenda/Semana estiverem concluídas.
