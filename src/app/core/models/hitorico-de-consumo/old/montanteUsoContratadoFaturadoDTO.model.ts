export class MontanteUsoContratadoFaturadoDTO {
    constructor(
        public unidadeMedicao?: string,
        public valorMontanteUsoContratado?: number,
        public dataMontanteUsoContratado?: Date,
        public valorMontanteUso?: number,
        public dataMontanteUso?: Date
    ) {
        this.unidadeMedicao = unidadeMedicao;
        this.valorMontanteUsoContratado = valorMontanteUsoContratado;
        this.dataMontanteUsoContratado = dataMontanteUsoContratado;
        this.valorMontanteUso = valorMontanteUso;
        this.dataMontanteUso = dataMontanteUso;
    }
}