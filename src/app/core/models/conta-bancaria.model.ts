export class ContaBancaria {
    constructor(
        public dicaContaBancaria?: string,
        public nomeAbreviadoBanco?: string,
        public nomeCompletoBanco?: string,
        public numeroBanco?: string,
        public numeroCaracteresContaBancaria?: number,
        public numeroCaracteresDigitoContaBancaria?: number,
        public mascara?: string
    ) {
        this.dicaContaBancaria = dicaContaBancaria;
        this.nomeAbreviadoBanco = nomeAbreviadoBanco;
        this.nomeCompletoBanco = nomeCompletoBanco;
        this.numeroBanco = numeroBanco;
        this.numeroCaracteresContaBancaria = numeroCaracteresContaBancaria;
        this.numeroCaracteresDigitoContaBancaria = numeroCaracteresDigitoContaBancaria;
        this.mascara = mascara;
    }
}