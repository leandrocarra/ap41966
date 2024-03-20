/************************************************************/
/* [POST]/ucs/falta-energia
/*
/* Envia os dados para enviar solicitação de falta de energia.
/************************************************************/
export class POSTFaltaEnergiaDTORequest {
    constructor(
        // Obrigatórios:
        public uc: string,
        public observacoes: string,
        public tipificacao: number,
        public telefoneContato: string,
        public nomeSolicitante: string,
        public protocolo: string,
        public usuario: string,
        public canalSolicitante: string,
        // Obrigatórios GSE (NE):
        public matriculaPlataforma?: number,
        public endereco?: string,
        public numeroEndereco?: string | number,
        public pontoReferencia?: string,
        public diaSemana?: string,
        public motivoId?: string,
        public documentoSolicitante?: string,
        // Obrigatórios ZEUS (SE):
        public condicaoTempo?: string,
        public origemSolicitante?: string,
        public subTipoAviso?: string,
        public informacaoImportante?: boolean,
        public riscoMorte?: boolean,
        public confirmacaoAviso?: string,
        public confirmacaoProcesso?: string,
        // Opcionais:
        public atividade?: string,
        public documento?: string,
        public tipoAviso?: string,
        public horaOscilacao?: string, // Obrigatório para fluxo 'Oscilação' para SE e NE.
        public criadoPor?: string,
        public celularAvulso?: string,
        public emailAvulso?:string,
        public enderecoUCAvulsa?: string,
        public nomeAvulso?: string,
        public telefoneAvulso?: string
    ) { }
}



/************************************************************/
/* [GET]/ucs/{codigo}/falta-energia
/*
/* Consulta para verificar se já existe ocorrência em aberto.
/************************************************************/
export class FaltaEnergiaDTORequest {
    constructor(
        // Obrigatório para ambos:
        public codigo: string = '',
        public protocolo: string = '',
        public tipificacao: number = 0,
        public canalSolicitante: string = '',
        // Obrigatório NE:
        public matriculaPlataforma: string = '',
        public documentoSolicitante: string = '',
        public byPassActiv: string = ''
    ) { }
}



/************************************************************/
/* [GET]/ucs/{codigo}/falta-energia-ocorrencia
/*
/* Consulta ocorrência de falta de energia.
/************************************************************/
export class FaltaEnergiaOcorrenciaDTORequest {
    constructor(
        // Obrigatório para ambos:
        public codigo: string = '',
        public protocolo: string = '',
        public tipificacao: number = 0,
        public canalSolicitante: string = '',
        // Obrigatório NE:
        public matriculaPlataforma: string = '',
        public documentoSolicitante: string = '',
        public byPassActiv: string = ''
    ) { }
}

