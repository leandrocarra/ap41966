export type LackOfEnergyTO = {
    codigo: string;
    protocolo: string;
    usuarioUE: string;
  };

export type LackOfEnergyOutputTO = {
  resposta: string;
  dataHoraCombinada: string;
  tipoAviso: string;
  dataHoraInclusao: string;
};

export type PostLackOfEnergyTO = {
  uc: string;
  nomeSolicitante: string;
  telefoneContato?: string;
  condicaoTempo: string;
  origemSolicitante: string;
  subTipoAviso: string;
  informacaoImportante: boolean;
  observacoes: string;
  riscoMorte: boolean;
  protocolo?: string;
  confirmacaoAviso: string;
  confirmacaoProcesso: string;
  canaldigital: string;
  usuarioUE: string;
};

export type PostLackOfEnergyOutputTO = {
  dataCombinada: string;
  ocorrencia: string;
};
