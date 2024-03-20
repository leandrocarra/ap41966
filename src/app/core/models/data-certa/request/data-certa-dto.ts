import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";
/**********************************************************/

// data-certa - [PUT]/ucs/{codigo}/{dia}/datacerta

//Definição: Efetiva a data de vencimento da fatura (data certa/data boa).
//Para Nordeste, será utilizada a RFC Z_ATCWS_DATA_VENCIMENTO  com a operação de Cadastro. caso positivo efetuva o cadastro
//ou alteração da data de vencimento fixa da fatura da UC.//


// [POST]/ucs/{codigo}/datacerta-descadastra

//Definição: Descadastra a opção definida pelo cliente de data fixa de vencimento da fatura, voltando ao calendário de faturamento.
//Para Sudeste será desenvolvido um novo método de efetivação (nome a definir) no Projeto CRM para descadastro do data certa;
//Para Nordeste, será utilizada a RFC Z_ATCWS_DATA_VENCIMENTO  com a operação de descadastro.

/**********************************************************/
export class AlterarDataCertaDTORequest {
    constructor(
        public codigo: string = '', // path
        public dia: string = '', // path
        public operacao: string = '', // body
        public canalSolicitante: string = '', // body
        public usuario: string = '', // body
        public tipificacao: string = '', // body
        public documentoSolicitante: string = '', // body
        public protocolo: string = '', // body
        public protocoloSonda: string = '' // body
    ) { }
}

/**********************************************************/

//[GET]/ucs/{codigo}/datacerta
//Definição: realiza a verificação se a UC possui data de vencimento de fatura cadastrado (NE) e traz a data de vencimento cadastrada (NE e SE).

/**********************************************************/
export class DataCertaDTORequest {

    constructor(
        public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public operacao: string = ''
    ) { }
}

/**********************************************************/

//[GET]/ucs/{codigo}/datacerta-dias
//Definição: Apresenta os dias permitidos para o vencimento.
//Não se aplica ao SAP.

/**********************************************************/
export class DataCertaDiasDTORequest {
    constructor(
        public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = ''
    ) { }
}

/**********************************************************/

//[GET]/ucs/{codigo}/datacerta-valida
//Definição: Realiza a verificação se a UC pode efetivar a alteração data de vencimento da fatura.
//Para Nordeste, será utilizada a RFC Z_ATCWS_DATA_VENCIMENTO  com a operação de Valida. caso positivo retornará as datas de acordo com a distribuidora.

/**********************************************************/

export class DataCertaValidaDTORequest {
    constructor(
        public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public operacao: string = '' //Obrigatório SAP
    ) { }
}

