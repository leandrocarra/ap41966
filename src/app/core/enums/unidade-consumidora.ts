
// Os codigos vindo do endpoint, "Suspensa" vem com o status null, foi necessário criar o EnumStatusUC para direcionar a pagina quando a uc for suspensa, para a tela de religaçao FIXME:
export enum EnumCodigoStatusUC {
    Ligado = 'LG',
    Desligado = 'DS',
    Cortado = 'CR',
    LigacaoNova = 'PT',
}

export enum EnumStatusUC {
    Ligado = "LIGADA",
    Desligado = "DESLIGADA",
    Cortado = "CORTADA",
    Suspensa = "SUSPENSA",
    LigacaoNova = "LIGACAO-NOVA",
    Coletiva = "COLETIVA",
    Potencial = "POTENCIAL",
    Ligando = "LIGANDO",
    CorteRecente = "CORTE RECENTE"
}

export const STATUS_POSITIVOS_POSSIVEIS: Array<string> =[
    'X',
    'x',
    'S',
    's'
]

