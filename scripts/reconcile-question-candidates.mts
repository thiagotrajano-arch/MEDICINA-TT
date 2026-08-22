import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { loadEnv } from "./load-env.mjs";
import { DISCIPLINAS } from "../src/content/taxonomy";
import { QUESTOES } from "../src/content/questoes";

type RemoteQuestion = {
  id: string;
  subtema_id: string | null;
  disciplina_id: string;
  enunciado: string;
  estilo: string;
  dificuldade: string;
  tags: string[] | null;
  fonte: string | null;
};

type RemoteAlternative = {
  id: string;
  questao_id: string;
  letra: string;
  texto: string;
  correta: boolean;
  comentario: string;
};

type CandidateStatus = "novo" | "duplicado_por_conteudo" | "revisar";

type MetadataQueryClient = {
  from: (table: string) => {
    select: (columns: string) => {
      range: (from: number, to: number) => Promise<{ data: unknown[] | null; error: { message: string } | null }>;
    };
  };
};

const PAGE_SIZE = 1000;
const outputDir = join(process.cwd(), "exports", "private");
const outputFile = join(outputDir, `reconciliacao-questoes-${new Date().toISOString().slice(0, 10)}.json`);

function normalized(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

function contentHash(question: {
  enunciado: string;
  alternativas: Array<{ letra: string; texto: string; correta: boolean; comentario: string }>;
}): string {
  const material = [normalized(question.enunciado), ...question.alternativas
    .slice()
    .sort((a, b) => a.letra.localeCompare(b.letra))
    .map((alternative) => [alternative.letra, normalized(alternative.texto), alternative.correta ? "1" : "0", normalized(alternative.comentario)].join("|"))]
    .join("\n");
  return createHash("sha256").update(material, "utf8").digest("hex");
}

async function fetchAll<T>(client: MetadataQueryClient, table: string, columns: string): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await client.from(table).select(columns).range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...((data ?? []) as T[]));
    if ((data ?? []).length < PAGE_SIZE) return rows;
  }
}

async function main(): Promise<void> {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("NEXT_PUBLIC_SUPABASE_URL/ANON_KEY não configurados.");

  const client = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const [remoteQuestions, remoteAlternatives] = await Promise.all([
    fetchAll<RemoteQuestion>(client as unknown as MetadataQueryClient, "questao", "id,subtema_id,disciplina_id,enunciado,estilo,dificuldade,tags,fonte"),
    fetchAll<RemoteAlternative>(client as unknown as MetadataQueryClient, "alternativa", "id,questao_id,letra,texto,correta,comentario"),
  ]);

  const remoteIds = new Set(remoteQuestions.map((question) => question.id));
  const remoteByQuestion = new Map<string, RemoteAlternative[]>();
  for (const alternative of remoteAlternatives) {
    const list = remoteByQuestion.get(alternative.questao_id) ?? [];
    list.push(alternative);
    remoteByQuestion.set(alternative.questao_id, list);
  }

  const remoteHashes = new Map<string, string[]>();
  for (const question of remoteQuestions) {
    const alternatives = remoteByQuestion.get(question.id) ?? [];
    const hash = contentHash({ enunciado: question.enunciado, alternativas: alternatives });
    remoteHashes.set(hash, [...(remoteHashes.get(hash) ?? []), question.id]);
  }

  const taxonomyIds = new Set(DISCIPLINAS.flatMap((discipline) => discipline.temas.flatMap((topic) => topic.subtemas.map((subtopic) => subtopic.id))));
  const localOnly = QUESTOES.filter((question) => !remoteIds.has(question.id));
  const candidates = localOnly.map((question) => {
    const hash = contentHash(question);
    const duplicateIds = remoteHashes.get(hash) ?? [];
    const missingTags = question.tags.length === 0;
    const missingSource = !question.fonte?.trim();
    const invalidSubtopic = !taxonomyIds.has(question.subtemaId);
    const status: CandidateStatus = duplicateIds.length
      ? "duplicado_por_conteudo"
      : missingTags || missingSource || invalidSubtopic
        ? "revisar"
        : "novo";
    return {
      id: question.id,
      disciplinaId: question.disciplinaId,
      subtemaId: question.subtemaId,
      tagsCount: question.tags.length,
      hasSource: !missingSource,
      validSubtopic: !invalidSubtopic,
      alternatives: question.alternativas.length,
      correctAlternatives: question.alternativas.filter((alternative) => alternative.correta).length,
      contentHash: hash,
      duplicateRemoteIds: duplicateIds,
      status,
      automaticAction: "nenhuma; exige portão editorial e revisão de proveniência",
    };
  });

  const report = {
    generatedAt: new Date().toISOString(),
    criteria: {
      localOnly: "ID local ausente em public.questao",
      duplicate: "hash SHA-256 normalizado de enunciado e alternativas",
      review: "sem tags, sem fonte, subtema ausente na taxonomia ou hash coincidente",
      noMutation: true,
    },
    totals: {
      localCatalog: QUESTOES.length,
      remoteCatalog: remoteQuestions.length,
      localOnly: localOnly.length,
      byStatus: {
        novo: candidates.filter((candidate) => candidate.status === "novo").length,
        duplicadoPorConteudo: candidates.filter((candidate) => candidate.status === "duplicado_por_conteudo").length,
        revisar: candidates.filter((candidate) => candidate.status === "revisar").length,
      },
      missingTags: candidates.filter((candidate) => candidate.tagsCount === 0).length,
      missingSource: candidates.filter((candidate) => !candidate.hasSource).length,
      invalidSubtopic: candidates.filter((candidate) => !candidate.validSubtopic).length,
    },
    candidates,
  };

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ outputFile, totals: report.totals }, null, 2));
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
