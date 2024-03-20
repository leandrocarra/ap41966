import { PathCompleto } from "app/core/enums/servicos";

export class Menu {
    constructor(
        public opcoes: Array<Conjunto>
    ) {
        this.opcoes = opcoes;
    }
}
export class Conjunto {
    public open: boolean;

    constructor(
        public nome: string,
        public subConjunto: Array<SubConjunto>
    ) {
        this.nome = nome;
        this.subConjunto = subConjunto
        this.open = false;
    }
}
export class SubConjunto {
    constructor(
        public nome: string,
        public item: Array<Item>
    ) {
        this.nome = nome;
        this.item = item;
    }
}
export class Item {
    constructor(
        public nome: string,
        public disabled: boolean,
        public tipo: 'ROTA' | 'LINK',
        public route?: Array<string | PathCompleto>,
        public link?: string
    ) {
        this.nome = nome;
        this.disabled = disabled;
        this.route = route;
        this.tipo = tipo;
    }
}

export class NotificacoesHeader {
    constructor(
        public notificacoes: Array<Notificacao>
    ) {
        this.notificacoes = notificacoes;
    }
}

export class Notificacao {
    constructor(
        public status: string,
        public conteudo: string,
        public data: string
    ) {
        this.status = status;
        this.conteudo = conteudo;
        this.data = data;
    }
}


/******************************/
/* Padrões de cores do Header */
/*                            */
/* Se alterar as strings,     */
/* alterar também no scss     */
/* header.component.scss.     */
/******************************/
export enum EnumCorDeFundoDoHeader {
    Padrao = 'header-padrao',
    GrupoA = 'header-grupo-A',
    RepresentanteLegal = 'header-representante-legal',
    Conjuge = 'header-conjuge',
    PerfilDeAcesso = 'header-perfil-de-acesso',
    Imobiliaria = 'header-imobiliaria',
    Corretor = 'header-corretor',
    Padronista = 'header-padronista',
    Credenciado = 'header-credenciado',
    AtendenteCredenciado = 'header-atendente-credenciado',
}
// variaveis - header acesso compartilhado


export class EstiloHeader {
    constructor(
        public headerClass: string = EnumCorDeFundoDoHeader.Padrao,
        public indicadorPerfil: string = '',
        public icone: string = ''
    ) {
    }
}
