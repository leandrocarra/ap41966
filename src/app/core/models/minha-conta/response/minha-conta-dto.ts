import { Retorno } from "app/shared/models/retorno/retorno";

export class MinhaContaDTOResponse {
    [key: string]: any; // Resolve o problema da tipagem ao se acessar as propriedades da classe via índices. Vide exemplo em editar-dados.component.ts, 'obterDadosDoLegado()'. Comente esta linha para ver o erro resultante.
    constructor(
        public usuarioAcesso: string = '',
        public emailAcesso: string = '',
        public retorno: Retorno = new Retorno(),
        public dtUltimaAtualizacao: string = '',
        public nomeTitular: string = '',
        public razaoSocial: string = '',
        public documento: string = '',
        public tipoDocumentoSecundario: string = '',
        public documentoSecundario: string = '',
        public dtNascimento: string = '',
        public emailCadastro: string = '',
        public telefoneContato: string = '',
        public telefone: string = '',
        public celular: string = '' // Não utilizado. Está aqui para esclarecimento: removê-lo do WSO2 é complexo, segundo o pessoal de REQ.
    ) { }
}

export class AtualizarMinhaContaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
    ) { }
}

export class AtualizarSenhaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
    ) { }
}

export class MinhaContaLegadoDTOResponse {
    [key: string]: any; // Resolve o problema da tipagem ao se acessar as propriedades da classe via índices. Vide exemplo em editar-dados.component.ts, 'obterDadosDoLegado()'. Comente esta linha para ver o erro resultante.
    constructor(
        public nomeTitular: string = '',
        public razaoSocial: string = '',
        public clienteDocumentoSecundario: ClienteDocumentoSecundario = new ClienteDocumentoSecundario(),
        public tipoDocumentoSecundario: string = '',
        public documentoSecundario: string = '',
        public dtNascimento: string = '',
        public emailCadastro: string = '',
        public telefoneContato: string = '',
        public e_resultado: string = '',
        public retorno: Retorno = new Retorno()
    ) { }
}

export class MinhaContaLegadoDTOResponseSE {
    [key: string]: any; // Resolve o problema da tipagem ao se acessar as propriedades da classe via índices. Vide exemplo em editar-dados.component.ts, 'obterDadosDoLegado()'. Comente esta linha para ver o erro resultante.
    constructor(
        public listaDadosCliente: Array<MinhaContaLegadoDTOResponse> = [],
        public retorno: Retorno = new Retorno()
    ) { }
}
 export class ClienteDocumentoSecundario {
    constructor(
        public tipoDocumentoSecundario: string = '',
        public documentoSecundario: string = ''
    ) { }
}
