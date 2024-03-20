import { DocComum } from "../documentos/dados-documentos";

export class Endereco {
    constructor(
        public anexos: {[key: string]: any} = {
            'Comprovante de Endereço': [],
            'Licença Ambiental': [],
            'Autorizacao da Prefeitura': new DocComum(0)
        },
        public anexosDebitos: {[key: string]: any} = {
            'Comprovante de Endereço': [],
            'Comprovante de Pagamento': []
        },
        public apartamento: boolean = false,
        public areaAmbiental: string = '',
        public bairro: string = '',
        public camposBloqueados: boolean = false,
        public cep: string = '',
        public cepEncontrado: boolean = false,
        public cepUnico: boolean = false,
        public cidade: string = '',
        public codigoBairro: string = '',
        public codigoLocalidade: string = '',
        public codigoLogradouro: string = '',
        public complemento: string = '',
        public endereco: string = '',
        public estado: string = '',
        public latitude: string = '',
        public longitude: string = '',
        public numero: string = '',
        public pontoReferencia: string = '',
        public ruaProjetada: boolean = false,
        public ruaSemCep: boolean = false,
        public codigoLocalização: string = '',
        public tipoLocalizacao: string = '',
        public tipoLogradouro: string = '',
        public trecho: string = '',
        public uc: string = '',
        public zonaRural: boolean = false,
        public enderecoEditavel: boolean = false,
        public licencaAmbientalValidado: boolean = false,
        public comprovanteEnderecoValidado: boolean = false
    ) {
        // this.anexos = {
        //     'Comprovante de Endereço': [],
        //     'Licença Ambiental': [],
        //     'Autorizacao da Prefeitura': new DocComum(0)
        // };
        // this.anexosDebitos = {
        //     'Comprovante de Endereço': [],
        //     'Comprovante de Pagamento': []
        // };
        // this.apartamento = null;
        // this.areaAmbiental = "";
        // this.bairro = "";
        // this.cep = "";
        // this.cepEncontrado = null;
        // this.cepUnico = null;
        // this.cidade = "";
        // this.codigoBairro = "";
        // this.codigoLocalidade = "";
        // this.codigoLogradouro = "";
        // this.complemento = "";
        // this.endereco = "";
        // this.estado = "";
        // this.latitude = "";
        // this.longitude = "";
        // this.numero = "";
        // this.pontoReferencia = "";
        // this.ruaProjetada = null;
        // this.ruaSemCep = false;
        // this.codigoLocalização = "";
        // this.tipoLogradouro = "";
        // this.trecho = "";
        // this.uc = "";
        // this.zonaRural = false;
        // this.licencaAmbientalValidado = false;
        // this.comprovanteEnderecoValidado = false;

    }
}

export class DadosDoImovel {
    constructor(
        public padraoPronto: boolean | undefined = undefined,
        public endereco: Endereco = new Endereco(),
        public multipleUESelection: boolean = false
    ) { }
}


