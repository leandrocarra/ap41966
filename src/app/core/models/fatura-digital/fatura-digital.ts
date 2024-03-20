export class FaturaDigital {
    constructor(
        public novoModoDeEnvio: OpcoesDeEnvio = new OpcoesDeEnvio(),
        public modoDeEnvioAtual: OpcoesDeEnvio = new OpcoesDeEnvio(),
        public opcoesDeEnvio: Array<OpcoesDeEnvio> = [],
        public possuiFaturaDigital: boolean = false,
        public emailAcesso: string = '',
        public emailFatura: string = '',
        public emailCadastro: string = '',
        public emailHistorico: string = '',
        public emailAlternativo: string = '',
        public dominioWhatsapp: string = '',
        public dominioSMS: string = '',
        public faturaBraile: string = '',
        public faturaEntregaAlternativa: string = '',
        public whatsappAlternativo: string = '',
        public tipificacao: string = ''
    ) { }
}

export class OpcoesDeEnvio {
    constructor(
        public label: EnumRecebimento = EnumRecebimento.vazio,
        public valor: string = ''
    ) { }
}

export class Aviso {
    constructor(
        public escolha?: string,
        public titulo?: string,
        public texto?: string,
        public tituloColor?: string,
    ) { }
}

export enum EnumOperacoes {
    Valida = "VAL",
    Cadastro = "CAD",
    Descadastro = "DES",
}

export type TypeRecebimento =
    EnumRecebimento.impressaNoImovel |
    EnumRecebimento.impressaEnderecoAlternativo |
    EnumRecebimento.impressaBraile |
    EnumRecebimento.emailCadastro |
    EnumRecebimento.emailAcesso |
    EnumRecebimento.emailFatura |
    EnumRecebimento.whatsapp |
    EnumRecebimento.novoEmail |
    EnumRecebimento.novoWhatsapp |
    EnumRecebimento.erro |
    EnumRecebimento.vazio;

export enum EnumRecebimento {
    impressaNoImovel = "Fatura impressa no imóvel",
    impressaEnderecoAlternativo = "Endereço Alternativo",
    impressaBraile = "Braile",
    emailCadastro = "E-mail de contato",
    emailAcesso = "E-mail da área logada",
    emailFatura = "Outro E-mail",
    whatsapp = "WhatsApp",
    novoEmail = "Quero receber minha conta em outro e-mail.",
    novoWhatsapp = "Quero receber em outro número de WhatsApp.",
    erro = "Erro na leitura dos dados.",
    vazio = ""
}

export enum EnumFaturaImpressa {
    noImovel = "Fatura impressa no endereço da unidade consumidora.",
    enderecoAlternativo = "Fatura impressa no endereço alternativo da unidade consumidora.",
    braile = "Fatura braile."
}

export enum EnumDeclaracaoDeTermos {
    cadastrarFaturaDigital = "Declaro que desejo prosseguir com o descadastramento da entrega de fatura impressa e o cadastro do recebimento da fatura digital.",
    alterarEmail = "Declaro que desejo prosseguir com a alteração do e-mail de recebimento da fatura digital.",
    faturaEmBraile="Após o cadastro no fatura digital você deixará de receber a fatura em braile na sua unidade consumidora.",
    cadastrarWhatsApp = "Declaro que desejo prosseguir com a alteração do cadastro da forma de recebimento da Fatura Digital."
}

export enum EnumTipoDeErro {
    Servico = "erro-servico",
    Inesperado = "erro-inesperado",
    EnergiaCortada = "energia-cortada",
    ServicoFatura = "servico-fatura",
    ContaColetiva = "conta-coletiva",
}

export enum EnumTipificacaoFaturaDigital {
    Cadastro = '1032814',
    Descadastro = '1032815',
    Modificacao = '1032816',
    Informacao = '1010605',
}

export enum EnumNumeroRetorno {
    ERRO = 'ERRO',
    OK = 'OK'
}

export type TypeFluxoDescadastro =
    EnumFluxoDescadastro.Inicial |
    EnumFluxoDescadastro.WhatsApp |
    EnumFluxoDescadastro.Confirmar;

export enum EnumFluxoDescadastro {
    Inicial = 'fluxo inicial',
    WhatsApp = 'oferecer whatsapp',
    Confirmar = 'confirmar descadastro'
}

export class OpcoesDeFluxo {
    constructor(
        public inicial: TypeFluxoDescadastro = EnumFluxoDescadastro.Inicial,
        public whatsApp: TypeFluxoDescadastro = EnumFluxoDescadastro.WhatsApp,
        public confirmar: TypeFluxoDescadastro = EnumFluxoDescadastro.Confirmar
    ) { }
}
