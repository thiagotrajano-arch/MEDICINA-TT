/**
 * Gera os arquivos de conteúdo/questões a partir de JSONs de subtema.
 *
 *   npx tsx scripts/gerar-conteudo.mts <pasta-com-json> [--dry]
 *
 * Existe para que vários agentes possam escrever subtemas em paralelo (cada um no
 * seu JSON) sem conflito de escrita, e para que o TypeScript final saia sempre no
 * mesmo formato — sem risco de erro de sintaxe vindo de texto gerado.
 *
 * Cada JSON descreve UM subtema:
 * {
 *   "disciplinaId": "hemato",
 *   "disciplinaNome": "Hematologia",
 *   "temaNome": "Anemias",
 *   "subtemaNome": "Investigação e Classificação",
 *   "titulo": "Anemias — Investigação e Classificação",
 *   "altoRendimento": true,
 *   "dificuldade": "intermediaria",
 *   "blocos": [{ "secao": "Panorama", "corpo": "..." }],
 *   "referencias": ["..."],
 *   "questoes": [{ "enunciado": "...", "alternativas": [...], "dificuldade": "...", "estilo": "...", "tags": [...] }]
 * }
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

type Bloco = { secao: string; corpo: string; figura?: string | string[] };
type Alternativa = { letra: string; texto: string; correta: boolean; comentario: string };
type QuestaoJson = {
  enunciado: string;
  alternativas: Alternativa[];
  dificuldade: string;
  estilo: string;
  tags: string[];
  fonte?: string;
};
type SubtemaJson = {
  disciplinaId: string;
  disciplinaNome: string;
  temaNome: string;
  subtemaNome: string;
  titulo: string;
  altoRendimento?: boolean;
  dificuldade?: string;
  blocos: Bloco[];
  referencias: string[];
  questoes?: QuestaoJson[];
};

const SECOES_ESPERADAS = [
  "Panorama", "Definição", "Fisiopatologia", "Fatores de risco e estratificação",
  "Avaliação clínica", "Diagnóstico", "Diagnóstico diferencial", "Condutas",
  "Complicações", "Fluxograma de conduta", "Tabela comparativa", "Pérolas OMED",
  "Pegadinhas clássicas", "Integração entre temas", "Mnemônico",
  "Questões da OMED", "Resumo de 5 minutos",
];

/** Mesma implementação de src/content/taxonomy.ts — os IDs precisam bater exatamente. */
function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const aspas = (s: string) => JSON.stringify(s);

function main() {
  const args = process.argv.slice(2);
  const pasta = resolve(args.find((a) => !a.startsWith("--")) ?? "");
  const dry = args.includes("--dry");
  const raizRepo = resolve(import.meta.dirname, "..");
  const hoje = new Date().toISOString().slice(0, 10);

  const arquivos = readdirSync(pasta).filter((f) => f.endsWith(".json"));
  if (!arquivos.length) {
    console.error(`[gerar-conteudo] nenhum .json em ${pasta}`);
    process.exit(1);
  }

  const subtemas: SubtemaJson[] = arquivos.map((f) =>
    JSON.parse(readFileSync(join(pasta, f), "utf8")),
  );

  // ------------------------------------------------------------- validação
  const problemas: string[] = [];
  const idsVistos = new Set<string>();

  for (const s of subtemas) {
    const temaId = `${s.disciplinaId}--${slugify(s.temaNome)}`;
    const subtemaId = `${temaId}--${slugify(s.subtemaNome)}`;
    if (idsVistos.has(subtemaId)) problemas.push(`ID duplicado: ${subtemaId}`);
    idsVistos.add(subtemaId);

    const secoes = s.blocos.map((b) => b.secao);
    for (const esperada of SECOES_ESPERADAS) {
      if (!secoes.includes(esperada)) problemas.push(`${subtemaId}: falta a seção "${esperada}"`);
    }
    if (!s.referencias?.length) problemas.push(`${subtemaId}: sem referências`);

    for (const [i, q] of (s.questoes ?? []).entries()) {
      const corretas = q.alternativas.filter((a) => a.correta).length;
      if (corretas !== 1) problemas.push(`${subtemaId} q${i + 1}: ${corretas} alternativas corretas (esperado 1)`);
      const comentarios = new Set(q.alternativas.map((a) => a.comentario.trim()));
      if (comentarios.size !== q.alternativas.length) {
        problemas.push(`${subtemaId} q${i + 1}: comentários repetidos entre alternativas`);
      }
      for (const a of q.alternativas) {
        if (a.comentario.trim().length < 40) {
          problemas.push(`${subtemaId} q${i + 1}${a.letra}: comentário curto demais (${a.comentario.trim().length} chars)`);
        }
      }
    }
  }

  if (problemas.length) {
    console.error(`[gerar-conteudo] ${problemas.length} problema(s):`);
    for (const p of problemas) console.error(`  - ${p}`);
    if (!args.includes("--ignorar-validacao")) process.exit(1);
  }

  // ------------------------------------------------- agrupamento e emissão
  const porDisciplina = new Map<string, SubtemaJson[]>();
  for (const s of subtemas) {
    porDisciplina.set(s.disciplinaId, [...(porDisciplina.get(s.disciplinaId) ?? []), s]);
  }

  for (const [disciplinaId, lista] of porDisciplina) {
    const CONST = disciplinaId.toUpperCase().replace(/[^A-Z0-9]/g, "_");
    const nomeDisc = lista[0].disciplinaNome;

    // ---- conteúdos
    const entradasConteudo = lista.map((s) => {
      const subtemaId = `${s.disciplinaId}--${slugify(s.temaNome)}--${slugify(s.subtemaNome)}`;
      const blocos = s.blocos
        .map((b) => {
          const fig = b.figura ? `, figura: ${JSON.stringify(b.figura)}` : "";
          return `      { secao: ${aspas(b.secao)}, corpo: ${aspas(b.corpo)}${fig} },`;
        })
        .join("\n");
      const refs = s.referencias.map((r) => `      ${aspas(r)},`).join("\n");
      return [
        `  ${aspas(subtemaId)}: {`,
        `    subtemaId: ${aspas(subtemaId)},`,
        `    titulo: ${aspas(s.titulo)},`,
        `    atualizadoEm: ${aspas(hoje)},`,
        `    origem: "complemento_ia",`,
        `    blocos: [`,
        blocos,
        `    ],`,
        `    referencias: [`,
        refs,
        `    ],`,
        `  },`,
      ].join("\n");
    });

    const arquivoConteudo = [
      `import type { ConteudoSubtema } from "@/domain/content/types";`,
      ``,
      `/**`,
      ` * Resumos — ${nomeDisc.toLowerCase()}.`,
      ` * Gerado por scripts/gerar-conteudo.mts a partir dos JSONs de subtema.`,
      ` * Conteúdo escrito do zero a partir de conhecimento médico consolidado e das`,
      ` * diretrizes vigentes citadas em cada subtema; o material do usuário serviu de`,
      ` * base de estudo e recorte de tema, não de texto copiado.`,
      ` */`,
      `export const CONTEUDOS_${CONST}: Record<string, ConteudoSubtema> = {`,
      entradasConteudo.join("\n\n"),
      `};`,
      ``,
    ].join("\n");

    // ---- questões
    const questoes: string[] = [];
    let contador = 1;
    for (const s of lista) {
      const subtemaId = `${s.disciplinaId}--${slugify(s.temaNome)}--${slugify(s.subtemaNome)}`;
      for (const q of s.questoes ?? []) {
        const id = `${disciplinaId}-${String(contador++).padStart(3, "0")}`;
        const alts = q.alternativas
          .map(
            (a) =>
              `      { letra: ${aspas(a.letra)}, texto: ${aspas(a.texto)}, correta: ${a.correta}, comentario: ${aspas(a.comentario)} },`,
          )
          .join("\n");
        questoes.push(
          [
            `  {`,
            `    id: ${aspas(id)},`,
            `    subtemaId: ${aspas(subtemaId)},`,
            `    disciplinaId: ${aspas(disciplinaId)},`,
            `    enunciado: ${aspas(q.enunciado)},`,
            `    alternativas: [`,
            alts,
            `    ],`,
            `    dificuldade: ${aspas(q.dificuldade)},`,
            `    estilo: ${aspas(q.estilo)},`,
            `    tags: [${q.tags.map(aspas).join(", ")}],`,
            q.fonte ? `    fonte: ${aspas(q.fonte)},` : null,
            `  },`,
          ]
            .filter(Boolean)
            .join("\n"),
        );
      }
    }

    const arquivoQuestoes = [
      `import type { Questao } from "@/domain/content/types";`,
      ``,
      `/**`,
      ` * Questões inéditas — ${nomeDisc.toLowerCase()}.`,
      ` * Gerado por scripts/gerar-conteudo.mts. Cada alternativa tem comentário próprio:`,
      ` * a errada explica por que está errada, não repete a justificativa da certa.`,
      ` */`,
      `export const QUESTOES_${CONST}: Questao[] = [`,
      questoes.join("\n"),
      `];`,
      ``,
    ].join("\n");

    // ---- fragmento de taxonomia (pra colar em taxonomy.ts)
    const porTema = new Map<string, SubtemaJson[]>();
    for (const s of lista) porTema.set(s.temaNome, [...(porTema.get(s.temaNome) ?? []), s]);
    const fragmento = [
      `const ${slugify(nomeDisc).replace(/-/g, "")}: Disciplina = {`,
      `  id: ${aspas(disciplinaId)},`,
      `  slug: ${aspas(slugify(nomeDisc))},`,
      `  nome: ${aspas(nomeDisc)},`,
      `  grupo: "Clínica Médica",`,
      `  marca: ${aspas(nomeDisc.slice(0, 3).toUpperCase())},`,
      `  omed: true,`,
      `  temas: [`,
      ...[...porTema].map(([temaNome, subs]) => {
        const lista = subs
          .map((s) => {
            const opts = [
              s.altoRendimento ? `altoRendimento: true` : null,
              s.dificuldade && s.dificuldade !== "intermediaria" ? `dificuldade: ${aspas(s.dificuldade)}` : null,
            ].filter(Boolean);
            return opts.length
              ? `[${aspas(s.subtemaNome)}, { ${opts.join(", ")} }]`
              : aspas(s.subtemaNome);
          })
          .join(", ");
        return `    tema(${aspas(disciplinaId)}, ${aspas(temaNome)}, [${lista}]),`;
      }),
      `  ],`,
      `};`,
      ``,
    ].join("\n");

    if (dry) {
      console.error(`[dry] ${disciplinaId}: ${lista.length} subtemas, ${questoes.length} questões`);
      continue;
    }

    const dirConteudo = join(raizRepo, "src/content/conteudos");
    const dirQuestoes = join(raizRepo, "src/content/questoes");
    const dirFrag = join(raizRepo, ".taxonomia-gerada");
    mkdirSync(dirFrag, { recursive: true });

    writeFileSync(join(dirConteudo, `${disciplinaId}.ts`), arquivoConteudo, "utf8");
    writeFileSync(join(dirQuestoes, `${disciplinaId}.ts`), arquivoQuestoes, "utf8");
    writeFileSync(join(dirFrag, `${disciplinaId}.txt`), fragmento, "utf8");

    console.error(
      `[gerar-conteudo] ${disciplinaId}: ${lista.length} subtemas, ${questoes.length} questões → src/content/{conteudos,questoes}/${disciplinaId}.ts`,
    );
  }

  console.error(`[gerar-conteudo] fragmentos de taxonomia em .taxonomia-gerada/ (colar em taxonomy.ts)`);
  if (existsSync(join(raizRepo, ".taxonomia-gerada"))) {
    console.error(`[gerar-conteudo] lembrar de registrar nos agregadores conteudos.ts / questoes.ts`);
  }
}

main();
