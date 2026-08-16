# Codex Medicus — estado atual compacto

> Fonte de retomada econômica. Atualizado em 2026-08-16. Não contém credenciais,
> cookies, texto comercial, PDFs privados, dados pessoais ou dados brutos do SISCAD.
> Os documentos históricos continuam preservados; este arquivo apenas resume o
> estado comprovado para evitar releituras extensas.

## Identidade e publicação

- Repositório: `thiagotrajano-arch/MEDICINA-TT`.
- Branch: `main`; último commit confirmado: `61ab439` (`feat: ampliar modulos de neuropsiquiatria recentes`).
- Código do worktree estava limpo antes destes dois documentos; o único diff
  deste lote são os arquivos compactos de retomada.
- Produção: <https://thiagotrajano-arch.github.io/MEDICINA-TT/>.
- Último deploy confirmado no handoff: GitHub Pages run `31969124039`, concluído.

## Conteúdo público auditado

Auditoria `npm.cmd run audit:cobertura -- --quiet` em 2026-08-16:

| Recurso | Estado |
|---|---:|
| Disciplinas | 37 |
| Subtemas | 311 |
| Resumos/conteúdos | 241 |
| Questões | 1.359 |
| Casos | 62 registrados; 61 subtemas com caso |
| Mapas | 60 |
| Figuras registradas | 77 |
| Figuras públicas ancoradas a subtema | 66 |
| Subtemas sem resumo | 70 |
| Subtemas sem questões | 149 |
| Subtemas sem caso | 268 |

As lacunas são indicadores de cobertura, não uma ordem para preencher tudo.
Conteúdo novo só deve entrar quando houver lacuna comprovada, prioridade OMED,
necessidade do semestre ou erro real do usuário.

## Agenda e currículo privado

- Currículo privado conhecido: 37 componentes; 30 concluídos e 7 atuais.
- O período atual é o 6º período, 2026-2.
- A agenda privada possui 138 tarefas; auditoria de estado passou com RLS,
  proprietário único, campos válidos e nenhum estado inválido.
- Plano ativo: 12 semanas, com blocos para semestre atual, OMED, revisão
  longitudinal, erros, questões/casos/imagens e fechamento semanal.
- HCPM VI permanece sem plano SISCAD comprovado; não inferir conteúdo.
- Onze componentes ainda precisam de completar/validar granularização curricular.

## Acervo privado

- O inventário privado amplo não deve ser duplicado no repositório ou no pacote
  de continuidade.
- Último handoff: 379 itens revisados; 347 úteis, 21 contextuais e 31 rejeitados.
- Material comercial, SISCAD, imagens sensíveis e arquivos pessoais permanecem
  autenticados/privados.
- PDFs seguem: inventário → SHA-256 → deduplicação → Markdown privado → OCR ou
  renderização seletivos → revisão → vínculo curricular.

## Anki

- AnkiConnect permanece local e não é exposto ao site.
- O Anki está em manutenção editorial; não criar grandes lotes automaticamente.
- Próximos cards devem nascer de erros, lacunas prioritárias e fatos atômicos
  validados. Cloze e Image Occlusion exigem fonte e destino permitidos.
- Não apagar ou reescrever cartões sem backup e autorização específica.

## Portões ainda não comprovados

- QA autenticada real: login, recuperação, expiração, duas sessões, Agenda,
  progresso, upload, URL assinada, exclusão e isolamento da Minha mídia.
- Aplicação/teste remoto das migrations privadas e confirmação de sincronização.
- Reconsulta do SISCAD e validação manual dos vínculos candidatos.
- Allowlist e fluxo incremental do Drive, sem baixar o acervo inteiro.
- Revisão clínica dos lotes prioritários com diretrizes vigentes.
- QA de acessibilidade/performance com Lighthouse, axe e celular real.
- Restore compatível do backup Supabase em ambiente seguro.

## Regra de continuidade

O site executa o estudo; o Obsidian guarda raciocínio e decisões; o Drive guarda
fontes privadas; o Anki faz repetição atômica; o SISCAD comprova currículo. Uma
nova tarefa deve começar lendo este arquivo e `PENDENCIAS-MESTRE-COMPACTO.md`.
