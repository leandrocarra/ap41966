import { Retorno } from "app/shared/models/retorno/retorno";

export class FaturaSimplificadaDTOResponse {
    constructor(
        public faturasAbertas?: Array<FaturaAbertaDTO>,
        public retorno?: Retorno
    ) {
        this.faturasAbertas = faturasAbertas;
                this.retorno = retorno;
    }
}

export class FaturaDTO {
    constructor(
        public dataCompetencia: Date = new Date('00-00-0000'),
        public dataEmissao: Date = new Date('00-00-0000'),
        public dataFimPeriodo: Date = new Date('00-00-0000'),
        public dataInicioPeriodo: Date = new Date('00-00-0000'),
        public dataPagamento: Date = new Date('00-00-0000'),
        public dataVencimento: Date = new Date('00-00-0000'),
        public emitidoFatAgrupadora: boolean = false,
        public grupoTensao: string = '-',
        public mesReferencia: Date = new Date('00-00-0000'),
        public nroFatAgrupadora: string = '0',
        public numeroFatura: string = '0',
        public origemFatura: string = '-',
        public situacaoComercial: string = '-',
        public statusFatura: string = '-',
        public tipoArrecadacao: string = '-',
        public tipoEntrega: string = '-',
        public tipoLeitura: string = '-',
        public uc: string = '0',
        public valorEmissao: string = '0',
        public valorFatAgrupada: string = '0',
        public vencFatAgrupada: Date = new Date('00-00-0000'),
        public selecionado: boolean = false,
        public tipoFatura?: TipoFatura
    ) { }
}

export class TipoFatura {
    constructor(
        public codigo?: string,
        public descricao?: string
    ) {
        this.codigo = codigo;
        this.descricao = descricao;
    }
}

export class MotivoDTO {
    constructor(
        public descricao?: string,
        public idMotivo?: string
    ) {
        this.descricao = descricao;
        this.idMotivo = idMotivo;
    }
}

export class ListaMotivoDTOResponse {
    constructor(
        public motivos?: Array<MotivoDTO>,
        public retorno?: Retorno
    ) {
        this.motivos = motivos;
        this.retorno = retorno;
    }
}
export class FaturaAbertaDTO {
    constructor(
        public codbarras: string = '',
        public dataVencimento: string = '',
        public endereco: string = '',
        public numeroFatura: string = '',
        public numeroBoleto: string = '',
        public statusFatura: string = '',
        public uc: string = '',
        public valorEmissao: string = ''
    ) {
    }
}

export class FaturasDTOResponse {
    constructor(
        public entregaFaturas: EntregaFaturasDTO,
        public faturas?: Array<FaturaDTO>,
        public retorno?: Retorno
    ) {
        this.entregaFaturas = entregaFaturas;
        this.faturas = faturas;
        this.retorno = retorno;
    }
}

export class DadosPagamentoDTOResponse {
    constructor(
        public numSeqOper?: string,   //Opcional Sonda - N/A SAP
        public dadosPagamento: DadosPagamento = new DadosPagamento(),
        public protocoloGerado: number = 0,
        public codBarras: string = '',
        public numeroBoleto: string = '',
        public retorno: Retorno = new Retorno()
    ) { }
}

export class DadosPagamento {
    constructor(
        public codBarras: string = '',
        public numeroBoleto: string = '',
        public numeroFatura: number = 0,
        public numSeqOper: number = 0
    ) { }
}

export class PdfDTOResponse {
    constructor(
        public fileData?: string,
        public fileExtension?: string,
        public fileName?: string,
        public fileSize?: string,
    ) { }
}

export class EntregaFaturasDTO {
    constructor(
        public codigoTipoArrecadacao?: string,
        public codigoTipoEntrega?: string,
        public dataCertaValida?: string,
        public dataCorte?: Date,
        public descricaoTipoArrecadacao?: string,
        public descricaoTipoEntrega: string = '',
        public enderecoEntrega: string = ''
    ) {
        this.codigoTipoArrecadacao = codigoTipoArrecadacao;
        this.codigoTipoEntrega = codigoTipoEntrega;
        this.dataCertaValida = dataCertaValida;
        this.dataCorte = dataCorte;
        this.descricaoTipoArrecadacao = descricaoTipoArrecadacao;
        this.descricaoTipoEntrega = descricaoTipoEntrega;
        this.enderecoEntrega = enderecoEntrega;
    }
}

export class GerarURLFlexPagDTOResponse {
    constructor(
        public status: number,
        public message: string,
        public has_errors: boolean,
        public url: string,
    ) { }
}