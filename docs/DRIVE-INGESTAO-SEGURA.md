# Drive - ingestao segura e seletiva

## Estado atual

A sincronizacao incremental fica desativada por padrao. Credenciais nao a
habilitam: ela exige uma allowlist de pastas, um inventario de metadados
revisado, um baseline registrado e `DRIVE_SYNC_ENABLED=true`.

Os logs publicos mostram somente contagens e codigos seguros. Nomes,
identificadores, caminhos, conteudo e mensagens cruas da fonte nao devem ser
exibidos em Actions.

## Ordem obrigatoria

1. Definir somente as pastas autorizadas em `DRIVE_FOLDER_IDS`.
2. Rodar `npm run drive:inventory` e registrar a decisao no cofre privado.
3. Comparar o inventario com o manifesto local antes de escolher qualquer lote.
4. Criar o baseline com `DRIVE_BASELINE_APPROVED=true npm run drive:baseline`.
5. Revisar a confirmacao do baseline e somente entao habilitar a sincronizacao
   incremental para um lote aprovado.
6. Tratar download, hash, extracao e classificacao como fases separadas;
   nenhuma delas e automatica por causa do inventario.

O inventario percorre apenas metadados das pastas permitidas e retorna um
resumo agregado por categoria, quantidade e tamanho. Ele nao baixa bytes, nao
calcula hashes, nao grava no banco e nao imprime identificadores de arquivo.

O baseline exige confirmacao explicita e salva somente o marcador atual de
alteracoes. Ele nao baixa, calcula hash ou importa os materiais que ja existiam
antes desse marcador. No GitHub Actions, execute manualmente a operacao
`baseline` e digite `CRIAR_BASELINE`; o workflow injeta a confirmacao somente
nessa execucao manual.

Enquanto nao houver baseline, `npm run sync-drive` encerra com o codigo seguro
`baseline-obrigatorio`. Isso evita que uma primeira execucao ignore arquivos
existentes ou acompanhe um escopo incompleto.

## Limites permanentes

- Nao usar o Drive para republicar material protegido ou comercial.
- Nao adicionar dados pessoais ao repositorio, artefatos publicos ou logs.
- Todo PDF escolhido segue PDF -> Markdown cacheado -> triagem -> validacao.
- Investigar falhas somente no ambiente privado, sem copiar detalhes da fonte
  para o GitHub.
