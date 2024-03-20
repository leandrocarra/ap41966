import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";

/**
 * [POST]/UCS/{CODIGO}/AUTOLEITURA
 * Efetiva a autoleitura de um ou mais registrador(es)/espeficações de mediação do cliente
 */
export class AutoleituraDTORequest {
    constructor(
        public codigo: string,
        public valorLeitura: Array<ValorLeituraDTORequest>,
        public headerMetodo: HeaderMetodo,
        public indicadorAlteracao?: string,  //Opcional SAP
        public termoAceite?: string,         //Opcional SAP
    ) {
        this.codigo = codigo;
        this.valorLeitura = [];
        this.headerMetodo = new HeaderMetodo();
    }
}

export class ValorLeituraDTORequest {
    constructor(
        public valor: string,
        public dataLeitura?: string,      //Opcional Sonda
        public codEspec?: string,         //Obrigatório Sonda
        public tipoRegistrador?: string,  //Obrigatório SAP
    ) {
        this.valor = valor
    }
}

/**
 * [GET]/UCS/{CODIGO}/SIMULA-AUTOLEITURA
 * Realiza a simulação de uma autoleitura
 */
export class SimulaAutoleituraDTORequest {
    constructor(
        public codigo: string = "",
        public protocolo: string = "",
        public protocoloSonda: string = "",
        public canalSolicitante: string = "",
        public usuario: string = "",
        public tipificacao: string = "",
        public geraSSOS: string = ""
    ) {}
}

/**
 * [GET]/UCS/{CODIGO}/VALIDA-AUTOLEITURA
 * Retorna se o cliente está no período de autoleitura (SE) e se está apta para realizar a autoleitura (SAP)
 */
export class ValidaAutoleituraDTORequest {
    constructor(
        public codigo: string = "",
        public protocolo: string = "",
        public canalSolicitante: string = "",
        public usuario: string = "",
        public tipificacao: string = "",
        public geraSSOS: string = "",       //Obrigatório Sonda
        public protocoloSonda: string = "",
        public valida: string = ""
    ) {

    }
}

/**
 * [POST]/ANEXAR-FOTO-AUTOLEITURA
 * Efetiva  a autoleitura do cliente - válido para SAP (NE)
 */
export class AnexarFotoAutoleituraDTORequest {
    constructor(
        public codigo: string,
        public canalSolicitante: string,
        public usuario: string,
        public ordemLeitura: string,
        public anexo: string,
        public protocolo: string
    ) { }
}
