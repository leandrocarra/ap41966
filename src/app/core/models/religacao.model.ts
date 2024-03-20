export type ValidaReligacaoTO = {
  codigo?: string;
  usuario?: string;
};

export type ValidaReligacaoOutputTO = {
  validaRegraNegocio?: string;
};

export type TaxaReligacaoTO = {
  codigo?: string;
  usuario?: string;
};

export type TaxaReligacaoOutputTO = {
  tipoTaxa?: string;
  area?: string;
  taxa?: number;
  tempo?: number;
  unidadeTempo?: string;
};

export type ReligacaoImediataTO = {
  codigo?: string;
  protocolo?: string;
  usuario?: string;
  pontoReferencia?: string;
  faturaArrecadada?: FaturaArrecadada[];
};

export type FaturaArrecadada = {
  codCPU?: string;
  dataPagamento?: string;
  localPagamento?: string;
  numSeqOper?: string;
  tipoTaxa?: string;
};

export type ReligacaoImediataOutputTO = {
  religaImediataResposta?: boolean;
};

export type telasAviso = {
  escolha?: string;
  imagem: string;
  titulo: string;
  descricao: string;
  tituloColor: "color-orange-100" | "color-green-sage-100";
  cancelar: boolean;
  solicitarReligacao: boolean;
  protocolo?: string;
};
