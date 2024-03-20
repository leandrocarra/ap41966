import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto, Servicos } from "app/core/enums/servicos";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { definirMatriculaPlataforma, FluxoFaltaDeEnergia } from "app/core/models/falta-de-energia/falta-de-energia";
import {
    EnumFaltaEnergiaOpcoes,
    EnumTipificacaoReclamacao
} from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { POSTFaltaEnergiaDTORequest } from "app/core/models/falta-de-energia/requests/falta-de-energia-dto";
import { POSTFaltaEnergiaDTOResponse } from "app/core/models/falta-de-energia/responses/falta-de-energia-dto";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { SolicitacaoEnviadaService } from "app/core/services/solicitacao-enviada/solicitacao-enviada.service";
import { UserService } from "app/core/services/user/user.service";
import { convertDates } from "app/core/services/utils/utils.service";
import { SolicitacaoContent, SolicitacaoEnviada } from "app/shared/models/solicitacao-enviada/solicitacao-enviada";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-confira-seus-dados",
    templateUrl: "./confira-seus-dados.component.html",
    styleUrls: ["./confira-seus-dados.component.scss"],
})
export class ConfiraSeusDadosComponent {
    fluxoFaltaDeEnergia: FluxoFaltaDeEnergia;
    isDisabled: boolean;
    groupColor: string;
    tipoDeFaltaDeEnergia: string;
    dadosProblemaRegistrado!: Array<any>;
    dadosValidados = false;
    registroResponseDTO: POSTFaltaEnergiaDTOResponse;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _location: Location,
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _loadingService: LoadingService
    ) {
        window.scrollTo(0, 0);
        this.isDisabled = false;
        this.groupColor = this._userService.group;
        this.fluxoFaltaDeEnergia = this._faltaDeEnergiaService.fluxoFaltaDeEnergia;
        this.tipoDeFaltaDeEnergia = 'Falta de Energia';
        this.registroResponseDTO = new POSTFaltaEnergiaDTOResponse();
    }

    voltar(): void {
        this._location.back();
    }

    alterarOnde(): void {
        this._router.navigate([
            PathCompleto.faltaDeEnergia
        ]);
    }

    alterarReferenciaCelular(): void {
        this._router.navigate([
            PathCompleto.faltaDeEnergia,
            SubRotasFaltaDeEnergia.DadosContato,
        ]);
    }

    alterarDescricao(): void {
        if (this.fluxoFaltaDeEnergia.ondeFaltaEnergia?.key === EnumFaltaEnergiaOpcoes.IluminacaoPublica) {
            this._router.navigate([
                PathCompleto.faltaDeEnergia,
                SubRotasFaltaDeEnergia.IluminacaoPublica,
            ]);
        } else {
            if (this.fluxoFaltaDeEnergia.problemaEscolhido?.key === EnumFaltaEnergiaOpcoes.SemEnergia) {
                this._router.navigate([
                    PathCompleto.faltaDeEnergia,
                    SubRotasFaltaDeEnergia.DisjuntorFuncionando,
                ]);
            } else {
                this._router.navigate([
                    PathCompleto.faltaDeEnergia,
                    SubRotasFaltaDeEnergia.Problema,
                ]);
            }
        }
    }

    definirDadosSolicitacao(prazoDeAtendimento: string): SolicitacaoEnviada {
        const solicitacao: SolicitacaoEnviada = new SolicitacaoEnviada();
        solicitacao.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        solicitacao.titulo = "Seu problema de Falta de Energia foi registrado.";
        solicitacao.solicitacaoTipo = 'Falta de Energia';
        solicitacao.infos.push(
            new SolicitacaoContent("TIPO DE SOLICITAÇÃO", this.tipoDeFaltaDeEnergia),
            new SolicitacaoContent("ONDE", this.fluxoFaltaDeEnergia.ondeFaltaEnergia!.value),
            new SolicitacaoContent("DESCRIÇÃO",  this._faltaDeEnergiaService.fluxoFaltaDeEnergia.problemaEscolhido!.value),
            new SolicitacaoContent("TELEFONE DE CONTATO", this.fluxoFaltaDeEnergia.telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')),
            new SolicitacaoContent("PONTO DE REFERÊNCIA", this.fluxoFaltaDeEnergia.referencia),
            new SolicitacaoContent("PRAZO DE ATENDIMENTO", (environment.regiao === Regiao.NE) ? prazoDeAtendimento : `${convertDates(new Date(prazoDeAtendimento))} ${new Date(prazoDeAtendimento).getUTCHours()}:${new Date(prazoDeAtendimento).getUTCMinutes()}`),
        );
        return solicitacao;
    }

    continuar(): void {
        this.isDisabled = true;
        this._loadingService.start();
        this._faltaDeEnergiaService.postRegistroFaltaDeEnergia(this.preencherDTOParaPOST()!).then((response: POSTFaltaEnergiaDTOResponse) => {
            this._solicitacaoEnviadaService.setSolicitacaoEnviada = this.definirDadosSolicitacao(response.dataCombinada.toString());
            this._router.navigate([PathCompleto.faltaDeEnergia, Servicos.solicitacaoEnviada]);
        }).catch((httpError: HttpErrorResponse) => {
            let titulo: string = httpError?.error?.mensagem ?? EnumTitulosPadroes.Inesperado;

            this._router.navigate(
                [PathCompleto.faltaDeEnergia, SubRotasFaltaDeEnergia.ExibirAviso],
                { queryParams: { titulo: titulo } }
            );
        }).finally(() => {
            this._loadingService.stop();
        });
    }

    preencherDTOParaPOST(): POSTFaltaEnergiaDTORequest | undefined {
        if (this.fluxoFaltaDeEnergia.problemaEscolhido) {
            let body: POSTFaltaEnergiaDTORequest = {
                uc: this._selecaoImovelService.getUCSelecionada?.uc ?? '',
                observacoes: this.fluxoFaltaDeEnergia.problemaEscolhido!.observacoes,
                tipificacao: this.fluxoFaltaDeEnergia.problemaEscolhido!.tipologia ?? 0,
                telefoneContato: this.fluxoFaltaDeEnergia.telefone,
                nomeSolicitante: this._selecaoImovelService.getUCSelecionada?.nomeCliente.substring(0, 45) ?? '',
                protocolo: this._userService.getProtocolo.protocoloSalesforceStr,
                usuario: environment.USUARIO_UE,
                canalSolicitante: environment.canal,
                documentoSolicitante: this._userService.dadosUser.documento
            };
            if (environment.regiao === Regiao.NE) {
                body["atividade"] = "";
                body["matriculaPlataforma"] = definirMatriculaPlataforma();
                body["endereco"] = this._selecaoImovelService.getInformacoesUCSelecionada.local.endereco;
                body["numeroEndereco"] = this._selecaoImovelService.getInformacoesUCSelecionada.local.numero;
                body["pontoReferencia"] = this.fluxoFaltaDeEnergia.referencia;
                body["motivoId"] = this.fluxoFaltaDeEnergia.problemaEscolhido!.codigo;
                body["documento"] = this._selecaoImovelService.getInformacoesUCSelecionada.cliente.documento.numero;
                body["horaOscilacao"] = this.fluxoFaltaDeEnergia.problemaEscolhido!.tipologia === EnumTipificacaoReclamacao.OscilacaoDeTensao ? this.definirHoraDaOscilacao() : '';
                body["diaSemana"] = `${new Date().getDay() + 1}`;
            } else {
                body["observacoes"] = body["observacoes"] + ' ' + this.fluxoFaltaDeEnergia.referencia;
                body["condicaoTempo"] = "N";
                body["origemSolicitante"] = "Agência Virtual";
                body["tipoAviso"] = this.fluxoFaltaDeEnergia.problemaEscolhido.tipoAviso;
                body["subTipoAviso"] = this.fluxoFaltaDeEnergia.problemaEscolhido.codigo; //NE: campo motivo - SE: cmapo subTipoAviso
                body["informacaoImportante"] = this.fluxoFaltaDeEnergia.problemaEscolhido.informacaoImportante;
                body["riscoMorte"] = this.fluxoFaltaDeEnergia.problemaEscolhido.riscoMorte;
                body["confirmacaoAviso"] = this.fluxoFaltaDeEnergia.problemaEscolhido.confirmacaoAviso;
                body["confirmacaoProcesso"] = this.fluxoFaltaDeEnergia.problemaEscolhido.confirmacaoProcesso;
            }
            return body;
        } else {
            return undefined;
        }
    }

    definirHoraDaOscilacao(): string {
        let data: string = new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return data.slice(-5);
    }
}
