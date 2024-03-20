/************************************************************/
/* [POST]/mensageria/envio-mensagens
/*
/* Enviar mensagem ao cliente se utilizando de dados variáveis que serão encaminhados via body da API.
/************************************************************/
export class EnvioMensagensDTORequest {
    constructor(
        public cabecalho: CabecalhoMKT = new CabecalhoMKT(),
        public mensagem: any = new MensagemMKT(),
    ) { }
}

export class CabecalhoMKT {
    constructor(
        public canalContato: string = '',
        public codigoJornada: string = '',
        public idCliente: string = '',
        public subscricao: string = '',
        public tipoEntrega: string = '',
        public tipoServico: string = ''
    ) { }
}

export class MensagemMKT {
    constructor(
        public EmailAddress: string = '',
        public codigoCliente: string = '',
        public documento: string = '',
        public nome: string = '',
        public telefone: string = '',
        public pnClientePrincipal: string = '',
        public pnClienteRepresentante: string = '',
        public dataValidadeRepresentacao: string = '',
        public documentoRepresentante: string = '',
        public dataSolicitacao: string = '',
        public nomePerfil: string = '',
        public protocoloSalesforce: string = '',
        public protocoloAssociado: string = '',
        public numeroOS: string = '',
        public urlMultiLogin: string = '',
        public urlCanal: string = '',
        public customerKey: string = '',
        public usuarioSite: string = '',
        public digitalChannel: string = '',
        public tituloEmail: string = '',
        public guid: string = '',
    ) { }
}

export class MensagemMKTImobiliaria {
    constructor(
        public Customer_Name: string = '',
        public EmailAddress: string = '',
        public urlCanal: string = '',
        public dataSolicitacao: string = '',
        public documento: string = '',
        public telefone: string = '',
        public usuarioSite: string = '',
        public tituloEmail: string = '',
        public creciImobiliaria: string = '',
        public documentoImobiliaria: string = '',
        public numeroOS: string = '',
        public nomePerfil: string = '',
        public enderecoImobiliaria: string = '',
        public nomeImobiliaria: string = '',
        public protocolo: string = '',
        public guid: string = '',
    ) { }
}

export class MensagemMKTCredenciado {
    constructor(
        public Customer_Name: string = '',
        public EmailAddress: string = '',
        public urlCanal: string = '',
        public dataSolicitacao: string = '',
        public documento: string = '',
        public telefone: string = '',
        public usuarioSite: string = '',
        public tituloEmail: string = '',
        public documentoCredenciado: string = '',
        public localidade: string = '',
        public nomePerfil: string = '',
        public enderecoCredenciado: string = '',
        public nomeFantasia: string = '',
        public numeroOS: string = '',
        public protocolo: string = '',
        public guid: string = '',
    ) { }
}


export class MensagemMKTCompartilhado {
    constructor(
        public Customer_Name: string = '',
        public EmailAddress: string = '',
        public urlCanal: string = '',
        public dataSolicitacao: string = '',
        public documento: string = '',
        public telefone: string = '',
        public usuarioSite: string = '',
        public codigoCliente: string = '',
        public tituloEmail: string = '',
        public nome: string = '',
        public nomePerfil: string = '',
        public guid: string = '',
    ) { }
}

/************************************************************/
/* [POST]/mensageria/anexos
/*
/* Upload de arquivos/anexos por meio de codificação base64, declarada no body da API.
/*
/* Não utilizado no Front do AV/App, apenas no Multilogin.
/************************************************************/
export class AnexosDTORequest {
    constructor(
        public base64: string = '',
        public extensaoArquivo: string = '',
        public nomeArquivo: string = '',
    ) { }
}


/************************************************************/
/* [POST]/cadastro-estabelecimento-credenciado
/*
/* O Representante do estabelecimento credenciado deve solicitar a criação do cadastro do seu estabelecimento na Agencia Virtual, na área logada, e enviar os documentos para análise do Backoffice, que verifica e, se aprovado, realiza seu cadastro no sistema MultiLogin.
/************************************************************/
export class CadastroEstabelecimentoCredenciadoDTORequest {
    constructor(
        public canaldigital: string = '', // FIXME: 'd' minúsculo. Conferir na chegada do endpoint.
        public documento: string = '',
        public representanteCredenciado: Representante = new Representante(),
        public contratos: string = '', // FIXME: Inferido de outro endpoint com propriedade idêntica. Confirmar.
        public documentosAnexo: DocumentosAnexo = new DocumentosAnexo()
    ) { }
}

class Representante {
    constructor(
        public nome: string = '',
        public documento: string = '',
        public dataAtualizacao: string = '',
        public segundoDocumento: SegundoDocumento = new SegundoDocumento(),
        public contato: Contato = new Contato(),
        public dataNascimento: string = '',
        public acesso: Acesso = new Acesso() // FIXME: Conferir de onde isso está vindo de fato, pois a especificação não deixa claro se é um objeto com uma única propriedade.
    ) { }
}

class SegundoDocumento {
    constructor(
        public uf: string = '',
        public orgaoExpedidor: string = '',
        public tipo: string = '',
        public numero: string = '',
        public dataEmissao: string = ''
    ) { }
}

class Contato {
    constructor(
        public celular: string = '',
        public emailRepresentante: string = '',
        public telefone: string = ''
    ) { }
}

class Acesso {
    constructor(
        public validade: string = ''
    ) { }
}

class DocumentosAnexo {
    constructor(
        public fileName: string = '',
        public fileSize: string = '',
        public fileData: string = '',
        public fileExtention: string = '' // FIXME: Há um typo aqui: Escreve-se Extension, com 'S'.
    ) { }
}


/************************************************************/
/* [POST]/usuarios/valida-relacao
/*
/* Valida a existência de relação do tipo representante legal ou cônjuge nos sistemas legados da Neoenergia: SAP se for Nordeste ou Sonda se for Elektro e no Multilogin (backend)
/************************************************************/
export class ValidaRelacaoDTORequest {
    constructor(
        public userName: string = '',
        public documentoRepresentante: string = '',
        public tipoRelacao: string = '',
        public canalSolicitante: string = '',
        public usuario: string = ''
    ) { }
}


/************************************************************/
/* [POST]/usuarios/buscatipocliente
/*
/* Busca a informação do tipo do cliente cadastrada no parceiro de negócios no legado – SAP com o Objetivo de direcionar o e-mail ao time correto de BackOffice, podendo ser grandes clientes, poder público ou clientes normais.
/*
/* Apenas NE.
/************************************************************/
export class BuscaTipoClienteDTORequest {
    constructor(
        public userName: string = '',
        public canalSolicitante: string = '',
        public usuario: string = '',
        public documentoFiscalCliente: string = ''
    ) { }
}


/************************************************************/
/* [GET]/obter-servicos (devPortal) equivalente ao [GET]/mlogin-obter-servicos (ET)
/*
/* Receber os serviços autorizados, lista das ucs e o tipo de acesso de um determinado usuário,
/************************************************************/
export class ObterServicosDTORequest {
    constructor(
        public userName: string = '',
        public tipoAtribuicao: string = '',
    ) { }
}


/************************************************************/
/* [POST]/adiciona-vinculo-perfis (devPortal) equivalente ao [POST] /mlogin-adiciona-vinculo-perfis (ET)
/*
/* Endpoint para cadastrar vínculo entre perfis de usuários no multilogin, com ou sem UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a inclusão de vínculos.
/************************************************************/

/************************************************************/
/* [POST]/adiciona-vinculo-perfis (devPortal) equivalente ao [POST] /mlogin-adiciona-vinculo-perfis (ET)
/*
/* Endpoint para cadastrar vínculo entre perfis de usuários no multilogin, com ou sem UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a inclusão de vínculos.
/************************************************************/

/************************************************************/
/* [POST]/remove-vinculo-perfis (devPortal) equivalente ao [DELETE] /mlogin-remove-vinculo-perfis (ET)
/*
/* Endpoint para remover vínculo entre perfis de usuário no multilogin, com ou sem UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a remoção de vínculos entre perfis.
/************************************************************/

/************************************************************/
/* [POST]/adiciona-vinculo-uc (devPortal) equivalente ao [POST] /mlogin-adiciona-vinculo-uc (ET)
/*
/* Endpoint para cadastrar vínculo entre perfis de usuários no multilogin, com UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a inclusão de vínculos.
/************************************************************/

/************************************************************/
/* [POST]/remove-vinculo-uc (devPortal) equivalente ao [REMOVER]/mlogin-remove-vinculo-uc (ET)
/*
/* Endpoint para cadastrar vínculo entre perfis de usuários no multilogin, com UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a inclusão de vínculos.
/************************************************************/

/************************************************************/
/* [POST]/adiciona-vinculo-uc (devPortal) equivalente ao [POST] /mlogin-adiciona-vinculo-uc (ET)
/*
/* Endpoint para cadastrar vínculo entre perfis de usuários no multilogin, com UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a inclusão de vínculos.
/************************************************************/

/************************************************************/
/* [POST]/remove-vinculo-uc (devPortal) equivalente ao [REMOVER]/mlogin-remove-vinculo-uc (ET)
/*
/* Endpoint para cadastrar vínculo entre perfis de usuários no multilogin, com UC relacionada a este vínculo.
/* Este endpoint será consumido pelo WSO2 para fazer a inclusão de vínculos.
/************************************************************/
export class VinculosDTORequest {
    constructor(
        public userName: string,
        public documentoFiscalPrimario: string,
        public documentoFiscalSecundario: string,
        public tipoAtribuicao: string,
        public canalSolicitante: string,
        public uc?: string,
        public dataVigenciaCadastro?: string     // Apenas para representante legal
    ) {
        this.userName = userName;
        this.documentoFiscalPrimario = documentoFiscalPrimario;
        this.documentoFiscalSecundario = documentoFiscalSecundario;
        this.canalSolicitante = canalSolicitante;
    }
}


/************************************************************/
/* [GET]/obter-vinculos-recebidos (devPortal) equivalente ao [GET] /mlogin-obter-vinculos-recebidos (ET)
/* Endpoint para retornar uma lista com todos os vínculos com permissões recebidas do usuário no multilogin, com ou sem UC relacionada.
/*
/* [GET]/mlogin-obter-vinculos-concedidos  (devPortal) equivalente ao [GET]/obter-vinculos-concedidos
/* Endpoint para retornar uma lista com todos os vínculos com permissões concedidas do usuário no multilogin, com ou sem UC relacionada
/************************************************************/
export class ObterVinculosDTORequest {
    constructor(
        public userName: string,
        public documentoFiscalPai: string,
    ) {
        this.userName = userName;
        this.documentoFiscalPai = documentoFiscalPai;
    }
}
