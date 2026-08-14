/**
 * Prepara a fila editorial das notas longas sem alterar texto, agendamento,
 * histórico ou decks. As tags tornam a reescrita auditável e retomável.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ENDPOINT = "http://127.0.0.1:8765";
const FILA = "editorial::aguarda-reescrita-curta";

type Resposta<T> = { result: T; error: string | null };
type Nota = { noteId: number; tags: string[] };

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

function disciplina(nota: Nota): string {
  return (nota.tags.find((tag) => tag.startsWith("disciplina::")) ?? "disciplina::nao-classificada")
    .slice("disciplina::".length);
}

function onda(valor: string): "onda-1" | "onda-2" | "onda-3" {
  if (["infectologia", "cardiologia", "neurologia", "pneumologia"].includes(valor)) return "onda-1";
  if (["ginecologia-obstetricia", "pediatria", "cirurgia", "mfc-atencao-primaria"].includes(valor)) return "onda-2";
  return "onda-3";
}

async function adicionarTags(ids: number[], tags: string[]) {
  for (let inicio = 0; inicio < ids.length; inicio += 500) {
    await anki("addTags", { notes: ids.slice(inicio, inicio + 500), tags: tags.join(" ") });
  }
}

async function executar() {
  await anki<number>("version");
  const ids = await anki<number[]>("findNotes", { query: `tag:"${FILA}"` });
  const notas: Nota[] = [];
  for (let inicio = 0; inicio < ids.length; inicio += 100) {
    notas.push(...await anki<Nota[]>("notesInfo", { notes: ids.slice(inicio, inicio + 100) }));
  }

  const porOnda = new Map<string, number[]>();
  const porDisciplina = new Map<string, { total: number; semSubtema: number }>();
  const semSubtema: number[] = [];
  for (const nota of notas) {
    const area = disciplina(nota);
    const chaveOnda = onda(area);
    porOnda.set(chaveOnda, [...(porOnda.get(chaveOnda) ?? []), nota.noteId]);
    const atual = porDisciplina.get(area) ?? { total: 0, semSubtema: 0 };
    atual.total += 1;
    if (!nota.tags.some((tag) => tag.startsWith("subtema::"))) {
      atual.semSubtema += 1;
      semSubtema.push(nota.noteId);
    }
    porDisciplina.set(area, atual);
  }

  await adicionarTags(ids, ["editorial::fonte-revalidar", "editorial::reautoria-atomica"]);
  for (const [nome, notasDaOnda] of porOnda) await adicionarTags(notasDaOnda, [`editorial::${nome}`]);
  await adicionarTags(semSubtema, ["editorial::taxonomia-pendente"]);

  const relatorio = {
    generatedAt: new Date().toISOString(),
    operation: "tags-only",
    preservedTextHistoryAndScheduling: true,
    total: notas.length,
    withoutSubtheme: semSubtema.length,
    waves: Object.fromEntries([...porOnda].map(([nome, itens]) => [nome, itens.length])),
    disciplines: Object.fromEntries([...porDisciplina].sort(([a], [b]) => a.localeCompare(b))),
  };
  await mkdir(resolve("exports/anki"), { recursive: true });
  await writeFile(resolve("exports/anki/fila-reescrita-atomica.json"), `${JSON.stringify(relatorio, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(relatorio, null, 2));
}

executar().catch((erro: unknown) => {
  console.error(erro instanceof Error ? erro.message : String(erro));
  process.exit(1);
});
