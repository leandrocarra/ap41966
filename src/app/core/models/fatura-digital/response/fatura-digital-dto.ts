import { Retorno } from "app/shared/models/retorno/retorno";

/************************************************************/
/* [GET]/UCS/{codigo}/FATURA-DIGITAL-VALIDA
/*
/* Para SE será retornado pelo método de seleção de imóveis
/* Valida se a UC está apta para realizar o serviço e apresenta as informações de recebimento atual.
/*
/*
/* [GET]/UCS/FATURA-DIGITAL
/*
/* Descrição: Apresenta os dados de e-mail e/ou WhatsApp cadastrados do usuário.
/************************************************************/
export class FaturaDigitalDTOResponse {
    constructor(
        public retornoSonda: boolean = false,
        public retorno: Retorno = new Retorno(),
        public emailAcesso?: string,
        public emailFatura?: string,
        public e_resultado?: string,
        public possuiFaturaDigital?: string,
        public PossuiFaturaDigital?: string | null,
        public emailCadastro?: string,
        public emailHistorico?: string,
        public dominioWhatsapp?: string,
        public dominioSMS?: string,
        public faturaBraile?: string,
        public faturaEntregaAlternativa?: string
    ) { }
}

/************************************************************/
/* [POST]/UCS/{CODIGO}/FATURA-EMAIL-CADASTRA
/*
/* Descrição: Envia os dados para o sistema a partir da escolha de onde quer receber a fatura.
/************************************************************/

export class FaturaDigitalCadastraDTOResponse {
    constructor(
        public numSeqOper?: string,
        public retorno?: Retorno,
        public e_resultado?: string
    ) { }
}
