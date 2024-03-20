import { HistoricoConsumoADTO } from "./historicoConsumoADTO.model";

export class ConsumosAResponseDTO {
    constructor(
        public histConsumo?: HistoricoConsumoADTO
    ) {
        this.histConsumo = histConsumo;
    }
}