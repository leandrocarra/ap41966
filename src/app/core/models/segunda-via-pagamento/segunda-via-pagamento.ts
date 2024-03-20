import { FaturaDTO } from "../segunda-via/response/segunda-via-response-dto";
import { FaturaSimplificadaDTO } from "./response/segunda-via-pagamento-dto";

export class FluxoSegundaViaPagamento {
    constructor(
        public fluxoIniciado: boolean = false,
        public tipoDocumento: string = '',
        public documento: string = '',
        public dataDeNascimento: string = '',
        public uc: string = '',
        public faturasFiltradas: Array<FaturaSimplificadaDTO> = []
    ) { }
}

export class UCCondensada {
    constructor(
        public numeroUc: string = '',
        public endereco: string = ''
    ) { }
}

export enum CodigoTipoFatura {
    Periodica = 'PR',
    Coletiva = 'CL'
}

export interface DialogDataInternetBankingInterface {
    fatura: FaturaDTO;
    faturaAberta: FaturaSimplificadaDTO;
}