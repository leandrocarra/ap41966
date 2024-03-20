export class RecuperarSenha {

    constructor(        
        public documento?: string,
        public email?: string,
        public idPlataforma?: number,
        public codigo?: string,
        public senha?: string,
        public protocolo?: string,
        public usuarioUE?: string,
        ) {
            this.documento = documento;
            this.email = email;
            this.idPlataforma = 0;
            this.codigo = codigo;
            this.senha = senha;
            this.protocolo = protocolo;
            this.usuarioUE = usuarioUE;
    }

}


