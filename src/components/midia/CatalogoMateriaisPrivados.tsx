"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpenCheck, FileLock2, Search } from "lucide-react";
import { carregarMateriaisPrivados, type MaterialPrivado } from "@/lib/materiais-privados";

const ROTULO_ESTADO: Record<MaterialPrivado["estado"], string> = {
  inventariado: "Inventariado",
  lido: "Lido",
  catalogado: "Catalogado",
  validacao: "Em validacao",
  integrado: "Integrado",
  bloqueado: "Bloqueado",
};

export function CatalogoMateriaisPrivados() {
  const [itens, setItens] = useState<MaterialPrivado[]>([]);
  const [busca, setBusca] = useState("");
  const [disciplina, setDisciplina] = useState("todas");
  const [limite, setLimite] = useState(12);
  const [mensagem, setMensagem] = useState("Carregando catalogo privado...");

  useEffect(() => {
    let ativo = true;
    void carregarMateriaisPrivados()
      .then((dados) => {
        if (!ativo) return;
        setItens(dados);
        setMensagem(dados.length ? "" : "Nenhum material processado foi catalogado nesta conta ainda.");
      })
      .catch((erro) => {
        if (ativo) setMensagem(erro instanceof Error ? erro.message : "Nao foi possivel carregar o catalogo.");
      });
    return () => { ativo = false; };
  }, []);

  const disciplinas = useMemo(
    () => [...new Set(itens.map((item) => item.disciplina).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    [itens],
  );
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return itens.filter((item) => {
      if (disciplina !== "todas" && item.disciplina !== disciplina) return false;
      if (!termo) return true;
      return [item.titulo, item.disciplina, item.tema, item.subtema, item.fonte, item.observacao]
        .join(" ").toLocaleLowerCase("pt-BR").includes(termo);
    });
  }, [busca, disciplina, itens]);
  const visiveis = filtrados.slice(0, limite);

  return <section className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6">
    <div className="flex items-start gap-3">
      <span className="rounded-xl bg-surface-2 p-2.5 text-accent"><FileLock2 className="size-5" /></span>
      <div>
        <h2 className="text-lg font-bold text-text">Materiais privados processados</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-text-muted">Indice autenticado de PDFs, DOCX e caches analisados. O catalogo mostra proveniencia e estado sem colocar o arquivo bruto no repositorio publico.</p>
      </div>
    </div>
    {itens.length > 0 && <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_220px]">
      <label className="relative block"><Search className="pointer-events-none absolute left-3 top-3 size-4 text-text-muted" /><span className="sr-only">Buscar materiais</span><input value={busca} onChange={(evento) => { setBusca(evento.target.value); setLimite(12); }} placeholder="Buscar fonte, tema ou subtema" className="w-full rounded-lg border border-border bg-bg py-2.5 pl-10 pr-3 text-sm text-text outline-none focus:border-accent" /></label>
      <label><span className="sr-only">Filtrar por disciplina</span><select value={disciplina} onChange={(evento) => { setDisciplina(evento.target.value); setLimite(12); }} className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"><option value="todas">Todas as disciplinas</option>{disciplinas.map((nome) => <option key={nome} value={nome}>{nome}</option>)}</select></label>
    </div>}
    {mensagem && <p className="mt-5 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">{mensagem}</p>}
    {itens.length > 0 && !filtrados.length && <p className="mt-5 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">Nenhum material corresponde ao filtro atual.</p>}
    {filtrados.length > 0 && <div className="mt-5 grid gap-3 md:grid-cols-2">{visiveis.map((item) => <article key={item.id} className="rounded-xl border border-border bg-surface-2 p-4">
      <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-wide text-accent">{item.tipoArquivo} · {item.origem} · prioridade {item.prioridade}</p><h3 className="mt-1 font-bold text-text">{item.titulo}</h3></div><span className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-text-muted">{ROTULO_ESTADO[item.estado]}</span></div>
      <p className="mt-2 text-xs leading-5 text-text-muted">{[item.disciplina, item.tema, item.subtema, item.semestre ? `${item.semestre}o periodo` : ""].filter(Boolean).join(" · ") || "Classificacao pendente"}</p>
      {item.fonte && <p className="mt-2 break-words text-xs leading-5 text-text-muted"><span className="font-semibold text-text">Proveniencia:</span> {item.fonte}</p>}
      {item.observacao && <p className="mt-2 text-xs leading-5 text-text-muted">{item.observacao}</p>}
      <p className="mt-2 text-[10px] uppercase tracking-wide text-text-muted">{[item.paginas ? `${item.paginas} paginas` : "", formatarBytes(item.tamanhoBytes), `Atualizado ${formatarData(item.atualizadoEm)}`].filter(Boolean).join(" · ")}</p>
      <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase text-text-muted"><BookOpenCheck className="size-3.5 text-accent" />Destino: {item.destino.replaceAll("_", " ")}{item.hashSha256 ? " · hash confirmado" : ""}</div>
    </article>)}</div>}
    {filtrados.length > 12 && <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => setLimite((atual) => Math.min(atual + 24, filtrados.length))} disabled={limite >= filtrados.length} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text-muted disabled:opacity-50">Mostrar mais ({Math.min(limite, filtrados.length)} de {filtrados.length})</button>{limite > 12 && <button type="button" onClick={() => setLimite(12)} className="rounded-lg px-3 py-2 text-xs font-semibold text-accent">Recolher catalogo</button>}</div>}
  </section>;
}

function formatarBytes(valor: number | null): string {
  if (valor === null) return "";
  if (valor < 1024) return `${valor} B`;
  if (valor < 1024 ** 2) return `${(valor / 1024).toFixed(1)} KB`;
  if (valor < 1024 ** 3) return `${(valor / 1024 ** 2).toFixed(1)} MB`;
  return `${(valor / 1024 ** 3).toFixed(1)} GB`;
}

function formatarData(valor: string): string {
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? "sem data" : data.toLocaleDateString("pt-BR");
}
