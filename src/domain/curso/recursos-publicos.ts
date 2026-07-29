export interface TopicoRecomendadoPublico {
  subtemaId: string;
  nome: string;
  href: string;
  motivo: "alto_rendimento" | "conteudo_disponivel";
}

/**
 * Catálogo serializável derivado apenas da taxonomia e conteúdo publicados.
 * Não contém notas, documentos privados, dados do SISCAD ou progresso pessoal.
 */
export interface RecursosPublicosDisciplina {
  disciplinaId: string;
  slug: string;
  nome: string;
  marca: string;
  temas: number;
  subtemas: number;
  resumos: number;
  questoes: number;
  casos: number;
  figuras: number;
  lacunasDeConteudo: number;
  topicosRecomendados: TopicoRecomendadoPublico[];
}
