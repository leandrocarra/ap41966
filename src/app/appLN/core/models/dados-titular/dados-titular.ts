export class DadosTitular {
    public celular: string;
    public cpf: string;
    public dataEmissao: string;
    public dataNascimento: string;
    public email: string;
    public estado: string;
    public nome: string;
    public orgaoEmissor: string;
    public rg: string;
    public telefone: string;
    public cnpj: boolean;
    constructor(
        cnpj: boolean
    ) {
        this.celular = '';
        this.cpf = '';
        this.dataEmissao = '';
        this.dataNascimento = '';
        this.email = '';
        this.estado = '';
        this.nome = '';
        this.orgaoEmissor = '';
        this.rg = '';
        this.telefone = '';
        this.cnpj = cnpj;
    }
}

export class DadosCnpj {
    constructor (
        public atividadeFiscal: string = '',
        public classePrincipal: string = '',
        public codigoConsumo: string = '',
        public inscricaoEstadual: string = '',
        public inscricaoMunicipal: string = '',
        public razaoSocial: string = '',
        public cnpj: string = ''
    ) { }
}
