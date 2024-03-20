import { DocComum, DocOficial } from "../documentos/dados-documentos";

export class DadosTarifaSocial {
    public beneficio: string;
    public dadosTitularTarifaSocial?: DadosTitularTarifaSocial;
    public dadosBeneficio?: DadosBeneficio;
    public titular?: boolean | null;
    public anexos?: any;
    public tarifaSocialValidada: boolean;

    constructor() {
        // this.dadosTitularTarifaSocial = new DadosTitularTarifaSocial();
        this.dadosBeneficio = new DadosBeneficio();
        this.beneficio = "";
        this.titular = null;
        this.tarifaSocialValidada = true;
        this.anexos = {
            'Folha V7': new DocComum(0),
            'Ass Medica': new DocComum(0),
            'Carta INSS': new DocComum(0),
            'Doc Oficial': new DocOficial(),
        };
    }
}



export class DadosTitularTarifaSocial {
    public tipo: string;
    public identificacao: string;
    public codigoFamiliar: string;
    public nomeCompleto: string;
    public dtNascimento: string;
    public cpf: string;
    public rg: string;

    constructor() {
        this.tipo = "";
        this.identificacao = ""
        this.codigoFamiliar = "";
        this.nomeCompleto = "";
        this.dtNascimento = "";
        this.cpf = "";
        this.rg = "";
    }
}


export class DadosBeneficio {
    public nis: string;
    public codigoFamiliar: string;
    public nb: string;
    public cidade: string;

    constructor() {
        this.nis = "";
        this.codigoFamiliar = "";
        this.nb = "";
        this.cidade = "";
    }
}
