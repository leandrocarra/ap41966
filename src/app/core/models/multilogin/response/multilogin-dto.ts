import { Retorno } from "app/shared/models/retorno/retorno";

/************************************************************/
/* [POST]/usuarios/valida-relacao
/*
/* Valida a existência de relação do tipo representante legal ou cônjuge nos sistemas legados da Neoenergia: SAP se for Nordeste ou Sonda se for Elektro.
/************************************************************/
export class ValidaRelacaoDTOResponse {
    constructor(
        public e_resultado: string,
        public retorno: Retorno = new Retorno(),
        public relacoes: Array<Relacao> = []
    ) { }
}

export class Relacao {
    constructor(
        public documentoCliente: string = '',
        public nomeCliente: string = ''
    ) { }
}


/************************************************************/
/* [POST]/usuarios/buscatipocliente
/*
/* Busca a informação do tipo do cliente cadastrada no parceiro de negócios no legado – SAP com o Objetivo de direcionar o e-mail ao time correto de BackOffice, podendo ser grandes clientes, poder público ou clientes normais.
/*
/* Apenas NE.
/************************************************************/
export class BuscaTipoClienteDTOResponse {
    constructor(
        public tipoCliente: string,
        public e_resultado: string,
        public retorno: Retorno = new Retorno()
    ) { }
}


/************************************************************/
/* [GET]/mlogin-obter-servicos
/*
/* Receber os serviços autorizados, lista das ucs e o tipo de acesso de um determinado usuário, 
/************************************************************/
export class ObterServicosDTOResponse {
    constructor(
        public userName: string = '',
        public listaServicos: Array<string> = [],
        public listaUCs: Array<string> = [],
        public tipoPermissao: string = '',
    ) {}
}


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
export class VinculoPerfisDTOResponse {
    constructor(
        public documentoFiscalPrimario: string,
        public documentoFiscalSecundario: string,
        public tipoAtribuicao: string,
        public mensagem: string,
        public numero: number,
        public uc?: string,
    )  { }
}


/************************************************************/
/* [GET]/mlogin-obter-vinculos-concedidos  (devPortal) equivalente ao [GET]/obter-vinculos-concedidos 
/* [GET]/obter-vinculos-recebidos (devPortal) equivalente ao [GET] /mlogin-obter-vinculos-recebidos (ET)
/*
/* Endpoint para retornar uma lista com todos os vínculos com permissões concedidas do usuário no multilogin, com ou sem UC relacionada
/* Endpoint para retornar uma lista com todos os vínculos com permissões recebidas do usuário no multilogin, com ou sem UC relacionada.
/************************************************************/
export class ObterVinculosDTOResponse {
    constructor(
        public nomeCompleto: string,
        public documentoFiscal: string,
        public listaPerfisAtivo: Array<string>,
        public listaObjetoPerfisAtivos: Array<PerfilAtivo>
    ) { }
}

export class PerfilAtivo {
    constructor(
        public nomePerfil: string,
        public nomeTitular: string,
        public docTitular: string,
        public dataInclusao: string, 
        public dataVigencia: string,
        public listaDeUcs: Array<string>,
        public button?: string,     //Controle para o front
        public isValid?: boolean,   //Controle para o front
    ) { }
}


//NOTE: Temporário aguardando endpoints pelo wso2 - remover depois
/************************************************************/
/* [GET]/obter-vinculos-recebidos (devPortal) equivalente ao [GET] /mlogin-obter-vinculos-recebidos (ET)
/*
/* Endpoint para retornar uma lista com todos os vínculos com permissões recebidas do usuário no multilogin, com ou sem UC relacionada. 
/************************************************************/
export class ObterVinculosRecebidosDTOResponse {
    constructor(
        public dadosCadastrais: DadosCliente,
        public perfis: Array<PerfilAtivoCompartilhado>,
    ) { }
}

export class DadosCliente {
    constructor(
        public nome_titular: string,
    ){ }
}

export class PerfilAtivoCompartilhado {
    constructor(
        public perfil: DadosPerfilCompartilhado
    ) { }
}

export class DadosPerfilCompartilhado {
    constructor(
        public nome_perfil: string,
        public nome_acesso: string,
        public doc_acesso: string,
        public data_inclusao: string,
        public data_vigencia: string,
        public ucs_compartilhadas: Array<string>
    ) { }
}