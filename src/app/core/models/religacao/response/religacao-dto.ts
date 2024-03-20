import { Retorno } from "app/shared/models/retorno/retorno";

/**
 * [GET]/UCS/{CODIGO}/VALIDA-RELIGACAO
 * Verifica se a unidade consumidora está apta para efetivar uma religação
 */
export class ValidaReligacaoDTOResponse  {
    constructor(
        public retorno: Retorno,
        public taxaReliga?: string,  //Obrigatório SAP - N/A Sonda
        public prazoReligacao?: string, //Obrigatório SAP - N/A Sonda
        public possuiDebito?: string,   //Obrigatório SAP - N/A Sonda
        public e_resultado?: string,    //Obrigatório SAP

    ) { }
}

/**
 * [GET]/UCS/{CODIGO}/TAXA-RELIGACAO
 * Informa o valor da taxa de serviço cobrada para a religação
 */
export class TaxaReligacaoDTOResponseSE {
    constructor(
        public  taxaReligacao: Array<TaxaReligacao>,
        public retorno: Retorno
    ) { }
}

export class TaxaReligacao {
    constructor(
        public area: string,
        public taxa: string,
        public tempo: string,
        public unidadeTempo: string,
        public tempoUrgente?: string 
    ) { }
}

/**
 * [POST]/UCS/{CODIGO}/RELIGACAO-IMEDIATA
 * Registrar o pedido de religação do usuário. Este método efetiva a religação
 */
export class ReligacaoImeadiataDTOResponse {
    constructor(
        public retorno: Retorno,
        public nota?: number,  //Opcional SAP
        public cpuOs?: number, //Opcional Sonda
        public seqGerOs?: number, //Opcional Sonda
        public numSeqOper?: string, //Obrigatório Sonda
        public e_resultado?: string, //Obrigatório SAP
    ) { }
}



