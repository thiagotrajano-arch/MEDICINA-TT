import type { ConteudoSubtema } from "@/domain/content/types";

export const CONTEUDOS_GASTRO_HEMORRAGIA: Record<string, ConteudoSubtema> = {
  "gastro--hemorragia-digestiva--diagnostico-e-conduta": {
    subtemaId: "gastro--hemorragia-digestiva--diagnostico-e-conduta",
    titulo: "Hemorragia digestiva: diagnóstico e conduta",
    atualizadoEm: "2026-08-22",
    origem: "atualizacao_diretriz",
    blocos: [
      { secao: "Primeiros minutos", corpo: "Hematemese, melena ou enterorragia podem representar hemorragia digestiva alta. A prioridade é avaliar via aérea quando necessário, circulação, perfusão, sinais vitais, acesso venoso e resposta à ressuscitação. A etiologia e a estratificação não devem atrasar o suporte inicial." },
      { secao: "Estratificação antes da endoscopia", corpo: "O Glasgow-Blatchford Score pode ser usado antes da endoscopia. A ESGE considera GBS 0–1 uma faixa de muito baixo risco, na qual o manejo ambulatorial com endoscopia programada pode ser considerado quando a avaliação clínica, a segurança do retorno e a estrutura local forem adequadas. Isso não significa risco zero." },
      { secao: "Endoscopia", corpo: "Depois da ressuscitação, a endoscopia digestiva alta deve ser realizada precocemente, em geral em até 24 horas. Não há benefício comprovado em transformar todos os casos estáveis em endoscopia urgente de poucas horas; a prioridade é estabilizar e selecionar os pacientes de maior risco." },
      { secao: "Hemostasia da úlcera", corpo: "Úlceras com sangramento ativo ou vaso visível não sangrante são lesões de alto risco e devem receber hemostasia endoscópica. No sangramento ativo, epinefrina deve ser combinada com uma segunda modalidade, como método térmico ou mecânico; epinefrina isolada não é suficiente." },
      { secao: "Ressangramento", corpo: "Diante de evidência clínica de ressangramento, a estratégia é repetir a endoscopia com nova tentativa de hemostasia. Se essa segunda tentativa falhar, deve-se considerar embolização angiográfica transcateter; cirurgia é alternativa quando a embolização não está disponível ou falha." },
      { secao: "Pontos de prova e segurança", corpo: "- Hemoglobina inicial pode subestimar a perda aguda e não deve ser o único marcador de gravidade.\n- Escore baixo não equivale a alta automática sem plano de segurança.\n- Endoscopia precoce ocorre após ressuscitação, sem atrasar o suporte.\n- Epinefrina isolada não é hemostasia definitiva para úlcera ativa.\n- Ressangramento após segunda tentativa exige escalada para radiologia intervencionista ou cirurgia conforme o cenário." },
    ],
    referencias: [
      "ESGE Guideline — Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage: update 2021: https://www.esge.com/endoscopic-diagnosis-and-management-of-nonvariceal-upper-gastrointestinal-hemorrhage-esge-update-2021",
      "Ministério da Saúde/SAMU 192 — BC21 HDA: https://www.gov.br/saude/pt-br/composicao/saes/samu-192/publicacoes/protocolo-de-suporte-basico-de-vida-1-2.pdf",
    ],
  },
};
