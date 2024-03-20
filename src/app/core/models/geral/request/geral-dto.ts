/************************************************************/
/* [POST]/anexar-arquivos
/*
/* Função para anexar arquivos dentro da Agência Virtual.
/*
/* Apenas SE.
/************************************************************/
export class AnexarArquivosDTORequest {
    constructor(
        public usuario: string = '',
        public canalSolicitante: string = '',
        public codCpu = '01',
        public numSeqGer: string = '1',
        public numSeqOper: string = '',
        public arquivo: AnexoSSOS = new AnexoSSOS()
    ) { }
}

export class AnexoSSOS {
    constructor(
        public codTipoArq: string = '',
        public nomArq: string = '',
        public arqByte: string = '',
    ) { }
}

/************************************************************/
/* [POST]/criarSSinformacao
/*
/* Necessário utilizar este endpoint antes do anexar arquivo Sonda p/ criar o número da SS/OS que será anexado o arquivo. 
/* Número da SS/OS também deverá ser descrito no e-mail enviado p/ Backoffice. 
/*
/* Apenas SE.
/************************************************************/
export class CriarSSinformacaoDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public usuario: string = '',
        public subTipoOs: string = '',
        public observacao: string = '',
        public nomeSolicitante: string = '',
        public celSolicitante: string = '',
        public documentoSolicitante: string = '',
        public docCliente: string = '',
        public codUc: string = '',
        public protocoloSonda: string = '',
        public protocolo: string = '',
        public foneSolicitante?: string,
        public tipoDocSolic?: string,
        public rgSolicitante?: string,
        public ufRgSolicitante?: string,
        public emailSolicitante?: string,
    ) { }
}

/************************************************************/
/* [POST]/gerar-reclamacao
/*
/* Método para gerar uma solicitação para atendimento especializado na Elektro. 
/*
/* Apenas SE.
/************************************************************/
export class GerarReclamacaoDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public tipificacao: string = '',
        public documentoSolicitante = '',
        public protocolo: string = '',
        public protocoloSonda: string = '',
        public usuario: string = '',

        public numSeqOper: string = '',
        public codMotivo: string = '',
        public codTipoSs: string = '',
        public codSubTipoSs: string = '',
        public codTipoOs: string = '',
        public codSubTipoOs: string = '',
        public codTipoMotivo: string = '',
        public observacao: string = '',
        public staResptForm: string = '',
        public codigoOrigem: string = '',
        public numCli: string = '',
        public codigoCanalResposta: string = '',
        public codigo?: string,
        public pontoReferencia?: string,                 
        public celular?: string,             
        public telefone?: string,             
        public categoria?: string,
        public nome?: string,               //Obrigatório Sonda LGPD
        public rg?: string,                 //Obrigatório Sonda LGPD
        public email?: string,              //Obrigatório Sonda LGPD
        public endereco?: Endereco
    ) { }
}

export class Endereco {
    constructor(
        public codMunicipio?: string,
        public codLocalidade?: string,
        public codBairro?: string
    ) { }
}

/************************************************************/
/* [POST]/registro-atendimento
/*
/* Método genérico que registra atendimentos.
/*
/* Apenas SE.
/************************************************************/
export class RegistroAtendimentoDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public usuario: string = '',
        public desMensagem: string = '',
        public numSeqOper: string = '',
        public codCpu: string = '01',
        public contaGerencial: string = '11100000',
        public numSeqGer: string = '1',
    ) { }
}
