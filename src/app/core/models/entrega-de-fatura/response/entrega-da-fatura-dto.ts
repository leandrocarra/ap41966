import { Retorno } from "app/shared/models/retorno/retorno";

/************************************************************/
/* [GET]/ENDERECO-ALTERNATIVO-VALIDA
/* Válido apenas para o SAP. Não se aplica para Sonda.
/*
/* Definição: Serviço que valida se a UC do solitante e a escolhida para a entrega alternativa estão aptas a realizar o serviço. 
/*  Se sim, retornará o endereço da UC parcialmente omitido da entrega alternativa, a taxa do serviço, 
/*  se o cliente possui fatura digital e aceite cadastrados.
/************************************************************/
export class EnderecoAlternativoValidaDTOResponseNE {
    constructor(
        public enderecoAlternativo: string,
        public e_resultado: string,
        public taxa: number,
        public termoAceite: string,
        public faturaDigital: string,
        public retorno: Retorno
    ) { }
}


/************************************************************/
/* [GET]/UCS/{CODIGO}/TAXA-ENTREGA-ALTERNATIVA
/* 
/* Definição: Serviço que retorna a taxa de entrega de faturas a ser cobrada mensalmente se o usuário optar por entrega de fatura física 
/* em endereço alternativo ou em caixa portal (este último válido apenas para o SE).
/************************************************************/
export class TaxaEntregaAlternativaDTOResponse {
    constructor(
        public taxa: number,
        public retorno: Retorno
    ) { }
}


/************************************************************/
/* [POST]/UCS/ENTREGA-ALTERNATIVA
/* 
/* Definição: Método para cadastrar o endereço de entrega alternativa ou caixa postal (SE) para recebimento da fatura física.
/************************************************************/
export class EntregaAlternativaDTOResponse {
    constructor(
        public numSeqOper: number,
        public e_resultado: string,
        public retorno: Retorno
    ) { }
}

/************************************************************/
/* [POST]/UCS/CANCELA-ENTREGA-ALTERNATIVA
/* 
/* Definição: Método para descadastrar a entrega alternativa ou caixa postal (SE) para recebimento da fatura física,
/*  retornando a entrega para o endereço da UC/imóvel.
/************************************************************/
export class CancelaEntregaAlternativaDTOResponse {
    constructor(
        public numSeqOper: number,
        public e_resultado: string,
        public retorno: Retorno
    ) { }
}

