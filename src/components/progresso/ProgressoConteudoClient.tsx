"use client";

import { useEffect, useState } from "react";
import { BookMarked, CheckCircle2, StickyNote } from "lucide-react";
import {
  atualizarProgressoConteudo,
  observarProgressoConteudo,
  registrarAcessoConteudo,
  type ProgressoConteudo,
  type TipoConteudoProgresso,
} from "@/lib/progresso-conteudo";
import { cn } from "@/lib/cn";

export function ProgressoConteudoClient({
  tipo,
  itemId,
}: {
  tipo: TipoConteudoProgresso;
  itemId: string;
}) {
  const [progresso, setProgresso] = useState<ProgressoConteudo | null>(null);
  const [anotacao, setAnotacao] = useState("");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const parar = observarProgressoConteudo((item) => {
      if (item.tipo === tipo && item.itemId === itemId) {
        setProgresso(item);
        setAnotacao(item.anotacao);
        setCarregado(true);
      }
    });
    registrarAcessoConteudo(tipo, itemId);
    return parar;
  }, [tipo, itemId]);

  useEffect(() => {
    if (!carregado || anotacao === (progresso?.anotacao ?? "")) return;
    const timer = window.setTimeout(() => {
      setProgresso(atualizarProgressoConteudo(tipo, itemId, { anotacao }));
    }, 650);
    return () => window.clearTimeout(timer);
  }, [anotacao, carregado, itemId, progresso?.anotacao, tipo]);

  const favorito = progresso?.favorito ?? false;
  const concluido = progresso?.concluido ?? false;

  return (
    <section className="mt-5 rounded-2xl border border-border bg-surface p-4" style={{ boxShadow: "var(--shadow)" }}>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={favorito}
          onClick={() => setProgresso(atualizarProgressoConteudo(tipo, itemId, { favorito: !favorito }))}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
            favorito ? "border-gold/50 bg-gold/10 text-gold" : "border-border bg-surface-2 text-text-muted hover:border-border-strong",
          )}
        >
          <BookMarked className="size-4" /> {favorito ? "Favoritado" : "Favoritar"}
        </button>
        <button
          type="button"
          aria-pressed={concluido}
          onClick={() => setProgresso(atualizarProgressoConteudo(tipo, itemId, { concluido: !concluido }))}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
            concluido ? "border-accent/50 bg-accent-soft text-accent" : "border-border bg-surface-2 text-text-muted hover:border-border-strong",
          )}
        >
          <CheckCircle2 className="size-4" /> {concluido ? "Concluído" : "Marcar como concluído"}
        </button>
      </div>

      <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-text-faint" htmlFor={`anotacao-${tipo}-${itemId}`}>
        <StickyNote className="mr-1.5 inline size-3.5" /> Anotação pessoal
      </label>
      <textarea
        id={`anotacao-${tipo}-${itemId}`}
        value={anotacao}
        onChange={(evento) => setAnotacao(evento.target.value)}
        rows={3}
        placeholder="Registre dúvidas, pontos-chave ou o que revisar depois…"
        className="mt-2 w-full resize-y rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-text outline-none placeholder:text-text-faint focus:border-accent"
      />
      <p className="mt-1.5 text-xs text-text-faint">
        Salvo automaticamente neste dispositivo e, quando você está conectado, também na sua conta.
      </p>
    </section>
  );
}
