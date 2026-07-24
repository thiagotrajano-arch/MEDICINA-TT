import type { ConteudoSubtema, Questao } from "@/domain/content/types";
import cirurgiaRaw from "./raw/omed-cirurgia.json";
import mfcRaw from "./raw/omed-mfc.json";

type TemaLegado = {
  tema_num: number;
  titulo: string;
  html_content: string;
};

type QuestaoLegada = {
  tema_num: number;
  dif: string;
  enun: string;
  alts: string[];
  correta: number;
  coment: string;
  fonte?: string;
};

type AcervoLegado = {
  new_temas: TemaLegado[];
  questions: QuestaoLegada[];
};

const CIR_SUBTEMAS: Record<number, string> = {
  1: "cir--abdome-agudo--colecistite-e-colangite",
  2: "cir--cirurgia-vascular--daop-tvp-e-aneurisma-de-aorta",
  3: "cir--trauma--atls-atendimento-inicial",
  4: "cir--hernias-da-parede-abdominal--inguinal-femoral-incisional",
  5: "cir--urologia-cirurgica--litiase-hpb-e-emergencias-escrotais",
  6: "cir--pre-e-pos-operatorio--avaliacao-de-risco-cirurgico",
  7: "cir--abdome-agudo--coloproctologia-e-abdome-agudo-inflamatorio",
  8: "cir--oncologia-do-tgi-alto--esofago-e-estomago",
  9: "cir--ortopedia-de-urgencia--epifisiolise-e-embolia-gordurosa",
  10: "cir--abdome-agudo--abordagem-do-abdome-agudo",
};

const MFC_SUBTEMAS: Record<number, string> = {
  1: "mfc--epidemiologia--tipos-de-estudo",
  2: "mfc--epidemiologia--medidas-de-associacao",
  3: "mfc--epidemiologia--testes-diagnosticos-sensibilidade-e-especificidade",
  4: "mfc--epidemiologia--vieses-e-causalidade",
  5: "mfc--epidemiologia--meta-analise-e-mbe",
  6: "mfc--atencao-primaria-a-saude--principios-da-aps",
  7: "mfc--abordagem-familiar--genograma-ciclo-de-vida-e-crises-familiares",
  8: "mfc--prevencao--niveis-de-prevencao",
  9: "mfc--epidemiologia--indicadores-de-morbidade",
  10: "mfc--saude-publica--sus-principios-e-diretrizes",
};

const ENTITY: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  rarr: "→",
  le: "≤",
  ge: "≥",
  times: "×",
};

function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, code: string) => {
    if (code.startsWith("#x")) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return ENTITY[code.toLowerCase()] ?? `&${code};`;
  });
}

function tableToMarkdown(html: string): string {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
    [...row[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) =>
      inlineHtmlToMarkdown(cell[1]).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim()
    )
  );
  if (!rows.length) return "";
  const width = Math.max(...rows.map((row) => row.length));
  const normalized = rows.map((row) => [...row, ...Array(width - row.length).fill("")]);
  return [
    `| ${normalized[0].join(" | ")} |`,
    `| ${Array(width).fill("---").join(" | ")} |`,
    ...normalized.slice(1).map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function inlineHtmlToMarkdown(value: string): string {
  return decodeEntities(value)
    .replace(/<(b|strong)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(i|em)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function htmlToMarkdown(value: string): string {
  let markdown = value;
  markdown = markdown.replace(/<table[^>]*>[\s\S]*?<\/table>/gi, (table) => `\n${tableToMarkdown(table)}\n`);
  markdown = markdown.replace(
    /<div[^>]*class=["'][^"']*box[^"']*["'][^>]*>\s*<span[^>]*class=["']bt["'][^>]*>([\s\S]*?)<\/span>([\s\S]*?)<\/div>/gi,
    (_, title: string, body: string) => `\n**${inlineHtmlToMarkdown(title)}:** ${htmlToMarkdown(body).trim()}\n`
  );
  markdown = markdown.replace(
    /<div[^>]*class=["']flow["'][^>]*>([\s\S]*?)<\/div>/gi,
    (_, body: string) => `\n${htmlToMarkdown(body)}\n`
  );
  markdown = markdown.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item: string) => `\n- ${inlineHtmlToMarkdown(item)}`);
  markdown = markdown.replace(/<\/?(?:ul|ol)[^>]*>/gi, "\n");
  markdown = markdown.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, body: string) => `\n${inlineHtmlToMarkdown(body)}\n`);
  markdown = markdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, body: string) => `\n${inlineHtmlToMarkdown(body)}\n`);
  markdown = inlineHtmlToMarkdown(markdown);
  return markdown.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function blocosDoHtml(html: string): ConteudoSubtema["blocos"] {
  const heading = /<h2[^>]*class=["']sec["'][^>]*>\s*<span[^>]*class=["']n["'][^>]*>[\s\S]*?<\/span>\s*([\s\S]*?)<\/h2>/gi;
  const matches = [...html.matchAll(heading)];
  if (!matches.length) return [{ secao: "Resumo", corpo: htmlToMarkdown(html) }];

  const blocos: ConteudoSubtema["blocos"] = [];
  const introducao = htmlToMarkdown(html.slice(0, matches[0].index));
  if (introducao) blocos.push({ secao: "Visão geral", corpo: introducao });

  matches.forEach((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? html.length;
    blocos.push({
      secao: inlineHtmlToMarkdown(match[1]),
      corpo: htmlToMarkdown(html.slice(start, end)),
    });
  });
  return blocos.filter((bloco) => bloco.corpo.length > 0);
}

function conteudos(
  acervo: AcervoLegado,
  mapa: Record<number, string>,
  disciplina: "Cirurgia" | "MFC"
): Record<string, ConteudoSubtema> {
  return Object.fromEntries(
    acervo.new_temas.map((tema) => {
      const subtemaId = mapa[tema.tema_num];
      return [
        subtemaId,
        {
          subtemaId,
          titulo: tema.titulo,
          atualizadoEm: "2026-07-21",
          origem: "complemento_ia",
          blocos: blocosDoHtml(tema.html_content),
          referencias: [
            `Material do usuário — Resumo Absoluto OMED VI (${disciplina})`,
            "Conteúdo estruturado a partir do acervo local do projeto e conferido antes da publicação",
          ],
        } satisfies ConteudoSubtema,
      ];
    })
  );
}

function questoes(
  acervo: AcervoLegado,
  mapa: Record<number, string>,
  disciplinaId: "cir" | "mfc"
): Questao[] {
  return acervo.questions.map((questao, index) => ({
    id: `${disciplinaId}-omed-arquivo-${String(index + 1).padStart(3, "0")}`,
    subtemaId: mapa[questao.tema_num],
    disciplinaId,
    enunciado: questao.enun,
    alternativas: questao.alts.map((texto, alternativaIndex) => ({
      letra: String.fromCharCode(65 + alternativaIndex),
      texto,
      correta: alternativaIndex === questao.correta,
      comentario:
        alternativaIndex === questao.correta
          ? questao.coment
          : `Esta alternativa não é a melhor resposta. ${questao.coment}`,
    })),
    dificuldade:
      questao.dif.toLowerCase().startsWith("f")
        ? "fixacao"
        : questao.dif.toLowerCase().startsWith("d")
          ? "avancada"
          : "intermediaria",
    estilo: "omed",
    tags: [disciplinaId === "cir" ? "cirurgia" : "MFC", "OMED", "acervo recuperado"],
    fonte: questao.fonte ?? `Resumo Absoluto OMED VI — ${disciplinaId.toUpperCase()}`,
  }));
}

const cirurgia = cirurgiaRaw as AcervoLegado;
const mfc = mfcRaw as AcervoLegado;

export const CONTEUDOS_OMED_EXTRAIDOS: Record<string, ConteudoSubtema> = {
  ...conteudos(cirurgia, CIR_SUBTEMAS, "Cirurgia"),
  ...conteudos(mfc, MFC_SUBTEMAS, "MFC"),
};

// Ancora figuras do registry (src/components/figuras/registry.tsx) nos blocos
// gerados a partir do HTML legado — os "secao" abaixo vêm direto do
// html_content em src/content/raw/omed-cirurgia.json, não são literais aqui.
function ancoraFigura(subtemaId: string, secao: string, figura: string | string[]): void {
  const bloco = CONTEUDOS_OMED_EXTRAIDOS[subtemaId]?.blocos.find((b) => b.secao === secao);
  if (bloco) bloco.figura = figura;
}
ancoraFigura(
  "cir--abdome-agudo--coloproctologia-e-abdome-agudo-inflamatorio",
  "Diagnóstico",
  ["cir-apendicite-tc-real", "cir-volvo-sigmoide-rx-real"]
);
ancoraFigura(
  "cir--abdome-agudo--abordagem-do-abdome-agudo",
  "Diagnóstico",
  ["cir-obstrucao-intestinal-real", "cir-pneumoperitonio-rx-real", "cir-isquemia-mesenterica-tc-real"]
);

export const QUESTOES_OMED_EXTRAIDAS: Questao[] = [
  ...questoes(cirurgia, CIR_SUBTEMAS, "cir"),
  ...questoes(mfc, MFC_SUBTEMAS, "mfc"),
];
