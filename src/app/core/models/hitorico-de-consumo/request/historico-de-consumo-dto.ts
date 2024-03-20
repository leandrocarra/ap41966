
/************************************************************/
/* 3.1	[GET]/UCS/{CODIGO}/CONSUMOS
/*
/* Descrição: Retorna os dados do histórico de consumo e faturamento do cliente.
/* Por padrão, o método deve retornar os últimos 13 meses. Diferente disto, o front irá informar a data necessária de início e fim.
/************************************************************/

import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";

export class ConsumosDTORequest {
    constructor(
        // Obrigatório:
        //public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        // Opcional:
        public dataInicioPeriodoCalc: string = '',
        public dataFimPeriodoCalc: string = '',
        public statusFatura: string = '',
        // Obrigatório Sonda, N/A SAP:
        public protocoloSonda: string = '',
        // Opcional Sonda, N/A SAP:
        public codCliente: string = '',
        public opcaoSSOS: string = '',
        public dataInicioVencFat: string = '',
        public dataFimVencFat: string = '',
        // Opcional SAP, N/A Sonda:
        public protocolo: string = '',
        public atividade: string = '',
        public tipificacao: string = '',
        public documentoSolicitante: string = '',
        public dataCriaAtividade: string = '',
        public byPassAtiv: string = ''
    ) { }
}
