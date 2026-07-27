/**
 * Triagem: mede quanto cada fonte convertida fala de cada disciplina da OMED.
 *
 *   npx tsx scripts/triar-fontes.mts <pasta-md-cache> [--min 15]
 *
 * Roda sobre os .md gerados por `fonte-para-md.mts` e conta ocorrências de termos
 * âncora por disciplina. Serve pra responder "onde está o material de Nefrologia?"
 * sem abrir arquivo nenhum — e pra não gastar leitura em fonte que não tem o tema.
 *
 * A contagem é um sinal de triagem, não uma medida de qualidade: ela diz onde
 * procurar, a leitura do trecho é que confirma se presta.
 */
import { readFileSync, readdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

/** Termos âncora: específicos o bastante pra não dar falso positivo entre disciplinas. */
const DISCIPLINAS: Record<string, string[]> = {
  nefro: ["glomerulonefrite", "síndrome nefrótica", "síndrome nefrítica", "injúria renal aguda", "lesão renal aguda", "doença renal crônica", "nefrolitíase", "hemodiálise", "proteinúria", "clearance de creatinina", "nefropatia diabética", "acidose tubular"],
  hemato: ["anemia ferropriva", "mielograma", "reticulócit", "leucemia", "linfoma", "mieloma", "plaquetopenia", "coagulograma", "hemocomponente", "esferocitose", "talassemia", "mielodisplas"],
  endocrino: ["tireoide", "tireóide", "hipotireoidismo", "hipertireoidismo", "diabetes mellitus", "cetoacidose", "insulina", "cortisol", "adrenal", "paratireoide", "osteoporose", "nódulo tireoidiano"],
  gastro: ["drge", "úlcera péptica", "hepatite", "cirrose", "pancreatite", "doença inflamatória intestinal", "retocolite", "doença de crohn", "varizes esofágicas", "ascite", "helicobacter"],
  onco: ["quimioterapia", "estadiamento", "metástase", "tnm", "neoplasia maligna", "carcinoma", "síndrome paraneoplásica", "lise tumoral", "neutropenia febril", "imunoterapia"],
  otorrino: ["rinossinusite", "otite média", "otite externa", "amigdalite", "vertigem", "vppb", "ménière", "meniere", "epistaxe", "colesteatoma", "hipoacusia", "adenotonsilar"],
  dermato: ["impetigo", "erisipela", "psoríase", "psoriase", "melanoma", "carcinoma basocelular", "dermatite atópica", "micose", "hanseníase", "escabiose", "urticária"],
  reumato: ["artrite reumatoide", "lúpus", "vasculite", "espondilite", "gota", "esclerose sistêmica", "fibromialgia", "sjögren", "sjogren", "fator reumatoide"],
  cardio: ["insuficiência cardíaca", "infarto", "síndrome coronariana", "fibrilação atrial", "valvopatia", "endocardite", "hipertensão arterial", "dislipidemia"],
  pneumo: ["dpoc", "asma", "pneumonia", "tuberculose", "derrame pleural", "tromboembolismo pulmonar", "espirometria", "nódulo pulmonar"],
  neuro: ["avc", "acidente vascular cerebral", "epilepsia", "cefaleia", "parkinson", "demência", "meningite", "esclerose múltipla", "neuropatia periférica"],
  infecto: ["hiv", "sífilis", "dengue", "malária", "leptospirose", "sepse", "antibioticoterapia", "leishmaniose", "hepatite viral"],
  psiq: ["depressão", "transtorno bipolar", "esquizofrenia", "ansiedade", "antidepressivo", "abstinência alcoólica", "surto psicótico"],
  gineco: ["gestação", "pré-natal", "puerpério", "pré-eclâmpsia", "climatério", "sangramento uterino", "colo do útero", "endometriose"],
  pediatria: ["lactente", "aleitamento", "recém-nascido", "puericultura", "calendário vacinal", "bronquiolite", "crescimento e desenvolvimento"],
  cirurgia: ["abdome agudo", "apendicite", "colecistite", "hérnia", "obstrução intestinal", "trauma abdominal", "pós-operatório", "laparotomia"],
  mfc: ["atenção primária", "estratégia saúde da família", "sus", "vigilância epidemiológica", "rastreamento", "medicina de família"],
};

/**
 * Fontes que existem só como conhecimento de fundo — nunca como texto a extrair.
 * Livro didático de editora não está espalhado só em `livros gerais`: há tratado
 * dentro de pasta de matéria (Veronesi em BBPM IV/INFECTO, Abbas em BBPM III/imuno).
 * Por isso o teste combina nome e tamanho — resumo de aula não passa de ~1MB.
 */
const PADROES_LIVRO = [
  /livros? gerais/i,
  /[\\/]livros?[\\/]/i, // pasta "livros" dentro de qualquer módulo
  /(^|[\\/])livro /i, // arquivo nomeado "LIVRO ..."
  /tratado/i,
  /\b\d+\s*[ªa]?\s*ed(i[cç][ãa]o)?\b/i,
  /\b(abbas|robbins|harrison|guyton|cecil|nelson|zugaib|veronesi|goodman|katzung|sabiston|williams|rezende|junqueira|moore|thompson|neves|male)\b/i,
];
const LIMITE_LIVRO_KB = 1500;

const ehLivro = (rel: string, kb: number) =>
  PADROES_LIVRO.some((r) => r.test(rel)) || kb > LIMITE_LIVRO_KB;

function listarMd(dir: string): string[] {
  const achados: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const cheio = join(dir, e.name);
    if (e.isDirectory()) achados.push(...listarMd(cheio));
    else if (e.name.endsWith(".md") && !e.name.startsWith("_manifest")) achados.push(cheio);
  }
  return achados;
}

function main() {
  const args = process.argv.slice(2);
  const raiz = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
  const min = Number(args[args.indexOf("--min") + 1]) || 15;

  const arquivos = listarMd(raiz);
  type Linha = { arquivo: string; bloqueada: boolean; kb: number; contagens: Record<string, number> };
  const linhas: Linha[] = [];

  for (const arq of arquivos) {
    const rel = relative(raiz, arq).split(sep).join("/");
    const texto = readFileSync(arq, "utf8").toLowerCase();
    const contagens: Record<string, number> = {};

    for (const [disc, termos] of Object.entries(DISCIPLINAS)) {
      let n = 0;
      for (const t of termos) {
        // split é mais rápido que regex global em arquivo grande
        n += texto.split(t.toLowerCase()).length - 1;
      }
      if (n) contagens[disc] = n;
    }

    const kb = Math.round(statSync(arq).size / 1024);
    linhas.push({ arquivo: rel, bloqueada: ehLivro(rel, kb), kb, contagens });
  }

  // ---- por disciplina: onde está o material
  const relatorio: string[] = ["# Triagem de fontes por disciplina", ""];
  relatorio.push(
    `${arquivos.length} arquivos markdown analisados em \`${raiz.split(sep).join("/")}\`.`,
    `Corte mínimo: ${min} ocorrências. Arquivos marcados 🚫 são livros de terceiros —`,
    `servem como conhecimento de fundo, nunca como texto a extrair/republicar.`,
    "",
  );

  const bloqueadas = linhas.filter((l) => l.bloqueada);
  if (bloqueadas.length) {
    relatorio.push(
      `> [!warning] ${bloqueadas.length} arquivo(s) identificados como livro de terceiro`,
      "> Ficam de fora de qualquer extração de texto. Listados ao final.",
      "",
    );
  }

  for (const disc of Object.keys(DISCIPLINAS)) {
    const ranking = linhas
      .filter((l) => !l.bloqueada && (l.contagens[disc] ?? 0) >= min)
      .sort((a, b) => (b.contagens[disc] ?? 0) - (a.contagens[disc] ?? 0))
      .slice(0, 8);

    relatorio.push(`## ${disc}`, "");
    if (!ranking.length) {
      relatorio.push("_Nenhuma fonte acima do corte._", "");
      continue;
    }
    relatorio.push("| Ocorrências | Arquivo | KB |", "|---:|---|---:|");
    for (const l of ranking) {
      relatorio.push(`| ${l.contagens[disc]} | ${l.bloqueada ? "🚫 " : ""}${l.arquivo} | ${l.kb} |`);
    }
    relatorio.push("");
  }

  // ---- por arquivo: qual é a "vocação" de cada fonte
  relatorio.push("---", "", "## Vocação de cada arquivo (3 disciplinas mais fortes)", "");
  relatorio.push("| Arquivo | KB | Top disciplinas |", "|---|---:|---|");
  for (const l of linhas.filter((x) => !x.bloqueada).sort((a, b) => b.kb - a.kb)) {
    const top = Object.entries(l.contagens)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .filter(([, n]) => n >= min)
      .map(([d, n]) => `${d}(${n})`)
      .join(" · ");
    if (!top) continue;
    relatorio.push(`| ${l.arquivo} | ${l.kb} | ${top} |`);
  }

  relatorio.push("", "---", "", "## 🚫 Livros de terceiros — conhecimento de fundo apenas", "");
  relatorio.push("| Arquivo | KB |", "|---|---:|");
  for (const l of bloqueadas.sort((a, b) => b.kb - a.kb)) {
    relatorio.push(`| ${l.arquivo} | ${l.kb} |`);
  }

  const destino = join(raiz, "_triagem.md");
  writeFileSync(destino, `${relatorio.join("\n")}\n`, "utf8");
  writeFileSync(join(raiz, "_triagem.json"), JSON.stringify(linhas, null, 2), "utf8");
  console.error(`[triar-fontes] ${arquivos.length} arquivos → ${destino}`);
}

main();
