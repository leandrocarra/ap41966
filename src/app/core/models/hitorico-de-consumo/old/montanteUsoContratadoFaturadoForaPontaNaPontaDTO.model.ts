export class MontanteUsoContratadoFaturadoForaPontaNaPontaDTO {
    constructor(
        public unidadeMedicao?: string,
        public valorMontanteUsoContratadoForaPonta?: number,
        public dataMontanteUsoContratadoForaPonta?: Date,
        public valorMontanteUsoForaPonta?: number,
        public dataMontanteUsoForaPonta?: Date,
        public valorMontanteUsoContratadoNaPonta?: number,
        public dataMontanteUsoContratadoNaPonta?: Date,
        public valorMontanteUsoNaPonta?: number,
        public dataMontanteUsoNaPonta?: Date
    ) {
        this.unidadeMedicao = unidadeMedicao;
        this.valorMontanteUsoContratadoForaPonta = valorMontanteUsoContratadoForaPonta;
        this.dataMontanteUsoContratadoForaPonta = dataMontanteUsoContratadoForaPonta;
        this.valorMontanteUsoForaPonta = valorMontanteUsoForaPonta;
        this.dataMontanteUsoForaPonta = dataMontanteUsoForaPonta;
        this.valorMontanteUsoContratadoNaPonta = valorMontanteUsoContratadoNaPonta;
        this.dataMontanteUsoContratadoNaPonta = dataMontanteUsoContratadoNaPonta;
        this.valorMontanteUsoNaPonta = valorMontanteUsoNaPonta;
        this.dataMontanteUsoNaPonta = dataMontanteUsoNaPonta;
    }
}