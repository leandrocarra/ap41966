import { Anexo } from "../anexo/anexo";

export class DadosDocumentos {
    [key: string]: any;
    constructor(
        public selfie: Array<any> = [],
        public selfieError: boolean = false,
        public selfieScore: string = '',
        public residencial: DocumentosResidencial = new DocumentosResidencial(),
        public comercial: DocumentosComercial = new DocumentosComercial(),
        public industrial: DocumentosComercial = new DocumentosComercial(),
        public rural: DocumentosRural = new DocumentosRural()
    ) { }
}

export class DocumentosResidencial {
    constructor(
        public anexos: {[key: string]: any} = {
            'Doc Oficial': new DocOficial()
        }
    ) { }
}

export class DocumentosComercial {
    constructor(
        public anexos: {[key: string]: any} = {
            'Doc Oficial': new DocOficial(),
            'CNPJ': new DocComum(2),
            'CTT Social ou CCMEI': new DocComum(0)
        }
    ) { }
}

export class DocumentosRural {
    constructor(
        public anexos: {[key: string]: any} = {
            'Doc Oficial': new DocOficial(),
            'CNPJ': new DocComum(4),
            'CTT Social ou CCMEI': new DocComum(0),
            'Comp Trabalhador Rural': new DocComum(3),
            'Comp Atividade Rural': new DocComum(3),
            'Outorga': new DocComum(0),
            'Lic Ambiental': new DocComum(0),
            'Cadesp': new DocComum(3)
        }
    ) { }
}

export class DocOficial {
    constructor(
        public frente: boolean = false,
        public verso: boolean = false,
        public frenteVerso: boolean = false,
        public arquivos: Array<Anexo> = [],
        public tentativas: number = 0,
        public maxAnexos: number = 2,
        public docsSuficientes: boolean = false,
    ) { }
}

export class DocComum {
    public arquivos: Array<Anexo>;
    public tentativas: number;
    public maxAnexos: number;
    public maxTentativas: number;
    constructor(maxTentativas: number) {
        this.arquivos = [];
        this.tentativas = 0;
        this.maxTentativas = maxTentativas;
        this.maxAnexos = 1;
    }
}
