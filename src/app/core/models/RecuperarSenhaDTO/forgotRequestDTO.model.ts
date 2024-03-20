export class ForgotRequestDTO {
    constructor(
        public recaptcha?: string,
        public canalDigital?: string,
        public documento?: string,
        public userName?: string,
        public senha?: string
    ) {
        this.recaptcha = recaptcha;
        this.canalDigital = canalDigital;
        this.documento = documento;
        this.userName = userName;
        this.senha = senha;
    }
};
