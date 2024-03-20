export class LigacaoNova {

}

export class EntregaAlternativa {
    cep: string;
    endereco: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    caixaPostal: string;

    constructor(
        cep?: string,
        endereco?: string,
        complemento?: string,
        bairro?: string,
        cidade?: string,
        estado?: string,
        numero?: string,
        caixaPostal?: string,
    ) {
        this.cep = cep ? cep : ""
        this.endereco = endereco ? endereco : ""
        this.complemento = complemento ? complemento : ""
        this.bairro = bairro ? bairro : ""
        this.cidade = cidade ? cidade : ""
        this.estado = estado ? estado : ""
        this.numero = numero ? numero : ""
        this.caixaPostal = caixaPostal ? caixaPostal : ""
    }
}

