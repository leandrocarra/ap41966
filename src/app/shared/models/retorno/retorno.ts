export class Retorno {
    constructor(
        public numero: string = '',
        public mensagem: string = '',
        public tipo: string = '', //Obrigatório para SAP N/A Sonda
        public id: string = '', //Obrigatório para SAP N/A Sonda
    ) { }
}
