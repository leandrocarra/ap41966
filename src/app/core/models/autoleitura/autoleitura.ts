import { Anexo } from "../anexo/anexo";
import { BoxAnexo } from "../documentos/box-anexo/box-anexo";
import { LeituraAutoleituraDTOResponse } from "./response/autoleitura-dto";

export class Autoleitura {
    public fluxo: FluxoAutoLeitura;
    public dentroDoPeriodoDeLeitura: boolean;
    public medidor: string;
    public leiturasDestePeriodo: Array<Leitura>;
    public leiturasDoUltimoPeriodo: Array<Leitura>;
    public statusMediaDasLeituras: LeiturasNaMedia;
    public mesesNoHistorico: number;
    public semMaisTentativasParaLeitura: boolean;
    public termosDeUsoAceitos: boolean;
    public ultimosConsumos: {key: string, value: LeituraAutoleituraDTOResponse}[];
    public leituraInformadaMesmoDia?: boolean
    public dataInicio?: Date;
    public dataFim?: Date;
    constructor(
        fluxo?: FluxoAutoLeitura,
        medidor?: string,
        leiturasDestePeriodo?: Array<Leitura>,
        leiturasDoUltimoPeriodo?: Array<Leitura>,
        statusMediaDasLeituras?: LeiturasNaMedia,
        mesesNoHistorico?: number,
        semMaisTentativasParaLeitura?: boolean,
        dentroDoPeriodoDeLeitura?: boolean,
        termosDeUsoAceitos?: boolean,
    ) {
        this.fluxo = fluxo ?? '';
        this.medidor = medidor ?? '';
        this.leiturasDestePeriodo = leiturasDestePeriodo ?? [];
        this.leiturasDoUltimoPeriodo = leiturasDoUltimoPeriodo ?? [];
        this.statusMediaDasLeituras = statusMediaDasLeituras ?? EnumLeiturasNaMedia.SemDadosSuficientes;
        this.mesesNoHistorico = mesesNoHistorico ?? 0;
        this.semMaisTentativasParaLeitura = semMaisTentativasParaLeitura ?? false;
        this.dentroDoPeriodoDeLeitura = dentroDoPeriodoDeLeitura ?? false;
        this.termosDeUsoAceitos = termosDeUsoAceitos ?? false;
        this.ultimosConsumos = [];
    }
}

export class Leitura {
    public arquivos: Array<Anexo>;
    constructor(
        public valor: string,                   //SAP: valorLeitura - Sonda: valor
        public tipoRegistrador: string,         //SAP: tipoRegistrador - Sonda: codEspec
        public consumo?: string,                //Sonda
        public statusMedia?: string,            //Sonda
        public constante?: number,              //Sonda
        public dataLeitura?: string,            //Sonda
        public unidadeMedida?: string,          //Sonda
        public media3Meses?: number,            //Sonda
        public media12Meses?: number,           //Sonda
        public descricaoRegistrador?: string,   //SAP
        public CV?: string,                     //SAP
        public CD?: string,                     //SAP
        public anexo?: BoxAnexo,
        arquivos?: Array<Anexo>
    ) {
        this.arquivos = arquivos ?? [];
    }
}

export enum SubRotasAutoleitura {
    InformarAutoleitura = 'informar-autoleitura',
    ConfirmarAutoleitura = 'confirmar-autoleitura',
    AnexarFoto = 'anexar-foto',
    SolicitacaoEnviada = 'solicitacao-enviada'
}

export type FluxoAutoLeitura = '' | EnumFluxoAutoleitura.Leitura | EnumFluxoAutoleitura.Simulacao;
export enum EnumFluxoAutoleitura {
    Simulacao = 'simulacao',
    Leitura = 'leitura'
}

export type LeiturasNaMedia = EnumLeiturasNaMedia.ForaDaMedia | EnumLeiturasNaMedia.NaMedia | EnumLeiturasNaMedia.SemDadosSuficientes;
export enum EnumLeiturasNaMedia {
    NaMedia = 'leituraNaMedia',
    SemDadosSuficientes = 'semDadosSuficientes',
    ForaDaMedia = 'leituraForaDaMedia',
}

export enum EnumTiposDeRegistrador {
    PotenciaAtiva = "03 - POTÊNCIA ATIVA",
    PotenciaReativa = "24 - POTÊNCIA REATIVA",
    PotenciaCorrespondente = "65 - ENERGIA REATIVA EXCEDENTE"
}

export enum EnumTipificacaoAutoleitura {
    Solicitacao = '10399001',
    Informacao = '1010501',
    Simulacao = '1031401'
}
