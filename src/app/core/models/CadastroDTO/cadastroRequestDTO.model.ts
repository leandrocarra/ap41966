export class CadastroRequestDTO {
    constructor(
        public documento: string,
        public username?: string,
        public senha?: string,
        public nome?: string,
        public telefone?: string,
        public celular?: string,
        public email?: string,
        public protocolo?: string,
        public canalDigital?: string,
        public tipoDocSecundario?: string,
        public docSecundario?: string,
        public dataNascimento?: string,
        public tipoEnvio?: string,
        public distribuidora?: string,
        public regiao?: string,
        public recaptcha?: string
    ) {
        this.username = username;
        this.senha = senha;
        this.nome = nome;
        this.documento = documento;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.protocolo = protocolo;
        this.canalDigital = canalDigital;
        this.tipoDocSecundario = tipoDocSecundario;
        this.docSecundario = docSecundario;
        this.dataNascimento = dataNascimento;
        this.tipoEnvio = tipoEnvio;
        this.distribuidora = distribuidora;
        this.regiao = regiao;
        this.recaptcha = recaptcha;
    }
};