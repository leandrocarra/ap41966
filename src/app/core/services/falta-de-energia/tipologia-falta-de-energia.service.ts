import { Injectable } from "@angular/core";
import { Regiao } from "app/core/enums/regiao";
import { EnumFaltaEnergiaOpcoes, EnumMotivoFaltaDeEnergia, EnumTipificacaoReclamacao, ObjetoGenerico, ObjetoGenericoMotivo } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";

export const RETORNOS_GET_CONSULTAR_FE_IP: Array<string> = ['ILUMINACAO PUBLICA APAGADA INDIVIDUAL', 'ILUMINACAO PUBLICA APAGADA GERAL'];
@Injectable({
    providedIn: 'root',
  })
export class TipologiaFaltaEnergiaService {
    constructor() {
    }

    CODIGOS_DOS_MUNICIPIOS_DE_RESPONSABILIDADE_DA_CONCESSIONARIA: Array<string> = [
        '300000000078', // Agrestina
        '300000000107', // Gravata
        '300000000140', // Panelas
        '300000000012' // Bezerros
    ];

    get MOTIVOS_FALTA_DE_ENERGIA(): Array<ObjetoGenerico> {
        return [
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.MinhaUnidadeConsumidora,
                "Apenas na minha unidade consumidora."
            ),
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.Vizinhanca,
                "Na minha unidade consumidora e na minha vizinhança."
            ),
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.IluminacaoPublica,
                "Iluminação pública (na rua, poste, jardim, praça ou locais públicos)."
            ),
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.OscilacaoDeTensao,
                "Oscilação de Tensão."
            ),
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.NaoSoubeInformar,
                "Não sei se é apenas na minha unidade consumidora."
            )
        ];
    }

    get OPCOES_DISJUNTOR(): Array<ObjetoGenerico> {
        return [
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.EnergiaVoltou,
                "Sim, a energia voltou."
            ),
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.SemEnergiaDisjuntorDanificado,
                "Não, meu disjuntor está danificado."
            ),
            new ObjetoGenerico(
                EnumFaltaEnergiaOpcoes.SemEnergia,
                "Não, meu disjuntor está normal e permaneço sem energia."
            )
        ];
    }

    private posteCaido(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'PDF14' : '21',
            key: EnumFaltaEnergiaOpcoes.PosteCaido,
            value: "Poste padrão caído.",
            observacoes: "N/A",
            tipologia: EnumTipificacaoReclamacao.PostePadrao
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "PDF";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private fioPartido(regiao: Regiao, grupooTensao: 'A' | 'B'): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = new ObjetoGenericoMotivo();

        motivo.key = EnumFaltaEnergiaOpcoes.FioPartido;
        motivo.value = "Fio do poste padrão partido.";

        if (regiao === Regiao.SE) {
            motivo.codigo = grupooTensao === 'B' ? 'RM04' : 'RM05';
            motivo.tipoAviso = "RM";
            motivo.observacoes = grupooTensao === 'B' ? 'Rede Secundária' : "Rede Primária";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = true;
            motivo.riscoMorte = true;
        } else {
            motivo.codigo = grupooTensao === 'B' ? '5' : '4';
            motivo.observacoes = "Risco de morte";
            motivo.tipologia = EnumTipificacaoReclamacao.FioDoPostePadrao;
        }

        return motivo;
    }

    private todaUcIndividual(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'FE01' : '11',
            key: "todaUc",
            value: "Falta de energia em toda a unidade consumidora.",
            observacoes: "N/A",
            tipologia: EnumTipificacaoReclamacao.FaltaIndividual
        };


        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "FE";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private parteUcIndividual(regiao: Regiao, grupooTensao: 'A' | 'B'): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'FE02' : '9',
            key: EnumFaltaEnergiaOpcoes.ParteDaUc,
            value: "Falta de energia em parte da unidade consumidora.",
            observacoes: "N/A",
            tipologia: EnumTipificacaoReclamacao.FaltaDeFase
        };


        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "FE";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private furtoMedidor(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'PDF11' : '11',
            key: "furto",
            value: "Houve furto do equipamento / medidor.",
            observacoes: "Furto de equipamento / medidor.",
            tipologia: EnumTipificacaoReclamacao.FurtoDeMedidor
        };

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "PDF";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private naoSeiIndividual(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'FE01' : '11',
            key: "naoSei",
            value: "Não sei.",
            observacoes: "Não sei se é só na minha UC",
            tipologia: EnumTipificacaoReclamacao.NaoSei
        };

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "EM";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private novoEquipamento(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'NT01' : '34',
            key: "novoEquipamento",
            value: "Houve inclusão de novos equipamentos na unidade consumidora.",
            observacoes: "Novos equipamentos.",
            tipologia: EnumTipificacaoReclamacao.OscilacaoDeTensao
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "NT";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private novoComercio(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? "NT01" : '34',
            key: "novoComercio",
            value: "Há um novo comércio próximo a minha unidade consumidora.",
            observacoes: "Comércio próximo",
            tipologia: EnumTipificacaoReclamacao.OscilacaoDeTensao,
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "NT";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private oscilacaoParteUC(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'NT01' : '34',
            key: EnumFaltaEnergiaOpcoes.OscilacaoDeTensaoParteUc,
            value: "A oscilação de tensão está ocorrendo somente em alguma parte da sua unidade consumidora.",
            observacoes: "Parte da UC",
            tipologia: EnumTipificacaoReclamacao.OscilacaoDeTensao
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "NT";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = "N";
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private oscilacaoNaoSei(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'NT01' : '34',
            key: "naoSeiInformar",
            value: "Não sei informar.",
            observacoes: "Sem Informacao",
            tipologia: EnumTipificacaoReclamacao.OscilacaoDeTensao
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "NT";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private lampadaApagada(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'IP01' : '12',
            key: "umaApagada",
            value: "Uma lâmpada apagada.",
            observacoes: "Uma lâmpada apagada - IP individual",
            tipologia: EnumTipificacaoReclamacao.IluminacaoPublica
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "IP";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private variasLampadas(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'IP03' : '12',
            key: "variasApagadas",
            value: "Várias lâmpadas apagadas.",
            observacoes: "Várias lâmpadas apagadas - IP individual",
            tipologia: EnumTipificacaoReclamacao.IluminacaoPublica
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "IP";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private naPracaOuJardim(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'IP03' : '12',
            key: "naPracaOuJardim",
            value: "Lâmpada apagada em praça ou jardim.",
            observacoes: "No Jardim - IP individual",
            tipologia: EnumTipificacaoReclamacao.IluminacaoPublica
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "IP";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private acendaApaga(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'IP05' : '12',
            key: "acendeApaga",
            value: "Lâmpada acende e apaga.",
            observacoes: "Lâmpada acende e apaga - IP individual",
            tipologia: EnumTipificacaoReclamacao.IluminacaoPublica
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "IP";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private duranteDia(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'IP02' : '12',
            key: "duranteOdia",
            value: "Lâmpada acesa durante o dia.",
            observacoes: "Lâmpada acesa durante o dia - IP individual",
            tipologia: EnumTipificacaoReclamacao.IluminacaoPublica
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "IP";
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
            motivo.riscoMorte = false;
        }

        return motivo;
    }

    private fioPartidoVizinhanca(regiao: Regiao, grupoTensao: 'A' | 'B'): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = new ObjetoGenericoMotivo();

        motivo.key = "fioPartidoRede";
        motivo.value = "Fio Partido na Rede.";
        motivo.tipologia = EnumTipificacaoReclamacao.FioDaRua;

        if (regiao === Regiao.SE) {
            motivo.codigo = grupoTensao === 'B' ? 'RM05' : "RM04";
            motivo.tipoAviso = "RM";
            motivo.observacoes = grupoTensao === 'B' ? 'Rede Secundária' : "Rede primária";
            motivo.riscoMorte = true;
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = true;

        } else {
            motivo.codigo = grupoTensao === 'A' ? '5' : '4';
            motivo.observacoes = "Risco de morte";
        }

        return motivo;
    }

    private barulhoAltoVizinhanca(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.NE ? '28' : 'FE02',
            key: "barulhoAlto",
            value: "Barulho alto antes da falta de energia.",
            observacoes: "Barulho alto antes",
            tipologia: EnumTipificacaoReclamacao.Transformador
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "FE";
            motivo.riscoMorte = false;
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
        }

        return motivo;
    }

    private abalroamentoVizinhanca(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'RM01' : '22',
            key: "abalroamento",
            value: "Abalroamento (colisão entre veículo e poste).",
            observacoes: "Risco de morte",
            tipologia: EnumTipificacaoReclamacao.PosteDaRua
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "RM";
            motivo.riscoMorte = true;
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = true;
        }

        return motivo;
    }

    private naoSeiVizinhanca(regiao: Regiao): ObjetoGenericoMotivo {
        let motivo: ObjetoGenericoMotivo = {
            codigo: regiao === Regiao.SE ? 'FE01' : '11',
            key: "naoSei",
            value: "Não sei.",
            observacoes: "Vizinhança e eu",
            tipologia: EnumTipificacaoReclamacao.NaoSei
        }

        if (regiao === Regiao.SE) {
            motivo.tipoAviso = "FE";
            motivo.riscoMorte = false;
            motivo.confirmacaoAviso = 'Y';
            motivo.confirmacaoProcesso = 'N';
            motivo.informacaoImportante = false;
        }

        return motivo;
    }

    get ASS_MEDICA_DOMICILIAR(): ObjetoGenericoMotivo {
        return {
            codigo: '32',
            key: 'assMedicaDomiciliar',
            value: EnumMotivoFaltaDeEnergia.AssMedicaDomiciliar,
            observacoes: 'Risco de Morte',
            tipologia: EnumTipificacaoReclamacao.AssistenciaMedica,
            riscoMorte: undefined,
            confirmacaoProcesso: '',
            informacaoImportante: undefined,
            tipoAviso: ''
        }
    }


    getMotivosIndividual(regiao: Regiao, grupooTensao: 'A' | 'B'): Array<ObjetoGenericoMotivo> {
        return [
            this.posteCaido(regiao),
            this.fioPartido(regiao, grupooTensao),
            this.todaUcIndividual(regiao),
            this.parteUcIndividual(regiao, grupooTensao),
            this.furtoMedidor(regiao),
            this.naoSeiIndividual(regiao)
        ];
    }

    getMotivosVizinhanca(regiao: Regiao, grupoTensao: 'A' | 'B'): Array<ObjetoGenericoMotivo> {
        return [
            this.fioPartidoVizinhanca(regiao, grupoTensao),
            this.barulhoAltoVizinhanca(regiao),
            this.abalroamentoVizinhanca(regiao),
            this.naoSeiVizinhanca(regiao)
        ];
    }

    getOpcoesOscilacao(regiao: Regiao): Array<ObjetoGenericoMotivo> {
        return [
            this.novoEquipamento(regiao),
            this.novoComercio(regiao),
            this.oscilacaoParteUC(regiao),
            this.oscilacaoNaoSei(regiao)
        ];
    }

    getOpcoesIluminacaoPublica(regiao: Regiao): Array<ObjetoGenericoMotivo> {
        return [
            this.lampadaApagada(regiao),
            this.variasLampadas(regiao),
            this.naPracaOuJardim(regiao),
            this.acendaApaga(regiao),
            this.duranteDia(regiao)
        ];
    }
}

