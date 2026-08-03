"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileUp, RefreshCw } from "lucide-react";
import {
  lerProgressoAnki,
  observarProgressoAnki,
  resumirProgressoAnki,
  salvarProgressoAnki,
  type AnkiProgressSnapshot,
} from "@/lib/progresso-anki";

export function AnkiProgressImport() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [snapshot, setSnapshot] = useState<AnkiProgressSnapshot | null>(null);
  const [mensagem, setMensagem] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    setSnapshot(lerProgressoAnki());
    return observarProgressoAnki(setSnapshot);
  }, []);

  const resumo = resumirProgressoAnki(snapshot);
  const importar = async (file: File) => {
    setMensagem("");
    setErro("");
    try {
      const conteudo = JSON.parse(await file.text()) as unknown;
      salvarProgressoAnki(conteudo);
      setMensagem("Progresso do Anki atualizado neste dispositivo.");
    } catch (reason) {
      setErro(reason instanceof Error ? reason.message : "Não foi possível ler esse relatório.");
    }
  };

  return (
    <section className="mt-7 rounded-2xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow)" }} aria-labelledby="anki-progress-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="anki-progress-title" className="flex items-center gap-2 text-sm font-bold text-text">
            <RefreshCw className="size-4 text-accent" /> Progresso do Anki
          </h2>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-text-faint">
            Exporte um relatório local no Anki e importe-o aqui. Nenhum cartão ou arquivo privado sai do seu computador.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-bg px-3 py-2 text-xs font-semibold text-text transition-colors hover:border-accent hover:text-accent"
        >
          <FileUp className="size-3.5" /> Importar relatório
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void importar(file);
            event.target.value = "";
          }}
        />
      </div>

      {resumo ? (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Resumo do Anki importado">
          <Metric label="Decks" value={resumo.decks.toLocaleString("pt-BR")} />
          <Metric label="Cartões" value={resumo.cards.toLocaleString("pt-BR")} />
          <Metric label="Para revisar" value={resumo.due.toLocaleString("pt-BR")} />
          <Metric label="Revisados hoje" value={resumo.reviewToday.toLocaleString("pt-BR")} />
        </div>
      ) : (
        <p className="mt-4 rounded-lg bg-surface-2 px-3 py-2 text-xs text-text-muted">Ainda não há relatório importado.</p>
      )}

      {snapshot && <p className="mt-3 text-[11px] text-text-faint">Última leitura: {new Date(snapshot.generatedAt).toLocaleString("pt-BR")}</p>}
      {mensagem && <p className="mt-2 flex items-center gap-1.5 text-xs text-accent"><CheckCircle2 className="size-3.5" /> {mensagem}</p>}
      {erro && <p className="mt-2 text-xs text-danger" role="alert">{erro}</p>}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-border bg-bg px-3 py-2"><div className="text-lg font-bold tabular-nums text-text">{value}</div><div className="text-[11px] text-text-faint">{label}</div></div>;
}
