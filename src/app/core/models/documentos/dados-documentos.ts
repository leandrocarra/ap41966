export class DadosDocumentos {
}


export class DocOficial {
    public frente: boolean;
    public verso: boolean;
    public frenteVerso: boolean;
    public arquivos: any[];
    public tentativas: number;
    public maxAnexos: number;
    public docsSuficientes: boolean;

    constructor() {
        this.frente = false;
        this.verso = false;
        this.frenteVerso = false;
        this.arquivos = [];
        this.tentativas = 0;
        this.maxAnexos = 2;
        this.docsSuficientes = false;
    }
}

export class DocComum {
    public arquivos: any[];
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