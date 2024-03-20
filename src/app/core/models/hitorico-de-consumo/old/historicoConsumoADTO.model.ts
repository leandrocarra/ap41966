import { ConsumoAtivoForaPontaNaPontaDTO } from "./consumoAtivoForaPontaNaPontaDTO.model";
import { ConsumoReativoForaPontaNaPontaDTO } from "./consumoReativoForaPontaNaPontaDTO.model";
import { DemandaAtivaForaPontaDemandaAtivaPontaDTO } from "./demandaAtivaForaPontaDemandaAtivaPontaDTO.model";
import { MontanteUsoContratadoFaturadoDTO } from "./montanteUsoContratadoFaturadoDTO.model";
import { MontanteUsoContratadoFaturadoForaPontaNaPontaDTO } from "./montanteUsoContratadoFaturadoForaPontaNaPontaDTO.model";
import { MontanteUsoFioContratadoFaturadoGeradorExportacaoDTO } from "./montanteUsoFioContratadoFaturadoGeradorExportacaoDTO.model";

export class HistoricoConsumoADTO {
    constructor(
        public consumoAtivoForaPontaNaPonta?: ConsumoAtivoForaPontaNaPontaDTO,
        public consumoReativoForaPontaNaPonta?: ConsumoReativoForaPontaNaPontaDTO,
        public demandaAtivaForaPontaDemandaAtivaPonta?: DemandaAtivaForaPontaDemandaAtivaPontaDTO,
        public montanteUsoContratadoFaturado?: MontanteUsoContratadoFaturadoDTO,
        public montanteUsoContratadoFaturadoForaPontaNaPonta?: MontanteUsoContratadoFaturadoForaPontaNaPontaDTO,
        public montanteUsoFioContratadoFaturadoGeradorExportacao?: MontanteUsoFioContratadoFaturadoGeradorExportacaoDTO
    ) {
        this.consumoAtivoForaPontaNaPonta = consumoAtivoForaPontaNaPonta;
        this.consumoReativoForaPontaNaPonta = consumoReativoForaPontaNaPonta;
        this.demandaAtivaForaPontaDemandaAtivaPonta = demandaAtivaForaPontaDemandaAtivaPonta;
        this.montanteUsoContratadoFaturado = montanteUsoContratadoFaturado;
        this.montanteUsoContratadoFaturadoForaPontaNaPonta = montanteUsoContratadoFaturadoForaPontaNaPonta;
        this.montanteUsoFioContratadoFaturadoGeradorExportacao = montanteUsoFioContratadoFaturadoGeradorExportacao;
    }
};