import { UCResponseDTO } from "../selecao-de-imoveis/DTO/responses/user-ucs-response-dto";
import { PerfilAtivo } from "./response/multilogin-dto";

export class MultiloginAcesso {
    public tipoPerfil: TipoPerfil;
    public perfilDeAcesso: PerfisDeAcesso;
    public documentoCliente: string; 
    public vinculosConcedidos: Array<PerfilAtivo>;
    public vinculosRecebidos: Array<PerfilAtivo>;
    public perfisRecebidos: Array<string>;
    public grupos: Array<GrupoVinculos>;
    public vinculoAcessado?: PerfilAtivo;
    public ucsCompartilhadas?: Array<UCResponseDTO>;
    constructor() {
        this.tipoPerfil = '';
        this.perfilDeAcesso = PerfisDeAcesso.acessoComum;
        this.documentoCliente = '';
        this.vinculosConcedidos = [];
        this.vinculosRecebidos = [];
        this.grupos = [];
        this.perfisRecebidos = [];
        this.ucsCompartilhadas = [];
    }
}
export class CardPerfil {
    constructor(
        public img: string = '',
        public titulo: string = '',
        public descricao: string = '',
        public disabled: boolean = false,
        public rota: string = ''
    ) { }
}

export class GrupoVinculos {
    constructor(
        public nomeGrupo: string = '',
        public tooltipMsg: string = '',
        public vinculos: Array<PerfilAtivo> = [],
    ) { }
} 


export type TipoPerfil = 'acessoComum' | 'imobiliaria' |'credenciado' | '';

export enum SubRotasMultiloginAcesso {
    PesquisarCliente = "pesquisar-cliente",
    SelecaoDePerfil = "selecionar-perfil-de-acesso",
    SelecaoDeCliente = "selecao-de-clientes"
}

export enum TipoAcesso {
    acessoComum = 'acessoComum',
    imobiliaria = 'imobiliaria',
    credenciado = 'credenciado'
}

export enum PerfisDeAcesso {
    acessoComum = "Acesso Comum",
    conjuge = "Cônjuge",
    representanteLegal = "Representante Legal",
    perfilDeAcesso = "Perfil de Acesso",
    corretor = "Corretor",
    padronista = "Padronista",
    projetista = "Projetista",
    atendenteCredenciado = "Atendente Credenciado",
    imobiliaria = "Imobiliária",
    acessoCompartilhado = "Acesso Compartilhado",
    A = 'A',
    B = 'B'
}
