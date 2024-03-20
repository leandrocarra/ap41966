export class Imovel {
    constructor (
        public cep?: string,
        public codigoBairro?: string,
        public codigoLocalidade?: string,
        public codigoLogradouro?: string,
        public codigoMunicipio?: string,
        public nomeBairro?: string,
        public nomeLocalidade?: string,
        public nomeLogradouro?: string,
        public nomeMunicipio?: string,
        public tipoLocalizacao?: string,
        public tipoLogradouro?: string,
        public trecho?: string,
        public uf?: string,
    ) {
        this.cep = cep ? cep : '';
        this.codigoBairro = codigoBairro ? codigoBairro : '';
        this.codigoLocalidade = codigoLocalidade ? codigoLocalidade : '';
        this.codigoLogradouro = codigoLogradouro ? codigoLogradouro: '';
        this.codigoMunicipio = codigoMunicipio ? codigoMunicipio : '';
        this.nomeBairro = nomeBairro ? nomeBairro : '';
        this.nomeLocalidade = nomeLocalidade ? nomeLocalidade: '';
        this.nomeLogradouro = nomeLogradouro ? nomeLogradouro: '';
        this.nomeMunicipio = nomeMunicipio ? nomeMunicipio : '';
        this.tipoLocalizacao = tipoLocalizacao ? tipoLocalizacao : '';
        this.tipoLogradouro = tipoLogradouro ? tipoLogradouro: '';
        this.trecho = trecho ? trecho : '';
        this.uf = uf ? uf : '';
    }
}
