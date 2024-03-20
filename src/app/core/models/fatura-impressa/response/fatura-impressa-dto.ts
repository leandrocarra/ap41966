import { Protocolo } from './../../protocolo/protocolo';
/* [GET]/endereco-alternativo-valida
/*
/* Método para validar UCs no cadastro de endereço alternativo
/*
/* WSO2
/************************************************************/
export class EnderecoAlternativoValidaDTOResponse {
    constructor(
        public e_resultado : string = "",
        public enderecoAlternativo : EnderecoAlternativo = new EnderecoAlternativo(),
        public faturaDigital : string = "",
        public retorno : Retorno = new Retorno(),
        public taxa : string = "",
        public termoaceite : string = "",
    ) {}
}

export class EnderecoAlternativo{
    constructor(
        public codigo : string = "",
        public coletiva : string = "",
        public endereco : EnderecoUC = new EnderecoUC(),
        public statusCodigo : string = "",
        public tipoConta : string = "",
        public vip : string = ""
    ) {}
}

export class EnderecoUC{
    constructor(
        public bairro : string = "",
        public cep : string = "",
        public endereco : string = "",
        public municipio : string = "",
        public uf : string = "",
        public numero : string = "",
        public caixaPostal : string = "",
        public complemento : string = "",
    ) {}
}

export class Retorno{
    constructor(
        public id : string = "",
        public mensagem : string = "",
        public numero : string = "",
        public tipo : string = ""
    ) {}
}

/* [GET]/UCS/{CODIGO}/TAXA-ENTREGA-ALTERNATIVA
/*
/* Serviço que retorna a taxa de entrega de faturas a ser cobrada mensalmente se o usuário optar por entrega 
/* de fatura física em endereço alternativo ou em caixa portal.
/*
/* WSO2
/************************************************************/
export class TaxaEntregaAlternativaDTOResponse {
    constructor(
        public taxa : string = "",
        public retorno : Retorno = new Retorno()
    ) {}
}
/* 	[POST]/UCS/ENTREGA-ALTERNATIVA
/*
/* Método para cadastrar o endereço de entrega alternativa ou caixa postal (SE) para recebimento da fatura física.
/*
/* WSO2
/************************************************************/
export class EntregaAlternativaDTOResponse {
    constructor(
        public e_resultado : string = "",
        public retorno : Retorno = new Retorno()
    ) {}
}

/* [POST]/UCS/CANCELA-ENTREGA-ALTERNATIVA
/*
/* Método para descadastrar a entrega alternativa ou caixa postal (SE) para recebimento da fatura física, 
/* retornando a entrega para o endereço da UC/imóvel.
/*
/* WSO2
/************************************************************/
export class CancelaEntregaAlternativaDTOResponse {
    constructor(
        public e_resultado : string = "",
        public retorno : Retorno = new Retorno()
    ) {}
}

