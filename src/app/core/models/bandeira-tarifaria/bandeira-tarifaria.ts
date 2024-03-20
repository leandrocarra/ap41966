export class DadosBandeiraTarifaria {
    constructor(
        public tipo: string = '',
        public cor: string = '',
        public mensagem: string = '',
        public mesReferencia: string = ''
    ) { }
}

export enum EnumBandeiraCodigo {
    EscassezHidrica1 = 'BHT',
    EscassezHidrica2 = 'EH',
    VermelhaDois1 = 'BV2',
    VermelhaDois2 = 'V2',
    VermelhaUm1 = 'BV',
    VermelhaUm2 = 'VM',
    Amarela1 = 'BAM',
    Amarela2 = 'AM',
    Verde1 = 'BVD',
    Verde2 = 'VD'
}

export enum EnumBandeiraTipo {
    Preta = 'BANDEIRA ESCASSEZ HÍDRICA',
    Vermelha2 = 'BANDEIRA VERMELHA PATAMAR 2',
    Vermelha1 = 'BANDEIRA VERMELHA PATAMAR 1',
    Amarela = 'BANDEIRA AMARELA',
    Verde = 'BANDEIRA VERDE',
    Erro = 'ERRO'
}

export enum EnumBandeiraCor {
    Preta = 'preta',
    Vermelha2 = 'vermelha2',
    Vermelha1 = 'vermelha1',
    Amarela = 'amarela',
    Verde = 'verde'
}

export enum EnumBandeiraMensagem {
    Preta = 'Escassez Hídrica. Condições de crise hídrica, necessário o uso de mais termelétricas e de importação de energia.',
    Vermelha2 = 'Bandeira vermelha patamar 2. Condições ainda mais custosas de geração de energia.',
    Vermelha1 = 'Bandeira vermelha patamar 1. Condições mais custosas de geração de energia.',
    Amarela = 'Bandeira amarela. Condições menos favoráveis de geração de energia.',
    Verde = 'Bandeira verde. Condições favoráveis de geração de energia. A tarifa não sofre nenhum acréscimo.',
    Erro = `Serviço indisponível no momento!\nPor favor, tente novamente mais tarde.`
}
