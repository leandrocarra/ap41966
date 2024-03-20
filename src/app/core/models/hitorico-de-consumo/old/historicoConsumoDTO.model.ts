export class HistoricoConsumoDTO {
    constructor(
        public dataPagamento?: Date,
        public dataVencimento?: Date,
        public dataLeitura?: Date,
        public consumoKw?: string,
        public valorPagamento?: number,
        public mesReferencia?: string,
        public numeroLeitura?: string,
        public situacaoLeitura?: string,
        public dataInicioPeriodo?: Date,
        public dataFimPeriodo?: Date,
        public dataProxLeitura?: Date,
        public valorFatura?: number,
        public valorConsumido?: number,
        public valorImposto?: number,
        public situacaoFatura?: string,
        public origem?: string,
        public numeroFatura?: string,
        public statusFatura?: string
    ) {
        this.dataPagamento = dataPagamento;
        this.dataVencimento = dataVencimento;
        this.dataLeitura = dataLeitura;
        this.consumoKw = consumoKw;
        this.valorPagamento = valorPagamento;
        this.mesReferencia = mesReferencia;
        this.numeroLeitura = numeroLeitura;
        this.situacaoLeitura = situacaoLeitura;
        this.dataInicioPeriodo = dataInicioPeriodo;
        this.dataFimPeriodo = dataFimPeriodo;
        this.dataProxLeitura = dataProxLeitura;
        this.valorFatura = valorFatura;
        this.valorConsumido = valorConsumido;
        this.valorImposto = valorImposto;
        this.situacaoFatura = situacaoFatura;
        this.origem = origem;
        this.numeroFatura = numeroFatura;
        this.statusFatura = statusFatura;
    }
}