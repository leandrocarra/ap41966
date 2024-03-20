import { Anexo } from "../anexo/anexo";
import { DadosTarifaSocial } from "../dados-tarifa-social/dados-tarifa-social";

export type tipoCategoria = '' | 'MONOFÁSICA' | 'BIFÁSICA' | 'TRIFÁSICA';
export class DadosDaLigacao {
    public salaComercial: boolean;
    public dimensionamentoDeRede: DimensionamentoDeRede;
    public categoria: tipoCategoria;
    public tarifa: string;
    public distanciaPoste: string;
    public tarifaSocial: DadosTarifaSocial;
    public questionarioRural: QuestionarioRural;
    public art: Array<Anexo>;
    public checarDocumentoART: boolean;
    public combo: any;
    public desejaIsencaoICMS: boolean;
    constructor(dados: any = {}) {
        this.salaComercial = dados?.salaComercial ?? false;
        this.dimensionamentoDeRede = dados?.dimensionamentoDeRede ?? new DimensionamentoDeRede('', '', '');
        this.art = dados?.art ?? [];
        this.combo = dados?.combo ?? '';
        this.categoria = dados?.categoria ?? 'MONOFÁSICA';
        this.distanciaPoste = dados?.distanciaPoste ?? '';
        this.questionarioRural = dados?.questionarioRural ?? new QuestionarioRural();
        this.desejaIsencaoICMS = dados?.desejaIsencaoICMS ?? null;
        this.tarifa = '';
        this.checarDocumentoART = false;
        this.tarifaSocial = new DadosTarifaSocial();
    }
}

export class DimensionamentoDeRede {
    constructor(
        public possuiART: string = '',
        public possuiCargasEspeciais: string = '',
        public possui220: string = '',
    ) { }
}

export class QuestionarioRural {
    constructor(
        public desmembrado: string = '',
        public propriedade: Propriedade = new Propriedade(),
        public proxPropriedade: ProxPropriedade = new ProxPropriedade()
    ) { }
}

export class Propriedade {
    constructor(
        public casa: boolean = false,
        public cerca: boolean = false,
        public muro: boolean = false,
        public barracao: boolean = false,
        public poco: boolean = false,
        public nenhum: boolean = false
    ) { }
}

export class ProxPropriedade {
    constructor(
        public corrego: boolean = false,
        public acude: boolean = false,
        public rodovia: boolean = false,
        public ferrovia: boolean = false,
        public nenhum: boolean = false
    ) { }
}

export class Equipamento {
    constructor(
        public key: string = '',
        public value: string = '',
        public codigoSubTipoAparelho: string = '',
        public codigoTipoAparelho: string = '',
        public descricaoSubTipoAparelho: string = ''
    ) { }
}
