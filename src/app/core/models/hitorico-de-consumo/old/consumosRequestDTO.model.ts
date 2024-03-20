export class ConsumosRequestDTO {
    constructor(
        public codigo?: string,
        public codCliente?: string,
        public dataInicioPeriodoCalc?: string,
        public dataFimPeriodoCalc?: string,
        public dataInicioVencFat?: string,
        public dataFimVencFat?: string,
        public statusFatura?: string,
        public canalDigital?: string,
        public opcaoSSOS?: string,
        public protocolo?: string,
        public usuario?: string,
    ) { }
}