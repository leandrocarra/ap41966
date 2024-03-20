import { Retorno } from "app/shared/models/retorno/retorno";


/************************************************************/
/* [GET]/UCS/{FATURA}/ENTENDA-CONTA
/*
/* Retorna informações dos valores de consumo e cobrança que compõe a fatura selecionada, bandeira tarifária, consumo e leitura.
/************************************************************/

export class EntendaSuaContaDTOResponse {
    constructor(
        public perdas: string,
        public tributos: string,
        public energia: string,
        public encargos: string,
        public distribuicao: string,
        public transmissao: string,
        public outros: string,
        
        public perdasReais: string,
        public tributosReais: string,
        public energiaReais: string,
        public encargosReais: string,
        public distribuicaoReais: string,
        public transmissaoReais: string,
        public outrosReais: string,
        public bandeiraTarifaria: Array<BandeiraTarifariaDTO>,
        public retorno: Retorno,
        public e_resultado?: string,
        public numSeqOper?: string,
    ) { }
}

export class BandeiraTarifariaDTO {
    constructor(
        public bandeira: string,
        public valorTarifa: number,
        public valorTarifaReais: number,
        public dias: string,
        public dataInicio: string,
        public dataFim: string,
    ) { }
}


//	

/************************************************************/
/* [GET]/UCS/{FATURA}/ENTENDA-CONTA-QUALIDADE
/*
/* Retorna informações dos valores de qualidade de fornecimento.
/************************************************************/

export class EntendaSuaContaQualidadeDTOResponse {
    constructor(
        public dic: DICDTO,
        public fic: FICDTO,
        public dmic: DMICDTO,
        public dicri: DICRIDTO,
        public retorno: Retorno,
        public e_resultado?: string,

    ) { }
}

export class DICDTO {
    constructor(
        public limiteMensal: string,
        public trimestral: string,
        public anual: string,
        public valorApurado: string,
        public creditoApurado?: string, //Obrigatório Sonda N/A SAP 
        public compensado?: string, //Obrigatório Sonda N/A SAP
        public creditoRestante?: string, //Obrigatório Sonda N/A SAP
    ) { }
}

export class FICDTO {
    constructor(
        public limiteMensal: string,
        public trimestral: string,
        public anual: string,
        public valorApurado: string,
        public creditoApurado?: string, //Obrigatório Sonda N/A SAP
        public compensado?: string, //Obrigatório Sonda N/A SAP
        public creditoRestante?: string, //Obrigatório Sonda N/A SAP
    ) { }
}

export class DMICDTO {
    constructor(
        public limiteMensal: string,
        public trimestral: string,
        public anual: string,
        public valorApurado: string,
        public creditoApurado?: string, //Obrigatório Sonda N/A SAP
        public compensado?: string, //Obrigatório Sonda N/A SAP
        public creditoRestante?: string, //Obrigatório Sonda N/A SAP
    ) { }
}

export class DICRIDTO {
    constructor(
        public limiteMensal: string,
        public trimestral?: string, //Obrigatório Sonda N/A SAP
        public anual?: string, //Obrigatório Sonda N/A SAP
        public valorApurado?: string, //Obrigatório Sonda N/A SAP
        public creditoApurado?: string, //Obrigatório Sonda N/A SAP
        public compensado?: string, //Obrigatório Sonda N/A SAP
        public creditoRestante?: string //Obrigatório Sonda N/A SAP
    ) { }
}
