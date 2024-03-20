import { Retorno } from "app/shared/models/retorno/retorno";

/**
 * [POST]/UCS/{CODIGO}/AUTOLEITURA
 * Efetiva a autoleitura de um ou mais registrador(es)/espeficações de mediação do cliente
 */
export class AutoleituraDTOResponse {
    constructor(
        public valorLeitura: Array<ValorLeituraDTOResponse>,
        public retorno: RetornoAutoleituraDTOResponse,
        public os?: string,                //Obrigatório Sonda (SE)
        public e_resultado?: string,       //Obrigatório SAP
        public leituraForaMedia?: string,  //Opcional SAP
    ) { }
}
export class ValorLeituraDTOResponse {
    constructor(
        public tipoRegistrador: string,
        public valor: string,             //Obrigatório SAP
        public ordemLeitura: string,      //Opcional SAP
    ) { }
}
export class RetornoAutoleituraDTOResponse {
    constructor(
        public numero: number,
        public mensagem: string,
        public tipo?: string,         //Obrigatório SAP (NE)
        public id?: string,           //Obrigatório SAP (NE)
        public codigoCPUOs?: string,  //Obrigatório Sonda (SE)
        public numeroSequenciaGeradaOS?: string, //Obrigatório Sonda (SE)
        public numeroSequenciaOperacaoOS?: string, //Obrigatório Sonda (SE)
        public valorConsumido?: string, //Obrigatório Sonda (SE)
    ) { }
}

/**
 * [GET]/UCS/{CODIGO}/SIMULA-AUTOLEITURA
 * Realiza a simulação de uma autoleitura
 */
export class SimulaAutoleituraDTOResponse {
    constructor(
        public grupo: string,
        public equipamentoAutoLeitura: EquipamentoAutoleituraDTOResponse,
        public retorno: Retorno,
    ) { }
}

export class EquipamentoAutoleituraDTOResponse {
    constructor(
        public codigo: string,
        public numero: string,
        public listLeituraAutoLeitura: Array<LeituraAutoleituraDTOResponse>,
    ) { }
}

export class LeituraAutoleituraDTOResponse {
    constructor(
        public constante: number,
        public dataUltimaLeitura: string,
        public dataproximaleitura: string,
        public dias: number,
        public espMedidor: string,
        public ultimoConsumo: string,
        public valor: number,
        public media3Meses: number,
        public media12Meses: number,
        public unidadeMedida: string,
        public codTipoEspEqp: string,
        public desEspLeitura: string,
        public DES_ESPE_LEIT_TEM: string,
    ) { }
}

/**
 * [GET]/UCS/{CODIGO}/VALIDA-AUTOLEITURA
 * Retorna se o cliente está no período de autoleitura (SE) e se está apta para realizar a autoleitura (SAP)
 */
export class ValidaAutoleituraDTOResponse {
    constructor(
        public dataproximaleitura: string,                   //Opcional SAP
        public termoAceite: string,                          //Opcional SAP
        public leituraInformadaMesmoDia?: string,            //Opcional SAP
        public mensagemFalse?: string,                       //Obrigatório Sonda
        public protocoloSonda?: string,                      //Obrigatório Sonda
        public isValidAutoleitura?: boolean,                 //Obrigatório Sonda
        public periodoInicio?: Date,                         //Obrigatório Sonda
        public periodoFim?: Date,                            //Obrigatório Sonda
        public codMedidor?: string,                          //Obrigatório SAP
        public registrador?: Array<RegistradorDTOResponse>,  //Obrigatório SAP
        public e_resultado?: Retorno                         //Obrigatório SAP
    ) { }
}

export class RegistradorDTOResponse {
    constructor(
        public CV: string,                     //Obrigatório SAP
        public CD: string,                     //Obrigatório SAP
        public tipoRegistrador: string,        //Obrigatório SAP
        public descricaoRegistrador: string,   //Obrigatório SAP
        public valorLeitura?: number,           //Opcional SAP
    ) { }
}

/************************************************************/
/* [POST]/anexar-arquivos
/*
/* Função para anexar arquivos dentro da Agência Virtual.
/*
/* Apenas SE.
/************************************************************/
export class AnexarArquivosSudesteDTOResponse {
    constructor(
        public codigo: string = "",
        public mensagem: string = ""
    ) { }
}

/**
 * [POST]/ANEXAR-FOTO-AUTOLEITURA
 * Efetiva  a autoleitura do cliente - válido para SAP (NE)
 */
export class AnexarFotoAutoleituraDTOResponse {
    constructor(
        public retorno: Retorno,     //Obrigatório SAP (NE)
        public e_resultado?: string, //Opcional SAP (NE)

    ) { }
}
