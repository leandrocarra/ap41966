export class GerarPixDTORequest {
    constructor(
        public distribuidora: string = '',
        public canalSolicitante: string = '',
        public conta_contrato: string = '',
        public linha_digitavel: string = '',
        public vencimento: string = '',
        public valor: Valor = new Valor()
    ) { }
}

export class ConsultarPixDTORequest {
    constructor(
        public distribuidora: string = '',
        public conta_contrato: string = '',
        public vencimento: string = '',
        public valor: Valor = new Valor()
    ) { }
}

export class Valor {
    constructor(
        public original: string = ''
    ) { }
}

export class TokenPixDTORequest {
    constructor(
        public grant_type: string = "password",
        public username: string =  "agencia",
        public password: string = "p@ssw0rd",
        public scope: string = "API",
        public client_id: string = "agencia-api",
        public token: string = '',
    ) { }
}
