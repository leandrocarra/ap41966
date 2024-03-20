import { Anexo } from "../anexo/anexo";
import { BoxAnexo } from "../documentos/box-anexo/box-anexo";
import { FaturaDTO } from "../segunda-via/response/segunda-via-response-dto";
import { TaxaReligacao } from "./response/religacao-dto";
export class Religacao {
    constructor(
        public telefone: string,
        public referencia: string,
        public uc: string,
        public dadosTaxa: TaxaReligacao,
        public fluxo: FluxoReligacao,
        public faturas: Array<FaturaDTO>,
        public possuiNotaCorte: boolean,
        public boxAnexo?: BoxAnexo,
        public comprovantes?: Array<Anexo>,
        public dadosFatura?: DadosFaturarReligacao,
        public falhasNoPagamento?: Array<FaturaDTO>
    ) {
        this.boxAnexo = new BoxAnexo('comprovante de pagamento', false, 'comprovante de pagamento');
        this.comprovantes = [];
        this.dadosFatura = new DadosFaturarReligacao(0, new FaturaDTO(), 0);
        this.falhasNoPagamento = [];
    }
}

export type FluxoReligacao = 'pagamento comprovante' | 'pagamento concluido' | 'pagamento com erro' | 'sem débitos' ;

export class DadosFaturarReligacao {
    constructor(
        public totalFaturas: number,
        public fatura: FaturaDTO,
        public index: number,
    ) { }
}