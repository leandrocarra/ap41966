export class EscolhaPerfil {
    constructor(
        public perfil: string = "",
        public subPerfil: SubPerfilRural | null = new SubPerfilRural(),
        public textoPerfil: string = "",
        public imagem: string = "",
        public alt: string = "",
        public bloqueado: boolean = false,
        public mensagemBloqueado: string = ""
    ) { }
}

export class SubPerfilRural {
    constructor(
        public label: string = '',
        public route: string = '',
        public textoTooltip: string = '',
        public disabled: boolean = false
    ) { }
}
