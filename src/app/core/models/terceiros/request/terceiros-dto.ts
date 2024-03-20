/************************************************************/
/* HTTPS://API.GW.CELLEREIT.COM.BR/NEOCPF
/*
/* Consulta situação do CPF na Receita Federal.
/************************************************************/

/************************************************************/
/* HTTPS://API.GW.CELLEREIT.COM.BR/NEOCNPJ
/*
/* Consulta situação do CNPJ na Receita Federal.
/************************************************************/
export class CellereNeoDocumentoDTORequest {
    constructor(
        public cpf: string = '',
        public cnpj: string = '',
        public databases: string = ''
    ) { }
}