import { environment } from "@environments/environment";
import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";
import { Anexo } from "../../anexo/anexo";

/**
 * [GET]/UCS/{CODIGO}/VALIDA-RELIGACAO
 * Verifica se a unidade consumidora está apta para efetivar uma religação
 */
export class ValidaReligacaoDTORequest {
    constructor(
        public codigo: string,
        public canalSolicitante: string,
        public usuario: string,
    ) {
        this.codigo = codigo;
        this.canalSolicitante = environment.canal;
        this.usuario = environment.USUARIO_UE;
    }
}

/**
 * [GET]/UCS/{CODIGO}/TAXA-RELIGACAO
 * Informa o valor da taxa de serviço cobrada para a religação
 */
export class TaxaReligacaoDTORequestSE {
    constructor(
        public codigo: string,
        public canalSolicitante: string,
        public usuario: string,
    ) {
        this.codigo = codigo;
        this.canalSolicitante = environment.canal;
        this.usuario = environment.USUARIO_UE;
    }
}

/**
 * [POST]/UCS/{CODIGO}/RELIGACAO-IMEDIATA
 * Registrar o pedido de religação do usuário. Este método efetiva a religação
 */
export class ReligacaoImediataDTORequest {
    constructor(
        public tipoTaxa: string,
        public codigo: string,
        public headerMetodo: HeaderMetodo,
        public cobrataxa?: string,                 //SAP obrigatório - N/A Sonda
        public pontoReferencia?: string,           //SAP obrigatório - N/A Sonda
        public telefoneSolicitante?: string,       //SAP obrigatório - N/A Sonda
        public nomeSolicitante?: string,           //SAP obrigatório - N/A Sonda
        public pagamentoConfirmado?: string,       //SAP opcional
        public faturasArrecadadas?: Array<FaturaArrecadadas>,   //Sonda opcional
    ) {
        this.tipoTaxa = tipoTaxa;
        this.cobrataxa = cobrataxa;
        this.pontoReferencia = pontoReferencia;
        this.telefoneSolicitante = telefoneSolicitante;
        this.nomeSolicitante = nomeSolicitante;
        this.headerMetodo = new HeaderMetodo();
      }
}

export class FaturaArrecadadas{
    constructor(
        public codCPU: string,
        public dataPagamento: Date,
        public localPagamento: string,
        public numSeqOper: string,
    ) {
        this.codCPU = '01'; // Fixo
        this.dataPagamento = new Date();
        this.localPagamento = 'Canais Digital';
        this.numSeqOper = numSeqOper;
    }
}
