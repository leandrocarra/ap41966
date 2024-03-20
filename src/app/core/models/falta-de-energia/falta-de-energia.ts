import { environment } from "@environments/environment";
import { Distribuidora } from "app/core/enums/distribuidoras";
import { ObjetoGenerico, ObjetoGenericoMotivo } from "./fluxo-falta-de-energia";

export class FluxoFaltaDeEnergia {
    constructor(
        public telefone: string = '',
        public referencia: string = '',
        public aviso: string = '',
        public problemaEscolhido?: ObjetoGenericoMotivo,
        public ondeFaltaEnergia?: ObjetoGenerico,
        public opcoesDisjuntor?: ObjetoGenerico,
        public fluxoIniciado: boolean = false
    ) {
        this.problemaEscolhido = new ObjetoGenericoMotivo();
        this.ondeFaltaEnergia = new ObjetoGenerico();
        this.opcoesDisjuntor = new ObjetoGenerico();
    }
}

export class Passo {
    constructor(public titulo: string, public descricao: string) { }
}

export class Aviso {
    constructor(
        public escolha: string,
        public imagem: string,
        public titulo: string,
        public tituloColor: string,
        public descricao: string,
        public cancelar: boolean,
        public solicitarReligacao: boolean,
        public protocolo: string
    ) { }
}


/**
    ENUMS
 */

export enum EnumVerificarDisjuntorOpcoes {
    SimEnergiaVoltou = "Sim, a energia voltou.",
    DisjuntorDanificado = "Não, meu disjuntor está danificado.",
    DisjuntorNormal = "Não, meu disjuntor está normal e permaneço sem energia."
}

export enum EnumDisjuntorFuncionandoAvisos {
    PostePadraoCaido = "Pedimos que por favor solicite às pessoas que estão no local para que não cheguem próximo à fiação caída até que uma equipe chegue ao local. Se possível, entrar em contato com a polícia ou bombeiros para isolar a área.",
    FioPartido = "Pedimos que por favor solicite às pessoas que estão no local para que não cheguem próximo à fiação caída até que uma equipe chegue ao local. Se possível, entrar em contato com a polícia ou bombeiros para isolar a área.",
    FaltaEnergiaNaUC = "",
    FaltaEnergiaEmParteDaUC = "",
    FurtoDeEquipamento = "",
    NaoSeiInformar = ""
}

export enum EnumDisjuntorFuncionandoCorpo {
    Titulo = "Falta de Energia",
    Subtitulo = "Pode dizer o que você sabe sobre o problema?"
}

export enum EnumOQueSabeSobreProblemaAvisos {
    FioPartido = "Para sua segurança, nunca se aproxime de postes ou fios caídos na rua.",
    BarulhoFaltaEnergia = "",
    PosteCaido = "",
    NaoSei = ""
}

export enum EnumIluminacaoPublicaCorpo {
    Titulo = "Falta de Energia",
    Subtitulo = "Pode dizer o que você sabe sobre o problema?"
}

export enum EnumDadosContatoCorpo {
    Titulo = "Falta de Energia",
    Subtitulo = "Precisamos que nos informe seu celular e ponto de referência para entrarmos em contato caso seja necessário.",
    DicaLegenda = "Dica: ",
    DicaTexto = "Inserir no formato DDD + número do celular.",
    DicaExemplo = "Ex: (19) 99999-9999",
    TituloInputs = "Dados para contato:"
}

export enum EnumCasoFaltaEnergia {
    // RN_FE_014 - Minha Unidade Consumidora
    PostePadraoCaido,
    FioPostePadraoPartido,
    FaltaEmTodaAUC,
    FaltaParcialNaUC,
    FurtoDeEquipamento,
    AssistenciaMedicaDomiciliar,
    // RN_FE_014 - Vizinhos / Não sei se é apenas na minha UC
    FioPartidoNaRede,
    BarulhoAlto,
    Abalroamento,
    NaoSeiVizinhos,
    NaoSeiSeApenasMinhaUC,
    // RN_FE_014 - Oscilação
    NovosEquipamentosNaUC,
    NovoComercioProximo,
    OscilacaoEmParteDaUC,
    NaoSeiOscilacao,
    // RN_FE_014 - Iluminação pública
    UmaLampadaApagada,
    VariasLampadasApagadas,
    LampadaIntermitente,
    LampadaAcesaDeDia
}

export enum EnumTipificacao {
    /* Método Post*/
    Poste = 1021202,
    Fio = 1021201,
    FaltaDeFase = 1020999,
    FaltaGeral = 102090101,
    FurtoDeEquipamento = 1020902,
    OscilacaoDeTensao = 1020904,
    Transformador = 1021203,
    IluminacaoPublica = 1021299,
    EmergenciaMedica = 1020906,

    /* Método Get*/
    FaltaIndividual = 1011403,
    CadastroIndividual = 10300101,
    InformacaoIndividual = 10300102,
    InformacaoColetiva = 10300201,
    InformacaoOcorrenciaIndividual = 1011401,
    InformacaoOcorrenciaColetiva = 1011402,
    InformacaoIluminacao = 10118,
    CadastrarIluminacao = 10301801
}

export function definirMatriculaPlataforma(): number | undefined {
    if (environment.production === true) {
        switch (environment.title) {
            case Distribuidora.COSERN: return 10212;
            case Distribuidora.COELBA: return 18204;
            case Distribuidora.CELPE: return 13341;
            default: return undefined;
        }
    } else {
        switch (environment.title) {
            case Distribuidora.COSERN: return 7531;
            case Distribuidora.COELBA: return 14967;
            case Distribuidora.CELPE: return 10497;
            default: return undefined;
        }
    }
}
