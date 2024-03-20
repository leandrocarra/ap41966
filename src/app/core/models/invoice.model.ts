export type PdfTO = {
  numSeqOper: string;
  codigo?: string;
  protocolo?: string;
  usuario?: string;
  canalDigital?: string;
  motivo: string;
  opcaoSSOS?: boolean;
};

export type PdfOutputTO = {
  fileName: string;
  fileSize?: number;
  fileData: string;
  fileExtension?: string;
};

export type BarcodeTO = {
  numSeqOper: string;
  codigo?: string;
  protocolo?: string;
  usuario: string;
  canalDigital?: string;
  motivo: string;
  opcaoSSOS?: boolean;
};

export type BarcodeOutputTO = {
  codBarras: string;
  numeroBoleto: string;
};

export type SegundaViaTO = {
  usuario: string;
  canalDigital?: string;
};

export type SegundaViaOutputTO = {
  motivos: ListMotivos[];
};

export type ListMotivos = {
  idMotivo: string;
  descricao: string;
};

export type FaturaSimplificadaTO = {
  documento: string;
  tipoCliente: string;
  dataNascimento?: string;
  codUc?: string;
  protocolo?: string;
  usuario: string;
  canalDigital?: string;
  opcaoSSOS?: boolean;
};

export type FaturaSimplificadaOutputTO = {
  faturasAbertas: ListFaturasAbertas[];
};

export type ListFaturasAbertas = {
  uc: string;
  endereco: string;
  dataVencimento: string;
  valorEmissao: number;
  codBarras: string;
  numeroboleto: string;
  statusFatura: string;
  numeroFatura: boolean;
};

export type InvoiceTO = {
  codigo?: string;
  protocolo?: string;
  documento?: string;
  canalDigital?: string;
  usuario: string;
  dataInicioVencFat?: string;
  dataFimVencFat?: string;
  opcaoSSOS?: boolean;
};

export type InvoiceOuputTO = {
  entregaFaturas: EntregaFatura;
  faturas?: ListFaturas[];
};

export type EntregaFatura = {
  codigoTipoEntrega: string;
  descricaoTipoEntrega: string;
  enderecoEntrega: string;
  codigoTipoArrecadacao: string;
  descricaoTipoArrecadacao: string;
  dataCertaValida: string;
  dataVencimento: string;
  dataCorte: string;
};

export type ListFaturas = {
  statusFatura: string;
  dataCompetencia: string;
  dataEmissao: string;
  dataPagamento: string;
  dataVencimento: string;
  grupoTensao: string;
  mesReferencia: string;
  numeroFatura: number;
  origemFatura: string;
  situacaoComercial: string;
  tipoArrecadacao: string;
  tipoEntrega: string;
  tipoLeitura: string;
  uc: number;
  valorEmissao: number;
  dataInicioPeriodo: string;
  dataFimPeriodo: string;
  emitidoFatAgrupadora: boolean;
  nroFatAgrupadora: string;
  vencFatAgrupada: string;
  valorFatAgrupada: string;
};
