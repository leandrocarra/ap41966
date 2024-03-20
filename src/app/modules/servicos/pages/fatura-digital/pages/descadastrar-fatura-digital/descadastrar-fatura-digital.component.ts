import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";

import { PathCompleto, Servicos } from "app/core/enums/servicos";
import { EnumFluxoDescadastro, EnumOperacoes, EnumRecebimento, EnumTipificacaoFaturaDigital, OpcoesDeFluxo, TypeFluxoDescadastro } from "app/core/models/fatura-digital/fatura-digital";
import { FaturaEmailCadastraDTORequest } from "app/core/models/fatura-digital/request/fatura-digital-dto";
import { FaturaDigitalCadastraDTOResponse } from "app/core/models/fatura-digital/response/fatura-digital-dto";
import { SubRotasFaturaDigital } from "app/core/models/fatura-digital/sub-rotas-fatura-digital";
import { CustomSweetAlertService } from "app/core/services/customsweetalert/custom-sweet-alert.service";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { ErrorService } from "app/core/services/error/error.service";
import { FaturaDigitalService } from 'app/core/services/fatura-digital/fatura-digital.service';
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { SolicitacaoEnviadaService } from "app/core/services/solicitacao-enviada/solicitacao-enviada.service";
import { UserService } from "app/core/services/user/user.service";
import { SolicitacaoContent, SolicitacaoEnviada } from "app/shared/models/solicitacao-enviada/solicitacao-enviada";

@Component({
    selector: 'app-descadastrar-fatura-digital',
    templateUrl: './descadastrar-fatura-digital.component.html',
    styleUrls: ['./descadastrar-fatura-digital.component.scss']
})
export class DescadastrarFaturaDigitalComponent {
    fluxoAtivo: TypeFluxoDescadastro;
    opcoesDeFluxo: OpcoesDeFluxo;
    grupoDoUsuario: string;
    constructor(
        private _router: Router,
        private _userService: UserService,
        private _faturaDigitalService: FaturaDigitalService,
        private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService,
        private _errorService: ErrorService,
        private _alertService: CustomSweetAlertService
    ) {
        this._userService.breadcrumb = true;
        this._userService.isFluxo = true;
        this.grupoDoUsuario = this._userService.group;
        this.fluxoAtivo = EnumFluxoDescadastro.Inicial;
        this.opcoesDeFluxo = new OpcoesDeFluxo();
    }

    descadastrar(fluxoAtivo: TypeFluxoDescadastro) {
        this.confirmar();
        // FIXME: DESCOMENTAR o bloco abaixo quando for devolvida ao site a possibilidade de se cadastrar WhatsApp para fatura digital.
        // if (this._faturaDigitalService.fluxoFaturaDigital.modoDeEnvio.label === Recebimento.whatsapp) {
        //     this.confirmar();
        // } else {
        //     if (fluxoAtivo === this.opcoesDeFluxo.whatsApp) {
        //         this.fluxoAtivo = EnumFluxoDescadastro.WhatsApp;
        //     } else {
        //         this.fluxoAtivo = EnumFluxoDescadastro.Confirmar;
        //     }
        // }
    }

    cadastrarWhatsapp() {
        this._faturaDigitalService.fluxoFaturaDigital.novoModoDeEnvio.label = EnumRecebimento.whatsapp;
        this._router.navigate([PathCompleto.faturaDigital, SubRotasFaturaDigital.alterarFaturaDigital]);
    }

    voltar() {
        this._router.navigate([PathCompleto.faturaDigital]);
    }

    confirmar(): void {
        this._loadingService.start();
        this.descadastrarFaturaDigital().then((responseDTO) => {
            this._faturaDigitalService.descadastraResponseDTO = responseDTO;
            this._faturaDigitalService.atualizarFaturaDigitalService(false);
            this._solicitacaoEnviadaService.setSolicitacaoEnviada = this.definirDadosSolicitacao();
            this._router.navigate([PathCompleto.faturaDigital, Servicos.solicitacaoEnviada]);
        }).catch((error) => {
            this._alertService.alertErroRequisicao(this._errorService.tratamentoDeErro(error));
        }).finally(() => {
            this._loadingService.stop();
        });
    }

    definirDadosSolicitacao(): SolicitacaoEnviada {
        const solicitacaoEnviada = new SolicitacaoEnviada();
        solicitacaoEnviada.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        solicitacaoEnviada.titulo = "Sua solicitação foi enviada com sucesso!";
        solicitacaoEnviada.infos.push(new SolicitacaoContent("FORMA DE RECEBIMENTO", "Fatura impressa"));
        solicitacaoEnviada.alerta = false;
        solicitacaoEnviada.uc = this._selecaoImovelService.getInformacoesUCSelecionada?.codigo;
        return solicitacaoEnviada;
    }

    descadastrarFaturaDigital(): Promise<FaturaDigitalCadastraDTOResponse> {
		let requestDTO = this.definirDadosParaDescadastro();
		return new Promise<FaturaDigitalCadastraDTOResponse>((resolve, reject) => {
			this._faturaDigitalService.postFaturaDigitalDescadastra(requestDTO).subscribe({
				next: (responseDTO) => {
					resolve(responseDTO);
				},
				error: (error) => {
					reject(error);
				}
			});
		});
	}

    definirDadosParaDescadastro(): FaturaEmailCadastraDTORequest {
        let requestDTO = new FaturaEmailCadastraDTORequest();
        requestDTO.codigo = this._selecaoImovelService.getInformacoesUCSelecionada.codigo;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.tipificacao = EnumTipificacaoFaturaDigital.Descadastro;
        requestDTO.documentoSolicitante = this._userService.dadosUser.documento;
        requestDTO.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        if (environment.regiao === Regiao.NE) {
            requestDTO.operacao = EnumOperacoes.Descadastro;
        } else {
            requestDTO.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
        }
        return requestDTO;
	}
}
