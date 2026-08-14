"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Command,
  GraduationCap,
  Home,
  ListChecks,
  Menu,
  Moon,
  Search,
  Sun,
  RotateCcw,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/cn";
import { instalarMonitoramentoGlobal } from "@/lib/monitor";
import type { Disciplina, GrupoDisciplina } from "@/domain/content/types";
import { AuthButton } from "@/components/auth/AuthButton";

const AREAS = [
  { id: "hoje", label: "Hoje", href: "/", rotas: ["/"] },
  { id: "aprender", label: "Aprender", href: "/biblioteca", rotas: ["/biblioteca", "/estudar", "/casos", "/mapas-mentais", "/midia", "/minha-midia"] },
  { id: "praticar", label: "Praticar", href: "/questoes", rotas: ["/questoes", "/simulado"] },
  { id: "revisar", label: "Revisar", href: "/agenda", rotas: ["/agenda"] },
  { id: "curso", label: "Meu curso", href: "/meu-curso", rotas: ["/meu-curso", "/semestres"] },
] as const;

export function AppShell({
  children,
  disciplinas,
  grupos,
}: {
  children: React.ReactNode;
  disciplinas: Disciplina[];
  grupos: GrupoDisciplina[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDark(document.documentElement.classList.contains("dark"));
      try {
        setDesktopCollapsed(localStorage.getItem("codex:sidebar-collapsed") === "1");
      } catch {}
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => { instalarMonitoramentoGlobal(); }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  const toggleSidebar = () => {
    const next = !desktopCollapsed;
    setDesktopCollapsed(next);
    try { localStorage.setItem("codex:sidebar-collapsed", next ? "1" : "0"); } catch {}
  };

  const area = areaDaRota(pathname);
  const shellStyle = {
    "--shell-sidebar-w": desktopCollapsed ? "76px" : "256px",
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-bg" style={shellStyle}>
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-border bg-surface transition-[width] duration-200 lg:block"
        style={{ width: "var(--shell-sidebar-w)" }}
      >
        <Sidebar
          disciplinas={disciplinas}
          grupos={grupos}
          collapsed={desktopCollapsed}
          onToggle={toggleSidebar}
        />
      </aside>

      <div
        className={cn("fixed inset-0 z-50 lg:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <button
          type="button"
          className={cn("absolute inset-0 bg-black/45 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
        <div
          className={cn("absolute inset-y-0 left-0 border-r border-border bg-surface shadow-2xl transition-transform duration-200", mobileOpen ? "translate-x-0" : "-translate-x-full")}
          style={{ width: "min(88vw, 304px)" }}
        >
          <Sidebar
            disciplinas={disciplinas}
            grupos={grupos}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      </div>

      <div className="flex h-[100dvh] min-w-0 flex-col overflow-hidden transition-[padding] duration-200 lg:h-auto lg:min-h-screen lg:overflow-visible lg:pl-[var(--shell-sidebar-w)]">
        <header className="z-30 flex min-h-[68px] shrink-0 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-xl sm:px-6 lg:sticky lg:top-0">
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-xl text-text-muted hover:bg-surface-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="hidden min-w-40 leading-tight lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{area.label}</p>
            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-text">
              <span className="truncate">{nomeDaRota(pathname)}</span>
              {nomeDaRota(pathname) !== area.label && <ChevronRight className="size-3.5 text-text-faint" />}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-border bg-surface px-3 text-sm text-text-faint shadow-sm transition-colors hover:border-accent sm:max-w-xl"
            aria-label="Abrir busca global"
          >
            <Search className="size-4 shrink-0" />
            <span className="truncate">Buscar conteúdo, tema ou questão</span>
            <span className="ml-auto hidden items-center gap-0.5 sm:flex">
              <kbd className="flex items-center gap-0.5 rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-[10px]">
                <Command className="size-2.5" />K
              </kbd>
            </span>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <AuthButton />
            <button
              type="button"
              onClick={toggleTheme}
              className="grid size-10 place-items-center rounded-xl text-text-muted hover:bg-surface-2"
              aria-label={dark ? "Usar tema claro" : "Usar tema escuro"}
            >
              {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto pb-4 lg:overflow-visible lg:pb-0">{children}</main>

        <nav
          className="relative z-30 mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] grid max-w-md shrink-0 grid-cols-5 rounded-2xl border border-border bg-surface p-1.5 shadow-xl sm:mx-auto sm:w-full lg:hidden"
          aria-label="Áreas principais"
        >
          <AtalhoMobile href="/" label="Hoje" icon={Home} ativo={area.id === "hoje"} />
          <AtalhoMobile href="/biblioteca" label="Aprender" icon={BookOpen} ativo={area.id === "aprender"} />
          <AtalhoMobile href="/questoes" label="Praticar" icon={ListChecks} ativo={area.id === "praticar"} />
          <AtalhoMobile href="/agenda" label="Revisar" icon={RotateCcw} ativo={area.id === "revisar"} />
          <AtalhoMobile href="/meu-curso" label="Curso" icon={GraduationCap} ativo={area.id === "curso"} />
        </nav>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

function areaDaRota(pathname: string) {
  return AREAS.find((area) => area.rotas.some((rota) => rota === "/" ? pathname === "/" : pathname.startsWith(rota))) ?? AREAS[1];
}

function nomeDaRota(pathname: string): string {
  const mapa: Record<string, string> = {
    "/agenda": "Agenda",
    "/biblioteca": "Biblioteca",
    "/questoes": "Questões",
    "/simulado": "Simulado",
    "/casos": "Casos clínicos",
    "/midia": "Mídia clínica",
    "/minha-midia": "Minha mídia",
    "/mapas-mentais": "Mapas mentais",
    "/semestres": "Semestres",
    "/meu-curso": "Meu curso",
    "/estudar": "Leitura",
  };
  if (pathname === "/") return "Hoje";
  return Object.entries(mapa).find(([prefixo]) => pathname.startsWith(prefixo))?.[1] ?? "Conhecimento";
}

function AtalhoMobile({
  href,
  label,
  icon: Icon,
  ativo,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  ativo: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={ativo ? "page" : undefined}
      className={cn(
        "grid min-h-13 place-items-center gap-0.5 rounded-xl px-1 text-[10px] font-semibold transition-colors",
        ativo ? "bg-accent-soft text-accent" : "text-text-faint hover:bg-surface-2 hover:text-text",
      )}
    >
      <Icon className="size-4.5" />
      <span>{label}</span>
    </Link>
  );
}
