# Skills locais do Codex Medicus

As skills ficam instaladas em `C:\Users\Adm\.codex\skills` e são descobertas automaticamente pelo Codex. Use o nome com `$` no início ou peça a tarefa em linguagem natural.

## Comandos de uso

| Skill | Comando | Uso |
|---|---|---|
| Handoff | `$codex-medicus-handoff` | Retomar o projeto, conferir status, reconciliar planos e atualizar contexto sanitizado. |
| Drive privado | `$codex-medicus-drive-private` | Inventariar, aplicar hash, deduplicar, converter PDF/DOCX, OCR e classificar lotes privados. |
| PDF → Markdown | `$codex-medicus-pdf-markdown` | Converter PDFs para Markdown antes da leitura, com marcadores de página e OCR seletivo. |
| Currículo/SISCAD | `$codex-medicus-curriculum-linker` | Relacionar períodos, disciplinas, planos e materiais na camada privada. |
| Editorial clínico | `$codex-medicus-clinical-editorial` | Criar/revisar resumos, questões e casos com fontes atuais e prioridade OMED. |
| Mídia clínica | `$codex-medicus-media-curation` | Triar imagens, licenças, privacidade, alt text, âncoras e URLs privadas. |
| Anki | `$codex-medicus-anki-bridge` | Operar AnkiConnect local, decks, progresso, duplicatas e backups. |
| Auditoria de release | `$codex-medicus-release-audit` | Rodar QA, privacidade, acessibilidade, build e prontidão para publicação. |

## Exemplos

```text
$codex-medicus-handoff continue o Codex Medicus e atualize o estado real
$codex-medicus-drive-private processe o próximo lote privado aprovado de 30 PDFs
$codex-medicus-curriculum-linker relacione os materiais às disciplinas já cursadas
$codex-medicus-clinical-editorial revise primeiro as lacunas OMED de Nefrologia
$codex-medicus-media-curation selecione imagens abertas para Pediatria e GO
$codex-medicus-anki-bridge confira os decks de Neurologia e exporte o progresso
$codex-medicus-release-audit audite o lote atual e diga se está pronto para publicar
```

## Ordem recomendada

1. `$codex-medicus-handoff`
2. `$codex-medicus-drive-private` + `$codex-medicus-pdf-markdown` e `$codex-medicus-curriculum-linker`
3. `$codex-medicus-clinical-editorial` e `$codex-medicus-media-curation`
4. `$codex-medicus-anki-bridge`
5. `$codex-medicus-release-audit`

As skills nunca recebem credenciais como argumento. A publicação continua sendo uma etapa separada e só ocorre depois da auditoria, da revisão de direitos e da confirmação explícita do lote.
