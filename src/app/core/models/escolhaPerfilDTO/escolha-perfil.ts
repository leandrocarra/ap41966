export class EscolhaPerfil {
    constructor(
        public perfil: string = '',
        public perfilSelecionado: boolean = false,
        public subPerfil: string = '',
        public textoPerfil: string = '',
        public imagem: string = '',
        public alt: string = '',
        public bloqueado: boolean = true,
        public mensagemBloqueado: string = ''
    ) { }
}
