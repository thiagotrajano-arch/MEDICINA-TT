/**
 * Reconciliacao segura entre tags de subtema do Anki e o manifesto curricular
 * privado. Somente correspondencias exatas/alias explicitos recebem semestre
 * e componente; os demais ficam marcados como vinculo curricular pendente.
 * Nunca altera campos, historico, suspensao ou agendamento.
 *
 * Uso:
 *   npm.cmd run anki:curriculo                 # dry-run
 *   npm.cmd run anki:curriculo -- --aplicar    # aplica tags apos backup
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const aplicar = process.argv.includes("--aplicar");
const MANIFESTO = resolve("exports/private/curriculo-granular-20260810.json");
const RELATORIO = resolve("exports/anki/taxonomia-curricular-2026-08-14.json");

type Resposta<T> = { result: T; error: string | null };
type Componente = { code: string; period?: number; modules?: Modulo[] };
type Modulo = { topics?: Topico[] };
type Topico = { publicSubthemeId?: string };
type Manifesto = { components: Componente[] };
type Nota = { noteId: number; tags: string[] };

async function anki<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`${action}: HTTP ${response.status}`);
  const body = await response.json() as Resposta<T>;
  if (body.error) throw new Error(`${action}: ${body.error}`);
  return body.result;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const ALIASES: Record<string, string> = {
  "avc-isquemico": "neuro--avc-isquemico--diagnostico-e-conduta",
  "avc-hemorragico": "neuro--avc-hemorragico-hsa-e-hemorragia-intraparenquimatosa--diagnostico-e-conduta",
  "crise-convulsiva": "neuro--crise-convulsiva-e-status-epilepticus--diagnostico-e-conduta",
  cefaleias: "neuro--cefaleias-primarias-e-sinais-de-alarme--diagnostico-e-conduta",
  "guillain-barre": "neuro--sindrome-de-guillain-barre--diagnostico-e-conduta",
  miastenia: "neuro--miastenia-gravis--diagnostico-e-conduta",
  "compressao-medular": "neuro--compressao-medular-aguda-e-sindrome-de-cauda-equina--diagnostico-e-conduta",
  "hic-delirium": "neuro--hipertensao-intracraniana-e-delirium--diagnostico-e-conduta",
  vertigem: "neuro--sindromes-vestibulares--diagnostico-e-conduta",
};

function extrairTagSubtema(tag: string): string | undefined {
  if (tag.startsWith("subtema::")) return tag.slice("subtema::".length);
  if (tag.startsWith("codex-medicus-subtema-")) return tag.slice("codex-medicus-subtema-".length);
  return undefined;
}

async function notasProjeto(): Promise<Nota[]> {
  const ids = await anki<number[]>("findNotes", { query: "tag:codex-medicus" });
  const notas: Nota[] = [];
  for (let inicio = 0; inicio < ids.length; inicio += 100) {
    notas.push(...await anki<Nota[]>("notesInfo", { notes: ids.slice(inicio, inicio + 100) }));
  }
  return notas;
}

async function adicionarTagsPorGrupo(grupos: Map<string, number[]>) {
  for (const [tags, ids] of grupos) {
    for (let inicio = 0; inicio < ids.length; inicio += 500) {
      await anki("addTags", { notes: ids.slice(inicio, inicio + 500), tags });
    }
  }
}

async function main() {
  await anki<number>("version");
  const manifesto = JSON.parse(await readFile(MANIFESTO, "utf8")) as Manifesto;
  const subtemas = new Map<string, { id: string; periods: Set<number>; components: Set<string> }>();
  for (const componente of manifesto.components ?? []) {
    for (const modulo of componente.modules ?? []) {
      for (const topico of modulo.topics ?? []) {
        const id = topico.publicSubthemeId;
        if (!id) continue;
        const atual = subtemas.get(id) ?? { id, periods: new Set<number>(), components: new Set<string>() };
        if (typeof componente.period === "number") atual.periods.add(componente.period);
        if (componente.code) atual.components.add(componente.code);
        subtemas.set(id, atual);
      }
    }
  }
  const porSlug = new Map<string, string>();
  for (const id of subtemas.keys()) {
    porSlug.set(slugify(id), id);
    porSlug.set(id, id);
  }

  const notas = await notasProjeto();
  const grupos = new Map<string, number[]>();
  const resumo = {
    generatedAt: new Date().toISOString(),
    applied: aplicar,
    notes: notas.length,
    manifestSubthemes: subtemas.size,
    notesWithCanonicalSubtheme: 0,
    notesWithExactCurriculumLink: 0,
    notesMarkedSemesterPending: 0,
    canonicalSubthemeTagsAdded: 0,
    semesterTagsAdded: 0,
    componentTagsAdded: 0,
    unresolvedAliases: [] as string[],
  };

  for (const nota of notas) {
    const ids = new Set<string>();
    let encontrouTagSemVinculo = false;
    for (const tag of nota.tags) {
      const valor = extrairTagSubtema(tag) ?? (ALIASES[tag] ? tag : undefined);
      if (!valor) continue;
      const alias = ALIASES[valor];
      const id = alias && subtemas.has(alias) ? alias : porSlug.get(valor) ?? porSlug.get(slugify(valor));
      if (id) ids.add(id);
      else {
        encontrouTagSemVinculo = true;
        if (alias) resumo.unresolvedAliases.push(`${valor} -> ${alias}`);
      }
    }
    if (!ids.size && !encontrouTagSemVinculo) continue;
    if (ids.size) resumo.notesWithCanonicalSubtheme += 1;
    const tags = new Set<string>();
    let temVinculo = false;
    for (const id of ids) {
      tags.add(`subtema::${id}`);
      resumo.canonicalSubthemeTagsAdded += 1;
      const vinculo = subtemas.get(id);
      if (!vinculo || !vinculo.periods.size) continue;
      temVinculo = true;
      for (const periodo of vinculo.periods) {
        tags.add(`semestre::${periodo}`);
        resumo.semesterTagsAdded += 1;
      }
      for (const componente of vinculo.components) {
        tags.add(`componente::${componente}`);
        resumo.componentTagsAdded += 1;
      }
    }
    if (temVinculo) resumo.notesWithExactCurriculumLink += 1;
    else {
      tags.add("curriculo::semestre-pendente");
      resumo.notesMarkedSemesterPending += 1;
    }
    const novos = [...tags].filter((tag) => !nota.tags.includes(tag));
    if (novos.length) {
      const chave = novos.join(" ");
      grupos.set(chave, [...(grupos.get(chave) ?? []), nota.noteId]);
    }
  }
  resumo.unresolvedAliases = [...new Set(resumo.unresolvedAliases)].sort();
  await mkdir(resolve("exports/anki"), { recursive: true });
  await writeFile(RELATORIO, `${JSON.stringify({ ...resumo, groups: grupos.size }, null, 2)}\n`, "utf8");
  if (aplicar) await adicionarTagsPorGrupo(grupos);
  console.log(JSON.stringify({ ...resumo, groups: grupos.size, destino: RELATORIO }, null, 2));
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
