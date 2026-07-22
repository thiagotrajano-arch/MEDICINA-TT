"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Loader2, LogIn, LogOut, UserRound, X } from "lucide-react";
import { sincronizarProgresso } from "@/lib/progresso";

type ModoAuth = "entrar" | "criar" | "recuperar" | "nova-senha";

async function carregarSupabase() {
  const { getSupabaseAnon } = await import("@/infra/supabase/client");
  return getSupabaseAnon();
}

function comPrazo<T>(operacao: PromiseLike<T>, milissegundos = 15000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error("tempo-esgotado")),
      milissegundos
    );
    Promise.resolve(operacao).then(
      (valor) => { window.clearTimeout(timer); resolve(valor); },
      (erro) => { window.clearTimeout(timer); reject(erro); }
    );
  });
}

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [modoDialogo, setModoDialogo] = useState<ModoAuth>("entrar");

  useEffect(() => {
    let cancelado = false;
    let unsubscribe: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      void carregarSupabase().then(async (supabase) => {
        const { data: sessao } = await supabase.auth.getSession();
        if (cancelado) return;
        setUser(sessao.session?.user ?? null);
        const tipoLink = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("type");
        if (sessao.session && (tipoLink === "recovery" || tipoLink === "invite")) {
          setModoDialogo("nova-senha");
          setOpen(true);
        }
        const { data } = supabase.auth.onAuthStateChange((evento, atual) => {
          if (!cancelado) setUser(atual?.user ?? null);
          if (!cancelado && evento === "PASSWORD_RECOVERY") {
            setModoDialogo("nova-senha");
            setOpen(true);
          }
        });
        unsubscribe = () => data.subscription.unsubscribe();
      }).catch(() => {});
    }, 300);
    return () => {
      cancelado = true;
      window.clearTimeout(timer);
      unsubscribe?.();
    };
  }, []);

  const sair = async () => {
    try {
      const supabase = await carregarSupabase();
      await comPrazo(supabase.auth.signOut({ scope: "local" }), 5000);
    } finally {
      window.location.reload();
    }
  };

  if (user) {
    return (
      <>
        <div className="flex items-center gap-1">
          <span className="hidden max-w-36 truncate text-xs text-text-faint sm:block" title={user.email}>{user.email}</span>
          <button onClick={sair} className="grid size-9 place-items-center rounded-lg text-text-muted hover:bg-surface-2" aria-label="Sair da conta" title="Sair da conta"><LogOut className="size-4" /></button>
        </div>
        {open && <AuthDialog key={modoDialogo} modoInicial={modoDialogo} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <button onClick={() => { setModoDialogo("entrar"); setOpen(true); }} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-muted hover:border-accent hover:text-accent">
        <LogIn className="size-3.5" /> <span className="hidden sm:inline">Entrar</span>
      </button>
      {open && <AuthDialog key={modoDialogo} modoInicial={modoDialogo} onClose={() => setOpen(false)} />}
    </>
  );
}

function AuthDialog({ onClose, modoInicial }: { onClose: () => void; modoInicial: ModoAuth }) {
  const [modo, setModo] = useState<ModoAuth>(modoInicial);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");
    try {
      const supabase = await carregarSupabase();
      const emailRedirectTo = `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;
      if (modo === "entrar") {
        const { error } = await comPrazo(
          supabase.auth.signInWithPassword({ email, password: senha })
        );
        if (error) setMensagem(error.message === "Invalid login credentials" ? "E-mail ou senha inválidos." : error.message);
        else {
          await comPrazo(sincronizarProgresso(), 8000).catch(() => {});
          window.location.reload();
        }
      } else if (modo === "criar") {
        const { data, error } = await comPrazo(
          supabase.auth.signUp({ email, password: senha, options: { emailRedirectTo } })
        );
        if (error) setMensagem(error.message);
        else if (!data.session) setMensagem("Cadastro criado. Confirme o e-mail recebido e depois entre.");
        else {
          await comPrazo(sincronizarProgresso(), 8000).catch(() => {});
          window.location.reload();
        }
      } else if (modo === "recuperar") {
        const { error } = await comPrazo(
          supabase.auth.resetPasswordForEmail(email, { redirectTo: emailRedirectTo })
        );
        setMensagem(error
          ? error.message
          : "Enviamos um link para seu e-mail. Abra-o para definir uma nova senha.");
      } else {
        const { error } = await comPrazo(supabase.auth.updateUser({ password: senha }));
        if (error) setMensagem(error.message);
        else {
          window.history.replaceState({}, "", emailRedirectTo);
          window.location.reload();
        }
      }
    } catch {
      setMensagem("Não foi possível conectar agora. Verifique sua internet e tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Acessar conta">
      <button className="absolute inset-0" onClick={onClose} aria-label="Fechar" />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6" style={{ boxShadow: "var(--shadow-lg)" }}>
        <button onClick={onClose} className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-text-faint hover:bg-surface-2" aria-label="Fechar"><X className="size-4" /></button>
        <UserRound className="mb-3 size-7 text-accent" />
        <h2 className="text-xl font-bold text-text">{tituloModo(modo)}</h2>
        <p className="mt-1 text-sm text-text-muted">{descricaoModo(modo)}</p>
        <form onSubmit={enviar} className="mt-5 space-y-3">
          {modo !== "nova-senha" && (
            <label className="block text-xs font-semibold text-text-muted">E-mail
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent" />
            </label>
          )}
          {modo !== "recuperar" && (
            <label className="block text-xs font-semibold text-text-muted">{modo === "nova-senha" ? "Nova senha" : "Senha"}
              <input type="password" required minLength={6} value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete={modo === "entrar" ? "current-password" : "new-password"} className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent" />
            </label>
          )}
          {mensagem && <p className="rounded-lg bg-surface-2 p-2.5 text-xs text-text-muted">{mensagem}</p>}
          <button disabled={carregando} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-contrast disabled:opacity-60">
            {carregando && <Loader2 className="size-4 animate-spin" />}{rotuloAcao(modo)}
          </button>
        </form>
        {modo !== "nova-senha" && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <button onClick={() => { setModo(modo === "criar" ? "entrar" : "criar"); setMensagem(""); }} className="text-xs font-medium text-accent hover:underline">
              {modo === "criar" ? "Já tenho conta" : "Primeiro acesso? Criar conta"}
            </button>
            {modo !== "recuperar" ? (
              <button onClick={() => { setModo("recuperar"); setMensagem(""); }} className="text-xs text-text-faint hover:text-accent hover:underline">
                Esqueci minha senha
              </button>
            ) : (
              <button onClick={() => { setModo("entrar"); setMensagem(""); }} className="text-xs text-text-faint hover:text-accent hover:underline">
                Voltar para o login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function tituloModo(modo: ModoAuth): string {
  if (modo === "criar") return "Criar conta";
  if (modo === "recuperar") return "Recuperar senha";
  if (modo === "nova-senha") return "Definir nova senha";
  return "Entrar";
}

function descricaoModo(modo: ModoAuth): string {
  if (modo === "recuperar") return "Enviaremos um link seguro para o seu e-mail.";
  if (modo === "nova-senha") return "Escolha uma nova senha para concluir a ativação da conta.";
  return "Sincronize questões, simulados e dashboard entre seus dispositivos.";
}

function rotuloAcao(modo: ModoAuth): string {
  if (modo === "criar") return "Criar conta";
  if (modo === "recuperar") return "Enviar link";
  if (modo === "nova-senha") return "Salvar nova senha";
  return "Entrar";
}
