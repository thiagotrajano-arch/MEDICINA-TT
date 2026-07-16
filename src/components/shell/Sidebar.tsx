"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Library,
  ListChecks,
  Timer,
  Stethoscope,
  Images,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Disciplina, GrupoDisciplina } from "@/domain/content/types";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/biblioteca", label: "Biblioteca", icon: Library },
  { href: "/questoes", label: "Questões", icon: ListChecks },
  { href: "/simulado", label: "Simulado", icon: Timer },
  { href: "/casos", label: "Casos clínicos", icon: Stethoscope },
  { href: "/midia", label: "Mídia", icon: Images },
];

export function Sidebar({
  disciplinas,
  grupos,
  onNavigate,
}: {
  disciplinas: Disciplina[];
  grupos: GrupoDisciplina[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [openGrupo, setOpenGrupo] = useState<string | null>("Materno-Infantil");

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="grid size-9 place-items-center rounded-xl bg-accent font-black text-accent-contrast shadow-sm">
          C
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-text">Codex Medicus</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-faint">
            Estudo · OMED · Residência
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="px-3 pb-2">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent-soft text-accent"
                  : "text-text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              <Icon className="size-4" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Discipline tree */}
      <div className="mt-1 flex-1 overflow-y-auto px-3 pb-6">
        {grupos.map((grupo) => {
          const doGrupo = disciplinas.filter((d) => d.grupo === grupo);
          if (!doGrupo.length) return null;
          const open = openGrupo === grupo;
          return (
            <div key={grupo} className="mb-1">
              <button
                onClick={() => setOpenGrupo(open ? null : grupo)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-[10.5px] font-bold uppercase tracking-[0.13em] text-text-faint hover:text-text-muted"
              >
                {grupo}
                <ChevronRight
                  className={cn("size-3.5 transition-transform", open && "rotate-90")}
                />
              </button>
              {open && (
                <div className="mt-0.5">
                  {doGrupo.map((d) => {
                    const active = pathname === `/biblioteca/${d.slug}`;
                    return (
                      <Link
                        key={d.id}
                        href={`/biblioteca/${d.slug}`}
                        onClick={onNavigate}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                          active
                            ? "bg-surface-2 text-text"
                            : "text-text-muted hover:bg-surface-2 hover:text-text"
                        )}
                      >
                        <span className="grid size-6 flex-none place-items-center rounded-md bg-surface-2 text-[9px] font-bold text-text-faint group-hover:text-accent">
                          {d.marca}
                        </span>
                        <span className="truncate">{d.nome}</span>
                        {d.omed && (
                          <Sparkles className="ml-auto size-3 flex-none text-gold" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
