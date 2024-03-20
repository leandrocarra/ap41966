export class ConsumosARequestDTO {
    constructor(
        public codigo?: string,
        public protocolo?: string,
        public codCliente?: string,
        public canalDigital?: string,
        public usuario?: string,
    ) {
        this.codigo = codigo;
        this.protocolo = protocolo;
        this.codCliente = codCliente;
        this.canalDigital = canalDigital;
        this.usuario = usuario;
    }
};