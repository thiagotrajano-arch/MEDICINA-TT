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
  return <div className="product-page"><header className="product-hero"><p className="legacy-eyebrow">Síntese visual</p><h1 className="mt-3 flex items-center gap-2 text-3xl font-black sm:text-5xl"><Network className="size-7 text-accent" /> Mapas mentais</h1><p className="mt-4 max-w-3xl text-[15px] leading-7">Mapas individuais derivados dos resumos publicados e ordenados pela prioridade OMED. Use os filtros para revisar um eixo por vez.</p><div className="legacy-statline"><span>{mapas.length} mapas</span><span>Conceito central</span><span>Relações nomeadas</span></div></header><MapasMentaisClient mapas={mapas} /></div>;
}
