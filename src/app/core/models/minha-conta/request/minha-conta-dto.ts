export class MinhaContaDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public userName: string = '',
        public documento: string = ''
    ) { }
}

export class AtualizarSenhaDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public userName: string = '',
        public documento: string = '',
        public senhaNova: string = '',
        public senhaAntiga: string = ''
    ) { }
}

export class AtualizarMinhaContaDTORequest {
    [key: string]: any; // Resolve o problema da tipagem ao se acessar as propriedades da classe via índices. Vide exemplo em editar-dados.component.ts, 'obterDadosDoLegado()'. Comente esta linha para ver o erro resultante.
    constructor(
        public canalSolicitante: string = '',
        public userName: string = '',
        public documento: string = '',
        public nomeTitular: string = '',
        public razaoSocial: string = '',
        public dtNascimento: string = '',
        public tipoDocumentoSecundario: string = '',
        public documentoSecundario: string = '',
        public emailCadastro: string = '',
        public telefoneContato: string = '',
        public telefone: string = '',
        public celular: string = '', // Não utilizado. Está aqui para esclarecimento: removê-lo do WSO2 é complexo, segundo o pessoal de REQ.
        public usuarioAcesso: string = '',
        public emailAcesso: string = '',
        public termosUso: boolean = false
    ) { }
}

export class MinhaContaLegadoDTORequest {
    constructor(
        public canalSolicitante: string = '',
        public usuario: string = '',
        public documento: string = '',
        public tipoDocumento: string = '' // Obrigatório Sonda, N/A SAP.
    ) { }
}
