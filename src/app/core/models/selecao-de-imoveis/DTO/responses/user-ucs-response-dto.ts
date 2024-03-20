export class UserUcsResponseDTO {
    constructor(
        public ucs: Array<UCResponseDTO>,
        public e_resultado?: string | null,
        public indMaisUcs?: string,
        public retorno?: RetornoDTO
    ) { }
}

export class RetornoDTO {
    constructor(
        public tipo: string,
        public id: string,
        public numero: number,
        public mensagem: string,
    ) { }
}

export class UCResponseDTO {
    constructor(
        public bOptante: boolean = false,
        public grupoTensao: string | null = 'B',
        public isGrupo: string = '',
        public local: LocalResponseDTO = new LocalResponseDTO(),
        public status: string | null = '',
        public uc: string = '',
        public ucColetiva: string | null = '',
        public indCCColetiva: string = '',
        public contrato: string | null = '',
        public dtInicio: string = '',
        public dtFim: string = '',
        public instalacao: string | null= '', // everis pediu adição
        public nomeCliente: string = '',
        public nomeGrupo: string | null = '',
        public contaColetivaPrincipal: boolean = false, //FIXME: não achei no dado mockado
        ) { }
}


export class LocalResponseDTO {
    constructor(
        public endereco: string = "", //everis informar tamanho max
        public bairro: string = "",
        public codLocalidade: number = 0,
        public localidade: string = "",
        public codMunicipio: number = 0,
        public municipio: string = "",
        public cep: string = "",
        public localizacao: LocalizacaoUCInfosResponseDTO = new LocalizacaoUCInfosResponseDTO(),
        public uf: string = "",
        public tipoLogradouro: string = "",
        public nomeLogradouro: string = "",
        public numero: number | string = "",
        public complementoEndereco: string = ""
      ) {
      }
}

export class LocalizacaoUCInfosResponseDTO {
    constructor(
      public sigla: string = "",
      public codigo: string = "",
      public descricao: string = ""
    ) {
    }
  }