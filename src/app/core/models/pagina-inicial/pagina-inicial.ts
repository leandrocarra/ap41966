import { PathCompleto } from "app/core/enums/servicos";

export class CardDestaques {
    constructor(
        public img: string = '',
        public titulo: string = '',
        public texto: string = '',
        public atualizacao: string = ''
    ){ }
}

export class CardAcessoRapido {
    constructor(
        public icone: string = '',
        public titulo: string = '',
        public descricao: string = '',
        public tipo: 'ROTA' | 'LINK' | 'FUNCAO',
        public route: Array<string | PathCompleto> = [],
        public cor: string = '#ffffff',
        public corTitulo: string = '#707070',
        public link: string = '',
        public funcao: Function = new Function()
    ) { }
}
