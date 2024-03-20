import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";



/************************************************************/
/* [GET]/ENDERECO-ALTERNATIVO-VALIDA
/* Válido apenas para o SAP. Não se aplica para Sonda.
/*
/* Definição: Serviço que valida se a UC do solitante e a escolhida para a entrega alternativa estão aptas a realizar o serviço. 
/*  Se sim, retornará o endereço da UC parcialmente omitido da entrega alternativa, a taxa do serviço, 
/*  se o cliente possui fatura digital e aceite cadastrados.
/************************************************************/
export class EnderecoAlternativoValidaDTORequestNE {
    constructor(
        public codigoSolicitante: string,
        public codigoAlternativo: string,
        public usuario: string,
        public canalSolicitante: string
    ) {
        this.codigoSolicitante = this.codigoSolicitante ?? "";
        this.codigoAlternativo = this.codigoAlternativo ?? "";
        this.usuario = this.usuario ?? "";
        this.canalSolicitante = this.canalSolicitante ?? "";
    }
}


/************************************************************/
/* [GET]/UCS/{CODIGO}/TAXA-ENTREGA-ALTERNATIVA
/* 
/* Definição: Serviço que retorna a taxa de entrega de faturas a ser cobrada mensalmente se o usuário optar por entrega de fatura física 
/* em endereço alternativo ou em caixa portal (este último válido apenas para o SE).
/************************************************************/
export class TaxaEntregaAlternativaDTORequest {
    constructor(
        public codigo: number,
        public canalSolicitante: string,
        public usuario: string,
        public pass: string
    ) {
        this.codigo = this.codigo ?? "";
        this.canalSolicitante = this.canalSolicitante ?? "";
        this.usuario = this.usuario ?? "";
        this.pass = this.pass ?? "";
    }
}



/************************************************************/
/* [POST]/UCS/ENTREGA-ALTERNATIVA
/* 
/* Definição: Método para cadastrar o endereço de entrega alternativa ou caixa postal (SE) para recebimento da fatura física.
/************************************************************/
export class EntregaAlternativaDTORequest {
    constructor(
        public codigo: string,
        public headerMetodo: HeaderMetodo,
        public vlrTaxaPostg: string,
        public endEntregaAlternativa?: EntregaAlternativa,      // Sonda Obrigatório | SAP N/A
        public pass?: string,                                   // Sonda Obrigatório | SAP N/A
        public contaContratoLocalEntrega?: string,              // Sonda N/A         | SAP Obrigatório
        public termoAceite?: string,                            // Sonda N/A         | SAP Opcional
    ) {
        this.codigo = this.codigo ?? "";
        this.headerMetodo = this.headerMetodo ?? "";
        this.vlrTaxaPostg = this.vlrTaxaPostg ?? "";
        this.endEntregaAlternativa = this.endEntregaAlternativa ?? new EntregaAlternativa();
        this.pass = this.pass ?? "";
        this.contaContratoLocalEntrega = this.contaContratoLocalEntrega ?? "";
        this.termoAceite = this.termoAceite ?? "";
    }
}

export class EntregaAlternativa {
    public cep: number;
    public codigoUF: string;
    public municipio: string;
    public uf: string;
    public codigoPais: string;
    public nomePais: string;
    constructor(
        cep?: number,                           // Sonda Obrigatório | SAP N/A
        codigoUF?: string,                      // Sonda Obrigatório | SAP N/A
        municipio?: string,                     // Sonda Obrigatório | SAP N/A
        uf?: string,                            // Sonda Obrigatório | SAP N/A
        codigoPais?: string,                    // Sonda Obrigatório | SAP N/A
        nomePais?: string,                      // Sonda Obrigatório | SAP N/A
        public logradouro?: string,             // Sonda Opcional    | SAP N/A
        public caixaPostal?: string,            // Sonda Opcional    | SAP N/A
        public complemento?: string,            // Sonda Opcional    | SAP N/A
        public bairro?: string,                 // Sonda Opcional    | SAP N/A
        public numero?: string,                 // Sonda Opcional    | SAP N/A
    ) {
        this.cep = cep ?? 0;;
        this.codigoUF = codigoUF ?? "";
        this.municipio = municipio ?? "";
        this.uf = uf ?? "";
        this.codigoPais = codigoPais ?? "";
        this.nomePais = nomePais ?? "";
        this.logradouro = this.logradouro ?? "";
        this.caixaPostal = this.caixaPostal ?? "";
        this.complemento = this.complemento ?? "";
        this.bairro = this.bairro ?? "";
        this.numero = this.numero ?? "";
    }
}



/************************************************************/
/* [POST]/UCS/CANCELA-ENTREGA-ALTERNATIVA
/* 
/* Definição: Método para descadastrar a entrega alternativa ou caixa postal (SE) para recebimento da fatura física,
/*  retornando a entrega para o endereço da UC/imóvel.
/************************************************************/
export class CancelaEntregaAlternativaDTORequest {
    constructor(
        public codigo: string,
        public headerMetodo: HeaderMetodo,
        public pass: string
    ) {
        this.codigo = this.codigo ?? "";
        this.headerMetodo = this.headerMetodo ?? new HeaderMetodo("", "");
        this.pass = this.pass ?? "";
    }
}



