import { Retorno } from "app/shared/models/retorno/retorno";

/************************************************************/
/* [POST]/anexar-arquivos
/*
/* Função para anexar arquivos dentro da Agência Virtual.
/*
/* Apenas SE.
/************************************************************/
export class AnexarArquivosDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
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
export class CriarSSinformacaoDTOResponse {
    constructor(
        public numSeqOper: string,
        public codCpu: string,
        public numSeqGer: string,
        public retorno: Retorno = new Retorno()
    ) { }
}


/************************************************************/
/* [POST]/gerar-reclamacao
/*
/* Método para gerar uma solicitação para atendimento especializado na Elektro. 
/*
/* Apenas SE.
/************************************************************/
export class GerarReclamacaoDTOResponse {
    constructor(
        public numSeqOper: string,
        public codCpu: string,
        public numSeqGer: string,
        public retorno: Retorno = new Retorno(),
        public dataProgramada?: string,
    ) { }
}


/************************************************************/
/* [POST]/registro-atendimento
/*
/* Método genérico que registra atendimentos.
/*
/* Apenas SE.
/************************************************************/
export class RegistroAtendimentoDTOResponse {
    constructor(
        public numSeqOper: string,
        public codCpu: string,
        public retorno: Retorno = new Retorno()
    ) { }
}