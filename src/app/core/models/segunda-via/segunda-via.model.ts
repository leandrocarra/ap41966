import { DadosPagamentoDTOResponse, EntregaFaturasDTO, FaturaDTO } from "./response/segunda-via-response-dto";

export class SegundaVia {
    public possuiFaturas: boolean;
    public erroListarFaturas: any;
    public entregaFatura: EntregaFaturasDTO;
    public faturasVencidas: number;
    public indicePagina: number;
    public pageSize: number;
    public anoStatus: {key: string, value: Array<string>}[];
    public listaStatusFaturas: Array<string>;
    public faturasFiltradas: Array<FaturaDTO>;
    public unidadeConsumidora: string;
    constructor() {
        this.possuiFaturas = false;
        this.entregaFatura = new EntregaFaturasDTO();
        this.faturasVencidas = 0;
        this.indicePagina = 1;
        this.pageSize = 5;
        this.anoStatus = [];
        this.listaStatusFaturas = [];
        this.faturasFiltradas = [];
        this.unidadeConsumidora = '';
    }
}

export class Banco {
    constructor(
        public linkRedirecionamento: string,
        public nomeDoBanco: string,
        public imagemBanco: string,
    ) { }
}

export class InformativoFaturaAberta  {
    constructor(
        public titulo: string,
        public texto: string,
    ) { }
}

export class CodigoDeBarraFatura {
    constructor(
        public fatura: FaturaDTO = new FaturaDTO(),
        public dadosPagamento: DadosPagamentoDTOResponse = new DadosPagamentoDTOResponse()
    ) { }
}

export type Status = "vencida" | "avencer" | "emprocessamento" | "vinculada" | "renegociada" | "parcialmentepago" | "emreserva"| "aberto" | "pago";

export const StatusFatura = {
    vencida: "Vencida" as Status,
    avencer: "A vencer" as Status,
    pago: "Pago" as Status,
    emprocessamento: "Em processamento" as Status,
    vinculada: "Vinculada" as Status,
    renegociada: "Renegociada" as Status,
    emreserva: "Em reserva" as Status,
    parcialmentepago: "Parcialmente Pago" as Status,
    aberto: "Em aberto" as Status
}

export const AvisoFatura = {
    Vinculada : "O valor dessa conta não atingiu a quantia de R$70,00. Este valor será acumulado sem encargos na próxima conta. Caso deseje realizar o pagamento, você pode se dirigir a uma de nossas lojas físicas.",
    EmProcessamento : "Sua forma de pagamento atual é débito automático.",
    VencidaAVencer: "Caso o pagamento já tenha sido efetuado, ele pode demorar até 72 horas para ser identificado pelo nosso sistema.",
    SemFaturasEmitidas: "Ainda não houve faturamento para esta Unidade Consumidora. A primeira fatura é gerada entre 15 a 47 dias após a ligação."
}

export enum MensagemAviso {
    UsuarioNaoCadastro = "Dados não localizados. Por favor, realize seu cadastro e tente novamente.",
    DadosNaoConferem = "Informações não conferem. Tente novamente.",
    TerceiraTentativa = "Dados inválidos. Por favor, entre em contato com a gente através do 116 ou atendimento presencial.",
    CPFInvalido = "CPF inválido. Tente novamente.",
    CNPJInvalido = "CNPJ inválido. Tente novamente.",
    DocumentoInvalido = "Documento inválido.",
    DataDeNascimentoInvalido = "Data de nascimento inválida. Tente novamente.",
    CodigoClienteInvalido = "Código do Cliente inválido. Tente novamente.",
    UnidadeConsumidoraInvalida = "Unidade consumidora inválida. Por favor, tente novamente.",
    ErroDeCarregamento = "Não conseguimos carregar suas informações no momento. Por favor, tente  mais tarde ou caso prefira continue o seu atendimento através do nosso WhatsApp. Clique aqui!",
    DadosNaoPreenchidos = "Por favor, preencher os campos.",
    DadosNaoConferemSegundaVia = "Dados não conferem! Por favor, verifique os dados fornecidos e tente novamente. Caso tenha digitado os dados corretos, entre em contato através dos nossos canais de atendimento."
}

export function formatarDataParaString(input: string | Date, exibirDiaAntes: boolean): string {
    if (typeof(input) === 'string') {
        let output: Array<string> = [];
        if (exibirDiaAntes) {
            output.push(input.slice(0,2));
            output.push(input.slice(2,4));
        } else {
            output.push(input.slice(2,4));
            output.push(input.slice(0,2));
        }
        output.push(input.slice(4));
        return output.join('/');
    } else {
        if (exibirDiaAntes) {
            return input.toLocaleDateString('pt-br', { day: 'numeric', month: 'numeric', year: 'numeric' });
        } else {
            return input.toLocaleDateString('en-us', { day: 'numeric', month: 'numeric', year: 'numeric' });
        }
    }
}

export const listaTipologiasFaturaNE = {
    "02": 1031602,
    "03": 1031603,
    "04": 1031604,
    "07": 1031605,
    "10": 1031607
};

export const listaTipologiasFaturaSE = {
    "80": 1031602,
    "81": 1031603,
    "82": 1031604,
    "83": 1031605,
    "84": 1031607
};

