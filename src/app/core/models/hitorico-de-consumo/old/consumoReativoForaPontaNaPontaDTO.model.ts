export class ConsumoReativoForaPontaNaPontaDTO {
    constructor(
        public unidadeMedicao?: string,
        public valorConsumoReativoForaPonta?: number,
        public dataConsumoReativoForaPonta?: Date,
        public valorConsumoReativoPonta?: number,
        public dataConsumoReativoPonta?: Date,
        public valorConsumoReativoIntermediario?: number,
        public dataConsumoReativoIntermediario?: Date,
        public valorConsumoReativoReservado?: number,
        public dataConsumoReativoReservado?: Date
    ) {
        this.unidadeMedicao = unidadeMedicao;
        this.valorConsumoReativoForaPonta = valorConsumoReativoForaPonta;
        this.dataConsumoReativoForaPonta = dataConsumoReativoForaPonta;
        this.valorConsumoReativoPonta = valorConsumoReativoPonta;
        this.dataConsumoReativoPonta = dataConsumoReativoPonta;
        this.valorConsumoReativoIntermediario = valorConsumoReativoIntermediario;
        this.dataConsumoReativoIntermediario = dataConsumoReativoIntermediario;
        this.valorConsumoReativoReservado = valorConsumoReativoReservado;
        this.dataConsumoReativoReservado = dataConsumoReativoReservado;
    }
};