import { EmBreve } from "@/components/shell/EmBreve";

export const metadata = { title: "Simulado · Codex Medicus" };

export default function SimuladoPage() {
  return (
    <EmBreve
      fase="Roadmap · v1.0"
      titulo="Modo Simulado"
      descricao="Simulados completos cronometrados, questões embaralhadas, correção automática e relatório de desempenho por disciplina — no estilo da prova OMED."
    />
  );
}
