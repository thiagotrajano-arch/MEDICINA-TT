"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Library, ListChecks, Timer, Stethoscope, Images, Network, GraduationCap, LockKeyhole, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Disciplina, GrupoDisciplina } from "@/domain/content/types";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/biblioteca", label: "Biblioteca", icon: Library },
  { href: "/questoes", label: "Questoes", icon: ListChecks },
  { href: "/simulado", label: "Simulado", icon: Timer },
  { href: "/casos", label: "Casos clinicos", icon: Stethoscope },
  { href: "/mapas-mentais", label: "Mapas mentais", icon: Network },
  { href: "/semestres", label: "Trilhas por semestre", icon: GraduationCap },
  { href: "/meu-curso", label: "Meu curso", icon: LockKeyhole },
];
const NAV_MEDIA = [
  { href: "/midia", label: "Midia publica", icon: Images },
  { href: "/minha-midia", label: "Minha midia privada", icon: LockKeyhole },
];

export function Sidebar({ disciplinas, grupos, onNavigate }: { disciplinas: Disciplina[]; grupos: GrupoDisciplina[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openGrupo, setOpenGrupo] = useState<string | null>("Materno-Infantil");
  const itemClass = (active: boolean) => cn("flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-accent-soft text-accent" : "text-text-muted hover:bg-surface-2 hover:text-text");
  return <div className="flex h-full flex-col">
    <div className="flex items-center gap-2.5 px-5 py-4"><div className="grid size-9 place-items-center rounded-xl bg-accent font-black text-accent-contrast shadow-sm">C</div><div className="leading-tight"><div className="text-sm font-bold text-text">Codex Medicus</div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-faint">Estudo · OMED · Residencia</div></div></div>
    <nav className="px-3 pb-2" aria-label="Navegacao principal">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-text-faint">Estudo</p>
      {NAV.map((item) => { const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href); const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={onNavigate} className={itemClass(active)}><Icon className="size-4" strokeWidth={2} />{item.label}</Link>; })}
      <p className="mb-2 mt-4 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-text-faint">Acervo visual</p>
      {NAV_MEDIA.map((item) => { const active = pathname.startsWith(item.href); const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={onNavigate} className={itemClass(active)}><Icon className="size-4" strokeWidth={2} /><span>{item.label}</span>{item.href === "/minha-midia" && <span className="ml-auto rounded-full bg-surface-2 px-1.5 py-0.5 text-[9px] font-semibold text-text-faint">privada</span>}</Link>; })}
    </nav>
    <div className="mt-1 flex-1 overflow-y-auto px-3 pb-6"><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-text-faint">Disciplinas</p>{grupos.map((grupo) => { const doGrupo = disciplinas.filter((d) => d.grupo === grupo); if (!doGrupo.length) return null; const open = openGrupo === grupo; return <div key={grupo} className="mb-1"><button onClick={() => setOpenGrupo(open ? null : grupo)} className="flex min-h-9 w-full items-center justify-between rounded-md px-3 py-2 text-[10.5px] font-bold uppercase tracking-[0.13em] text-text-faint hover:text-text-muted">{grupo}<ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} /></button>{open && <div className="mt-0.5">{doGrupo.map((d) => { const active = pathname === `/biblioteca/${d.slug}`; return <Link key={d.id} href={`/biblioteca/${d.slug}`} onClick={onNavigate} className={cn("group flex min-h-9 items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors", active ? "bg-surface-2 text-text" : "text-text-muted hover:bg-surface-2 hover:text-text")}><span className="grid size-6 flex-none place-items-center rounded-md bg-surface-2 text-[9px] font-bold text-text-faint group-hover:text-accent">{d.marca}</span><span className="truncate">{d.nome}</span>{d.omed && <Sparkles className="ml-auto size-3 flex-none text-gold" />}</Link>; })}</div>}</div>; })}</div>
  </div>;
}
