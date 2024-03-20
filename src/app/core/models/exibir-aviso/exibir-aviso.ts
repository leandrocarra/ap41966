export class Aviso {
    constructor(
        public titulo?: string,
        public tituloColor?: string,
        public mensagem?: string,
        public imagemSrc?: string,
        public imagemAlt?: string,
        public botaoPrimario?: string,
        public funcaoPrimaria?: Function,
        public botaoSecundario?: string,
        public funcaoSecundaria?: Function,
        public protocolo?: string
    ) {
    }
}

export class SeletorDeAviso {
    constructor(
        public aviso: Aviso
    ) {
    }
}

export enum EnumAvisosPadroes {
    UnidadeSuspensa = '0001',
    UnidadeDesligada = '0002',
    DataDeVencimento = '0005',
    DataDeVencimentoColetivaVinculada = '0006',
    Resolvido = '0007',
    EnergiaVoltou = '0008',
    DisjuntorDanificado = '0009',
    EmPracaOuJardim = '0010',
    ParteDaMinhaUC = '0011',
    UsuarioNaoCadastrado = '0017',
    CadastroExistente = '0018',
    CadastroPendente = '0019',
    CadastroConcluido = '0020',
    DadosNaoConferem = '0021',
    CadastroInexistente = '0022',
    SenhaAlterada = '0023',
    FormularioEnviado = '0024',
}

export enum EnumTitulosPadroes {
    ContaColetiva = 'Serviço indisponível para conta contrato coletiva.',
    ContaColetivaFilha =  'Serviço indisponível para conta vinculada a uma conta contrato Coletiva.',
    ContaColetivaFilhaDCC = 'Serviço indisponível para conta contrato vinculada a conta coletiva.\nA forma de pagamento será a mesma da Conta Coletiva.',
    Impedimentos = 'Serviço permitido após trâmite de ativação (1º faturamento).',
    ServicoIndisponivel = 'Serviço indisponível para fatura vinculada a conta contrato coletiva.',
    Indisponivel = 'Serviço indisponível no momento!\nPor favor, tente novamente mais tarde.',
    Inesperado = 'Aconteceu um erro inesperado em nosso sistema.\nPor favor, tente novamente mais tarde!',
    SemFatura = 'Não existem ainda faturas emitidas para esta Unidade Consumidora.',
    Carregamento = 'Não conseguimos carregar suas informações no momento!\nPor favor, tente novamente mais tarde.',
    UcAtiva = 'Esta Unidade Consumidora ainda não possui um contrato ativo com a distribuidora. Para cadastrar uma Autoleitura é necessário que a Unidade Consumidora esteja ativa.',
    IndisponivelGrupoA = 'Infelizmente este serviço ainda não está disponível nos canais digitais para Unidade Consumidora do Grupo A.',
    TramiteDeAtivacao = 'Serviço permitido após trâmite de ativação (1º faturamento).',
    PrimeiraFatura = 'Serviço permitido após geração da primeira fatura.',
    ImpossivelProsseguir = 'Não é possível prosseguir com o serviço.\nPor favor, entre em contato com o call center ou procure uma de nossas lojas para atualização cadastral.',
    UcNaoApta = 'Sua Unidade Consumidora não está apta \na realizar este serviço na Agência Virtual.',
    FaturasNaoEmitidas = 'Não existem ainda faturas emitidas em aberto\npara esta Unidade Consumidora.',
    SemFaturasEmAberto = 'Não existem faturas em aberto\npara esta Unidade Consumidora.',
    AguardarConfirmacaoPeriodoDeLeitura = `O serviço já foi solicitado e será efetivado após o período de leitura.`,
    AgenciaNaoCadastrada = 'Agência não cadastrada em nossos sistemas.\nPor favor, procure sua agência bancária e tente novamente.',
    SemHistoricoDeConsumo = 'Não há histórico de consumo disponível\n para esta unidade consumidora.',
    TarifaBrancaIrrigante = 'Infelizmente este serviço ainda não está disponível nos canais digitais para Unidades Consumidoras pertencentes à Tarifa Branca/Irrigante.',
    GrupoANE = 'Infelizmente este serviço ainda não está disponível nos canais digitais para Unidade Consumidora do Grupo A.',
    MultiplosRegistradores = 'Infelizmente este serviço ainda não está disponível nos canais digitais para equipamentos de medição com múltiplos registradores.',
    GrupoA = 'Infelizmente este serviço ainda não está disponível nos canais digitais para Unidade Consumidora do Grupo A.',
    PerfilDeAcessoNaoPermitido = 'Serviço não disponivel para esse perfil de acesso.',
    DadosCadastrais = 'Necessário atualização de dados cadastrais. Favor dirigir-se a uma loja.',
    UCNaoEncontrada = 'Conta Contrato não encontrada.',
    ReligacaoEmAndamento = 'Não é possivel pedir Religação, pois existe um pedido\n de Religação em andamento. Para mais informações acesse a página\n de acompanhamento de solicitações.',
    DesligamentoPermanente = 'Esta unidade consumidora teve seu fornecimento\ndesligado permanentemente. Para reestabelecer o\nfornecimento, é necessário solicitar uma ligação nova.'

}
