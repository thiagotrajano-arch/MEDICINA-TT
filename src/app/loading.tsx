export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8" role="status" aria-live="polite">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 rounded-lg bg-surface-2" />
        <div className="h-4 w-full max-w-xl rounded bg-surface-2" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-32 rounded-2xl border border-border bg-surface" />)}
        </div>
      </div>
      <span className="sr-only">Carregando conteúdo</span>
    </div>
  );
}
