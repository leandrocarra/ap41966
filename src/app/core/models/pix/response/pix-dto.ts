export class GerarPixDTOResponse {
	constructor(
		public distribuidora: string = '',
		public conta_contrato: string = '',
		public linha_digitavel: string = '',
		public canalSolicitante: string = '',
		public qr_code: string = '',
		public qr_emv: string = '',
		public valor: Valor = new Valor(),
		public calendario: Calendario = new Calendario(),
	) { }
}

export class ConsultarPixDTOResponse {
	constructor(
		public distribuidora: string = '',
		public conta_contrato: string = '',
		public vencimento: string = '',
		public linha_digitavel: string = '',
		public status: string = '',
		public valor: Valor = new Valor(),
	) { }
}

export class Valor {
	constructor(
		public original: string = ''
	) { }
}

export class Calendario {
	constructor(
		public expiracao: string = '',
		public criacao: string = ''
	) { }
}

export class TokenPixDTOResponse {
	constructor(
		public access_token: string,
		public token_type: string,
		public expires_in: number,
		public scope: string,
		public jti: string
	) { }
}

export class TokenPixJWKSDTOResponse {
	constructor(
		public keys: Array<Key>,
	) { }
}

export class Key {
	constructor(
		public kty: string,
		public e: string,
		public use: string,
		public kid: string,
		public alg: string,
		public n: string,
	) { }
}
