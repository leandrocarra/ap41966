import { Protocolo } from './../../protocolo/protocolo';
/* [GET]/endereco-alternativo-valida
/*
/* Método para validar UCs no cadastro de endereço alternativo
/*
/* WSO2
/************************************************************/
export class EnderecoAlternativoValidaDTORequest {
    constructor(
        public codigoSolicitante : string = "",
        public codigoAlternativo : string = "",
        public usuario : string = "",
        public canalSolicitante : string = ""
    ) {}
}

/* [GET]/UCS/{CODIGO}/TAXA-ENTREGA-ALTERNATIVA
/*
/* Serviço que retorna a taxa de entrega de faturas a ser cobrada mensalmente se o usuário optar por entrega 
/* de fatura física em endereço alternativo ou em caixa portal.
/*
/* WSO2
/************************************************************/
export class TaxaEntregaAlternativaDTORequest {
    constructor(
        public usuario : string = "",
        public canalSolicitante : string = "",
        public codigo : string = "",
    ) {}
}

/* 	[POST]/UCS/{CODIGO}/ENTREGA-ALTERNATIVA
/*
/* Método para cadastrar o endereço de entrega alternativa SUDESTE ou caixa postal (SE) para recebimento da fatura física.
/*
/* WSO2
/************************************************************/

export class EntregaAlternativaSudesteDTORequest {
    constructor(
        public headerMetodo : HeaderMetodo = new HeaderMetodo(),
        public endEntregaAlternativa : Endereco =  new Endereco(),
        public contaContratoLocalEntrega : string = "",
        public termoaceite : string = "",
        public vlrTaxaPostg : string = "",
        public codigo : string = "",
    ) {}
}

export class Endereco{
    constructor(
        public bairro : string = "",
        public caixaPostal : string = "",
        public cep : string = "",
        public codigoPais: string =  "",
        public codigoUF : string =  "",
        public complemento : string =  "",
        public logradouro: string = "",
        public municipio: string = "",
        public nomePais: string = "",
        public numero: string = "",
        public uf: string = ""
    ){}
}

/* 	[POST]/UCS/ENTREGA-ALTERNATIVA
/*
/* Método para cadastrar o endereço de entrega alternativa  para recebimento da fatura física.
/*
/* WSO2
/************************************************************/
export class EntregaAlternativaDTORequest {
    constructor(
        public headerMetodo : HeaderMetodo = new HeaderMetodo(),
        public contaContratoLocalEntrega : string = "",
        public termoaceite : string = "",
        public vlrTaxaPostg : string = "",
        public codigo : string = "",
    ) {}
}

export class HeaderMetodo {
    constructor(
        public canalSolicitante : string = "",
        public documentoSolicitante : string = "",
        public identificador : string = "",
        public protocolo : string = "",
        public protocoloSonda : string = "",
        public tipificacao : string = "",
        public unidOrgAT : string = "",
        public usuario : string = "",

    ) {}
}

/* [POST]/UCS/CANCELA-ENTREGA-ALTERNATIVA
/*
/* Método para descadastrar a entrega alternativa ou caixa postal (SE) para recebimento da fatura física, 
/* retornando a entrega para o endereço da UC/imóvel.
/*
/* WSO2
/************************************************************/
export class CancelaEntregaAlternativaDTORequest {
    constructor(
        public codigo : string = "",
        public headerMetodo : HeaderMetodoCancela = new HeaderMetodoCancela()
    ) {}
}

export class HeaderMetodoCancela {
    constructor(
        public protocolo : string = "",
        public protocoloSonda : string = "",
        public atividade : string = "",
        public tipificacao : string = "",
        public documentoSolicitante : string = "",
        public dataCriaAtividade : string = "",
        public canalSolicitante : string = "",
        public usuario : string = "",
        public unidOrgAT : string = "",
    ) {}
}

