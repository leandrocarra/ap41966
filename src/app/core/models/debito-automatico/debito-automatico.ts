import { Servicos } from "app/core/enums/servicos";

export class DebitoAutomatico {
    constructor(
        public fluxo: FluxoDoClienteDebitoAutomatico = '',
        public dadosBancarios: DadosBancarios = new DadosBancarios(),
        public fluxoDebito: Fluxo = EnumFluxoDebitoAutomatico.Cadastrar,
        public debitoAutomaticoCadastrado: boolean = false, // Cadastrado na Agência Virtual?
        public debitoAutomaticoConfirmado: boolean = false, // Confirmado pelo banco?
        public uc: string = ''
    ) { }
}

export type FluxoDoClienteDebitoAutomatico = '' | Servicos.trocaDeTitularidade | Servicos.debitoAutomatico;

export type Fluxo = EnumFluxoDebitoAutomatico.Cadastrar | EnumFluxoDebitoAutomatico.Alterar | EnumFluxoDebitoAutomatico.Descadastrar;

export enum EnumFluxoDebitoAutomatico {
    Cadastrar = 'cadastrar',
    Alterar = 'alterar',
    Descadastrar = 'descadastrar'
}

export class DadosBancarios {
    constructor(
        public banco: any = '',
        public agencia: string = '',
        public conta: string = ''
    ) { }
}

export enum TitulosCorrespondentes {
    debitoAutomatico = "Débito automático",
    cadastrarDebitoAutomatico = "Cadastre-se no débito automático",
    alterarDebitoAutomatico = "Alterar débito automático",
    descadastroDeDebitoAutomatico = "Descadastro de débito automático",
}

export enum TipificacaoDebitoAutomatico {
    Informacao = '1010807',
    Cadastrar = '10399010',
    Descadastrar = '10399011',
}

export enum MensagemProcessamentoDCC {
    processamentoCadastrar = 'As faturas já emitidas devem ser pagas por boleto bancário ou código de barras.',
    processamentoAlterar = 'As faturas já emitidas devem ser pagas por débito automático na conta bancária cadastrada anteriormente.',
    processamentoDescadastrar = 'As faturas já emitidas devem ser pagas por debito automático.'
}

export enum MensagemTipoFluxo {
    //Banco do Brasil
    cadastrarEalterarBancoDoBrasil = 'Atenção! Para concluir a solicitação de Débito Automático, confirme o cadastro em um dos canais de atendimento do seu banco.',
    cadastrarEalterarBancoDoBrasilOSB = 'Atenção! Para concluir a solicitação de Débito Automático, confirme o cadastro em um dos canais de atendimento do seu banco.\nAguarde a finalização do período de leitura.',


    //Itau
    cadastrarEalterarItau = 'Atenção! Para realizar o cadastro de Débito Automático, o titular da conta de energia deve ser o mesmo titular da conta bancária.',
    cadastrarEalterarItauOSB = 'Atenção! Para realizar o cadastro de Débito Automático, o titular da conta de energia deve ser o mesmo titular da conta bancária.\nAguarde a finalização do período de leitura.',

    //Demais Bancos
    cadastrarConfirmar = 'Atenção! O cadastro do Débito Automático será validado pelo seu banco e poderá ocorrer a partir do próximo ciclo de faturamento.',
    cadastrarConfirmarOSB = 'Atenção! O cadastro do Débito Automático será validado pelo seu banco e poderá ocorrer a partir do próximo ciclo de faturamento.\nAguarde a finalização do período de leitura.',

    alterarConfirmar = 'Atenção! A alteração do débito automático será validado pelo seu banco e poderá ocorrer a partir do próximo ciclo de faturamento.',
    alterarConfirmarOSB = 'Atenção! A alteração do débito automático será validado pelo seu banco e poderá ocorrer a partir do próximo ciclo de faturamento.\nAguarde a finalização do período de leitura.',

    cadastrarSolicitacaoEnviada = 'Atenção! Caso a solicitação do Débito Automático não seja aprovada pelo banco, a forma de pagamento será por meio de boleto bancário ou código de barras.',
    cadastrarSolicitacaoEnviadaOSB = 'Atenção! Caso a solicitação do Débito Automático não seja aprovada pelo banco, a forma de pagamento será por meio de boleto bancário ou código de barras.\nAguarde a finalização do período de leitura.',

    alterarSolicitavaoEnviada = 'Atenção! Caso as alterações solicitadas para o Débito Automático não sejam aprovadas pelo banco, o descadastro é realizado e, a partir das próximas faturas, a forma de pagamento será por meio de boleto bancário ou código de barras.',
    alterarSolicitavaoEnviadaOSB = 'Atenção! Caso as alterações solicitadas para o Débito Automático não sejam aprovadas pelo banco, o descadastro é realizado e, a partir das próximas faturas, a forma de pagamento será por meio de boleto bancário ou código de barras.\nAguarde a finalização do período de leitura.',

    descadastrar = 'O descadastro do débito automático poderá ocorrer a partir do próximo ciclo de faturamento. As faturas já emitidas devem ser pagas por débito automático.',
    descadastrarOSB = 'O descadastro do débito automático deverá ocorrer a partir do próximo ciclo de faturamento. Aguarde a finalização do período de leitura.',
}

export enum COD_BANCOS {
    bancoBrasilNE = '0019',
    bancoBrasilSE = '001',
    bancoItauNE = '3417'
}
