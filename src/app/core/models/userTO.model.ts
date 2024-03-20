export class UserTO {
    constructor(
        public nome?: string,
        public userName?: string,
        public documento?: string,
        public telefone?: string,
        public celular?: string,
        public email?: string,
        public senha?: string,
        public protocolo?: string,
        public canaldigital?: string,
        public docSecundario?: string,
        public dataNascimento?: string,
        public tipoEnvio?: string,
    ) {
        this.nome = nome;
        this.userName = userName;
        this.documento = documento;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.senha = senha;
        this.protocolo = protocolo;
        this.canaldigital = canaldigital;
        this.docSecundario = docSecundario;
        this.dataNascimento = dataNascimento;
        this.tipoEnvio = tipoEnvio;
    }
};