export class HeaderMetodo {
    constructor(
        public usuario: string = '',
        public canalSolicitante: string = '',
        public protocolo?: string,                   //SONDA N/A         | SAP Obrigatório
        public protocoloSonda?: string,              //SONDA Obrigatório | SAP N/A
        public atividade?: string,                   //SONDA N/A         | SAP Obrigatório
        public tipificacao?: string | number,        //SONDA N/A         | SAP Obrigatório
        public documentoSolicitante?: string,        //SONDA N/A         | SAP Obrigatório
        public dataCriaAtividade?: Date | string,    //SONDA N/A         | SAP Obrigatório
    ) { }
}