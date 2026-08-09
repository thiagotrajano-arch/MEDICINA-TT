"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FileLock2, Link2, LoaderCircle, Search, Unlink } from "lucide-react";
import { carregarMateriaisPrivados, type MaterialPrivado } from "@/lib/materiais-privados";
import { carregarVinculosMateriaisSemana, desvincularMaterialDaSemana, vincularMaterialNaSemana, type VinculoMaterialSemana } from "@/lib/semana-materiais";

type Props = { semanaId: string };

export function MateriaisDaSemanaPanel({ semanaId }: Props) {
  const [materiais, setMateriais] = useState<MaterialPrivado[]>([]);
  const [vinculos, setVinculos] = useState<VinculoMaterialSemana[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;
    void Promise.resolve().then(async () => {
      if (!ativo) return;
      setCarregando(true);
      try {
        const [catalogo, associados] = await Promise.all([carregarMateriaisPrivados(), carregarVinculosMateriaisSemana(semanaId)]);
        if (!ativo) return;
        setMateriais(catalogo);
        setVinculos(associados.vinculos);
        setMensagem(catalogo.length ? "" : "Nenhum material privado foi catalogado ainda.");
      } catch (erro) {
        if (ativo) setMensagem(erro instanceof Error ? erro.message : "Entre na sua conta para relacionar materiais privados.");
      } finally {
        if (ativo) setCarregando(false);
      }
    });
    return () => { ativo = false; };
  }, [semanaId]);

  const associados = useMemo(() => new Set(vinculos.map((item) => item.materialId)), [vinculos]);
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return materiais.filter((item) => !termo || [item.titulo, item.disciplina, item.tema, item.subtema].join(" ").toLocaleLowerCase("pt-BR").includes(termo)).slice(0, 8);
  }, [busca, materiais]);

  const alternar = async (material: MaterialPrivado) => {
    setOcupado(material.id);
    setMensagem("");
    try {
      const vinculo = vinculos.find((item) => item.materialId === material.id);
      if (vinculo) await desvincularMaterialDaSemana(semanaId, vinculo);
      else await vincularMaterialNaSemana(semanaId, material);
      const atualizados = await carregarVinculosMateriaisSemana(semanaId);
      setVinculos(atualizados.vinculos);
      setMensagem(vinculo ? "Material retirado da semana." : "Material relacionado ao foco da semana.");
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel atualizar o vinculo.");
    } finally {
      setOcupado("");
    }
  };

  return <section className="mt-5 rounded-xl border border-border bg-surface-2 p-4" aria-labelledby="titulo-materiais-semana">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-2.5"><span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent"><FileLock2 className="size-4" /></span><div><h3 id="titulo-materiais-semana" className="text-sm font-bold text-text">Materiais privados desta semana</h3><p className="mt-1 max-w-2xl text-xs leading-5 text-text-muted">Relacione o material recebido ao foco atual sem publicar PDF, DOCX ou texto comercial.</p></div></div>
      <Link href="/minha-midia" className="text-xs font-semibold text-accent hover:underline">Abrir Minha mídia</Link>
    </div>
    {carregando && <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-surface p-3 text-xs text-text-muted" role="status"><LoaderCircle className="size-4 animate-spin text-accent" />Carregando catálogo privado…</div>}
    {!carregando && materiais.length > 0 && <label className="relative mt-4 block"><Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-text-faint" /><span className="sr-only">Buscar materiais da semana</span><input value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Buscar por título, disciplina ou tema" className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-xs text-text outline-none focus:border-accent" /></label>}
    {mensagem && <p className="mt-3 rounded-lg border border-border bg-surface p-3 text-xs leading-5 text-text-muted" role="status">{mensagem}</p>}
    {!carregando && filtrados.length > 0 && <ul className="mt-3 space-y-2">{filtrados.map((material) => {
      const ligado = associados.has(material.id);
      const emAcao = ocupado === material.id;
      return <li key={material.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3"><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-text">{material.titulo}</p><p className="mt-0.5 truncate text-[11px] text-text-faint">{[material.disciplina, material.tema, material.subtema].filter(Boolean).join(" · ") || "Classificação pendente"}</p></div><button type="button" disabled={Boolean(ocupado)} onClick={() => void alternar(material)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[11px] font-semibold transition-colors disabled:opacity-60 ${ligado ? "border-accent bg-accent-soft text-accent" : "border-border text-text-muted hover:border-accent hover:text-accent"}`}>{emAcao ? <LoaderCircle className="size-3.5 animate-spin" /> : ligado ? <Unlink className="size-3.5" /> : <Link2 className="size-3.5" />}{ligado ? "Desvincular" : "Vincular"}</button></li>;
    })}</ul>}
    {!carregando && materiais.length > 8 && <p className="mt-3 text-[11px] text-text-faint">Mostrando 8 materiais. Para filtros e acervo completo, use Minha mídia.</p>}
  </section>;
}
