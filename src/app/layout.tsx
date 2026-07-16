import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";
import { getContentRepository } from "@/infra/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codex Medicus",
  description:
    "Plataforma pessoal de estudos de medicina — conteúdo, questões, casos e revisão.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const repo = await getContentRepository();
  const [disciplinas, grupos] = await Promise.all([
    repo.getDisciplinas(),
    repo.getGrupos(),
  ]);
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Set theme before paint to avoid flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full">
        <AppShell disciplinas={disciplinas} grupos={grupos}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
