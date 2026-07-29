import { readFileSync } from "node:fs";
import { join } from "node:path";

const arquivos = [
  "src/app/semestres/page.tsx",
  "src/content/semestres.ts",
  "docs/PLANO-SEMESTRES.md",
] as const;

const termosProtegidos = [
  "siscad",
  "ufms",
  "matrícula atual",
  "período atual",
  "carga cumprida",
  "planos lidos",
  "aproveitado por equivalência",
  "histórico acadêmico",
] as const;

const ocorrencias: Array<{ arquivo: string; termo: string }> = [];

for (const arquivo of arquivos) {
  const conteudo = readFileSync(join(process.cwd(), arquivo), "utf8").toLocaleLowerCase("pt-BR");
  for (const termo of termosProtegidos) {
    if (conteudo.includes(termo)) ocorrencias.push({ arquivo, termo });
  }
}

if (ocorrencias.length > 0) {
  console.error(`[audit:privacidade] falhou: ${ocorrencias.length} referência(s) curricular(es) protegida(s) encontrada(s).`);
  for (const ocorrencia of ocorrencias) console.error(`- ${ocorrencia.arquivo}: termo protegido`);
  process.exit(1);
}

console.log(`[audit:privacidade] aprovado: ${arquivos.length} arquivos públicos verificados.`);
