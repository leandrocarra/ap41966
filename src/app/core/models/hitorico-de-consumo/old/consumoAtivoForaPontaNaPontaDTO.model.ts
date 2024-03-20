export class ConsumoAtivoForaPontaNaPontaDTO {
    constructor(
        public unidadeMedicao?: string,
        public valorConsumoAtivoForaPonta?: number,
        public dataConsumoAtivoForaPonta?: Date,
        public valorConsumoAtivoPonta?: number,
        public dataConsumoAtivoPonta?: Date,
        public valorConsumoAtivoReservado?: number,
        public dataConsumoAtivoReservado?: Date
    ) {
        this.unidadeMedicao = unidadeMedicao;
        this.valorConsumoAtivoForaPonta = valorConsumoAtivoForaPonta;
        this.dataConsumoAtivoForaPonta = dataConsumoAtivoForaPonta;
        this.valorConsumoAtivoPonta = valorConsumoAtivoPonta;
        this.dataConsumoAtivoPonta = dataConsumoAtivoPonta;
        this.valorConsumoAtivoReservado = valorConsumoAtivoReservado;
        this.dataConsumoAtivoReservado = dataConsumoAtivoReservado;
    }
};