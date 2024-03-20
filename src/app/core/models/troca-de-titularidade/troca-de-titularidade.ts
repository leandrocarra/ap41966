export class FluxoTrocaNavExtra {
    public queryParams?: any;
    public state?: TrocaDeTitularidade;
    constructor(state?: TrocaDeTitularidade, queryParams?: any) {
        this.queryParams = queryParams ? queryParams : {}
        this.state = state ? state : new TrocaDeTitularidade(state);
    }
}

export class TrocaDeTitularidade {
    public ucImovel?: any;
    public numeroDoMedidor?: any;
    public dadosImovel?: any;
    public dadosUsuario?: any;
    public dadosFatura?: DadosFatura;
    public docsAnexados?: [];
    public dadosConfirmar?: any;
    public fluxo?: any;
    public fluxoTroca?: any;
    public fluxoPendencia?: any;
    public fluxoAlterarDadosFatura?: any;
    public result?: any;

    constructor(state?: any) {
        this.ucImovel = state?.ucImovel ? state?.ucImovel : null;
        this.numeroDoMedidor = state?.numeroDoMedidor ? state?.numeroDoMedidor : null;
        this.dadosImovel = state?.dadosImovel ? state?.dadosImovel : null;
        this.dadosUsuario = state?.dadosUsuario ? state?.dadosUsuario : null;
        this.dadosFatura = state?.dadosFatura ? state?.dadosFatura : new DadosFatura(state);
        this.docsAnexados = state?.docsAnexados ? state?.docsAnexados : [];
        this.dadosConfirmar = state?.dadosConfirmar ? state?.dadosConfirmar : null;
        this.fluxo = state?.fluxo ? state?.fluxo : null;
        this.fluxoTroca = state?.fluxoTroca ? state?.fluxoTroca : null;
        this.fluxoPendencia = state?.fluxoPendencia ? state?.fluxoPendencia : null;
        this.fluxoAlterarDadosFatura = state?.fluxoAlterarDadosFatura ? state?.fluxoAlterarDadosFatura : null;
        this.result = state?.result ? state?.result : null;
    }
}

export class DadosFatura {
    public email?: any;
    public faturaDigital?: any;
    public whatsApp?: any;
    public dataCerta?: any;
    public debitoAutomatico?: DebitoAutomatico;

    constructor(state?: any) {
        this.email = state?.dadosFatura?.email ? state?.dadosFatura?.email : null;
        this.faturaDigital = state?.dadosFatura?.faturaDigital ? state?.dadosFatura?.faturaDigital : null;
        this.whatsApp = state?.dadosFatura?.whatsApp ? state?.dadosFatura?.whatsApp : null;
        this.dataCerta = state?.dadosFatura?.dataCerta ? state?.dadosFatura?.dataCerta : null;
        this.debitoAutomatico = state?.dadosFatura?.debitoAutomatico ? state?.dadosFatura?.debitoAutomatico : new DebitoAutomatico(state);
    }
}

export class DebitoAutomatico {
    public numeroBanco?: any;
    public nomeCompletoBanco?: any;
    public agencia?: any;
    public conta?: any;

    constructor(state?: any) {
        this.numeroBanco = state?.debitoAutomatico?.numeroBanco ? state?.debitoAutomatico?.numeroBanco : null;
        this.nomeCompletoBanco = state?.debitoAutomatico?.nomeCompletoBanco ? state?.debitoAutomatico?.nomeCompletoBanco : null;
        this.agencia = state?.debitoAutomatico?.agencia ? state?.debitoAutomatico?.agencia : null;
        this.conta = state?.debitoAutomatico?.conta ? state?.debitoAutomatico?.conta : null;

    }
}