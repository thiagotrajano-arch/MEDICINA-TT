"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Home,
  Images,
  Library,
  ListChecks,
  LockKeyhole,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Stethoscope,
  Timer,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Disciplina, GrupoDisciplina } from "@/domain/content/types";

const AREAS = [
  { id: "hoje", href: "/", label: "Hoje", descricao: "Foco e progresso", icon: Home, rotas: ["/"] },
  { id: "aprender", href: "/biblioteca", label: "Aprender", descricao: "Resumos, casos e mídia", icon: BookOpen, rotas: ["/biblioteca", "/estudar", "/casos", "/mapas-mentais", "/midia", "/minha-midia"] },
  { id: "praticar", href: "/questoes", label: "Praticar", descricao: "Questões e simulados", icon: ListChecks, rotas: ["/questoes", "/simulado"] },
  { id: "revisar", href: "/agenda", label: "Revisar", descricao: "Agenda e pendências", icon: RotateCcw, rotas: ["/agenda"] },
  { id: "curso", href: "/meu-curso", label: "Meu curso", descricao: "Semestres e disciplinas", icon: GraduationCap, rotas: ["/meu-curso", "/semestres"] },
] as const;

const CONTEXTO: Record<string, { href: string; label: string; icon: React.ElementType; privado?: boolean }[]> = {
  hoje: [
    { href: "/", label: "Visão do dia", icon: Home },
  ],
  revisar: [
    { href: "/agenda", label: "Agenda", icon: CalendarDays, privado: true },
  ],
  aprender: [
    { href: "/biblioteca", label: "Biblioteca", icon: Library },
    { href: "/casos", label: "Casos clínicos", icon: Stethoscope },
    { href: "/mapas-mentais", label: "Mapas mentais", icon: Network },
    { href: "/midia", label: "Índice visual", icon: Images },
    { href: "/minha-midia", label: "Minha mídia", icon: LockKeyhole, privado: true },
  ],
  praticar: [
    { href: "/questoes", label: "Banco de questões", icon: ListChecks },
    { href: "/simulado", label: "Simulado", icon: Timer },
  ],
  curso: [
    { href: "/meu-curso", label: "Meu curso", icon: GraduationCap, privado: true },
    { href: "/semestres", label: "Trilhas por semestre", icon: BookOpen },
  ],
};

interface SidebarProps {
  disciplinas: Disciplina[];
  grupos: GrupoDisciplina[];
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ disciplinas, grupos, onNavigate, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const areaAtiva = AREAS.find((area) => area.rotas.some((rota) => rota === "/" ? pathname === "/" : pathname.startsWith(rota))) ?? AREAS[1];
  const destaquesOmed = disciplinas.filter((disciplina) => disciplina.omed).slice(0, 4);

  return (
    <div role="navigation" aria-label="Navegação lateral" className="flex h-full flex-col">
      <div className={cn("flex min-h-[76px] items-center border-b border-border", collapsed ? "flex-col justify-center gap-1 px-2 py-3" : "gap-2.5 px-4")}>
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand font-black text-brand-contrast shadow-sm">C</div>
        {!collapsed && (
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-bold text-text">Codex Medicus</div>
            <div className="mt-1 truncate text-[9px] font-bold uppercase tracking-[0.16em] text-text-faint">Estudo clínico pessoal</div>
          </div>
        )}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-text-faint hover:bg-surface-2 hover:text-text"
            aria-label={collapsed ? "Expandir navegação" : "Recolher navegação"}
            title={collapsed ? "Expandir navegação" : "Recolher navegação"}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        )}
      </div>

      <nav className={cn("pt-4", collapsed ? "px-2" : "px-3")} aria-label="Áreas principais">
        <p className={cn("mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-text-faint", collapsed && "sr-only")}>Áreas</p>
        <div className="space-y-1">
          {AREAS.map((area) => {
            const active = area.id === areaAtiva.id;
            const Icon = area.icon;
            return (
              <Link
                key={area.id}
                href={area.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                title={collapsed ? area.label : undefined}
                className={cn(
                  "group flex min-h-12 items-center rounded-xl transition-colors",
                  collapsed ? "justify-center px-2" : "gap-3 px-3",
                  active ? "bg-accent-soft text-accent" : "text-text-muted hover:bg-surface-2 hover:text-text",
                )}
              >
                <Icon className="size-[18px] shrink-0" strokeWidth={active ? 2.3 : 1.9} />
                {!collapsed && (
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{area.label}</span>
                    <span className={cn("block truncate text-[10px]", active ? "text-accent/80" : "text-text-faint")}>{area.descricao}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {!collapsed && (
        <div className="mt-4 flex-1 overflow-y-auto border-t border-border px-3 pb-5 pt-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-text-faint">Nesta área</p>
          <div className="space-y-1">
            {CONTEXTO[areaAtiva.id].map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-surface-2 text-text" : "text-text-muted hover:bg-surface-2 hover:text-text",
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", active ? "text-accent" : "text-text-faint")} />
                  <span className="truncate">{item.label}</span>
                  {item.privado && <LockKeyhole className="ml-auto size-3 text-text-faint" aria-label="Área privada" />}
                </Link>
              );
            })}
          </div>

          {areaAtiva.id === "aprender" && destaquesOmed.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 flex items-center gap-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-text-faint">
                <Sparkles className="size-3 text-gold" /> Prioridades OMED
              </p>
              <div className="space-y-1">
                {destaquesOmed.map((disciplina) => (
                  <Link
                    key={disciplina.id}
                    href={`/biblioteca/${disciplina.slug}`}
                    onClick={onNavigate}
                    className="flex min-h-9 items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-soft text-[9px] font-bold text-accent">{disciplina.marca}</span>
                    <span className="truncate">{disciplina.nome}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!collapsed && (
        <div className="border-t border-border px-5 py-4 text-[10px] leading-relaxed text-text-faint">
          <span className="font-semibold text-text-muted">{disciplinas.length} disciplinas</span>
          <span aria-hidden="true"> · </span>
          <span>{grupos.length} áreas</span>
          <span className="mt-1 block">Ctrl K abre a busca global.</span>
        </div>
      )}
    </div>
  );
}
