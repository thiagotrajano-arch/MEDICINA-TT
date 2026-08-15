"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { atualizarProgressoConteudo, lerProgressoConteudo } from "@/lib/progresso-conteudo";
import { idSecaoResumo } from "@/domain/content/resumo-padrao";

type Secao = { secao: string };

export function ResumoLeituraClient({ subtemaId, secoes }: { subtemaId: string; secoes: Secao[] }) {
  const [concluidas, setConcluidas] = useState<Record<string, boolean>>(() => {
    const estado = Object.fromEntries(secoes.map(({ secao }) => {
      const item = lerProgressoConteudo("resumo", idSecaoResumo(subtemaId, secao));
      return [secao, Boolean(item?.concluido)];
    }));
    return estado;
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const estado = Object.fromEntries(secoes.map(({ secao }) => {
        const item = lerProgressoConteudo("resumo", idSecaoResumo(subtemaId, secao));
        return [secao, Boolean(item?.concluido)];
      }));
      setConcluidas(estado);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [secoes, subtemaId]);

  const total = secoes.length;
  const lidas = useMemo(() => Object.values(concluidas).filter(Boolean).length, [concluidas]);
  const percentual = total ? Math.round((lidas / total) * 100) : 0;

  function alternar(secao: string) {
    const itemId = idSecaoResumo(subtemaId, secao);
    const proximo = !concluidas[secao];
    atualizarProgressoConteudo("resumo", itemId, { concluido: proximo });
    setConcluidas((atual) => ({ ...atual, [secao]: proximo }));
  }

  return (
    <aside className="mt-5 rounded-2xl border border-border bg-surface-2 p-4" aria-label="Leitura progressiva do resumo">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Leitura progressiva</p>
          <p className="mt-1 text-xs text-text-muted">Marque cada eixo após explicar o conceito sem consultar.</p>
        </div>
        <span className="text-sm font-bold text-text">{lidas}/{total}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentual} aria-label={`Leitura ${percentual}% concluída`}>
        <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${percentual}%` }} />
      </div>
      <nav className="mt-3 grid gap-1 sm:grid-cols-2" aria-label="Índice do resumo">
        {secoes.map(({ secao }) => {
          const concluida = Boolean(concluidas[secao]);
          return (
            <button key={secao} type="button" onClick={() => { alternar(secao); document.getElementById(idSecaoResumo(subtemaId, secao))?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-text-muted hover:bg-surface hover:text-text">
              {concluida ? <CheckCircle2 className="size-4 shrink-0 text-accent" /> : <Circle className="size-4 shrink-0 text-text-faint" />}
              <span className={concluida ? "line-through opacity-70" : ""}>{secao}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
