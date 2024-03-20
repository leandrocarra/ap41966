export type OrderDetailTO = {
  numeroSolicitacao: string;
  protocolo: string;
  usuario: string;
  canaldigital: string;
};

export type OrderDetailOutputTO = {
  tipoSS?: string;
  tipoOS?: string;
  uc?: string;
  nroCliente?: string;
  nomeCliente?: string;
  enderecoUC?: string;
  situacaoSS?: string;
  protocolo?: string;
  statusServ?: string;
  reprova?: string;
  motivoCancelamento?: string;
  dataSolicitacao?: string;
  dataStatus?: string;
  email?: string;
  descricaoTipoSS?: string;
  descricaoTipoOS?: string;
  dataLimiteOS?: string;
};

export type OrderTO = {
  codigo: string;
  nroCliente?: string;
  usuario: string;
  protocolo?: string;
  canaldigital: string;
  gerarSSOS?: string;
  periodoInicial?: string;
  periodoFinal?: string;
};

export type OrderOutputTO = {
  tipo?: string;
  subTipo?: string;
  descricao?: string;
  situacao?: string;
  numero?: string;
  protocolo?: string;
  dataCriacao?: string;
  uc?: string;
  nroCliente?: string;
  listPedidoOS?: ListOrderOSTO[];
  tSolicitacoes?: ListTSolicitacoes[];
};

export type ListOrderOSTO = {
  dataConclusao?: string;
  dataOrigem?: string;
  dataSituacao?: string;
  descricaoConclusao?: string;
  descricaoSituacao?: string;
  os?: OSTO;
  sequencia?: number;
};

export type OSTO = {
  tipo?: string;
  subTipo?: string;
  descricao?: string;
};

export type ListTSolicitacoes = {
  numProtocolo?: string;
  tipoSolicitacao?: string;
  datSolicitacao?: string;
  statusSolicitacao?: string;
  num_externo?: number;
  codMedida?: string;
  textoMedida?: string;
  dataMedida?: string;
  statusMedida?: string;
  concl_desejada?: string;
};
