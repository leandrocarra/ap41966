// Useful VS Code shortcuts for this file: | Atalhos úteis no VS Code para este arquivo:
//
// CTRL + K, CTRL + 2 --> Collapse/Fold all codes, except comments. | Colapsar todos os códigos, exceto comentários.
// CTRL + K, CTRL + 0 --> Collapse/Fold all. | Colapsar tudo.
// CTRL + K, CTRL + J --> Expand/Unfold all. | Expandir tudo.


/************************************************************/
/* [POST]/ucs/falta-energia
/*
/* Envia os dados para enviar solicitação de falta de energia.
/************************************************************/
export class POSTFaltaEnergiaDTOResponse {
    constructor(
        public dataCombinada: Date | string = '',
        public statusReclamacao: string = '',
        public ocorrencia: string = '',
        public statusOcorrencia: string = '',
        public retorno: RetornoPOST = new RetornoPOST()
    ) { }
}

/************************************************************/
/* [GET]/ucs/{codigo}/falta-energia
/* 
/* Consulta para verificar se já existe ocorrência em aberto.
/************************************************************/
export class FaltaEnergiaDTOResponse {
    constructor(
//         public notasDeReclamacoes: Array<NotaDeReclamacaoDTO>,
//     ) { }
// }

// export class NotaDeReclamacaoDTO {
//     constructor(
        public resposta: string,
        public dataHoraCombinada: Date | string,
        public dataHoraInclusao: Date | string,
        public retorno: RetornoGET = new RetornoGET(),
        public tipoAviso?: string // Opcional Zeus (SE) | N/A GSE (NE)
    ) { }
}

/************************************************************/
/* [GET]/ucs/{codigo}/falta-energia-ocorrencia
/*
/* Consulta ocorrência de falta de energia.
/************************************************************/
export class FaltaEnergiaOcorrenciaDTOResponse {
    constructor(
        public chamadosPendentes: string,
        public interrupcao: string,
        public retorno: RetornoGET = new RetornoGET(),
        public codigo?: string,
        public estimativaRetorno?: Date | string
    ) { }
}

class RetornoPOST {
    constructor(
        public numero: string = '',
        public descricao: string = '',
        public returnDetails: string = '',
        public resultMessage: string = ''
    ) { }
}

class RetornoGET {
    constructor(
        public id: string = '',
        public returnDetails: string = '',
        public resultMessage: string = '',
        public returnDescription: string = ''
    ) { }
}

