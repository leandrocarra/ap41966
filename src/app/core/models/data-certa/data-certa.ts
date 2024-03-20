import { Servicos } from "app/core/enums/servicos";

export class DataCerta {
    constructor(
        public fluxoDoCliente: FluxoDoClienteDataCerta = '',
        public ultimaAlteracaoDataCerta: Date = new Date(),
        public dataCertaValida: boolean = false,
        public dataDeVencimento: string = ''
    ) { }
}

export type FluxoDoClienteDataCerta = '' | Servicos.trocaDeTitularidade;

export class Aviso {
    constructor(
        public escolha: string = '',
        public titulo: string = '',
        public texto: string = '',
        public tituloColor: string = ''
    ) {
    }
}

export enum TipoDeErro {
    DataDeVencimento = "data-vencimento",
    ContaColetiva = "conta-coletiva",
    Impedimentos = "erro-impedimentos",
    Servico = "erro-servico",
    Indisponivel = "sistema-indisponivel",
    Inesperado = "erro-inesperado"
}

export enum DataAlteracao {
    SEM_DATA_FIXA = 'Sem data fixa',
    DATA_NORMAL_REGULADA = 'Data Normal Regulada'
}

export enum OperacaoDataCerta {
    Consulta = "CON",
    Valida = "VAL",
    Cadastro = "CAD",
    Descadastro = "DES"
}

export enum SubRotasDataCerta {
    alterar = 'alterar',
    aviso = 'aviso',
}

export enum EnumTipificacaoDataCerta {
    Inclusao = '10399022',
    Exclusao = '10399023',
    Informacao = '1010805'
}
