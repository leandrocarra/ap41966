import { Retorno } from "app/shared/models/retorno/retorno";

export class TermoAdesaoDTOResponse {
    constructor(
        public numSeqOper: string = '',
        public retorno: Retorno = new Retorno()
    ) { }
}

export class TermoAdesaoConsultaDTOResponse {
    constructor(
        public codigo: string = '',
        public nroCliente: string = '',
        public e_resultado: string = '',
        public retorno: Retorno = new Retorno(),
        public termoAceiteServico: Array<TermoAceiteServico> = [],
    ) { }
}

export class TermoAceiteServico {
    constructor(
        public idTermo: string = '',
        public descricao: string = '',
        public situacaoTermo: string = '',
        public dataInclusao: string = '',
        public dataDescadastro: string = '',
        public informacoesCadastro: InformacoesCadastro = new InformacoesCadastro(),
        public informacoesDescadastro: InformacoesDescadastro = new InformacoesDescadastro()
    ) { }
}

export class InformacoesCadastro {
    constructor(
        public protocoloSalesforceCadastrado: string = '',
        public numSeqOperServicoCadastrado: string = '',
        public canalSolicitanteCadastrado: string = '',
        public solicitanteAdedsao: SolicitanteAdesao = new SolicitanteAdesao() // TYPO endpoint e ET!!!
    ) { }
}

export class SolicitanteAdesao {
    constructor(
        public nomeSolicitante: string = '',
        public tipoDocumento: string = '',
        public documentoSolicitante: string = '',
        public telefone: string = '',
        public email: string = ''
    ) { }
}

export class InformacoesDescadastro {
    constructor(
        public protocoloSalesforceDescadastrado: string = '',
        public numSeqOperServicoDescadastrado: string = '',
        public canalSolicitanteDescadastrado: string = '',
        public solicitanteDescadastro: SolicitanteDescadastro = new SolicitanteDescadastro()
    ) { }
}

export class SolicitanteDescadastro {
    constructor(
        public nomeSolicitante: string = '',
        public tipoDocumento: string = '',
        public documentoSolicitante: string = '',
        public telefone: string = '',
        public celular: string = '',
        public email: string = ''
    ) { }
}
