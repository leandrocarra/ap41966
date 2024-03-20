import { environment } from "@environments/environment";

export class ObterProtocoloDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public documento: string = '',
        public distribuidora: string = '',
        public regiao: string = '',
        public usuario: string = environment.USUARIO_UE,
    ) { }
}

export class FaturaSimplificadaDTORequest {
    constructor(
        public documento: string = '',
        public tipoCliente: string = '',
        public dataNascimento: string = '',
        public codUc: string = '',
        public opcaoSSOS: boolean = false,
        public recaptcha: string = '',
        public protocolo: string = '',
        public protocoloSonda: string = '',
        public tipificacao: string = '',
        public documentoSolicitante: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public distribuidora: string = '',
        public regiao: string = ''
    ) { }
}
