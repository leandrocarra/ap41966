import { Retorno } from "app/shared/models/retorno/retorno";

// [POST]/ucs/{codigo}/datacerta-descadastra
// [PUT]/ucs/{codigo}/{dia}/datacerta  (sao utilitazods os mesmos parametros para descadastrar e alterar DataCerta)
export class AlterarDataCertaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno(),
        public numSeqOper: string = '',
        public e_resultado: string = ''
    ) { }
}

//[GET]/ucs/{codigo}/datacerta
export class DataCertaDTOResponse {
    constructor(
        public dia: string = '',
        public dataAtual: string = '',
        public retorno: Retorno = new Retorno(),
        public possuiDataBoa: string = '',
        public e_resultado: string = '',
        public dias: Array<{ dia: string }> = []
    ) { }
}

//[GET]/ucs/{codigo}/datacerta-dias - apenas SONDA = (SE)
export class DataCertaDiasDTOResponse {
    constructor(
        public dias: Array<{ dia: string }> = [],
        public retorno: Retorno = new Retorno()
    ) { }
}

//[GET]/ucs/{codigo}/datacerta-valida
export class DataCertaValidaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno(),
        public e_resultado: string = '',
        public possuiDataBoa: string = '',
        public dataAtual: string = '',
        public dias: Array<{ dia: string }> = []
    ) { }
}





