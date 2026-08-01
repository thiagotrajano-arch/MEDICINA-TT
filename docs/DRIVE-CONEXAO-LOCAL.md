# Conexao local segura com Google Drive

Esta conexao existe somente para materializar fontes privadas autorizadas fora
do Git. O conector do aplicativo permite busca e leitura, mas nao fornece sua
credencial ao processo local; por isso ele nao substitui a configuracao abaixo.

## Escopo minimo

1. Criar uma credencial OAuth propria com o escopo somente-leitura do Google
   Drive, ou usar uma service account somente-leitura compartilhada apenas com
   as pastas selecionadas.
2. Guardar credenciais exclusivamente em `.env.local` ou em arquivo fora do
   repositorio. Nunca registrar token, segredo, caminho privado ou ID de pasta
   em Git, documentacao publica ou Obsidian compartilhavel.
3. Definir `DRIVE_FOLDER_IDS` apenas com as pastas privadas autorizadas para o
   lote corrente. Para Ginecologia/Obstetricia, iniciar pela pasta que contem
   os materiais OMED selecionados, e nao pela raiz do Drive.
4. Definir `DRIVE_SYNC_ENABLED=true` somente depois de `npm run drive:inventory`
   responder com escopo esperado.

## Variaveis esperadas

```text
DRIVE_FOLDER_IDS=<ids-separados-por-virgula>
GOOGLE_OAUTH_CLIENT_ID=<segredo-local>
GOOGLE_OAUTH_CLIENT_SECRET=<segredo-local>
GOOGLE_OAUTH_REFRESH_TOKEN=<segredo-local>
# ou GOOGLE_SERVICE_ACCOUNT_FILE=<caminho-fora-do-repositorio>
```

## Primeiro lote de Ginecologia/Obstetricia

Depois de configurar a conexao, baixar somente candidatos explicitamente
selecionados. O comando exige `--include` justamente para impedir download em
massa:

```powershell
npm.cmd run drive:download-local -- --include "OMED_GO,PreNatal,PRE-NATAL" --out _drive-private/gineco
npm.cmd run fonte:md -- _drive-private/gineco --out _drive-private/gineco/_md-cache
```

O primeiro comando calcula SHA-256 durante o download. O segundo identifica
PDFs com texto, texto parcial, imagem ou erro; somente os ultimos dois grupos
seguem para OCR/renderizacao seletiva. O manifesto privado deve ser atualizado
antes de qualquer leitura clinica aprofundada.

## Protecoes

- `_drive-private/` e ignorada pelo Git.
- Nenhum arquivo e removido do Drive; duplicatas so sao marcadas por hash.
- Obras comerciais, documentos pessoais e imagens de pacientes permanecem na
  camada privada, sem URL publica, bundle estatico ou commit.
