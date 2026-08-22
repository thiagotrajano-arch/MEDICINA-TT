"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import type { Disciplina, Questao } from "@/domain/content/types";

const QuizClient = dynamic(
  () => import("@/components/questoes/QuizClient").then((modulo) => modulo.QuizClient),
  { ssr: false, loading: () => <EstadoCarregando /> },
);

function EstadoCarregando() {
  return (
    <div className="product-page flex min-h-[45vh] max-w-3xl flex-col items-center justify-center text-center" role="status" aria-live="polite">
      <LoaderCircle className="mb-3 size-7 animate-spin text-accent" aria-hidden="true" />
      <h1 className="text-xl font-bold text-text">Preparando suas questões</h1>
      <p className="mt-2 text-sm text-text-muted">Carregando o banco e reconciliando seu progresso.</p>
    </div>
  );
}

export function QuizLoader() {
  const [dados, setDados] = useState<{ questoes: Questao[]; disciplinas: Disciplina[] } | null>(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  const tentarNovamente = useCallback(() => {
    setDados(null);
    setErro(false);
    setTentativa((valor) => valor + 1);
  }, []);

  useEffect(() => {
    let ativo = true;

    void Promise.all([
      import("@/content/questoes"),
      import("@/content/taxonomy"),
    ]).then(([moduloQuestoes, moduloTaxonomia]) => {
      if (!ativo) return;
      setDados({
        questoes: moduloQuestoes.QUESTOES,
        disciplinas: moduloTaxonomia.DISCIPLINAS,
      });
    }).catch(() => {
      if (ativo) setErro(true);
    });

    return () => {
      ativo = false;
    };
  }, [tentativa]);

  if (erro) {
    return (
      <div className="mx-auto flex min-h-[45vh] max-w-3xl flex-col items-center justify-center px-5 py-16 text-center" role="alert">
        <CircleAlert className="mb-3 size-7 text-danger" aria-hidden="true" />
        <h1 className="text-xl font-bold text-text">Não foi possível carregar as questões</h1>
        <p className="mt-2 text-sm text-text-muted">Seu progresso continua preservado. Verifique a conexão e tente novamente.</p>
        <button type="button" onClick={tentarNovamente} className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!dados) return <EstadoCarregando />;

  return <QuizClient questoes={dados.questoes} disciplinas={dados.disciplinas} />;
}
