import { environment } from "@environments/environment";
import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";

export class PdfDTORequest {
    constructor(
        public codigo: string,
        public numSeqOper: string,
        public protocolo: string,
        public tipificacao: number,
        public usuario: string,
        public canalSolicitante: string,
        public motivo: string,
        public protocoloSonda?: string, //Somente SE
        public opcaoSSOS?: string, //Somente SE
        public taxa?: string, //Somente SE
        public documentoSolicitante?: string, //NE - Obrigatório | SE - N/A
        public identificador?: string, //NE - N/A
        public unidOrgAT?: string, //NE - N/A
    ) {
        this.codigo = codigo;
        this.numSeqOper = numSeqOper;
        this.protocolo = protocolo;
        this.tipificacao = tipificacao;
        this.usuario = usuario;
        this.canalSolicitante = environment.canal;
        this.motivo = motivo;
    }
}

export class ListaMotivoDTORequest {
    constructor(
        public canalSolicitante?: string,
        public usuario?: string,
    ) {
        this.canalSolicitante = canalSolicitante;
        this.usuario = usuario;
    }
}

export class FaturasDTORequest {
    constructor(
        public codigo: string,
        public documento: string,
        public canalSolicitante: string,
        public usuario: string,
        public protocolo: string,
        public tipificação: string,
        public atividade?: string,
        public documentoSolicitante?: string, //Obrigatório NE e N/A SE
        public opcaoSSOS?: string, //Somente SE
        public protocoloSonda?: string, //Somente SE
        public dataCriaAtividade?: Date,
        public situacaoComercial?: string,
        public dataInicioVencFat?: Date,
        public dataFimVencFat?: Date,
        public identificador?: string, //NE - N/A
        public unidOrgAT?: string, //NE - N/A
    ) {
        this.codigo = codigo;
        this.documento = documento;
        this.canalSolicitante = canalSolicitante;
        this.usuario = usuario;
        this.protocolo = protocolo;
        this.tipificação = tipificação;
        this.atividade = atividade;
        this.documentoSolicitante = documentoSolicitante;
        this.opcaoSSOS = opcaoSSOS;
        this.protocoloSonda = protocoloSonda;
        this.dataCriaAtividade = dataCriaAtividade;
        this.situacaoComercial = situacaoComercial;
        this.dataInicioVencFat = dataInicioVencFat;
        this.dataFimVencFat = dataFimVencFat;
    }
}

export class FaturaSimplificadaDTORequest {
    constructor(
        public header: HeaderMetodo,
        public recaptcha: string,
        public documento?: string,
        public tipoCliente?: string,
        public dataNascimento?: string,
        public codUc?: string,
        public opcaoSSOS?: string, //Obrigatório SE
    ) {
        this.header = header;
        this.recaptcha = recaptcha;
        this.documento = documento;
        this.tipoCliente = tipoCliente;
        this.dataNascimento = dataNascimento;
        this.codUc = codUc;
        this.opcaoSSOS = opcaoSSOS;
    }
}

export class DadosPagamentoDTORequest {
    constructor(
        public numSeqOper: string,
        public headerMetodo: HeaderMetodo,
        public codCpu?: string, //Obrigatório SE
        public tipoPagamento?: string, 
        public codigo?: string,
        public geraSsOs?:string //Obrigatória SE
    ) {
        this.numSeqOper = numSeqOper;
        this.headerMetodo = this.headerMetodo ?? "";
        this.tipoPagamento = tipoPagamento;
        this.codigo = codigo;
        this.geraSsOs = geraSsOs;
    }
}

export class GerarURLFlexPagDTORequest {
    constructor(
        public cliente: ClienteDTO,
        public is_authenticated: boolean,
        public payment_module: number,
        public order: OrderDTO,
    ) {
        this.cliente = cliente;
        this.is_authenticated = true; //FIXO
        this.payment_module = 2;     //FIXO
        this.order = order;
    }
}

export class ClienteDTO {
    constructor(
        public name: string,
        public document_type: string,
        public ni: string,
        public email: string,
        public phone: string,
        public birth_date: string,
        public address: AddressDTO,
    ) {
        this.name = name;
        this.document_type = document_type;
        this.ni = ni;
        this.email = email;
        this.phone = phone;
        this.birth_date = birth_date;
        this.address = address;
    }
}

export class AddressDTO {
    constructor(
        public zip: string,
        public address: string,
        public number: string,
        public complement: string,
        public district: string,
        public city: string,
        public state: string
    ) {
        this.zip = zip;
        this.address = address;
        this.number = number;
        this.complement = complement;
        this.district = district;
        this.city = city;
        this.state = state;
    }
}
export class OrderDTO {
    constructor(
        public id: string,
        public amount: number,
        public account: Array<AccountDTO>
    ) {
        this.id = id;
        this.amount = amount;
        this.account = account;
    }
}

export class AccountDTO {
    constructor(
        public uc: UnidadeConsumidoraDTO,
        public invoices: Array<InvoiceDTO>
    ) {
        this.uc = uc;
        this.invoices = invoices;
    }
}

export class UnidadeConsumidoraDTO {
    constructor(
        public uc: string,
        public uc_documento: string
    ) {
        this.uc = uc;
        this.uc_documento = uc_documento;
    }
}

export class InvoiceDTO {
    constructor(
        public id: number,
        public amount: number,
        public due_data: string,
        public bar_code_one: string,
        public bar_code_two: string
    ) {
        this.id = id;
        this.amount = amount;
        this.due_data = due_data;
        this.bar_code_one = bar_code_one;
        this.bar_code_two = bar_code_two;
    }
}
