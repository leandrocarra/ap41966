export class InformacaoConta {
    constructor(
        public titulo: string = '',
        public conteudo: Array<Conteudo> = [],
    ) { }
}

export class Conteudo {
    constructor(
        public subtitulo: string = '',
        public icone: string = '',
        public statusCor: string = '',
        public descricao: string = '',
    ) { }
}