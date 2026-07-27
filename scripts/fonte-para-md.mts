/**
 * Converte fontes de estudo (PDF e DOCX) em Markdown, em lote, com cache.
 *
 *   npx tsx scripts/fonte-para-md.mts <pasta-ou-arquivo> [--out <dir>] [--force] [--max-mb N]
 *
 * Objetivo: ler o Markdown depois (barato, grepável) em vez de reabrir PDF a cada consulta.
 *
 * Gera, além dos .md, um `_manifest.json` e `_manifest.md` na pasta de saída com
 * páginas, caracteres extraídos e densidade — é isso que diz de cara quais arquivos
 * têm camada de texto e quais são slide-imagem que exigiriam OCR.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, relative, dirname, extname, basename, resolve, sep } from "node:path";
import { inflateRawSync } from "node:zlib";
import { extractText, getDocumentProxy } from "unpdf";

type Registro = {
  arquivo: string;
  saida: string;
  tipo: "pdf" | "docx";
  paginas: number;
  chars: number;
  charsPorPagina: number;
  tamanhoMb: number;
  status: "texto" | "texto-parcial" | "imagem" | "erro" | "ignorado-tamanho";
  erro?: string;
};

// ---------------------------------------------------------------- utilidades

function limpar(texto: string): string {
  return texto
    .replace(/\r\n/g, "\n")
    .replace(/ /g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function listarFontes(alvo: string): string[] {
  const st = statSync(alvo);
  if (st.isFile()) return [".pdf", ".docx"].includes(extname(alvo).toLowerCase()) ? [alvo] : [];

  const achados: string[] = [];
  for (const entrada of readdirSync(alvo, { withFileTypes: true })) {
    const cheio = join(alvo, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name.startsWith("_md-cache")) continue;
      achados.push(...listarFontes(cheio));
    } else if ([".pdf", ".docx"].includes(extname(entrada.name).toLowerCase())) {
      achados.push(cheio);
    }
  }
  return achados;
}

// ------------------------------------------------------------- leitor de zip
// DOCX é um zip; só precisamos de word/document.xml. Evita dependência nova.

function lerEntradaZip(buffer: Buffer, nomeAlvo: string): Buffer | null {
  // Localiza o End of Central Directory varrendo de trás pra frente.
  let eocd = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 66000); i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return null;

  const totalEntradas = buffer.readUInt16LE(eocd + 10);
  let ponteiro = buffer.readUInt32LE(eocd + 16);

  for (let n = 0; n < totalEntradas; n++) {
    if (buffer.readUInt32LE(ponteiro) !== 0x02014b50) return null;
    const metodo = buffer.readUInt16LE(ponteiro + 10);
    const tamComprimido = buffer.readUInt32LE(ponteiro + 20);
    const tamNome = buffer.readUInt16LE(ponteiro + 28);
    const tamExtra = buffer.readUInt16LE(ponteiro + 30);
    const tamComentario = buffer.readUInt16LE(ponteiro + 32);
    const offsetLocal = buffer.readUInt32LE(ponteiro + 42);
    const nome = buffer.toString("utf8", ponteiro + 46, ponteiro + 46 + tamNome);

    if (nome === nomeAlvo) {
      if (buffer.readUInt32LE(offsetLocal) !== 0x04034b50) return null;
      const nomeLocal = buffer.readUInt16LE(offsetLocal + 26);
      const extraLocal = buffer.readUInt16LE(offsetLocal + 28);
      const inicio = offsetLocal + 30 + nomeLocal + extraLocal;
      const dados = buffer.subarray(inicio, inicio + tamComprimido);
      return metodo === 0 ? Buffer.from(dados) : inflateRawSync(dados);
    }

    ponteiro += 46 + tamNome + tamExtra + tamComentario;
  }
  return null;
}

function decodificarEntidades(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, "&");
}

function docxParaMarkdown(caminho: string): { texto: string; paragrafos: number } {
  const xml = lerEntradaZip(readFileSync(caminho), "word/document.xml");
  if (!xml) throw new Error("word/document.xml não encontrado no docx");

  const bruto = xml.toString("utf8");
  const paragrafos: string[] = [];

  // Cada <w:p> é um parágrafo; <w:t> guarda o texto.
  for (const par of bruto.match(/<w:p[ >][\s\S]*?<\/w:p>|<w:p\/>/g) ?? []) {
    const corpo = par;
    const partes = [...corpo.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]);
    const linha = decodificarEntidades(partes.join("")).trim();
    // Heurística de título: parágrafo com estilo Heading vira ###.
    const nivel = corpo.match(/w:val="(?:Heading|Ttulo|Título)(\d)"/)?.[1];
    if (!linha) {
      paragrafos.push("");
      continue;
    }
    paragrafos.push(nivel ? `${"#".repeat(Math.min(6, Number(nivel) + 1))} ${linha}` : linha);
  }

  return { texto: limpar(paragrafos.join("\n\n")), paragrafos: paragrafos.filter(Boolean).length };
}

// --------------------------------------------------------------- conversores

async function pdfParaMarkdown(caminho: string): Promise<{ texto: string; paginas: number }> {
  const bytes = new Uint8Array(readFileSync(caminho));
  const pdf = await getDocumentProxy(bytes);
  const { totalPages, text } = await extractText(pdf, { mergePages: false });

  const blocos: string[] = [];
  for (let i = 0; i < totalPages; i++) {
    const conteudo = limpar(text[i] ?? "");
    // Página sem camada de texto (slide-imagem) fica registrada, não some silenciosamente.
    blocos.push(
      conteudo.length < 20
        ? `## Página ${i + 1}\n\n_[sem camada de texto — provável slide/imagem, exigiria OCR]_`
        : `## Página ${i + 1}\n\n${conteudo}`,
    );
  }

  return { texto: blocos.join("\n\n"), paginas: totalPages };
}

// ---------------------------------------------------------------------- main

async function main() {
  const args = process.argv.slice(2);
  const alvo = args.find((a) => !a.startsWith("--"));
  if (!alvo) {
    console.error("uso: fonte-para-md.mts <pasta-ou-arquivo> [--out <dir>] [--force] [--max-mb N]");
    process.exit(1);
  }

  const forcar = args.includes("--force");
  const maxMb = Number(args[args.indexOf("--max-mb") + 1]) || 250;
  const raiz = resolve(alvo);
  const baseDir = statSync(raiz).isFile() ? dirname(raiz) : raiz;
  const saidaRaiz = args.includes("--out")
    ? resolve(args[args.indexOf("--out") + 1])
    : join(baseDir, "_md-cache");

  const fontes = listarFontes(raiz);
  console.error(`[fonte-para-md] ${fontes.length} arquivo(s) em ${raiz}`);
  console.error(`[fonte-para-md] saída: ${saidaRaiz}`);

  const registros: Registro[] = [];

  for (const [indice, fonte] of fontes.entries()) {
    const rel = relative(baseDir, fonte);
    const destino = join(saidaRaiz, `${rel.slice(0, rel.length - extname(rel).length)}.md`);
    const tipo = extname(fonte).toLowerCase() === ".docx" ? "docx" : "pdf";
    const tamanhoMb = Number((statSync(fonte).size / 1024 / 1024).toFixed(1));
    const prefixo = `[${indice + 1}/${fontes.length}]`;

    if (!forcar && existsSync(destino) && statSync(destino).mtimeMs >= statSync(fonte).mtimeMs) {
      const cache = readFileSync(destino, "utf8");
      const paginas = (cache.match(/^## Página /gm) ?? []).length;
      registros.push({
        arquivo: rel,
        saida: relative(saidaRaiz, destino),
        tipo,
        paginas,
        chars: cache.length,
        charsPorPagina: paginas ? Math.round(cache.length / paginas) : cache.length,
        tamanhoMb,
        status: "texto",
      });
      console.error(`${prefixo} cache  ${rel}`);
      continue;
    }

    if (tamanhoMb > maxMb) {
      registros.push({
        arquivo: rel, saida: "", tipo, paginas: 0, chars: 0, charsPorPagina: 0,
        tamanhoMb, status: "ignorado-tamanho",
      });
      console.error(`${prefixo} PULOU  ${rel} (${tamanhoMb}MB > ${maxMb}MB)`);
      continue;
    }

    try {
      const { texto, paginas } =
        tipo === "docx"
          ? await Promise.resolve(docxParaMarkdown(fonte)).then((r) => ({ texto: r.texto, paginas: r.paragrafos }))
          : await pdfParaMarkdown(fonte);

      const cabecalho = [
        `# ${basename(fonte, extname(fonte))}`,
        "",
        `> Fonte: \`${rel.split(sep).join("/")}\` · ${tipo.toUpperCase()} · ${tamanhoMb}MB · ${paginas} ${tipo === "docx" ? "parágrafos" : "páginas"}`,
        "> Convertido automaticamente por `scripts/fonte-para-md.mts`. Texto bruto, sem revisão.",
        "",
      ].join("\n");

      mkdirSync(dirname(destino), { recursive: true });
      writeFileSync(destino, `${cabecalho}\n${texto}\n`, "utf8");

      const chars = texto.length;
      const densidade = paginas ? Math.round(chars / paginas) : chars;
      // Densidade só diz algo em PDF (chars por página). Em docx a unidade é parágrafo.
      const status: Registro["status"] =
        tipo === "docx"
          ? chars > 200 ? "texto" : "imagem"
          : densidade < 80 ? "imagem" : densidade < 400 ? "texto-parcial" : "texto";

      registros.push({
        arquivo: rel, saida: relative(saidaRaiz, destino), tipo,
        paginas, chars, charsPorPagina: densidade, tamanhoMb, status,
      });
      console.error(`${prefixo} ${status.padEnd(13)} ${rel} — ${paginas}p, ${chars} chars`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      registros.push({
        arquivo: rel, saida: "", tipo, paginas: 0, chars: 0, charsPorPagina: 0,
        tamanhoMb, status: "erro", erro: msg,
      });
      console.error(`${prefixo} ERRO   ${rel} — ${msg}`);
    }
  }

  mkdirSync(saidaRaiz, { recursive: true });
  writeFileSync(join(saidaRaiz, "_manifest.json"), JSON.stringify(registros, null, 2), "utf8");

  const porStatus = (s: Registro["status"]) => registros.filter((r) => r.status === s);
  const linhas = [
    `# Manifesto de conversão — ${basename(raiz)}`,
    "",
    `Total: ${registros.length} arquivos · texto: ${porStatus("texto").length} · parcial: ${porStatus("texto-parcial").length} · imagem: ${porStatus("imagem").length} · erro: ${porStatus("erro").length} · pulados: ${porStatus("ignorado-tamanho").length}`,
    "",
    "| Arquivo | Tipo | Pág. | Chars | Chars/pág | Status |",
    "|---|---|---:|---:|---:|---|",
    ...registros
      .sort((a, b) => b.chars - a.chars)
      .map((r) => `| ${r.arquivo.split(sep).join("/")} | ${r.tipo} | ${r.paginas} | ${r.chars} | ${r.charsPorPagina} | ${r.status}${r.erro ? ` (${r.erro.slice(0, 60)})` : ""} |`),
  ];
  writeFileSync(join(saidaRaiz, "_manifest.md"), `${linhas.join("\n")}\n`, "utf8");

  console.error(
    `\n[fonte-para-md] pronto — texto:${porStatus("texto").length} parcial:${porStatus("texto-parcial").length} imagem:${porStatus("imagem").length} erro:${porStatus("erro").length}`,
  );
}

main().catch((e) => {
  console.error("[fonte-para-md] erro fatal:", e?.message ?? e);
  process.exit(1);
});
