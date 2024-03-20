export class MontanteUsoFioContratadoFaturadoGeradorExportacaoDTO {
    constructor(
        public unidadeMedicao?: string,
        public valorMontanteUsoContratadoFioGeradorExportacao?: number,
        public dataMontanteUsoContratadoFioGeradorExportacao?: Date,
        public valorMontanteUsoSistemaFioGeradorExportacao?: number,
        public dataMontanteUsoSistemaFioGeradorExportacao?: Date
    ) {
        this.unidadeMedicao = unidadeMedicao;
        this.valorMontanteUsoContratadoFioGeradorExportacao = valorMontanteUsoContratadoFioGeradorExportacao;
        this.dataMontanteUsoContratadoFioGeradorExportacao = dataMontanteUsoContratadoFioGeradorExportacao;
        this.valorMontanteUsoSistemaFioGeradorExportacao = valorMontanteUsoSistemaFioGeradorExportacao;
        this.dataMontanteUsoSistemaFioGeradorExportacao = dataMontanteUsoSistemaFioGeradorExportacao;
    }
}