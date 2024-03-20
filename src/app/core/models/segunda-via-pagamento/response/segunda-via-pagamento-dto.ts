import { Retorno } from "app/shared/models/retorno/retorno";
import { TipoFatura } from "../../segunda-via/response/segunda-via-response-dto";


export class FaturaSimplificadaDTOResponse {
    constructor(
        public faturasAbertas: Array<FaturaSimplificadaDTO> = [],
        public retorno: Retorno = new Retorno(),
        public e_resultado: string = '',
    ) { }
}

export class FaturaSimplificadaDTO {
    constructor(
        public uc: string = '',
        public endereco: string = '',
        public dataVencimento: string = '',
        public valorEmissao: string = '',
        public numeroCodigoBarras: string = '',
        public codbarras: string = '',
        public numeroBoleto: string = '',
        public statusFatura: string = '',
        public numeroFatura: string = '',
        public tipoFatura: TipoFatura = new TipoFatura()
    ) { }
}

export class TipoFaturaDTO {
    constructor(
        public codigo: string = '',
        public descricao: string = ''
    ) { }
}
