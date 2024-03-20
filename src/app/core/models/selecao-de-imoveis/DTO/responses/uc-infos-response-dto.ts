export class UcInfosResponseDTO {
    constructor(
        public medidor: string,
        public codigo: string, // atualmente está voltando tipo number
        public cliente: ClienteInfosResponseDTO,
        public uc: string,
        public instalação: string, //Everis solicitou inclusão do campo.12-08-2021 //FIXME: acentos!!!
        public listaMedidores: Array<ListaMedidoresResponseDTO>,
        public fase: string,
        public local: LocalUCInfosResponseDTO,
        public situacao: SituacaoUCInfosResponseDTO,
        public dataLigacao: string,
        public faturamento: FaturamentoUCInfosResponseDTO,
        public caracteristicas: CaracteristicasInfosResponseDTO,
        public retorno: RetornoDTO,
        public servicos: ServicoInfosResponseDTO,
    ) { }
}


export class ListaMedidoresResponseDTO {
    constructor(
        public medidor: string
    ) { }
}


export class LocalUCInfosResponseDTO {
    constructor(
        public endereco: string, //everis informar tamanho max
        public bairro: string,
        public codLocalidade: string,
        public localidade: string,
        public codMunicipio: string,
        public municipio: string,
        public cep: string, // atualmente retorna number
        public Localizacao: LocalizacaoUCInfosResponseDTO,
        public uf: string,
        public tipoLogradouro: string,
        public nomeLogradouro: string,
        public numero: string, // atualmente retorna string
        public complementoEndereco: string,
    ) { }
}


export class LocalizacaoUCInfosResponseDTO {
    constructor(
        public sigla: string,
        public codigo: string,
        public descricao: string,
    ) { }
}

export class SituacaoUCInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
        public dataSituacaoUC: string,
    ) { }
}

export class FaturamentoUCInfosResponseDTO {
    constructor(
        public classePrincipal: ClassePrincipalUCInfosResponseDTO,
        public grupoFaturamento: GrupoFaturamentoUCInfosResponseDTO,
    ) { }
}

export class ClienteInfosResponseDTO {
    constructor(
        public codigo: string,
        public nome: string,
        public dataAtualizada: string,
        public documento: DocumentoInfosResponseDTO,
        public segundoDocumento: SegundoDocumentoResponseDTO,
        public contato: ContatoResponseDTO,
        public dataNascimento: string,

    ) { }
}

export class DocumentoInfosResponseDTO {
    constructor(
        public tipo: TipoDocumentoInfosResponseDTO,
        public numero: string,
    ) { }
}
export class TipoDocumentoInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}


export class ClienteDocumentoInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}
export class SegundoDocumentoResponseDTO {
    constructor(
        public uf: string,
        public orgaoExpedidor: OrgaoExpedidorResponseDTO,
        public tipo: TipoDocumentoInfosResponseDTO,
        public numero: string,
    ) { }
}

export class OrgaoExpedidorResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}
export class ContatoResponseDTO {
    constructor(
        public email: string,
        public celular?: CelularResponseDTO,
        public telefone?: TelefoneResponseDTO,
    ) { }
}

export class CelularResponseDTO {
    constructor(
        public ddd: string, // retorna number
        public numero: string, // retorna number
    ) { }
}
export class TelefoneResponseDTO {
    constructor(
        public ddd: string,
        public numero: string,
    ) { }
}
export class ServicoInfosResponseDTO {
    constructor(
        public faturaBraile: string,
        public baixaRenda: string,
        public faturaEmail: string,
        public dataCerta: string,
        public debitoAutomatico: string,
        public cadesp: string,
        public entregaAlternativa: string,
        public debitosVencidos: string,
        public reavisoCorte: string,
        public medidorTelemedicao: string,
        public vip: string,
        public listaCorte: string,
    ) { }
}

export class CaracteristicasInfosResponseDTO {
    constructor(
        public grandeCliente: string,
        public irrigacao: string,
        public vip7: string,
        public medidorInteligente: string,
        public espelho: string,
        public iluminacao: string
    ) { }
}

export class ClassePrincipalUCInfosResponseDTO {
    constructor(
        public principal: PrincipalUCInfosResponseDTO,
        public classificacaoConsumo: ClassificacaoConsumoUCInfosResponseDTO,
    ) { }
}

export class PrincipalUCInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}

export class ClassificacaoConsumoUCInfosResponseDTO { // classe dentro de clase principal
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}

export class GrupoFaturamentoUCInfosResponseDTO {
    constructor(
        public grupo: GrupoUCInfosResponseDTO,
        public grupoOriginal: GrupoOriginalUCInfosResponseDTO,
        public tipoTarifa: TipoTarifaUCInfosResponseDTO
    ) { }
}

export class GrupoUCInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
        public subGrupo: SubGrupoUCInfosResponseDTO,
    ) { }
}

export class SubGrupoUCInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}

export class RetornoDTO {
    constructor(
        public tipo: string,
        public id: string,
        public numero: number,
        public e_resultado: string,
        public mensagem: string,
    ) { }
}

export class GrupoOriginalUCInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
        public subGrupo: SubGrupoUCInfosResponseDTO,
    ) { }
}

export class TipoTarifaUCInfosResponseDTO {
    constructor(
        public codigo: string,
        public descricao: string,
    ) { }
}

