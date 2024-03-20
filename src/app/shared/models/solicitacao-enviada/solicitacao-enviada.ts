export class SolicitacaoEnviada {
    constructor(
        public protocolo: string = '',
        public infos: Array<SolicitacaoContent> = [],
        public titulo: string = '',
        public tituloH4: string = '',
        public solicitacaoTipo: string = '',
        public alerta: boolean = false,
        public alertaIcone: AlertaIcone = '',
        public alertaTituloCor: AlertaCor = '',
        public alertaTitulo: string = '',
        public alertaMensagem: string = '',
        public redirecionarFluxo: any = '',
        public mensagemRedirecionarFluxo: string = '',
        public alertaMensagemCor: AlertaCor = '',
        public uc: string = '',
        public botaoFinalizar: boolean = true
    ) { }
}

export class SolicitacaoContent {
    constructor(
        public label: string = '',
        public data: string = '',
        public tituloEsquerda: string = '',
        public tituloDireita: string = ''
    ) { }
}

export enum EnumAlertaCorTitulo {
    Laranja = 'icone-cor-laranja',
    Vermelho = 'icone-cor-vermelho'
}

export type AlertaCor = EnumAlertaCorTitulo.Laranja | EnumAlertaCorTitulo.Vermelho | '';

export type AlertaIcone = EnumAlertaIcone.Sino | EnumAlertaIcone.CirculoExclamacaoErro | EnumAlertaIcone.TrianguloExclamacaoErro | '';

export enum EnumAlertaIcone {
    Sino = 'notifications_none',
    CirculoExclamacaoErro = 'error_outline',
    TrianguloExclamacaoErro = 'warning_amber'
}
