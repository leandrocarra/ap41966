import { environment } from "@environments/environment";
import { CanalType, DistribuidorasProtocolo, DistribuidorasProtocoloType } from "app/core/enums/distribuidoras";

export class ProtocoloDTORequest {
    constructor(
        public distribuidora: DistribuidorasProtocoloType = DistribuidorasProtocolo[environment.name as keyof typeof DistribuidorasProtocolo], //Obrigatório
        public canalSolicitante: CanalType = environment.canal, //Obrigatório
        public usuario: string = '', //Obrigatório
        public documento?: string, //Opcional Sonda
        public codCliente?: string, // Opcional SAP | N/A Sonda
        public regiao?: string, // Obrigatório para fora da área logada,
        public recaptcha: string = "",
    ) {

    }
}
