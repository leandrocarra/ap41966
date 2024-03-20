
type tipoEntregaDeFatura = 'DIGITAL' | 'NO IMÓVEL' | 'EM UM IMÓVEL ALTERNATIVO' | 'CAIXA POSTAL';
export class DadosPagamento {
    constructor(
        public dataVencimento: string = '',
        public faturaDigital: string = '',
        public emailRecebimento: string = '',
        public ondeReceber: tipoEntregaDeFatura = 'DIGITAL',
        public receberNoImovel: RecImovel = new RecImovel(),
        public receberEnderecoAlternativo: RecAlternativo = new RecAlternativo(),
        public receberCaixaPostal: RecCaixaPostal = new RecCaixaPostal(),
        public dadosBancarios: DadosBancarios = new DadosBancarios()
    ){ }
}

export class Endereco {
    constructor(
        public cep: string = '',
        public cidade: string = '',
        public endereco: string = '',
        public numero: string = '',
        public complemento: string = '',
        public bairro: string = '',
        public estado: string = ''
    ) { }
}

export class RecImovel {
    constructor(
        public endereco: Endereco = new Endereco()
    ) { }
}

export class RecAlternativo {
    constructor(
        public endereco: Endereco = new Endereco()
    ) { }
}

export class RecCaixaPostal {
    constructor(
        public caixaPostal: string = '',
        public cidade: string = '',
        public estado: string = '',
        public cep: string = ''
    ) { }
}

export class DadosBancarios {
    constructor(
        public debitoAutomatico: boolean | string = '',
        public banco: any = '', // TODO: Verificar necessidade de se manter ou não o tipo 'any'.
        public agencia: string = '',
        public conta: string = ''
    ) { }
}

export class Banco {
    constructor(
        public dicaContaBancaria: string = '',
        public nomeAbreviadoBanco: string = '',
        public nomeCompletoBanco: string = '',
        public numeroBanco: string = '',
        public numeroCaracteresContaBancaria: string = '',
        public numeroCaracteresDigitoContaBancaria: string = '',
        public mascara: string = ''
    ) { }
}
