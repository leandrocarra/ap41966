import { Retorno } from "app/shared/models/retorno/retorno";

export class ProtocoloDTOResponse {
    constructor(
        public protocoloSalesforce: number = 0,
        public protocoloSalesforceStr: string = '',
        public protocoloLegado: number = 0,
        public protocoloLegadoStr: string = '',
        public retorno?: Retorno,
        public protocoloSapCrm?: number,
        public protocoloSapCrmStr?: string,
        public dataHoraCriacaoProtocolo?: string,
    ) { }
}
