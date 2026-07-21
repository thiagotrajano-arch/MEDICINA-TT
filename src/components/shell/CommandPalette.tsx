"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, FileText, BookOpen, ListChecks, Layers } from "lucide-react";
import { searchStatic } from "@/lib/search-static";
import type { SearchHit } from "@/application/ports/content-repository";
import { cn } from "@/lib/cn";

const ICONS = {
  disciplina: Layers,
  tema: BookOpen,
  subtema: FileText,
  questao: ListChecks,
} as const;

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      setQ("");
      setActive(0);
      inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  // Instant client-side search over the bundled index (works offline/static).
  const hits = useMemo(() => {
    if (!open || q.trim().length < 2) return [];
    return searchStatic(q);
  }, [q, open]);

  if (!open) return null;

  const go = (hit: SearchHit) => {
    router.push(hit.href);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl"
        style={{ boxShadow: "var(--shadow)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 text-text-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter" && hits[active]) go(hits[active]);
              if (e.key === "Escape") onClose();
            }}
            placeholder="Buscar doença, sintoma, tema, questão…"
            className="w-full bg-transparent py-3.5 text-[15px] text-text outline-none placeholder:text-text-faint"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-text-faint sm:block">
            esc
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {q.length < 2 && (
            <p className="px-3 py-6 text-center text-sm text-text-faint">
              Digite ao menos 2 caracteres para buscar em toda a base.
            </p>
          )}
          {q.length >= 2 && hits.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-text-faint">
              Nenhum resultado para “{q}”.
            </p>
          )}
          {hits.map((hit, i) => {
            const Icon = ICONS[hit.tipo];
            return (
              <button
                key={`${hit.href}-${i}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(hit)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                  i === active ? "bg-accent-soft" : "hover:bg-surface-2"
                )}
              >
                <Icon className={cn("size-4 flex-none", i === active ? "text-accent" : "text-text-faint")} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-text">{hit.titulo}</span>
                  <span className="block truncate text-xs text-text-faint">{hit.contexto}</span>
                </span>
                {i === active && <CornerDownLeft className="size-3.5 flex-none text-text-faint" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
