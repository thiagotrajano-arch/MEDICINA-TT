/**
 * Completa os componentes curriculares que já possuem registro no SISCAD,
 * mas ainda não tinham mapa granular. A fonte é a síntese privada já registrada
 * em sync-private-curriculum.mts; por isso os novos itens ficam parciais e sem
 * vínculo público automático. Nenhum dado pessoal ou plano bruto é publicado.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DISCIPLINAS } from "../src/content/taxonomy";

type Topic = { order: number; title: string; objective: string; evidenceStatus: "confirmado" | "parcial" | "ausente"; omedPriority: string; questionSources: string[]; [key: string]: unknown };
type CurriculumModule = { order: number; type: string; title: string; evidenceStatus: string; sourceLocation: string; topics: Topic[]; [key: string]: unknown };
type Component = { code: string; name: string; period: number; category: string; status: string; evidenceStatus: string; sourceLabel: string; note: string; modules: CurriculumModule[]; [key: string]: unknown };
type Manifest = { schemaVersion: 1; visibility: "private"; publicRepositoryAllowed: false; generatedAt: string; components: Component[]; [key: string]: unknown };
type PublicSubtheme = { discipline: string; subtheme: string; name: string };
type Candidate = { component: string; componentName: string; period: number | null; module: string; topic: string; evidenceStatus: string; candidateExactNameMatches: PublicSubtheme[]; decision: string; reason: string };

const source = "Obsidian privado: síntese curricular derivada dos planos SISCAD (revisão 2026-08-15)";
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const topic = (title: string, sources = ["OMED", "Revalida", "ENARE"]): Topic => ({
  order: 0,
  title,
  objective: "Confirmar no plano oficial e relacionar a uma subárea pública somente após revisão manual.",
  evidenceStatus: "parcial",
  omedPriority: "nao_classificado",
  questionSources: sources,
});
const makeModule = (title: string, titles: string[], sources?: string[]): CurriculumModule => ({
  order: 0,
  type: "eixo",
  title,
  evidenceStatus: "parcial",
  sourceLocation: source,
  topics: titles.map((item) => topic(item, sources)),
});
const component = (code: string, name: string, period: number, category: string, status: "concluida" | "cursando", modules: CurriculumModule[], note: string): Component => ({
  code,
  name,
  period,
  category,
  status,
  evidenceStatus: "parcial",
  sourceLabel: source,
  note,
  modules: modules.map((item, index) => ({
    ...item,
    order: index + 1,
    topics: item.topics.map((itemTopic: Topic, topicIndex: number) => ({ ...itemTopic, order: topicIndex + 1 })),
  })),
});

const additions = [
  component("BBPM-V", "BBPM V", 6, "bbpm", "cursando", [
    makeModule("Reumatologia e ortopedia", ["Reumatologia", "Anestesia", "Ortopedia"]),
    makeModule("Patologia, farmacologia e imagem", ["Patologia", "Farmacologia", "Imagem"]),
  ], "Componente reconhecido no SISCAD; granularidade baseada na síntese privada e pendente de conferência do plano aula a aula."),
  component("BBPM-VI", "BBPM VI", 6, "bbpm", "cursando", [
    makeModule("Neurologia e neurosemiologia", ["Neurosemiologia", "Neuroanatomia", "Cefaleia", "Vertigem", "AVC", "Delirium", "Epilepsia"]),
    makeModule("Psiquiatria clínica", ["Ansiedade", "Depressão", "Psicose", "Transtorno bipolar", "Psicofarmacologia", "Emergências psiquiátricas"]),
  ], "Componente reconhecido no SISCAD; HCPM VI permanece como alias institucional e não recebe ementa inventada."),
  component("BC-I", "Bases Complementares I", 1, "outro", "concluida", [
    makeModule("Fundamentos acadêmicos", ["Busca de evidências", "Bioética", "Bioestatística introdutória", "Inglês instrumental", "Informática aplicada à saúde"], ["OMED", "USMLE Step 1"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("BC-II", "Bases Complementares II", 2, "outro", "concluida", [
    makeModule("Métodos de pesquisa", ["Desenhos de estudo", "Estatística", "Epidemiologia", "Leitura crítica"], ["OMED", "USMLE Step 1"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("BC-III", "Bases Complementares III", 3, "outro", "concluida", [
    makeModule("Comunicação e escrita científica", ["Libras e acessibilidade", "Busca e citação", "Gerenciadores de referências", "Escrita científica", "Ética"], ["OMED", "Revalida"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("BC-IV", "Bases Complementares IV", 4, "outro", "concluida", [
    makeModule("Epidemiologia e pesquisa", ["Libras", "Epidemiologia", "Desenhos de estudo", "Ética em pesquisa"], ["OMED", "Revalida"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("BC-V", "Bases Complementares V", 5, "outro", "concluida", [
    makeModule("TCC e inferência", ["TCC", "Desenho de estudo", "Causalidade", "Imunidade coletiva", "Ética"], ["OMED", "Revalida", "ENARE"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("BC-VI", "Bases Complementares VI", 6, "outro", "cursando", [
    makeModule("Pesquisa clínica e tecnologia", ["PICOT", "Randomização", "Farmacovigilância", "Estatística", "Revisão sistemática", "Uso crítico de IA"], ["OMED", "USMLE Step 1"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("TES-I", "Tópicos Especiais em Saúde I", 3, "outro", "concluida", [
    makeModule("Integração clínica", ["Cuidado centrado", "Dor", "Sistema nervoso autônomo", "Anestésicos locais", "Integração neuroimunoendócrina", "Saúde oral"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("TES-IV", "Tópicos Especiais em Saúde IV", 4, "outro", "concluida", [
    makeModule("Imunologia avançada", ["Imunidade inata", "Imunidade adaptativa", "Inflamassoma", "Complemento", "MHC", "BCR e TCR", "Tolerância"], ["OMED", "USMLE Step 1"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
  component("TSM", "Tópicos em Saúde da Mulher", 4, "outro", "concluida", [
    makeModule("Mastologia", ["Anatomia mamária", "Semiologia mamária", "BI-RADS", "Câncer de mama"], ["OMED", "Revalida", "ENARE"]),
  ], "Registro institucional confirmado; plano granular ainda não localizado."),
];

const input = resolve("exports/private/curriculo-granular-20260810.json");
const output = resolve("exports/private/curriculo-granular-20260815.json");
const reviewOutput = resolve("exports/private/curriculo-vinculos-review-20260815.json");
const manifest = JSON.parse(await readFile(input, "utf8")) as Manifest;
const existing = new Set(manifest.components.map((item) => item.code));
const added = additions.filter((item) => !existing.has(item.code));
const merged: Manifest = { ...manifest, generatedAt: new Date().toISOString(), components: [...manifest.components, ...added] };

const publicByName = new Map<string, Array<{ discipline: string; subtheme: string; name: string }>>();
for (const discipline of DISCIPLINAS) {
  for (const tema of discipline.temas) {
    for (const subtema of tema.subtemas) {
      const key = normalize(subtema.nome);
      publicByName.set(key, [...(publicByName.get(key) ?? []), { discipline: discipline.id, subtheme: subtema.id, name: subtema.nome }]);
    }
  }
}
const candidates: Candidate[] = [];
for (const item of manifest.components) {
  for (const itemModule of item.modules ?? []) {
    for (const itemTopic of itemModule.topics ?? []) {
      if (itemTopic.publicSubthemeId) continue;
      const exact = publicByName.get(normalize(itemTopic.title)) ?? [];
      candidates.push({
        component: item.code,
        componentName: item.name,
        period: item.period ?? null,
        module: itemModule.title,
        topic: itemTopic.title,
        evidenceStatus: itemTopic.evidenceStatus,
        candidateExactNameMatches: exact,
        decision: exact.length === 1 ? "revisao_manual_obrigatoria" : "sem_correspondencia_publica_exata",
        reason: "Nenhum vinculo foi aplicado automaticamente; confirmar no plano SISCAD e na taxonomia.",
      });
    }
  }
}

await mkdir(resolve("exports/private"), { recursive: true });
await writeFile(output, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
await writeFile(reviewOutput, `${JSON.stringify({ generatedAt: new Date().toISOString(), sourceManifest: input, reviewedCandidates: candidates.length, candidates, addedComponents: added.map((item) => item.code), appliedAutomatically: 0 }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ output, reviewOutput, originalComponents: manifest.components.length, addedComponents: added.length, finalComponents: merged.components.length, reviewedCandidates: candidates.length, appliedAutomatically: 0 }, null, 2));
