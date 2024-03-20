export type ImoveisTO = {
  documento?: string;
  protocolo?: string;
  usuario?: string;
  canalDigital?: string;
  opcaoSSOS?: boolean;
};

export type ImoveisOutputTO = {
  status?: string;
  uc?: string;
  nomeCliente?: string;
  local?: LocalTO;
  isGrupo?: boolean;
  nomeGrupo?: string;
  grupoTensao?: string;
  brOptante?: boolean;
};

export type LocalTO = {
  endereco?: string;
  bairro?: string;
  municipio?: string;
  codLocalidade?: string;
  cep?: string;
  cnpj?: string,
  uf?: string;
  localizacao?: LocationTO;
  tipoLogradouro?: string;
  nomeLogradouro?: string;
  numero?: string;
  complementoEndereco?: string;
};

export type LocationTO = {
  sigla?: string;
  codigo?: string;
  descricao?: string;
};

export type ImovelTO = {
  codigo?: string;
  protocolo?: string;
  usuario?: string;
  canalDigital?: string;
  opcaoSSOS?: boolean;
};

export type ImovelOutputTO = {
  codigo?: string;
  medidor?: string;
  fase?: string;
  local?: LocalTO;
  situacao?: Dados;
  dataLigacao?: string;
  faturamento?: FaturamentoTO;
  cliente?: ClienteTO;
  servicos?: ServicosTO;
  caracteristicas?: CaracteristicasTO;
};

export type Dados = {
  sigla?: string;
  codigo?: string;
  descricao?: string;
  dataSituacaoUC?: string;
};

export type ClasseConsumoTO = {
  principal: Dados;
  classificacao: Dados;
};

export type ClasseTarifaTO = {
  grupo: Dados;
  subgrupo: Dados;
  tipo: Dados;
};

export type FaturamentoTO = {
  classeConsumo: ClasseConsumoTO;
  classeTarifa: ClasseTarifaTO;
};

export type ClienteTO = {
  codigo: string;
  nome: string;
  dataAtualizazao: string;
  documento: DocumentoTO;
  segundoDocumento: SegundoDocumentoTO;
  contato: ContatoTO;
  dataNascimento: string;
};

export type ServicosTO = {
  baixaRenda: boolean;
  faturaEmail: boolean;
  dataCerta: boolean;
  debitoAutomatico: boolean;
  cadesp: boolean;
  faturaBraile: boolean;
  entregaAlternativa: boolean;
  debitosVencidos: boolean;
  reavisoCorte: boolean;
  listaCorte: boolean;
  medidorTelemedicao: boolean;
};

export type CaracteristicasTO = {
  grandeCliente: boolean;
  irrigacao: boolean;
  vip7: boolean;
  medidorInteligente: boolean;
  espelho: boolean;
  iluminacao: boolean;
};

export type DocumentoTO = {
  tipo: Dados;
  numero: string;
};

export type SegundoDocumentoTO = {
  uf: string;
  orgaoExpedidor: Dados;
  tipo: Dados;
  numero: string;
};

export type TelefoneTO = {
  ddd: string;
  numero: string;
};

export type ContatoTO = {
  email: string;
  celular: TelefoneTO;
  telefone: TelefoneTO;
};

/* export type ImmobileTO = {
  unidadeConsumidora?: string;
  nomeCliente?: string;
  codCliente?: string;
  nomeMaeCliente?: string;
  dataNascimentoCliente?: string;
  situacao?: string;
  local?: LocalTO | any;
  selecionado?: boolean;
  alerta?: AlertTO;
  emailsCadastrados?: string[];
  referencia?: string;
};

export type AlertTO = {
  uc?: string;
  numeroCliente?: string;
  documento?: string;
  debitoVencidoQuantidade?: string;
  faltaLuz?: string;
  previsaoRetorno?: string;
  desligamentoProgramado?: string;
  dataDesligamentoProgramadoInicial?: string;
  dataDesligamentoProgramadoFinal?: string;
  statusEnergia?: string;
  dataCorte?: string;
  periodoAutoLeitura?: string;
  dataLeituraAtual?: string;
  dataProximaLeitura?: string;
  impedimentoLeituraMesAnterior?: string;
  impedimentoLeituraMesAtual?: string;
  tipoEntrega?: string;
  enderecoEntrega?: string;
  tipoArrecadacao?: string;
  vistoriaFoto?: string;
  cadastroAtualizado?: string;
  fatEmailEntregue?: string;
}; */


