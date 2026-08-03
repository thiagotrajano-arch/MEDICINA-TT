# Matriz de falhas do cliente

| Situação | Comportamento esperado | Dados preservados | Próxima ação |
| --- | --- | --- | --- |
| Sem internet ao responder | Resposta confirma localmente e sincroniza depois | `localStorage` | Reconectar e abrir Questões |
| Sessão expirada | Conteúdo público continua; área privada pede novo login | Progresso local | Entrar novamente |
| Login inválido | Mensagem genérica, sem revelar se o e-mail existe | Nada é enviado | Conferir dados no formulário |
| Recuperação de senha | Link é tratado pelo Supabase Auth; senha nunca é registrada | Nada é salvo pelo app | Usar e-mail recebido |
| Upload interrompido | Não criar catálogo órfão; permitir tentar novamente | Arquivo local original | Repetir upload |
| URL assinada expirada | Mostrar placeholder e renovar a URL ao atualizar | Metadados permanecem | Recarregar a mídia |
| RLS/permissão | Bloquear silenciosamente conteúdo de outro usuário | Dados de terceiros nunca aparecem | Confirmar conta ativa |
| Resposta vazia do catálogo | Estado vazio orientado, sem erro fatal | Progresso preservado | Ajustar filtros ou processar fonte |
| Erro inesperado de rota | Boundary com tentativa de recuperação | Progresso local | Tentar novamente ou voltar |

Os fluxos autenticados reais ainda exigem teste manual com a conta do proprietário; nenhuma senha deve entrar em scripts, logs ou commits.
