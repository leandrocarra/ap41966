export class EntregaDaFatura {
    public fluxo: string;
    public dadosEndereco: DadosDeEndereco;
    public taxa: string;
    public contaContrato: string;
    constructor() {
        this.fluxo = "";
        this.dadosEndereco = new DadosDeEndereco();
        this.taxa = "2.05";
        this.contaContrato = "";
    }
}


export class DadosDeEndereco {
    constructor(
        public cep: string = "",
        public logradouro: string = "",
        public numero: string = "",
        public complemento: string = "",
        public caixaPostal: string = "",
        public bairro: string = "",
        public cidade: string = "",
        public estado: string = "",
    ) {
    }
}

export class ParLabelData {
    constructor(
        public label: string,
        public data: any
    ) { }
}

export type OpcoesDeFatura = OpcoesDeFaturaImpressa.UnidadeConsumidora | OpcoesDeFaturaImpressa.EnderecoAlternativo | OpcoesDeFaturaImpressa.CaixaPostal | OpcoesDeFaturaImpressa.Vazio;

export enum OpcoesDeFaturaImpressa {
    UnidadeConsumidora = "Na unidade consumidora",
    EnderecoAlternativo = "Em um endereço alternativo",
    CaixaPostal = "Na caixa postal",
    Vazio = ''
}



