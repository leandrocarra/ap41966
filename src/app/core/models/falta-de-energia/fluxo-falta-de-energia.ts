export class ObjetoGenerico {
    constructor(
        public key: string = '',
        public value: string = ''
    ) { }
}

export class ObjetoGenericoMotivo {
    constructor(
        public value: string = '',
        public codigo: string = '',
        public key: string = '',
        public observacoes: string = '',
        public tipoAviso?: string,
        public subTipoAviso?: string,
        public confirmacaoAviso?: string,
        public riscoMorte?: boolean,
        public confirmacaoProcesso?: string,
        public tipologia?: EnumTipificacaoReclamacao | EnumTipificacaoInformacao,
        public informacaoImportante?: boolean
    ) {
        this.codigo = '';
        this.key = '';
        this.observacoes = '';
        this.tipoAviso = '';
        this.confirmacaoProcesso = '';
        this.tipologia = tipologia;
        this.confirmacaoAviso = 'Y';
    }
}

export enum EnumTipificacaoReclamacao {
    FaltaIndividual = 1020903,
    FaltaGeral = 1020901,
    IluminacaoPublica = 1021299,
    AssistenciaMedica = 1020906,
    OscilacaoDeTensao = 1020904,
    FaltaDeFase = 1020999,
    FurtoDeMedidor = 1020902,
    PostePadrao = 1021202,
    FioDoPostePadrao = 1021201,
    PosteDaRua = 1021202,
    FioDaRua = 1021201,
    Transformador = 1020901,
    NaoSei = FaltaGeral
}

export enum EnumTipificacaoInformacao {
    FaltaIndividual = 1011403,
    FaltaGeral = 1011402,
    IluminacaoPublica = 1011801
}

export enum EnumFaltaEnergiaOpcoes {
    MinhaUnidadeConsumidora = "uc",
    Vizinhanca = "ucVizinhas",
    IluminacaoPublica = "IP",
    OscilacaoDeTensao = "oscilacao",
    OscilacaoDeTensaoParteUc = "oscilacaoParteUc",
    NaoSoubeInformar = "naoSei",
    PosteCaido = 'posteCaido',
    FioPartido = 'fioPartido',
    ParteDaUc = 'parteUc',
    SemEnergia = "semEnergia",
    EnergiaVoltou = 'simVoltou',
    SemEnergiaDisjuntorDanificado = 'semEnergiaDisjuntorDanificado',
    FioPartidoNaRede = "fioPartidoRede"
}

export enum EnumMotivoFaltaDeEnergia {
    AssMedicaDomiciliar = 'Assistência Médica Domiciliar.'
}