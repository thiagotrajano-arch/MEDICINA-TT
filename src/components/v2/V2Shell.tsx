"use client";

import { useEffect, useState, type FormEvent } from "react";
import { dueRecallCards, listRecallCards, recallCardsForTopic, reviewRecallCard, saveRecallCard } from "@/lib/v2/recall-local";
import { listOpenRemediations, listQuestionAttempts, migrateLegacyQuestionHistory, recordQuestionAttempt, resolveRemediation } from "@/lib/v2/question-local";
import { syncV2LocalFirst } from "@/lib/v2/sync";
import { recommendNext } from "@/domain/v2";
import type { QuestionConfidence, RecallCardKind, RecallRating } from "@/domain/v2";
import type { Questao } from "@/domain/content/types";

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
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [selectedAlternativeLetter, setSelectedAlternativeLetter] = useState("A");
  const [confidence, setConfidence] = useState<QuestionConfidence>("medium");
  const [syncMessage, setSyncMessage] = useState("Não sincronizado nesta sessão.");
  const due = dueRecallCards();
  const total = listRecallCards().length;
  const current = due[0];
  const selectedQuestion = questoes.find((questao) => questao.id === questionId);
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
    void import("@/content/questoes").then((module) => {
      setQuestoes(module.QUESTOES);
      setQuestionId((current) => current || module.QUESTOES[0]?.id || "");
      setSelectedAlternativeLetter(module.QUESTOES[0]?.alternativas[0]?.letra ?? "A");
    }).catch(() => undefined);
  }, []);

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
    const selectedAlternative = selectedQuestion?.alternativas.find((alternative) => alternative.letra === selectedAlternativeLetter);
    if (!selectedAlternative) return;
    recordQuestionAttempt({ questionId: questionId.trim(), subtemaId: subtemaId.trim(), selectedAlternativeLetter, correct: selectedAlternative.correta, confidence, attemptedAt: new Date().toISOString() });
    setQuestionId("");
    setVersion((value) => value + 1);
  }

  function selectQuestion(id: string) {
    setQuestionId(id);
    const question = questoes.find((questao) => questao.id === id);
    if (question?.subtemaId) setSubtemaId(question.subtemaId);
    setSelectedAlternativeLetter(question?.alternativas[0]?.letra ?? "A");
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

  return <main className="v2-shell min-h-screen px-4 py-5 text-text sm:px-8 sm:py-8">
    <header className="v2-hero mx-auto mb-6 max-w-7xl rounded-[1.5rem] px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl"><p className="v2-eyebrow">Codex Medicus · V2</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Seu estudo, em uma direção clara.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Uma área privada para transformar questões, erros e revisões em próximos passos concretos.</p></div>
        <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">Runtime privado</span><button type="button" onClick={() => void sync()} className="rounded-xl bg-white px-3.5 py-2 text-xs font-extrabold text-brand shadow-lg transition hover:-translate-y-px">Sincronizar agora</button></div>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/65"><span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-aqua" />Local-first ativo</span><span>Histórico preservado</span><span>Owner-only</span></div>
    </header>
    <div className="mx-auto max-w-7xl">
    <p aria-live="polite" className="mb-4 rounded-xl border border-border bg-surface px-4 py-3 text-xs text-text-muted shadow-sm">{syncMessage}</p>
    <nav aria-label="Áreas do Codex" className="v2-nav mb-6">{areas.map((item) => <button key={item} type="button" data-active={area === item} onClick={() => setArea(item)}>{item}</button>)}</nav>
    <section className="mb-7 grid gap-3 sm:grid-cols-3">
      <article className="v2-kpi"><span>Área ativa</span><strong>{area}</strong><span className="text-accent">Seu foco de hoje</span></article>
      <article className="v2-kpi"><span>Cards locais</span><strong>{total}</strong><span>Disponíveis no Recall</span></article>
      <article className="v2-kpi"><span>Revisões vencidas</span><strong>{due.length}</strong><span>{due.length ? "Comece pelo mais antigo" : "Tudo em dia por enquanto"}</span></article>
    </section>
    <section className="v2-card mb-6 p-5 sm:p-6">
      <div className="v2-section-title"><div><p className="v2-eyebrow !text-accent">Revisão espaçada</p><h2 className="mt-1">Recall de hoje</h2></div><p>{due.length ? `${due.length} revisão(ões) na fila` : "Fila limpa"}</p></div>
      {current ? <><p className="mt-5 text-lg font-bold leading-7 text-text">{current.front}</p><details className="mt-4 rounded-xl border border-border bg-surface-2 p-4"><summary className="cursor-pointer text-sm font-bold text-accent">Mostrar resposta</summary><p className="mt-3 text-sm leading-6 text-text-muted">{current.back}</p></details><div className="mt-5 flex flex-wrap gap-2">{(["again", "hard", "good", "easy"] as RecallRating[]).map((rating) => <button key={rating} type="button" onClick={() => review(rating)} className="v2-button-quiet">{rating}</button>)}</div></> : <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">Nenhum card vencido no armazenamento local.</p>}
    </section>
    <section className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={createCard} className="v2-card p-5 sm:p-6">
        <div className="v2-section-title"><div><p className="v2-eyebrow !text-accent">Memória ativa</p><h2 className="mt-1">Criar card local</h2></div><p>Privado</p></div>
        <label className="v2-label mt-5 block">Subtema<input value={subtemaId} onChange={(event) => setSubtemaId(event.target.value)} required className="v2-input mt-2" /></label>
        <label className="v2-label mt-3 block">Tipo<select value={kind} onChange={(event) => setKind(event.target.value as RecallCardKind)} className="v2-input mt-2"><option value="basic">Basic</option><option value="cloze">Cloze</option></select></label>
        <label className="v2-label mt-3 block">Frente<textarea value={front} onChange={(event) => setFront(event.target.value)} required className="v2-input mt-2 min-h-20" /></label>
        <label className="v2-label mt-3 block">Verso<textarea value={back} onChange={(event) => setBack(event.target.value)} required className="v2-input mt-2 min-h-20" /></label>
        <button type="submit" className="v2-button-primary mt-4">Adicionar à fila</button>
      </form>
      <article className="v2-card p-5 sm:p-6">
        <div className="v2-section-title"><div><p className="v2-eyebrow !text-accent">Organização</p><h2 className="mt-1">Topic Hub</h2></div><p>Contexto do foco</p></div>
        <label className="v2-label mt-5 block">Título do subtema<input value={topicTitle} onChange={(event) => setTopicTitle(event.target.value)} className="v2-input mt-2" /></label>
        <div className="mt-5 grid grid-cols-2 gap-3"><div className="v2-card-soft p-4"><p className="text-xs text-text-faint">Cards associados</p><p className="mt-1 text-2xl font-black text-text">{topicCards.length}</p></div><div className="v2-card-soft p-4"><p className="text-xs text-text-faint">Próxima ação</p><p className="mt-1 text-sm font-bold text-accent">{recommendation.reason}</p></div></div>
        <p className="mt-5 text-xs leading-5 text-text-faint">Questões, fontes, mídia e evidências serão conectadas ao adapter privado V2.</p>
      </article>
    </section>
    <section className="mt-6 grid gap-6 lg:grid-cols-2">
      <form onSubmit={recordPractice} className="v2-card p-5 sm:p-6">
        <div className="v2-section-title"><div><p className="v2-eyebrow !text-accent">Prática</p><h2 className="mt-1">Registrar tentativa</h2></div><p>Gera remediação</p></div>
        <label className="v2-label mt-5 block">Questão real<select value={questionId} onChange={(event) => selectQuestion(event.target.value)} required className="v2-input mt-2"><option value="" disabled>Selecione uma questão</option>{questoes.map((questao) => <option key={questao.id} value={questao.id}>{questao.id} · {questao.disciplinaId} · {questao.subtemaId ?? "sem subtema"}</option>)}</select></label>
        {selectedQuestion && <div className="mt-3 rounded-xl border border-border bg-surface-2 p-4 text-sm leading-6 text-text-muted"><p>{selectedQuestion.enunciado}</p><p className="mt-2 text-xs font-semibold text-accent">Subtema vinculado automaticamente: {selectedQuestion.subtemaId ?? "não informado"}</p></div>}
        {selectedQuestion && <label className="v2-label mt-3 block">Alternativa marcada<select value={selectedAlternativeLetter} onChange={(event) => setSelectedAlternativeLetter(event.target.value)} className="v2-input mt-2">{selectedQuestion.alternativas.map((alternative) => <option key={alternative.letra} value={alternative.letra}>{alternative.letra} · {alternative.texto}</option>)}</select></label>}
        <p className="mt-3 rounded-xl border border-border bg-surface-2 p-3 text-xs leading-5 text-text-muted">Resultado calculado pelo gabarito: <strong>{selectedQuestion?.alternativas.find((alternative) => alternative.letra === selectedAlternativeLetter)?.correta ? "acerto" : "erro"}</strong>. A sincronização envia a alternativa e deixa o servidor confirmar o gabarito.</p>
        <label className="v2-label mt-3 block">Confiança<select value={confidence} onChange={(event) => setConfidence(event.target.value as QuestionConfidence)} className="v2-input mt-2"><option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option></select></label>
        <button type="submit" className="v2-button-primary mt-4">Registrar tentativa</button>
        <p className="mt-3 text-xs leading-5 text-text-faint">A interface registra a tentativa localmente e cria remediação para erro ou baixa confiança.</p>
      </form>
      <article className="v2-card p-5 sm:p-6">
        <div className="v2-section-title"><div><p className="v2-eyebrow !text-accent">Acompanhamento</p><h2 className="mt-1">Hoje</h2></div><p>Sem perder o fio</p></div>
        <div className="mt-5 grid grid-cols-2 gap-3"><div className="v2-card-soft p-4"><p className="text-xs text-text-faint">Tentativas locais</p><p className="mt-1 text-2xl font-black text-text">{attempts.length}</p></div><div className="v2-card-soft p-4"><p className="text-xs text-text-faint">Remediações abertas</p><p className="mt-1 text-2xl font-black text-text">{remediations.length}</p></div></div>
        {remediations.length > 0 ? <ul className="mt-4 space-y-2">{remediations.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2 p-3 text-sm"><span className="text-text-muted">{item.subtemaId}: {item.reason}</span><button type="button" onClick={() => { resolveRemediation(item.id); setVersion((value) => value + 1); }} className="v2-button-quiet">Concluir</button></li>)}</ul> : <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-text-muted">Sem remediações abertas.</p>}
      </article>
    </section>
    </div>
  </main>;
}
