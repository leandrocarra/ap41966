export type accordionHeader = {
  imovel: string;
  vencimento: string;
  valor: string;
  situacao: string;
  isSelected: boolean;
  consumo?: string;
  estilo?: string;
};

export type conteudoFatura = {
  mes: string;
  valor: string;
  vencimento: string;
  situacao: string;
  msgSituacao?: string;
  consumo: string;
  periodo: { de: string; a: string };
  dataLeitura: string;
  valorLeitura: string;
  proximaLeitura: string;
  diasConsumo: string;
  estilo?: string;
};