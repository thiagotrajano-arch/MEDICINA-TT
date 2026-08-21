"use client";

import { useEffect, useState, type FormEvent } from "react";
import { dueRecallCards, listRecallCards, recallCardsForTopic, reviewRecallCard, saveRecallCard } from "@/lib/v2/recall-local";
import { listOpenRemediations, listQuestionAttempts, migrateLegacyQuestionHistory, recordQuestionAttempt, resolveRemediation } from "@/lib/v2/question-local";
import { syncV2LocalFirst } from "@/lib/v2/sync";
import { recommendNext } from "@/domain/v2";
import type { QuestionConfidence, RecallCardKind, RecallRating } from "@/domain/v2";

const areas = ["Hoje", "Aprender", "Praticar", "Recall", "Meu Curso"];

export function V2Shell() {
  const [area, setArea] = useState("Hoje");
  const [, setVersion] = useState(0);
  const [subtemaId, setSubtemaId] = useState("geral");
  const [topicTitle, setTopicTitle] = useState("Novo subtema");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [kind, setKind] = useState<RecallCardKind>("basic");
  const [questionId, setQuestionId] = useState("");
  const [correct, setCorrect] = useState(true);
  const [confidence, setConfidence] = useState<QuestionConfidence>("medium");
  const [syncMessage, setSyncMessage] = useState("Não sincronizado nesta sessão.");
  const due = dueRecallCards();
  const total = listRecallCards().length;
  const current = due[0];
  const topicCards = recallCardsForTopic(subtemaId);
  const attempts = listQuestionAttempts();
  const remediations = listOpenRemediations();
  const recommendation = recommendNext({
    subtemaId,
    title: topicTitle,
    disciplineId: "unassigned",
    counts: { summaries: 0, questions: 0, cases: 0, recall: topicCards.length, media: 0, evidence: 0 },
    mastery: { correctRate: 1, attempts: 0, dueRecall: topicCards.filter((card) => new Date(card.dueAt) <= new Date()).length },
  });

  useEffect(() => {
    void migrateLegacyQuestionHistory().then((imported) => {
      if (imported > 0) {
        setSyncMessage(`${imported} respostas antigas importadas para a fila V2. Clique em Sincronizar para enviar.`);
        setVersion((value) => value + 1);
      }
    }).catch(() => undefined);
  }, []);

  function review(rating: RecallRating) {
    if (!current) return;
    reviewRecallCard(current.id, rating);
    setVersion((value) => value + 1);
  }

  function createCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!front.trim() || !back.trim() || !subtemaId.trim()) return;
    saveRecallCard({
      id: crypto.randomUUID(),
      subtemaId: subtemaId.trim(),
      kind,
      front: front.trim(),
      back: back.trim(),
      dueAt: new Date().toISOString(),
      state: "new",
      reps: 0,
      lapses: 0,
    });
    setFront("");
    setBack("");
    setVersion((value) => value + 1);
  }

  function recordPractice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!questionId.trim() || !subtemaId.trim()) return;
    recordQuestionAttempt({ questionId: questionId.trim(), subtemaId: subtemaId.trim(), correct, confidence, attemptedAt: new Date().toISOString() });
    setQuestionId("");
    setVersion((value) => value + 1);
  }

  async function sync() {
    setSyncMessage("Sincronizando…");
    try {
      const result = await syncV2LocalFirst();
      setSyncMessage(result.status === "synced" ? `Sincronizado: ${result.recallCards} cards e ${result.questionAttempts} tentativas.` : result.status === "offline" ? "Sem sessão: dados permanecem apenas neste dispositivo." : result.status === "not_authorized" ? "Sessão sem autorização para a V2." : `Sincronização parcial: ${result.errors.length} pendência(s).`);
    } catch {
      setSyncMessage("Falha de rede: a fila local foi preservada.");
    }
  }

  return <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-6 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
      <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Codex Medicus V2</p><h1 className="text-2xl font-semibold">Learning OS privado</h1></div>
      <div className="flex items-center gap-2"><span className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1 text-xs text-amber-800">MVP local-first</span><button type="button" onClick={() => void sync()} className="rounded-md border border-slate-300 px-3 py-1 text-xs dark:border-slate-700">Sincronizar</button></div>
    </header>
    <p aria-live="polite" className="mb-4 text-xs text-slate-500">{syncMessage}</p>
    <nav aria-label="Áreas do Codex" className="mb-8 flex flex-wrap gap-2">{areas.map((item) => <button key={item} type="button" onClick={() => setArea(item)} className={`rounded-md border px-3 py-2 text-sm ${area === item ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"}`}>{item}</button>)}</nav>
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500">Área ativa</p><p className="mt-2 text-xl font-semibold">{area}</p></article>
      <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500">Cards locais</p><p className="mt-2 text-xl font-semibold">{total}</p></article>
      <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500">Revisões vencidas</p><p className="mt-2 text-xl font-semibold">{due.length}</p></article>
    </section>
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">Recall MVP</h2>
      {current ? <><p className="mt-4 font-medium">{current.front}</p><details className="mt-3"><summary className="cursor-pointer text-sm text-slate-500">Mostrar resposta</summary><p className="mt-2 text-sm">{current.back}</p></details><div className="mt-5 flex flex-wrap gap-2">{(["again", "hard", "good", "easy"] as RecallRating[]).map((rating) => <button key={rating} type="button" onClick={() => review(rating)} className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">{rating}</button>)}</div></> : <p className="mt-3 text-sm text-slate-500">Nenhum card vencido no armazenamento local.</p>}
    </section>
    <section className="mt-6 grid gap-6 lg:grid-cols-2">
      <form onSubmit={createCard} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Criar card local</h2>
        <label className="mt-4 block text-sm">Subtema<input value={subtemaId} onChange={(event) => setSubtemaId(event.target.value)} required className="mt-1 block w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" /></label>
        <label className="mt-3 block text-sm">Tipo<select value={kind} onChange={(event) => setKind(event.target.value as RecallCardKind)} className="mt-1 block w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"><option value="basic">Basic</option><option value="cloze">Cloze</option></select></label>
        <label className="mt-3 block text-sm">Frente<textarea value={front} onChange={(event) => setFront(event.target.value)} required className="mt-1 block min-h-20 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" /></label>
        <label className="mt-3 block text-sm">Verso<textarea value={back} onChange={(event) => setBack(event.target.value)} required className="mt-1 block min-h-20 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" /></label>
        <button type="submit" className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900">Adicionar à fila</button>
      </form>
      <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Topic Hub local</h2>
        <label className="mt-4 block text-sm">Título do subtema<input value={topicTitle} onChange={(event) => setTopicTitle(event.target.value)} className="mt-1 block w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" /></label>
        <p className="mt-4 text-sm"><span className="text-slate-500">Cards associados:</span> {topicCards.length}</p>
        <p className="mt-2 text-sm"><span className="text-slate-500">Próxima ação:</span> {recommendation.reason}</p>
        <p className="mt-2 text-xs text-slate-500">Questões, fontes, mídia e evidências serão conectadas ao adapter privado V2.</p>
      </article>
    </section>
    <section className="mt-6 grid gap-6 lg:grid-cols-2">
      <form onSubmit={recordPractice} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Praticar e registrar erro</h2>
        <label className="mt-4 block text-sm">ID da questão<input value={questionId} onChange={(event) => setQuestionId(event.target.value)} required className="mt-1 block w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" /></label>
        <label className="mt-3 block text-sm">Resultado<select value={String(correct)} onChange={(event) => setCorrect(event.target.value === "true")} className="mt-1 block w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"><option value="true">Acertei</option><option value="false">Errei</option></select></label>
        <label className="mt-3 block text-sm">Confiança<select value={confidence} onChange={(event) => setConfidence(event.target.value as QuestionConfidence)} className="mt-1 block w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option></select></label>
        <button type="submit" className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm text-white dark:bg-slate-100 dark:text-slate-900">Registrar tentativa</button>
        <p className="mt-3 text-xs text-slate-500">A interface registra tentativa e cria remediação para erro ou baixa confiança.</p>
      </form>
      <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Hoje</h2>
        <p className="mt-3 text-sm"><span className="text-slate-500">Tentativas locais:</span> {attempts.length}</p>
        <p className="mt-2 text-sm"><span className="text-slate-500">Remediações abertas:</span> {remediations.length}</p>
        {remediations.length > 0 ? <ul className="mt-4 space-y-2">{remediations.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 rounded-md border border-slate-200 p-3 text-sm dark:border-slate-800"><span>{item.subtemaId}: {item.reason}</span><button type="button" onClick={() => { resolveRemediation(item.id); setVersion((value) => value + 1); }} className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-700">Concluir</button></li>)}</ul> : <p className="mt-4 text-sm text-slate-500">Sem remediações abertas.</p>}
      </article>
    </section>
  </main>;
}
