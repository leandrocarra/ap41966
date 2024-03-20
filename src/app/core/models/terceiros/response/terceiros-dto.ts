import { Retorno } from "app/shared/models/retorno/retorno";

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
export class CellereNeoDocumentoDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
    ) { }
}
