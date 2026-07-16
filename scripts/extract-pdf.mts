/**
 * Extrai o texto de um PDF (etapa [2] do pipeline de ingestão da ARQUITETURA).
 *
 *   npx tsx scripts/extract-pdf.mts "caminho/arquivo.pdf" [paginaInicial] [paginaFinal]
 *
 * Escreve o texto em stdout. Para PDFs escaneados (sem camada de texto) o
 * resultado virá vazio — esses exigem OCR, etapa separada do pipeline.
 */
import { readFileSync } from "node:fs";
import { extractText, getDocumentProxy } from "unpdf";

async function main() {
  const [caminho, deArg, ateArg] = process.argv.slice(2);
  if (!caminho) {
    console.error("uso: extract-pdf.mts <arquivo.pdf> [pagInicial] [pagFinal]");
    process.exit(1);
  }

  const bytes = new Uint8Array(readFileSync(caminho));
  const pdf = await getDocumentProxy(bytes);
  const { totalPages, text } = await extractText(pdf, { mergePages: false });

  const de = deArg ? Math.max(1, Number(deArg)) : 1;
  const ate = ateArg ? Math.min(totalPages, Number(ateArg)) : totalPages;

  console.error(`[extract-pdf] ${caminho} — ${totalPages} páginas; extraindo ${de}–${ate}`);
  for (let i = de; i <= ate; i++) {
    console.log(`\n===== PÁGINA ${i} =====`);
    console.log((text[i - 1] ?? "").trim());
  }
}

main().catch((e) => {
  console.error("[extract-pdf] erro:", e.message ?? e);
  process.exit(1);
});
