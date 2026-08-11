import type { Disciplina, Subtema } from "@/domain/content/types";

export interface EstudoLink {
  href: string;
  subtemaId: string;
  subtemaNome: string;
  disciplinaId: string;
  disciplinaNome: string;
  fallback: boolean;
}

const ALIASES_DISCIPLINA: Record<string, string[]> = {
  cardio: ["cardiologia", "cardio"],
  pneumo: ["pneumologia", "pneumo"],
  neuro: ["neurologia", "neuro"],
  psiq: ["psiquiatria", "psiquiatria"],
  infecto: ["infectologia", "infecto"],
  go: ["ginecologia", "obstetricia", "gine", "obst"],
  gine: ["ginecologia", "gine"],
  obst: ["obstetricia", "obst"],
  pedi: ["pediatria", "pedi"],
  cir: ["cirurgia", "cir"],
  mfc: ["medicina de familia", "medicina geral", "mfc", "saude coletiva"],
  aps: ["medicina de familia", "medicina geral", "mfc", "saude coletiva"],
  nefro: ["nefrologia", "nefro"],
  gastro: ["gastroenterologia", "gastro"],
  hemato: ["hematologia", "hemato"],
  onco: ["oncologia", "onco"],
  endo: ["endocrinologia", "endo"],
  derma: ["dermatologia", "derma"],
  reuma: ["reumatologia", "reuma"],
  otorrino: ["otorrinolaringologia", "otorrino"],
  urgencia: ["urgencia", "emergencia"],
  emergencia: ["urgencia", "emergencia"],
};

const normalizar = (valor: string) => valor
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("pt-BR")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const tokens = (valor: string) => normalizar(valor).split(/\s+/).filter((token) => token.length >= 3);

function pontuarDisciplina(disciplina: Disciplina, consulta: string): number {
  const alvo = normalizar(`${disciplina.id} ${disciplina.slug} ${disciplina.nome}`);
  let pontos = 0;
  if (consulta.includes(alvo) || alvo.includes(consulta)) pontos += 100;
  const consultaTokens = new Set(tokens(consulta));
  for (const token of tokens(alvo)) if (consultaTokens.has(token)) pontos += 12;
  for (const [chave, aliases] of Object.entries(ALIASES_DISCIPLINA)) {
    if (!consulta.includes(chave)) continue;
    if (aliases.some((alias) => alvo.includes(normalizar(alias)))) pontos += 80;
  }
  return pontos;
}

function pontuarSubtema(subtema: Subtema, consulta: string): number {
  const alvo = normalizar(subtema.nome);
  const consultaNormalizada = normalizar(consulta);
  if (!subtema.temConteudo) return -1000;
  let pontos = subtema.altoRendimento ? 3 : 0;
  if (consultaNormalizada.includes(alvo) || alvo.includes(consultaNormalizada)) pontos += 100;
  const consultaTokens = new Set(tokens(consultaNormalizada));
  for (const token of tokens(alvo)) if (consultaTokens.has(token)) pontos += 10;
  return pontos;
}

/**
 * Resolve uma pendência privada para o melhor resumo público disponível.
 * A busca é somente na taxonomia publicada; nenhum texto privado é incluído
 * no bundle. Quando o subtema ainda não tem resumo, cai para o primeiro
 * resumo de alto rendimento da disciplina e marca o resultado como fallback.
 */
export function resolverResumoEstudo({
  disciplinas,
  disciplinaId = "",
  tema = "",
  subtema = "",
  titulo = "",
  recursoId = "",
}: {
  disciplinas: Disciplina[];
  disciplinaId?: string;
  tema?: string;
  subtema?: string;
  titulo?: string;
  recursoId?: string;
}): EstudoLink | null {
  if (!disciplinas.length) return null;
  const consultaDisciplina = `${disciplinaId} ${tema} ${subtema} ${titulo}`;
  const disciplina = [...disciplinas]
    .map((item) => ({ item, pontos: pontuarDisciplina(item, consultaDisciplina) }))
    .sort((a, b) => b.pontos - a.pontos || a.item.nome.localeCompare(b.item.nome, "pt-BR"))[0];
  if (!disciplina || disciplina.pontos <= 0) return null;

  const consulta = `${tema} ${subtema} ${titulo} ${recursoId}`;
  const subtemas = disciplina.item.temas.flatMap((item) => item.subtemas);
  const ranqueados = subtemas
    .map((item) => ({ item, pontos: pontuarSubtema(item, consulta) }))
    .filter((item) => item.pontos >= 0)
    .sort((a, b) => b.pontos - a.pontos || Number(Boolean(b.item.altoRendimento)) - Number(Boolean(a.item.altoRendimento)) || a.item.nome.localeCompare(b.item.nome, "pt-BR"));
  const escolhido = ranqueados[0];
  if (!escolhido) return null;
  return {
    href: `/estudar/${encodeURIComponent(escolhido.item.id)}`,
    subtemaId: escolhido.item.id,
    subtemaNome: escolhido.item.nome,
    disciplinaId: disciplina.item.id,
    disciplinaNome: disciplina.item.nome,
    fallback: escolhido.pontos < 10,
  };
}
