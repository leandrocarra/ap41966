import { Retorno } from "app/shared/models/retorno/retorno";

/************************************************************/
// [GET]/BANCOS/{BANCO}/{AGENCIA}/AGENCIAS
// Descrição: Valida se a agência pertence ao banco selecionado.
// Para o Sudeste será aproveitado o WebService já existente getDebitoAutomAgencia
// Para o Nordeste  será utilizada a função Z_ATCWS_F_AGENCIA_DCC.
/************************************************************/
export class AgenciaBancosDTOResponse {
    constructor(
        public agencia: AgenciaDTO = new AgenciaDTO(),
        public retorno: Retorno = new Retorno(),
        public e_resultado: string = ''  //NE
    ) { }
}

export class AgenciaDTO {
    constructor(
        public codAgencia: string = '',
        public codBanco: string = '',
        public descricaoAgencia: string = ''   //Obrigatório SE
    ) { }
}


// ************************************************************
// [GET]/BANCOS
// Descrição: Retorna os bancos cadastrados e seus códigos.
// Para o Sonda, será aproveitado o Webservice já existente getDebitoAutomBancos
// Para SAP será utilizada a função Z_ATCWS_F_BANCOS_DCC que trará as informações do banco informado, bem como orientações sobre o preenchimento da conta corrente.
/************************************************************/
export class BancosCadastradosDTOResponse {
    constructor(
        public bancos: Array<BancoCadastradoDTO | BancoDTO> = [],
        public retorno: Retorno = new Retorno,
        public e_resultado: string = ''  //NE
    ) { }
}

export class BancoDTO {
    constructor(
        public banco: BancoCadastradoDTO,
    ) { }
}

export class BancoCadastradoDTO {
    constructor(
        public numeroBanco: string = '',
        public nomeCompletoBanco: string = '',
        public numeroCaracteresContaBancariaMaximo: string = '',
        public nomeAbreviadoBanco: string = '',
        public numeroCaracteresContaBancariaMinimo: string = '',
        public numeroCaracteresDigitoConta: string = '',
        public digitoVerificador: string = '',
        public dicaContaBancaria: string = ''
    ) { }
}


/************************************************************/
// [POST]/UCS/{CODIGO}/CANCELA-DEBITO-AUTOMATICO
// Descrição: Solicitação para descadastrar o pagamento de faturas com o débito automático.
// Para o Sudeste será aproveitado o Webservice já existente cancelaDebitoAutomatico
// Para Nordeste: Será utiliza a RFC Z_ATCWS_F_CANCELA_DCC. Verifica que a UC possui débito automático e descadastra as coordenadas bancárias. Retorna a forma de pagamento para G (Código de barras) quando grupo B ou F(Ficha de compensação) quando grupo A.
// Verificar se já existe alguma solicitação em andamento (Z_COSBA_VERIFIC_REGISTRO_IGUAL). Caso exista, retornar mensagem informando.
// Verificar se há algum bloqueio (OSB) para a execução e seguir as regras já existentes para este cenário (Z_COSBF_VERIFICA_BLOQ/ Z_COSBA_AUTO_INCLUI_REGISTRO/Z_COSBA_AUTO_INCLUI_OPERANDO) .

/************************************************************/
export class CancelaDebitoAutomaticoDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno(),
        public codigo: string = '',           //Obrigatório SE
        public dataConclusão: string = '',    //Obrigatório SE
        public numSeqGer: string = '',        //Obrigatório SE
        public numSeqOper: string = '',       //Obrigatório SE
        public tipoConclusao: string = '',    //Obrigatório SE
        public e_resultado: string = ''       //NE
    ) { }
}


/************************************************************/
// [GET] /CONTA-CADASTRADA-DEBITO
// Descrição: Retorna o banco, agência e conta em que está cadastrado o débito automático.
// Ao selecionar uma UC, é chamado o [GET]/UCS/{CODIGO} onde no retorno é identificado que a UC está com o serviço de Débito Automático ativo(true ou X).
// Também poderá ser utilizada para validar se a UC está apta para realizar o serviço (Valida).
/************************************************************/
export class ContaCadastradaDebitoDTOResponse {
    constructor(
        public codigoAgencia: string = '',
        public codigoBanco: string = '',
        public nomeCompletoBanco: string = '',
        public numeroContaCorrente: string = '',
        public debitoAutomatico: string = '',
        public retorno: Retorno = new Retorno(),
        public termoAceite: string = '',
        public e_resultado: string = ''
    ) { }
}


/************************************************************/
// [POST]/UCS/{CODIGO}/DEBITO-AUTOMATICO
// Descrição: Cadastrar ou alterar os dados de débito automático para o pagamento das faturas.
// Para Sudeste: será aproveitado o WebService já existente execDebitoAutomatico
// Obs. Não necessita dos campos de IQA, pois já irá gerar o serviço de cadastro DCC no Sonda.
/************************************************************/
export class DebitoAutomaticoDTOResponse {
    constructor(
        public retorno: Retorno = new Retorno(),
        public numSeqOper: string = '',    //Obrigatório SE
        public e_resultado: string = '',   //NE
    ) { }
}

