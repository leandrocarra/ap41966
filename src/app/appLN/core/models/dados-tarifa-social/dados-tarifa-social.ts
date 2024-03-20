import { DocComum, DocOficial } from "../documentos/dados-documentos";

export class DadosTarifaSocial {
    constructor(
        public dadosTitularTarifaSocial: DadosTitularTarifaSocial = new DadosTitularTarifaSocial(),
        public dadosBeneficio: DadosBeneficio = new DadosBeneficio(),
        public beneficio: string = "",
        public titular: boolean = true,
        public disableForm: boolean = false,
        public tarifaSocialValidada: boolean = true,
        public anexos: {[key: string]: any} = {
            'Folha V7': new DocComum(3),
            'Ass Medica': new DocComum(0),
            'Carta INSS': new DocComum(3),
            'Doc Oficial': new DocOficial(),
        }
    ) { }
}

export class DadosTitularTarifaSocial {
    constructor(
        public tipo: string = '',
        public identificacao: string = '',
        public codigoFamiliar: string = '',
        public nomeCompleto: string = '',
        public dtNascimento: string = '',
        public cpf: string = '',
        public rg: string = ''
    ) { }
}

export class DadosBeneficio {
    constructor(
        public nis: string = '',
        public codigoFamiliar: string = '',
        public nb: string = '',
        public cidade: string = ''
    ) { }
}
