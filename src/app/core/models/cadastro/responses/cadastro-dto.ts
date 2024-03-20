import { Retorno } from "app/shared/models/retorno/retorno";

/* [POST]/USUARIOS/ATIVO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class UsuarioAtivoDTOResponse {
  constructor(
    public ativo: boolean = false,
    public retorno: Retorno = new Retorno()
  ) {}
}

/* [POST]/USUARIOS/VALIDA-USUARIO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class ValidaUsuarioDTOResponse {
  constructor(
    public acessoValido: boolean = false,
    public validaCadastro: boolean = false,
    public e_resultado: string = '',
    public retorno: Retorno = new Retorno()
  ) {}
}

/* [POST]/USUARIOS
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class CadastroUsuarioDTOResponse {
  constructor(
    public retorno: Retorno = new Retorno()
  ) {}
}

/* [PUT]/USUARIOS/ATIVA-USUARIO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class AtivaUsuarioDTOResonse {
  constructor(
    public retorno: Retorno = new Retorno()
    ) {}
}

/* [GET]/USUARIOS/DADOS-TROCA-SENHA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class DadosTrocaSenhaDTOResponse {
  constructor(
    public email: string = "",
    public emailCadastro: string = "",
    public numero: string = "",
    public retorno: Retorno = new Retorno(),
    public telefoneContato: string = ""
  ) {}
}

/* [POST]/USUARIOS/ESQUECI-SENHA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class EsqueciSenhaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
    ){}
}

/* [POST]/USUARIOS/CODIGO-VALIDA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class CodigoValidaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
    ){}
}

/* [PUT]/USUARIOS/ESQUECI-SENHA-VALIDA
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class EsqueciSenhaValidaDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno()
    ){}
}

/* [GET]/VERIFICA-CODIGO-VALIDADO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class VerificaCodigoValidadoDTOResponse {
  constructor(
      public codigoValidado: boolean = false,
      public retorno: Retorno = new Retorno()
  ){}
}

/* [GET]/GERAR-CODIGO-VALIDO
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class GerarCodigoValidoDTOResponse {
  constructor(
      public userName: string = '',
      public codigoValidator: string = '',
      public retorno: Retorno = new Retorno()
  ){}
}

/* [POST]/REENVIAR-EMAIL
/*
/* Método para cadastro de usuários
/*
/* WSO2
/************************************************************/
export class ReenviarEmailDTOResponse {
  constructor(
      public userName: string = '',
      public codigoValidator: string = '',
      public retorno: Retorno = new Retorno()
  ){}
}
