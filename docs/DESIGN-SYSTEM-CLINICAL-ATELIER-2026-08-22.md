# Design System Clinical Atelier — 2026-08-22

## Resultado

A interface principal do Codex Medicus foi unificada sob o sistema visual
**Clinical Atelier**. A camada altera apresentação, hierarquia, responsividade e
estados sem modificar conteúdo clínico, autenticação, sincronização ou regras de
privacidade.

## Linguagem visual

- Fundo de papel clínico quente, superfícies claras e tinta azul-marinho.
- Azul elétrico para ação primária e foco; jade para progresso e contexto.
- Sidebar escura com navegação por áreas e contexto local.
- Heróis clínicos com grid sutil, alto contraste e métricas resumidas.
- Cards com profundidade discreta, estados de foco visíveis e resposta tátil.
- Tema escuro preservado com contraste próprio, sem simples inversão de cores.
- Movimento curto e opcional, desativado por `prefers-reduced-motion`.

## Escopo aplicado

- Shell global, sidebar, cabeçalho, busca e navegação móvel.
- Hoje/dashboard e Painel V2.
- Biblioteca geral e página de disciplina.
- Resumos/estudo, mapas mentais, mídia pública e Minha mídia.
- Questões, simulado, casos e caso interativo.
- Meu curso, Agenda e Trilhas por semestre.
- Login/modal, carregamento, vazio, bloqueio privado e erro global.

## Evidência de QA

- `npm.cmd run typecheck`: aprovado.
- `npm.cmd run lint`: aprovado.
- `npm.cmd run audit:privacidade`: 366 arquivos públicos e 3 curriculares
  aprovados.
- `npm.cmd run audit:rotas:local`: oito rotas críticas com HTTP 200, zero
  imagens sem alt, zero botões sem nome, zero IDs duplicados e zero erros.
- `npm.cmd run build`: aprovado, 438/438 páginas estáticas.
- A inspeção automatizada por screenshot no navegador interno ficou bloqueada
  porque a webview local não anexou. Lighthouse, axe e conferência visual em
  celular real continuam como gate de publicação, não como falha do build.

## Rollback

Este lote é isolado em componentes de interface e `globals.css`. Pode ser
revertido pelo commit do lote sem reverter conteúdo, banco ou migrations.
