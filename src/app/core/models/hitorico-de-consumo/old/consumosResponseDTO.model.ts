import { HistoricoConsumoDTO } from "./historicoConsumoDTO.model";

export class ConsumosResponseDTO {
    constructor(
        public histConsumo?: HistoricoConsumoDTO
    ) {
        this.histConsumo = histConsumo;
    }
};