import { environment } from "@environments/environment";

/* [POST]/USUARIOS/ATIVO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class UsuarioAtivoDTORequest {
    constructor(
        public userName: string = "",
        public recaptcha: string = "",
        public regiao: string = "",
        public distribuidora: string = "",
    ) {}
}

/* [POST]/USUARIOS/VALIDA-USUARIO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class ValidaUsuarioDTORequest {
    constructor(
        public userName: string = "",
        public distribuidora: string = "",
        public regiao: string = "",
        public recaptcha: string = "",
        public tipoCliente: string = "",
        public documento: string = "",
        public codigo: string = "", // UC informada na etapa anterior.
        public tipoAtribuicao: string = "",
        public dataNascimento: string | Date = "",
        public tipoDocSecundario: string = "",
        public docSecundario: string = "",
        public canalSolicitante: string = "",
        public usuario: string = ""
    ) {}
}

/* [POST]/USUARIOS
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class CadastroUsuarioDTORequest {
    constructor(
        public distribuidora: string = "",
        public regiao: string = "",
        public codigoValidator: string = "",
        public canalSolicitante: string = "",
        public tipoCliente: string = "",
        public userName: string = "",
        public documento: string = "",
        public clienteF: FluxoCadastroPF = new FluxoCadastroPF(),
        public clienteJ: FluxoCadastroPJ = new FluxoCadastroPJ(),
        public senha: string = "",
        public tipoEnvio: string = "",
        public recaptcha: string = "",
        public fluxoIniciado: boolean = false
    ) {}
}

export class RecuperarSenhaDTORequest{
    constructor(
    public documento: string = "",
    public email: string = "",
    public emailCadastro: string = "",
    public numero: string = "",
    public telefoneContato: string = "",
    public opcaoEnvio: string = "",
    public codigoValidado: string = "",
    public fluxoIniciado: boolean = false
    ){}
}

export class FluxoCadastroPF {
    constructor(
        public nome: string = "",
        public dataNascimento: Date = new Date(),
        public telefone: string = "",
        public celular: string = "",
        public email: string = "",
        public sobrenome: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public orgao: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public estado: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public tipoDocSecundario: string = "",
        public docSecundario: string = "",
        public usuarioAcesso: string = ""
    ) {}
}

export class FluxoCadastroPJ {
    constructor(
        public razaoSocial: string = "",
        public atividadeFiscal: string = "",
        public inscricaoMunicipal: string = "",
        public inscricaoEstadual: string = "",
        public nomeFantasia: string = "",
        public telefone: string = "",
        public celular: string = "",
        public email: string = "",
        public solicitante: Solicitante = new Solicitante()
    ) {}
}

export class Solicitante {
    constructor(
        public documento: string = "",
        public dataNascimento: Date = new Date(),
        public nome: string = "",
        public sobrenome: string = "",
        public genero: string = "",
        public celular: string = "",
        public email: string = "",
        public tipoDocSecundario: string = "",
        public docSecundario: string = "",
        public orgao: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public estado: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public nomeSocial: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public telefone: string = "", // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa ao cadastro, existe.
        public emailAplicativo: string = "" // FIXME: Verificar! Não existe na ET nem na EF. Na tela relativa aos emails, existe.
    ) {}
}

export class DadosDeCadastroDTO {
    constructor(
        public userName: string = "",
        public distribuidora: string = "",
        public regiao: string = "",
        public canalSolicitante: string = "",
        public recaptcha: string = "",
        public tipoEnvio: string = "",
        public codigoValidator: string = ""
    ) {}
}

/* [PUT]/USUARIOS/ATIVA-USUARIO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class AtivaUsuarioDTORequest {
    constructor(public uid: string = "") {}
}

/* [GET]/USUARIOS/DADOS-TROCA-SENHA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class DadosTrocaSenhaDTORequest {
    constructor(
        public userName: string = "",
        public canalSolicitante: string = "",
        public recaptcha: string = "",
        public regiao: string = "",
        public distribuidora: string = "",
        public usuario: string = ""
    ) {}
}

/* [POST]/USUARIOS/ESQUECI-SENHA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class EsqueciSenhaDTORequest {
    constructor(
        public distribuidora: string = "",
        public regiao: string = "",
        public tipoEnvio: string = "",
        public userName: string = "",
        public canalSolicitante: string = "",
        public usuario: string = "",
        public recaptcha: string = ""
    ) {}
}

/* [POST]/USUARIOS/CODIGO-VALIDA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class CodigoValidaDTORequest {
    constructor(
        public codigoValidator: string = "",
        public userName: string = "",
        public regiao: string = "",
        public distribuidora: string = ""
    ) {}
}

/* [PUT]/USUARIOS/ESQUECI-SENHA-VALIDA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class EsqueciSenhaValidaDTORequest {
    constructor(
        public codigoValidado: string = "",
        public distribuidora: string = "",
        public novaSenha: string = "",
        public regiao: string = "",
        public userName: string = "",
        public canalSolicitante: string = "",
        public usuario: string = ""
    ) {}
}

/* [GET]/VERIFICA-CODIGO-VALIDADO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class VerificaCodigoValidadoDTORequest {
    constructor(
        public userName: string = ""
    ) {}
}

/* [GET]/GERAR-CODIGO-VALIDO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class GerarCodigoValidoDTORequest {
  constructor(
        public userName: string = "",
        public distribuidora: string = "",
        public regiao: string = "",
        public emailAcesso: string = "",
        public recaptcha: string = ""
    ) {}
}

/* [POST]/REENVIAR-EMAIL
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class ReenviarEmailDTORequest {
    constructor(
        public canalSolicitante: string = "",
        public distribuidora: string = "",
        public documento: string = "",
        public regiao: string = "",
        public para: string = "",
        public de: string = "",
        public assunto: string = "",
        public mensagem: string = ""
    ) {}
}
