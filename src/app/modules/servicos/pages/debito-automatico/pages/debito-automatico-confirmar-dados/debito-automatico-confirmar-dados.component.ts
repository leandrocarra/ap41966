import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { PathCompleto, Servicos } from "app/core/enums/servicos";
import { STATUS_POSITIVOS_POSSIVEIS } from "app/core/enums/unidade-consumidora";
import {
	COD_BANCOS,
	DadosBancarios,
	EnumFluxoDebitoAutomatico,
	MensagemProcessamentoDCC,
	MensagemTipoFluxo,
	TipificacaoDebitoAutomatico,
	TitulosCorrespondentes
} from "app/core/models/debito-automatico/debito-automatico";
import {
	CancelaDebitoAutomaticoDTORequest,
	DebitoAutomaticoDTORequest
} from "app/core/models/debito-automatico/request/debito-automatico-dto";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { EnumIdTermo } from "app/core/models/termo-de-adesao/termo-de-adesao";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { DebitoAutomaticoService } from "app/core/services/debito-automatico/debito-automatico.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { SolicitacaoEnviadaService } from "app/core/services/solicitacao-enviada/solicitacao-enviada.service";
import { TermoDeAdesaoService } from "app/core/services/termo-de-adesao/termo-de-adesao.service";
import { UserService } from "app/core/services/user/user.service";
import { configureMenuByWindowSize } from "app/core/services/utils/neo-utils.service";
import { HeaderMetodo } from "app/shared/models/header-metodo/header-metodo";
import {
	EnumAlertaCorTitulo,
	EnumAlertaIcone,
	SolicitacaoContent,
	SolicitacaoEnviada
} from "app/shared/models/solicitacao-enviada/solicitacao-enviada";
import { ExibirAvisoService } from "app/shared/pages/exibir-aviso/exibir-aviso.service";
import { take } from "rxjs";

@Component({
	selector: 'app-debito-automatico-confirmar-dados',
	templateUrl: './debito-automatico-confirmar-dados.component.html',
	styleUrls: ['./debito-automatico-confirmar-dados.component.scss']
})
export class DebitoAutomaticoConfirmarDadosComponent {
	banco: string;
	agencia: string;
	conta: string;
	userGroup: string;
	mobile: boolean;
	titulo: string = '';
	mensagemProcessamentoDCC: string = '';
	mensagemTipoFluxo: string = '';
	constructor(
		private _userService: UserService,
		private _location: Location,
		private _router: Router,
		private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
		private _debitoAutomaticoService: DebitoAutomaticoService,
		private _selecaoImovelService: SelecaoImovelService,
		private _loading: LoadingService,
		private _termoDeAdesaoService: TermoDeAdesaoService,
		private _exibirAvisoService: ExibirAvisoService
	) {
		this.userGroup = this._userService.group;
		this.banco = this._debitoAutomaticoService.getDebitoAutomatico.dadosBancarios.banco;
		this.agencia = this._debitoAutomaticoService.getDebitoAutomatico.dadosBancarios.agencia;
		this.conta = this._debitoAutomaticoService.getDebitoAutomatico.dadosBancarios.conta;
		this.mobile = configureMenuByWindowSize(window.screen.width);
		this._userService.breadcrumb = true;
		this._userService.isFluxo = true;
		this.definirTexto();
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.mobile = configureMenuByWindowSize(event.target.innerWidth);
	}

	voltar(): void {
		this._location.back();
	}

	prosseguir(): void {
		this._userService.isFluxo = false;
		this._userService.breadcrumb = false;
		this._debitoAutomaticoService.fluxoIniciado = false;
		if (environment.regiao === Regiao.NE) {
			this.prosseguirNE();
		} else {
			this.prosseguirSE();
		}
	}

	prosseguirNE(): void {
		if (this._debitoAutomaticoService.getDebitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Descadastrar) {
			this.descadastrarDebitoAutomatico();
		} else {
			this.cadastrarDebitoAutomatico();
		}
	}

	prosseguirSE(): void {
		if (this._debitoAutomaticoService.getDebitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Descadastrar) {
			this.descadastrarDebitoAutomatico();
		} else if (this._debitoAutomaticoService.debitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Cadastrar) {
			this.cadastrarDebitoAutomatico();
		} else {
			this.alterarDebitoAutomatico();
		}
	}

	descadastrarDebitoAutomatico(): void {
		this._loading.start();
		const cancelarDebitoAutomatico = this.preencherDadosCancelaDebitoAutomaticoDTO();

		this._debitoAutomaticoService.cancelarDebitoAutomatico(cancelarDebitoAutomatico)
			.pipe(take(1))
			.subscribe({
				next: (): void => {
					this._loading.stop();
					this.concluirFluxoDeDescadastro();
				},
				error: (httpErrorResponse: HttpErrorResponse): void => {
					let titulo: string;
					if (httpErrorResponse.error?.retorno?.numero == "126") {
						titulo = EnumTitulosPadroes.AguardarConfirmacaoPeriodoDeLeitura;
					} else {
						titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
					}
					this.redirecionarParaTelaAviso({ titulo: titulo });
				}
			});
	}

	preencherDadosCancelaDebitoAutomaticoDTO(): CancelaDebitoAutomaticoDTORequest {
		let cancelarDebitoAutomatico = new CancelaDebitoAutomaticoDTORequest(
			this._selecaoImovelService.getInformacoesUCSelecionada.codigo,
			new HeaderMetodo(
				environment.USUARIO_UE,
				environment.canal,
				this._userService.getProtocolo.protocoloSalesforceStr
			),
		);
		cancelarDebitoAutomatico.headerMetodo.tipificacao = TipificacaoDebitoAutomatico.Descadastrar;
		if (environment.regiao === Regiao.NE) {
			cancelarDebitoAutomatico.headerMetodo.documentoSolicitante = this._userService.dadosUser.documento;
		} else {
			cancelarDebitoAutomatico.headerMetodo.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
			cancelarDebitoAutomatico.dataGeracao = new Date().toISOString();
			cancelarDebitoAutomatico.codCliente = this._selecaoImovelService.getInformacoesUCSelecionada.cliente.codigo;
			cancelarDebitoAutomatico.usuarioAtd = environment.USUARIO_UE;
		}
		return cancelarDebitoAutomatico;
	}

	concluirFluxoDeDescadastro(): void {
		this._debitoAutomaticoService.debitoAutomatico.debitoAutomaticoCadastrado = false;
		this._debitoAutomaticoService.debitoAutomatico.dadosBancarios = new DadosBancarios();
		this._debitoAutomaticoService.setDebitoAutomatico = this._debitoAutomaticoService.debitoAutomatico
		this.descadastrarTermoDeAdesaoDebitoAutomatico();
		this.seguirParaSolicitacaoEnviadaDescadastro();
	}

	descadastrarTermoDeAdesaoDebitoAutomatico(): void {
		this._termoDeAdesaoService.descadastrarTermoDeAdesao(
			EnumIdTermo.DebitoAutomatico,
			TipificacaoDebitoAutomatico.Descadastrar
		);
	}

	seguirParaSolicitacaoEnviadaDescadastro(): void {
		this._solicitacaoEnviadaService.setSolicitacaoEnviada = new SolicitacaoEnviada(
			this._userService.getProtocolo.protocoloSalesforceStr,
			[
				new SolicitacaoContent("BANCO", this.banco),
				new SolicitacaoContent("AGÊNCIA", this.agencia),
				new SolicitacaoContent("CONTA CORRENTE", this.conta)
			],
			"Descadastro de débito automático efetuado com sucesso!",
			'',
			'Débito automático',
			true,
			EnumAlertaIcone.TrianguloExclamacaoErro,
			EnumAlertaCorTitulo.Vermelho,
			this.mensagemTipoFluxo,
			this.mensagemProcessamentoDCC,
		);

		this._router.navigate([PathCompleto.debitoAutomatico, Servicos.solicitacaoEnviada]);
	}

	cadastrarDebitoAutomatico(): void {
		this._loading.start();
		const cadastrarDebitoAutomatico = this.preencherDadosDebitoAutomaticoDTO();

		this._debitoAutomaticoService.cadastrarDebitoAutomatico(cadastrarDebitoAutomatico)
			.pipe(take(1))
			.subscribe({
				next: () => {
					this._loading.stop();
					this.concluirFluxoDeCadastro();
				},
				error: (httpErrorResponse: HttpErrorResponse) => {
					let titulo: string;
					if (httpErrorResponse.error?.retorno?.numero == "126") {
						titulo = EnumTitulosPadroes.AguardarConfirmacaoPeriodoDeLeitura;
					} else {
						titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
					}
					this.redirecionarParaTelaAviso({ titulo: titulo });
				}
			});
	}

	preencherDadosDebitoAutomaticoDTO(): DebitoAutomaticoDTORequest {
		let cadastrarDebitoAutomatico = new DebitoAutomaticoDTORequest(
			this._selecaoImovelService.getInformacoesUCSelecionada.codigo,
			new HeaderMetodo(
				environment.USUARIO_UE,
				environment.canal,
				this._userService.getProtocolo.protocoloSalesforceStr
			),
			this.banco.split('-')[0].trim(),
			this.agencia,
			this.conta,
			'X'
		);
		cadastrarDebitoAutomatico.headerMetodo.tipificacao = TipificacaoDebitoAutomatico.Cadastrar;
		if (environment.regiao === Regiao.NE) {
			cadastrarDebitoAutomatico.headerMetodo.documentoSolicitante = this._userService.dadosUser.documento;
		} else {
			cadastrarDebitoAutomatico.headerMetodo.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
		}
		return cadastrarDebitoAutomatico;
	}

	concluirFluxoDeCadastro(): void {
		this._debitoAutomaticoService.debitoAutomatico.debitoAutomaticoCadastrado = true;
		this._debitoAutomaticoService.debitoAutomatico.dadosBancarios = new DadosBancarios();
		this._debitoAutomaticoService.setDebitoAutomatico = this._debitoAutomaticoService.debitoAutomatico;
		this.cadastrarTermoDeAdesaoDebitoAutomatico();
		this.seguirParaSolicitacaoEnviadaCadastro();
	}

	cadastrarTermoDeAdesaoDebitoAutomatico(): void {
		this._termoDeAdesaoService.cadastrarTermoDeAdesao(
			EnumIdTermo.DebitoAutomatico,
			TipificacaoDebitoAutomatico.Cadastrar
		);
	}

	seguirParaSolicitacaoEnviadaCadastro(): void {
		this._solicitacaoEnviadaService.setSolicitacaoEnviada = new SolicitacaoEnviada(
			this._userService.getProtocolo.protocoloSalesforceStr,
			[
				new SolicitacaoContent("BANCO", this.banco),
				new SolicitacaoContent("AGÊNCIA", this.agencia),
				new SolicitacaoContent("CONTA CORRENTE", this.conta)
			],
			this.definirMensagemDeSolicitacaoEnviada(),
			'',
			'Débito automático',
			true,
			EnumAlertaIcone.TrianguloExclamacaoErro,
			EnumAlertaCorTitulo.Vermelho,
			this.definirMensagemFluxo(),
			this.mensagemProcessamentoDCC,
		);
		this._router.navigate([PathCompleto.debitoAutomatico, Servicos.solicitacaoEnviada]);
	}

	definirMensagemDeSolicitacaoEnviada(): string {
		if (this._debitoAutomaticoService.debitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Cadastrar) {
			return 'Solicitação de débito automático efetuada com sucesso!'
		} else {
			return 'Alteração do cadastro de débito automático efetuada com sucesso!'
		}
	}

	redirecionarParaTelaAviso(queryParams: Object): void {
		this._loading.stop();
		this._router.navigate([PathCompleto.aviso],
			{ queryParams: queryParams });
	}

	alterarDebitoAutomatico(): void {
		this._loading.start();
		let cancelarDebitoAutomatico = this.preencherDadosCancelaDebitoAutomaticoDTO();
		this._debitoAutomaticoService.cancelarDebitoAutomatico(cancelarDebitoAutomatico).pipe(take(1)).subscribe({
			next: () => {
				let cadastrarDebitoAutomatico = this.preencherDadosDebitoAutomaticoDTO();
				this._debitoAutomaticoService.cadastrarDebitoAutomatico(cadastrarDebitoAutomatico).pipe(take(1)).subscribe({
					next: (data) => {
						this._loading.stop();
						this.concluirFluxoDeCadastro();
					},
					error: (httpErrorResponse: HttpErrorResponse) => {
						let titulo: string;
						if (httpErrorResponse.error?.retorno?.numero == "126") {
							titulo = `O serviço já foi solicitado e será efetivado após o período de leitura.`;
						} else {
							titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
						}
						this.redirecionarParaTelaAviso({ titulo: titulo });
					}
				});
			},
			error: (httpErrorResponse: HttpErrorResponse) => {
				const titulo = httpErrorResponse.error?.retorno?.mensagem || EnumTitulosPadroes.Inesperado;
				this.redirecionarParaTelaAviso({ titulo: titulo });
			}
		});
	}



	definirTexto(): void {
		if (this._debitoAutomaticoService.getDebitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Alterar) {
			this.titulo = TitulosCorrespondentes.alterarDebitoAutomatico;
			this.mensagemProcessamentoDCC = MensagemProcessamentoDCC.processamentoAlterar;
			this.mensagemTipoFluxo = this.definirMensagemTipoFluxoAlterar();

		} else if (this._debitoAutomaticoService.getDebitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Cadastrar) {
			this.titulo = TitulosCorrespondentes.debitoAutomatico;
			this.mensagemProcessamentoDCC = MensagemProcessamentoDCC.processamentoCadastrar;
			this.mensagemTipoFluxo = this.definirMensagemTipoFluxoCadastrar();

		} else {
			this.titulo = TitulosCorrespondentes.descadastroDeDebitoAutomatico;
			this.mensagemProcessamentoDCC = MensagemProcessamentoDCC.processamentoDescadastrar;
			this.mensagemTipoFluxo = (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.descadastrarOSB : MensagemTipoFluxo.descadastrar;
		}
	}

	definirMensagemTipoFluxoCadastrar(): string {
		if (this.banco.split('-')[0].trim() === COD_BANCOS.bancoBrasilNE || this.banco.split('-')[0].trim() === COD_BANCOS.bancoBrasilSE) {
			return (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.cadastrarEalterarBancoDoBrasilOSB : MensagemTipoFluxo.cadastrarEalterarBancoDoBrasil;
		} else if (this.banco.split('-')[0].trim() === COD_BANCOS.bancoItauNE) {
			return (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.cadastrarEalterarItauOSB : MensagemTipoFluxo.cadastrarEalterarItau;
		} else {
			return (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.cadastrarConfirmarOSB : MensagemTipoFluxo.cadastrarConfirmar;
		}
	}

	definirMensagemTipoFluxoAlterar(): string {
		if (this.banco.split('-')[0].trim() === COD_BANCOS.bancoBrasilNE || this.banco.split('-')[0].trim() === COD_BANCOS.bancoBrasilSE) {
			return (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.cadastrarEalterarBancoDoBrasilOSB : MensagemTipoFluxo.cadastrarEalterarBancoDoBrasil;
		} else if (this.banco.split('-')[0].trim() === COD_BANCOS.bancoItauNE) {
			return (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.cadastrarEalterarItauOSB : MensagemTipoFluxo.cadastrarEalterarItau;
		} else {
			return (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.alterarConfirmarOSB : MensagemTipoFluxo.alterarConfirmar;
		}
	}

	definirMensagemFluxo(): string {
		let msg = '';
		if (this._debitoAutomaticoService.getDebitoAutomatico.fluxoDebito === EnumFluxoDebitoAutomatico.Cadastrar) {
			if (this.banco.split('-')[0].trim() !== COD_BANCOS.bancoBrasilNE || this.banco.split('-')[0].trim() === COD_BANCOS.bancoBrasilSE || this.banco.split('-')[0].trim() === COD_BANCOS.bancoItauNE) {
				msg = (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.cadastrarSolicitacaoEnviadaOSB: MensagemTipoFluxo.cadastrarSolicitacaoEnviadaOSB;
			} 
		} else {
			if (this.banco.split('-')[0].trim() !== COD_BANCOS.bancoBrasilNE || this.banco.split('-')[0].trim() !== COD_BANCOS.bancoBrasilSE || this.banco.split('-')[0].trim() === COD_BANCOS.bancoItauNE) {
				msg = (STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho)) ? MensagemTipoFluxo.alterarSolicitavaoEnviadaOSB: MensagemTipoFluxo.alterarSolicitavaoEnviada;
			} 
		}

		return (msg !== '') ? msg : this.mensagemTipoFluxo;
}

}
