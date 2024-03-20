import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";

export class TermoAdesaoDTORequest {
    constructor(
        public celular: string = '',
        public codigo: string = '',
        public distribuidora: string = '',
        public documentoSolicitante: string = '',
        public email: string = '',
        public headerMetodo: HeaderMetodo = new HeaderMetodo(),
        public idTermo: string = '',
        public nomeSolicitante: string = '',
        public nroCliente: string = '',
        public regiao: string = '',
        public telefone: string = '',
        public tipoDocumento: string = ''
    ) { }
}

export class TermoAdesaoConsultaDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public codigo: string = '',
        public distribuidora: string = '',
        public idTermo: string = '', // Da ET: Opcional - Se deixado em branco, trará todos os termos.
        public nroCliente: string = '',
        public regiao: string = '',
        public situacaoTermo: string = '', // Da ET: Opcional - Se deixado em branco, trará todas as situações.
        public usuario: string = ''
    ) { }
}
