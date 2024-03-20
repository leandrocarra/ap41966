import { EnumCorDeFundoDoHeader as EnumEstiloDoHeader } from "../../../core/models/header/header";

export class Estado {
    constructor(
        public sigla: string,
        public nomeExtenso: string
    ) {
        this.sigla = sigla
        this.nomeExtenso = nomeExtenso
    }
}

export class OrgaoEmissor {
    constructor(
        public sigla: string,
        public nomeExtenso: string
    ) {
        this.sigla = sigla
        this.nomeExtenso = nomeExtenso
    }
}

export class NeoenergiaLinks {
    constructor(
        public youtubeURL: string,
        public paginaInstitucionalURL: string,
        public facebookURL: string = 'https://pt-br.facebook.com/neoenergia/',
        public instagramURL: string = 'https://www.instagram.com/neoenergia_oficial/?hl=pt',
        public multiloginURL: string

    ) {
        this.youtubeURL = youtubeURL;
        this.paginaInstitucionalURL = paginaInstitucionalURL;
        this.facebookURL = facebookURL;
        this.instagramURL = instagramURL;
        this.multiloginURL = multiloginURL;
    }
}
