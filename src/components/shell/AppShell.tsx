"use client";

import { useEffect, useState } from "react";
import { Menu, Search, Sun, Moon, Command } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/cn";
import type { Disciplina, GrupoDisciplina } from "@/domain/content/types";
import { AuthButton } from "@/components/auth/AuthButton";

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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-surface lg:block"
        style={{ width: "var(--sidebar-w)" }}
      >
        <Sidebar disciplinas={disciplinas} grupos={grupos} />
      </aside>

      {/* Sidebar — mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 border-r border-border bg-surface transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ width: "var(--sidebar-w)" }}
        >
          <Sidebar
            disciplinas={disciplinas}
            grupos={grupos}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-[var(--sidebar-w)]">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-bg/80 px-4 backdrop-blur-md sm:px-6">
          <button
            className="grid size-9 place-items-center rounded-lg text-text-muted hover:bg-surface-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>

          <button
            onClick={() => setPaletteOpen(true)}
            className="flex h-9 flex-1 items-center gap-2.5 rounded-lg border border-border bg-surface px-3 text-sm text-text-faint transition-colors hover:border-border-strong sm:max-w-md"
          >
            <Search className="size-4" />
            <span>Buscar…</span>
            <span className="ml-auto hidden items-center gap-0.5 sm:flex">
              <kbd className="flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px]">
                <Command className="size-2.5" />K
              </kbd>
            </span>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <AuthButton />
            <button
              onClick={toggleTheme}
              className="grid size-9 place-items-center rounded-lg text-text-muted hover:bg-surface-2"
              aria-label="Alternar tema"
            >
              {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </button>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
