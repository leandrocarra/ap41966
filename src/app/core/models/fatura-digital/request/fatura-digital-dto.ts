import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";

/************************************************************/
/* [GET]/ucs/{codigo}/fatura-digital-valida
/*
/* Para SE será retornado pelo método de seleção de imóveis
/* Valida se a UC está apta para realizar o serviço e apresenta as informações de recebimento atual.
/************************************************************/

export class FaturaDigitalValidaDTORequest {
    constructor(
        public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public operacao: string = '',
        public tipificacao?: string,            //somente NE e para operação CAD ou DES
        public documentoSolicitante?: string,   //somente NE e para operação CAD ou DES
        public protocolo?: string,              //somente NE e para operação CAD ou DES
        public atividade?: string,
        public dataCriaAtividade?: string,      //somente NE e para operação CAD ou DES
        public email?: string,                   //somente NE e para operação CAD ou DES
        public unidOrgAt?: string,               //somente NE - Opcional
        public identificador?: string,            //somente NE - Opcional
        public valida?: string
    ) { }
}

/************************************************************/
/* [GET]/UCS/FATURA-DIGITAL
/*
/* Descrição: Apresenta os dados de e-mail e/ou WhatsApp cadastrados do usuário.
/************************************************************/

export class FaturaDigitalDTORequest {
    constructor(
        public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public pass?: string,                       //Obrigatório SE
        public operacao?: string,
        public atividade?: string,                  //somente NE e para operação CAD ou DES
        public tipificacao?: string,                //somente NE e para operação CAD ou DES
        public documentoSolicitante?: string,       //somente NE e para operação CAD ou DES
        public dataCriaAtividade?: string,          //somente NE e para operação CAD ou DES
        public protocolo?: string,                  //somente NE e para operação CAD ou DES
        public email?: string,                      //somente NE e para operação CAD ou DES
    ) { }
}

/************************************************************/
/* [POST]/UCS/{CODIGO}/FATURA-EMAIL-CADASTRA
/*
/* Descrição: Envia os dados para o sistema a partir da escolha de onde quer receber a fatura.
/************************************************************/
export class FaturaEmailCadastraDTORequest {
    constructor(
        public nome: string = '',
        public codigo: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public operacao: string = '',
        public tipificacao: string = '',
        public documentoSolicitante: string = '',
        public protocolo: string = '',
        public protocoloSonda: string = '',
        public email: string = ''
    ) { }
}
