import { Network } from "lucide-react";
import { CONTEUDOS } from "@/content/conteudos";
import { getContentRepository } from "@/infra/content";
import { MapasMentaisClient } from "@/components/mapas/MapasMentaisClient";

export const metadata = { title: "Mapas mentais · Codex Medicus" };
const ORDEM_OMED = ["inf", "cardio", "neuro", "pneumo", "go", "ped", "cir", "mfc", "nefro", "gastro", "endo", "hemato", "onco", "reumato", "derma", "otorrino"];

export default async function MapasMentaisPage() {
  const repo = await getContentRepository();
  const disciplinas = await repo.getDisciplinas();
  const mapas = disciplinas.flatMap((disciplina) => disciplina.temas.flatMap((tema) => tema.subtemas.map((subtema) => ({ disciplina, tema, subtema })))).filter(({ subtema }) => subtema.temConteudo && CONTEUDOS[subtema.id]).sort((a, b) => { const alto = Number(Boolean(b.subtema.altoRendimento)) - Number(Boolean(a.subtema.altoRendimento)); if (alto) return alto; const rank = (id: string) => { const value = ORDEM_OMED.indexOf(id); return value < 0 ? 99 : value; }; return rank(a.disciplina.id) - rank(b.disciplina.id) || a.subtema.nome.localeCompare(b.subtema.nome, "pt-BR"); }).slice(0, 60).map(({ disciplina, tema, subtema }, index) => ({ index: index + 1, disciplina: { id: disciplina.id, nome: disciplina.nome }, tema: { nome: tema.nome }, subtema: { id: subtema.id, nome: subtema.nome, altoRendimento: subtema.altoRendimento }, blocos: CONTEUDOS[subtema.id].blocos.map((bloco) => bloco.secao).filter(Boolean).slice(0, 6) }))
  return <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10"><h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-text"><Network className="size-6 text-accent" /> Mapas mentais</h1><p className="mt-1.5 max-w-3xl text-[15px] text-text-muted">Mapas individuais derivados dos resumos publicados e ordenados pela prioridade OMED. Use os filtros para revisar um eixo por vez.</p><div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-text-muted"><span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent">{mapas.length} mapas</span><span>Conceito central → ramos-chave → estudo completo</span></div><MapasMentaisClient mapas={mapas} /></div>;
}
