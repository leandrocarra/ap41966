
/************************************************************/
/* 3.1	[GET]/UCS/{CODIGO}/CONSUMOS
/*
/* Descrição: Retorna os dados do histórico de consumo e faturamento do cliente.
/* Por padrão, o método deve retornar os últimos 13 meses. Diferente disto, o front irá informar a data necessária de início e fim.
/************************************************************/

import { Retorno } from "app/shared/models/retorno/retorno";

export class ConsumosDTOResponse {
    constructor(
        public historicoConsumo: Array<LeituraDeConsumoDTO> = [],
        public espMedidor: string = '',                                 //Sonda: Obrigatório    | SAP: N/A
        public numSeqOper: string = '',                                 //Sonda: Opcionnal      | SAP: N/A
        public e_resultado: string = '',                                //Sonda: N/A            | SAP: Obrigatório
        public retorno: Retorno = new Retorno(),
    ) { }
}

export class LeituraDeConsumoDTO {

    constructor(
        public dataPagamento: Date = new Date(0),                       //Sonda: Opcionnal      | SAP: Opcional
        public dataVencimento: Date = new Date(0),                      //Sonda: Obrigatório    | SAP: Obrigatório
        public consumoKw: any = 0,                                   //Sonda: Obrigatório    | SAP: Obrigatório
        public mesReferencia: Date = new Date(0),                              //Sonda: Obrigatório    | SAP: Obrigatório
        public especificacao: Array<EspecificacaoConsumoDTO> = [],
        public dataLeitura: Date = new Date(0),                         //Sonda: Obrigatório    | SAP: Obrigatório
        public numeroLeitura: string = '',                              //Sonda: Obrigatório    | SAP: Obrigatório
        public dataInicioPeriodoCalc: Date = new Date(0),               //Sonda: Obrigatório    | SAP: Obrigatório
        public dataFimPeriodoCalc: Date = new Date(0),                  //Sonda: Obrigatório    | SAP: Obrigatório
        public dataProxLeitura: Date = new Date(0),                     //Sonda: Obrigatório    | SAP: Obrigatório
        public valorFatura: string = '',                                 //Sonda: Obrigatório    | SAP: Obrigatório
        public situacaoFatura: string = '',                             //Sonda: Obrigatório    | SAP: Obrigatório
        public origem: string = '',                                     //Sonda: Obrigatório    | SAP: Obrigatório
        public numeroFatura: string = '',                               //Sonda: Obrigatório    | SAP: Obrigatório
        public statusFatura: string = '',                               //Sonda: Obrigatório    | SAP: Obrigatório
        public indicativoCustoDisponibibilidade: boolean | string = '', //Sonda: Opcionnal      | SAP: Opcionnal
        public indicativoMedia: boolean | string = '',                  //Sonda: Opcionnal      | SAP: Opcionnal
        public msgDispMedia: string = '',                               //Sonda: Opcionnal      | SAP: Opcionnal
        public mediaDiaria: string = '',                                //Sonda: Obrigatório    | SAP: Obrigatório
        public mediaMensal: string = '',                                //Sonda: Obrigatório    | SAP: Obrigatório                               //Sonda: Opcionnal      | SAP: Opcionnal
    ) { }
}

export class EspecificacaoConsumoDTO {
    constructor(
        public especificacao: string = '',                              //Sonda: Obrigatório    | SAP: N/A
        public dataLeitura: string = '',                                //Sonda: Obrigatório    | SAP: Obrigatório
        public numeroLeitura: string = '',                              //Sonda: Obrigatório    | SAP: Obrigatório
        public tipoLeitura: string = '',                                //Sonda: Opcional       | SAP: Opcional
    ) { }
}
