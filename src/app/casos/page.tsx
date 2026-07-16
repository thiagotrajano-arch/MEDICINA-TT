import { EmBreve } from "@/components/shell/EmBreve";

export const metadata = { title: "Casos clínicos · Codex Medicus" };

export default function CasosPage() {
  return (
    <EmBreve
      fase="Roadmap · v1.0"
      titulo="Casos clínicos"
      descricao="Casos no formato Einstein: história, anamnese, exame físico, hipóteses, exames, conduta, diagnóstico diferencial e discussão — com referências."
    />
  );
}
