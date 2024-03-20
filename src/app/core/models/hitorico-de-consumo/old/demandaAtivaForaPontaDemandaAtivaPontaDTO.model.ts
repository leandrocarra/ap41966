export class DemandaAtivaForaPontaDemandaAtivaPontaDTO {
    constructor(
        public unidadeMedicao?: string,
        public valorDemandaAtivaFaturadaForaPonta?: number,
        public dataDemandaAtivaFaturadaForaPonta?: Date,
        public valorDemandaAtivaFaturadaNaPonta?: number,
        public dataDemandaAtivaFaturadaNaPonta?: string,
        public valorDemandaAtivaMedida?: number,
        public dataDemandaAtivaMedida?: Date,
    ) {
        this.unidadeMedicao = unidadeMedicao;
        this.valorDemandaAtivaFaturadaForaPonta = valorDemandaAtivaFaturadaForaPonta;
        this.dataDemandaAtivaFaturadaForaPonta = dataDemandaAtivaFaturadaForaPonta;
        this.valorDemandaAtivaFaturadaNaPonta = valorDemandaAtivaFaturadaNaPonta;
        this.dataDemandaAtivaFaturadaNaPonta = dataDemandaAtivaFaturadaNaPonta;
        this.valorDemandaAtivaMedida = valorDemandaAtivaMedida;
        this.dataDemandaAtivaMedida = dataDemandaAtivaMedida;
    }
}