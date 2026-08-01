import { existsSync, readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { extname, join, relative } from "node:path";

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

const extensoesTexto = new Set([
  ".css", ".html", ".js", ".json", ".jsx", ".md", ".mdx", ".mjs", ".mts",
  ".sql", ".ts", ".tsx", ".txt", ".yaml", ".yml",
]);

function listarTextos(caminho: string): string[] {
  if (!existsSync(caminho)) return [];
  const encontrados: string[] = [];
  for (const entrada of readdirSync(caminho, { withFileTypes: true })) {
    const absoluto = join(caminho, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...listarTextos(absoluto));
    else if (extensoesTexto.has(extname(entrada.name).toLocaleLowerCase("pt-BR"))) encontrados.push(absoluto);
  }
  return encontrados;
}

const padroesGlobais = [
  { termo: "endereco de e-mail", regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i },
  { termo: "chave secreta Supabase", regex: /sb_secret_[a-z0-9_-]{16,}/i },
  { termo: "chave OpenRouter", regex: /sk-or-v1-[a-z0-9_-]{20,}/i },
  { termo: "token GitHub", regex: /(?:ghp_|github_pat_)[a-z0-9_]{20,}/i },
  { termo: "segredo Google", regex: /AIza[a-z0-9_-]{25,}/i },
  { termo: "URL Postgres com credencial", regex: /postgres(?:ql)?:\/\/[^\s:]+:[^\s@]+@/i },
] as const;

const raiz = process.cwd();
const arquivosRastreados = execFileSync("git", ["ls-files", "-z"], { cwd: raiz, encoding: "utf8" })
  .split("\0")
  .filter(Boolean)
  .map((arquivo) => join(raiz, arquivo))
  .filter((arquivo) => extensoesTexto.has(extname(arquivo).toLocaleLowerCase("pt-BR")));
const arquivosPublicos = [...new Set([
  ...arquivosRastreados,
  ...["src", "public", "docs", "scripts", "supabase"]
    .flatMap((diretorio) => listarTextos(join(raiz, diretorio))),
])];

for (const absoluto of arquivosPublicos) {
  const conteudo = readFileSync(absoluto, "utf8");
  for (const padrao of padroesGlobais) {
    if (padrao.termo === "endereco de e-mail" && absoluto.endsWith("package-lock.json")) continue;
    let auditavel = conteudo;
    if (padrao.termo === "endereco de e-mail") {
      auditavel = auditavel.split(/\r?\n/)
        .filter((linha) => !linha.toLocaleLowerCase("pt-BR").includes("too many requests"))
        .join("\n");
    }
    if (padrao.termo === "URL Postgres com credencial") {
      auditavel = auditavel.replace(/postgres(?:ql)?:\/\/[^\s:]+:[^\s@]+@localhost(?::\d+)?/gi, "");
    }
    if (padrao.regex.test(auditavel)) {
      ocorrencias.push({ arquivo: relative(raiz, absoluto), termo: padrao.termo });
    }
  }
}

const binariosPrivados = listarArquivos(join(raiz, "public"))
  .filter((arquivo) => /\.(?:7z|docx?|pdf|pptx?|rar|zip)$/i.test(arquivo));
for (const absoluto of binariosPrivados) {
  ocorrencias.push({ arquivo: relative(raiz, absoluto), termo: "documento bruto em public" });
}

function listarArquivos(caminho: string): string[] {
  if (!existsSync(caminho)) return [];
  const encontrados: string[] = [];
  for (const entrada of readdirSync(caminho, { withFileTypes: true })) {
    const absoluto = join(caminho, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...listarArquivos(absoluto));
    else encontrados.push(absoluto);
  }
  return encontrados;
}

if (ocorrencias.length > 0) {
  console.error(`[audit:privacidade] falhou: ${ocorrencias.length} referência(s) protegida(s) encontrada(s).`);
  for (const ocorrencia of ocorrencias) console.error(`- ${ocorrencia.arquivo}: ${ocorrencia.termo}`);
  process.exit(1);
}

console.log(`[audit:privacidade] aprovado: ${arquivosPublicos.length} arquivos públicos e ${arquivos.length} arquivos curriculares verificados.`);
