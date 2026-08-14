/**
 * Reconstrói no próprio ID as perguntas clínicas elegíveis da fila longa.
 *
 * Importante: o snapshot privado e o backup preservam os campos anteriores.
 * As notas continuam suspensas e só voltam após revalidação clínica.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const LIMITE_FRENTE = 100;
const LIMITE_VERSO = 170;
const APLICAR = process.argv.includes("--aplicar");
const MOSTRAR_AMOSTRA = process.argv.includes("--amostra");

type Resposta<T> = { result: T; error: string | null };
type Nota = {
  noteId: number;
  tags: string[];
  fields: Record<string, { value: string }>;
};
type Candidato = {
  origem: number;
  frente: string;
  verso: string;
  tema: string;
  referencia: string;
  tags: string[];
};

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const resposta = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!resposta.ok) throw new Error(`${action}: HTTP ${resposta.status}`);
  const corpo = await resposta.json() as Resposta<T>;
  if (corpo.error) throw new Error(`${action}: ${corpo.error}`);
  return corpo.result;
}

function limpar(valor = ""): string {
  return valor
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/[•●▪◦]/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function semFonteRepetida(valor: string): string {
  return valor.split(/\s+Fonte:\s*/i)[0]?.trim() ?? valor.trim();
}

const PADRAO_GENERICO = /(?:em prova e decis[aã]o pr[aá]tica|reconhecer o padr[aã]o|excluir sinais de gravidade|sem transformar rastreio|o mecanismo central explica|memorizar a conduta sem|tema recorrente|a cobran[cç]a central|agress[aã]o inicial\s*->)/i;

function primeiroAtomo(valor: string): string | null {
  const corpo = semFonteRepetida(limpar(valor));
  const segmentos = corpo
    .split(/\n+|(?<=[.!?])\s+|\s*;\s*/)
    .map((parte) => parte.replace(/^[-–—\d.)\s]+/, "").trim())
    .filter((parte) => parte.length >= 12 && !PADRAO_GENERICO.test(parte));

  for (const segmento of segmentos) {
    if (segmento.length <= LIMITE_VERSO) return segmento.replace(/[.;:]$/, "").trim();
    const partes = segmento.split(/\s+[–—-]>?\s+|:\s+|,\s+(?=(?:mas|porém|quando|se|exceto)\b)/i);
    const completa = partes.find((parte) => parte.trim().length >= 12 && parte.trim().length <= LIMITE_VERSO);
    if (completa) return completa.replace(/[.;:]$/, "").trim();
  }
  return null;
}

function encurtarPergunta(frente: string): string | null {
  let valor = limpar(frente)
    .replace(/\s+(?:segundo|conforme|de acordo com)\s+(?:o|a|os|as)?\s*[^?]{0,45}(?=\?)/i, "")
    .replace(/A partir de qual idade gestacional/gi, "Quando")
    .replace(/o (?:MS|Minist[eé]rio da Sa[uú]de) recomenda suplementa[cç][aã]o universal de/gi, "iniciar")
    .replace(/Quais s[aã]o os principais/gi, "Quais")
    .replace(/Qual (?:é|e) o principal/gi, "Qual")
    .replace(/\s+/g, " ")
    .trim();
  if (valor.length <= LIMITE_FRENTE) return valor;
  valor = valor.replace(/\s*,?\s*e em que dose\?/i, " e qual dose?");
  if (valor.length <= LIMITE_FRENTE) return valor;
  return null;
}

function frenteDoCandidato(original: string, tema: string, atomo: string): string | null {
  if (original.includes("?")) return encurtarPergunta(original);
  const base = limpar(original)
    .replace(/\b(?:Panorama|Fisiopatologia|Diagn[oó]stico|Conduta|Mnem[oô]nico|P[eé]rolas?)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  const rotulo = limpar(tema) || base || "Tema";
  const assunto = (base || rotulo).slice(0, 58).replace(/\s+\S*$/, "").trim() || rotulo.slice(0, 40);
  const relacao = atomo.match(/^(.{3,48}?)\s+(é|são|indica|define|revela|causa|aumenta|reduz)\s+/i);
  let pergunta = relacao
    ? `${assunto}: o que ${relacao[2].toLocaleLowerCase("pt-BR")} ${relacao[1].trim()}?`
    : `${assunto}: qual é o ponto-chave?`;
  pergunta = pergunta.replace(/\s+/g, " ");
  if (pergunta.length <= LIMITE_FRENTE) return pergunta;
  return `${rotulo.slice(0, 60).replace(/\s+\S*$/, "").trim()}: qual é o ponto-chave?`;
}

function criarCandidato(nota: Nota): Candidato | null {
  const original = limpar(nota.fields.Frente?.value ?? nota.fields.Front?.value ?? "");
  // Apenas perguntas clínicas reais são elegíveis para reescrita automática.
  // Títulos artificiais como "Panorama" exigem autoria humana e não podem
  // voltar como perguntas genéricas de baixo valor.
  if (!original.includes("?")) return null;
  const atomo = primeiroAtomo(nota.fields.Verso?.value ?? nota.fields.Back?.value ?? "");
  const tema = limpar(nota.fields.Tema?.value ?? "");
  const referencia = limpar(nota.fields.Referencia?.value ?? "");
  const disciplina = (nota.tags.find((tag) => tag.startsWith("disciplina::")) ?? "disciplina::nao-classificada").slice(12);
  if (!atomo || !referencia || disciplina === "nao-classificada") return null;
  const frente = frenteDoCandidato(original, tema, atomo);
  if (!frente || frente.length > LIMITE_FRENTE || atomo.length > LIMITE_VERSO) return null;
  return {
    origem: nota.noteId,
    frente,
    verso: atomo,
    tema,
    referencia,
    tags: [
      "codex-medicus",
      "editorial::candidato-reescrito",
      "editorial::aguarda-validacao-clinica",
      `reautoria::origem::${nota.noteId}`,
      ...nota.tags.filter((tag) => /^(?:ciclo|area|disciplina|subtema|eixo)::/.test(tag)),
    ],
  };
}

async function executar() {
  await anki<number>("version");
  const ids = await anki<number[]>("findNotes", { query: 'tag:"editorial::aguarda-reescrita-curta"' });
  if (!ids.length) {
    console.log(JSON.stringify({ status: "fila-vazia", changed: false }, null, 2));
    return;
  }
  const notas: Nota[] = [];
  for (let inicio = 0; inicio < ids.length; inicio += 100) {
    notas.push(...await anki<Nota[]>("notesInfo", { notes: ids.slice(inicio, inicio + 100) }));
  }
  const candidatos = notas.map(criarCandidato).filter((item): item is Candidato => Boolean(item));
  const rejeitadas = notas.filter((nota) => !candidatos.some((item) => item.origem === nota.noteId)).map((nota) => nota.noteId);

  let reescritos = 0;
  let existentes = 0;
  if (APLICAR) {
    await writeFile(
      resolve("exports/anki/reautoria-originais-private.json"),
      `${JSON.stringify({ generatedAt: new Date().toISOString(), notes: notas }, null, 2)}\n`,
      "utf8",
    );
    for (const candidato of candidatos) {
      const existe = await anki<number[]>("findNotes", { query: `nid:${candidato.origem} tag:"editorial::reescrito-curto-candidato"` });
      if (existe.length) { existentes += 1; continue; }
      await anki("updateNoteFields", {
        note: {
          id: candidato.origem,
          fields: {
            Frente: candidato.frente,
            Verso: candidato.verso,
            Tema: candidato.tema,
            Referencia: candidato.referencia,
          },
        },
      });
      await anki("addTags", {
        notes: [candidato.origem],
        tags: "editorial::reescrito-curto-candidato editorial::aguarda-validacao-clinica",
      });
      reescritos += 1;
    }
    if (rejeitadas.length) {
      for (let inicio = 0; inicio < rejeitadas.length; inicio += 500) {
        await anki("addTags", { notes: rejeitadas.slice(inicio, inicio + 500), tags: "editorial::aposentado-sem-reescrita-segura" });
      }
    }
    for (let inicio = 0; inicio < ids.length; inicio += 500) {
      await anki("removeTags", {
        notes: ids.slice(inicio, inicio + 500),
        tags: "editorial::aguarda-reescrita-curta editorial::texto-longo",
      });
    }
  }

  const porDisciplina: Record<string, { origem: number; candidato: number }> = {};
  for (const nota of notas) {
    const disciplina = (nota.tags.find((tag) => tag.startsWith("disciplina::")) ?? "disciplina::nao-classificada").slice(12);
    porDisciplina[disciplina] ??= { origem: 0, candidato: 0 };
    porDisciplina[disciplina].origem += 1;
  }
  for (const candidato of candidatos) {
    const disciplina = candidato.tags.find((tag) => tag.startsWith("disciplina::"))?.slice(12) ?? "nao-classificada";
    porDisciplina[disciplina] ??= { origem: 0, candidato: 0 };
    porDisciplina[disciplina].candidato += 1;
  }

  const relatorio = {
    generatedAt: new Date().toISOString(),
    mode: APLICAR ? "rewrite-in-place-suspended" : "dry-run",
    originalsPreserved: notas.length,
    candidateNotes: candidatos.length,
    rejectedWithoutReliableAtom: rejeitadas.length,
    rewrittenInPlace: reescritos,
    alreadyExisting: existentes,
    candidatesActive: 0,
    retiredGenericOrUnsafe: rejeitadas.length,
    disciplines: porDisciplina,
  };
  await mkdir(resolve("exports/anki"), { recursive: true });
  await writeFile(resolve("exports/anki/reautoria-total-candidatos.json"), `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(relatorio, null, 2));
  if (MOSTRAR_AMOSTRA) {
    const vistos = new Set<string>();
    for (const candidato of candidatos) {
      const disciplina = candidato.tags.find((tag) => tag.startsWith("disciplina::"))?.slice(12) ?? "nao-classificada";
      if (vistos.has(disciplina)) continue;
      vistos.add(disciplina);
      console.log(JSON.stringify({ disciplina, frente: candidato.frente, verso: candidato.verso }));
    }
  }
}

executar().catch((erro: unknown) => {
  console.error(erro instanceof Error ? erro.message : String(erro));
  process.exit(1);
});
