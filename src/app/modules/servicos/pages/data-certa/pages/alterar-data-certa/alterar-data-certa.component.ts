import {Location} from '@angular/common';
import {Component, HostListener, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {Router} from '@angular/router';
import {environment} from '@environments/environment';
import {Regiao} from 'app/core/enums/regiao';
import {PathCompleto, Servicos} from 'app/core/enums/servicos';
import {
    DataAlteracao,
    EnumTipificacaoDataCerta,
    OperacaoDataCerta,
    SubRotasDataCerta
} from 'app/core/models/data-certa/data-certa';
import {AlterarDataCertaDTORequest, DataCertaDiasDTORequest} from 'app/core/models/data-certa/request/data-certa-dto';
import {EnumIdTermo} from 'app/core/models/termo-de-adesao/termo-de-adesao';
import {LoadingService} from 'app/core/services/customsweetalert/loading.service';
import {DataCertaService} from 'app/core/services/data-certa/data-certa.service';
import {SelecaoImovelService} from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import {SolicitacaoEnviadaService} from 'app/core/services/solicitacao-enviada/solicitacao-enviada.service';
import {TermoDeAdesaoService} from 'app/core/services/termo-de-adesao/termo-de-adesao.service';
import {UserService} from 'app/core/services/user/user.service';
import {configureMenuByWindowSize} from "app/core/services/utils/neo-utils.service";
import {
    DialogAtencaoComponent
} from 'app/modules/servicos/pages/data-certa/components/dialog-atencao/dialog-atencao.component';
import {
    EnumAlertaCorTitulo,
    EnumAlertaIcone,
    SolicitacaoContent,
    SolicitacaoEnviada
} from 'app/shared/models/solicitacao-enviada/solicitacao-enviada';
import {ExibirAvisoService} from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import {EnumAvisosPadroes, EnumTitulosPadroes} from "../../../../../../core/models/exibir-aviso/exibir-aviso";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomSweetAlertService} from "../../../../../../core/services/customsweetalert/custom-sweet-alert.service";

@Component({
	selector: 'app-alterar-data-certa',
	templateUrl: './alterar-data-certa.component.html',
	styleUrls: ['./alterar-data-certa.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlterarDataCertaComponent {
	@ViewChildren(MatSelect) matSelectList!: QueryList<MatSelect>;
	mobile: boolean;
	grupoDoUsuario: string;
	isDisabled: boolean;
	checkDeclaracao: boolean;
	novaDataCerta: string;
	datasPossiveis: Array<string>;
	dadosConfirmacao: any;
	podeAlterarDataFixa: boolean;
	solicitacaoEnviada: SolicitacaoEnviada;
    dataAlteracao : string
	constructor(
		public dialog: MatDialog,
		private _location: Location,
		private _router: Router,
		private _userService: UserService,
		private _dataCertaService: DataCertaService,
		private _solicitacaoEnviadaService: SolicitacaoEnviadaService,
        private _selecaoImovelService: SelecaoImovelService,
        private _loadingService: LoadingService,
        private _exibirAvisoService: ExibirAvisoService,
        private _termoDeAdesaoService: TermoDeAdesaoService,
        private _alert: CustomSweetAlertService,
	) {
		this._userService.isFluxo = true;
        this.dataAlteracao = "";
		this.grupoDoUsuario = _userService.group;
		this.isDisabled = true;
		this.novaDataCerta = '';
		this.datasPossiveis = [];
        this.definirDatasPossiveis();
		this.dadosConfirmacao = [];
		this.podeAlterarDataFixa = this.checarAlteracaoDataCerta();
		this.checkDeclaracao = false;
		this.solicitacaoEnviada = new SolicitacaoEnviada();
		this.mobile = configureMenuByWindowSize(window.screen.width);
	}

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

	@HostListener('window:scroll', ['$event']) onScrollEvent(_$event: any) {
		this.closeMenu();
	}

	closeMenu() {
		this.matSelectList.forEach(element => {
			element.close();
		});
	}

	voltar(): void {
        this._alert.alertConfirmarCancelamento().then((r) => {
            if (r.value) {
                // this._router.navigate(pathParaRedirecionar);
                this._location.back();
            }
        });
	}

	continuar(): void {
		if (this._dataCertaService.dataCerta.fluxoDoCliente === Servicos.trocaDeTitularidade) {
			// this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar'], this.trocanavExtra);
		} else {
            if (this.novaDataCerta === DataAlteracao.SEM_DATA_FIXA) {
                // TODO: Aqui é onde deve entrar a chamada do endpoint de descadastro do Termo de Adesão para Data Certa.
                this.alterarDataCerta(OperacaoDataCerta.Descadastro);
            } else {
                if (this.podeAlterarDataFixa) {
                    this.alterarDataCerta(OperacaoDataCerta.Cadastro);
                } else {
                    this.exibirAvisoDataDeVencimento();
                }
            }
		}
	}

    alterarDataCerta(operacao: string): void {
        this._loadingService.start();
        const requestDTO = this.preencherAlterarDataCertaDTO(operacao);
        this._dataCertaService.alterarDataCerta(operacao, requestDTO).subscribe({
            next: (responseDTO) => {
                this._dataCertaService.alterarDataCertaResponseDTO = responseDTO;
                this.salvarAlteracao();
                this._loadingService.stop();
            },
            error: (error: HttpErrorResponse) => {
                this.tratarErrosDataCerta(error);
            }
        });
    }

    tratarErrosDataCerta(httpErrorResponse: HttpErrorResponse): boolean {
        this._userService.isFluxo = false;
        if (environment.regiao === Regiao.SE) {
            if (this._selecaoImovelService.getInformacoesUCSelecionada.caracteristicas.espelho.toLowerCase() === 'x'){
                this.redirecionarParaAviso({titulo: EnumTitulosPadroes.AguardarConfirmacaoPeriodoDeLeitura});
            }
        }
        if (httpErrorResponse.error?.retorno?.numero === '999'){
            this.redirecionarParaAviso({codigoAviso:EnumAvisosPadroes.DataDeVencimento, mensagem: httpErrorResponse.error?.retorno?.mensagem});
        }
        else if (httpErrorResponse.error?.retorno?.mensagem) {
            this.redirecionarParaAviso({titulo: httpErrorResponse.error?.retorno?.mensagem});
        } else {
            this.redirecionarParaAviso({titulo: EnumTitulosPadroes.Inesperado});
        }

        return false;
    }

    redirecionarParaAviso(queryParams: Object): void {
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: queryParams }
        );
        this._loadingService.stop();
    }

    preencherAlterarDataCertaDTO(operacao: string): AlterarDataCertaDTORequest {
        const requestDTO = new AlterarDataCertaDTORequest();
        requestDTO.codigo = this._selecaoImovelService.getUCSelecionada!.uc;
        requestDTO.dia = this.novaDataCerta;
        requestDTO.operacao = operacao;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        requestDTO.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
        requestDTO.documentoSolicitante = this._userService.dadosUser.documento;
        requestDTO.tipificacao = (operacao === OperacaoDataCerta.Cadastro) ? EnumTipificacaoDataCerta.Inclusao : EnumTipificacaoDataCerta.Exclusao;
        if (environment.regiao === Regiao.SE) {
            requestDTO.protocoloSonda = this._userService.getProtocolo.protocoloLegadoStr;
        }
        return requestDTO;
    }

    salvarAlteracao(): void {
        this.definirDadosDaSolicitacao();
        this.cadastrarTermoDeAdesaoDataCerta();
        this._dataCertaService.dataCerta.ultimaAlteracaoDataCerta = new Date();
        this._dataCertaService.dataCerta.dataDeVencimento = this.novaDataCerta;
        this._solicitacaoEnviadaService.setSolicitacaoEnviada = this.solicitacaoEnviada;
        this._router.navigate([PathCompleto.alterarDataDeVencimento, Servicos.solicitacaoEnviada]);
    }

	definirDadosDaSolicitacao(): void {
		this.solicitacaoEnviada.protocolo = this._userService.getProtocolo.protocoloSalesforceStr;
		this.solicitacaoEnviada.titulo = "Alteração de vencimento efetuada com sucesso!";
		this.solicitacaoEnviada.infos.push(
			new SolicitacaoContent("DATA DE VENCIMENTO", this.novaDataCerta === DataAlteracao.SEM_DATA_FIXA ? this.novaDataCerta.toString() : `Dia ${this.novaDataCerta}`),
		);
        this.solicitacaoEnviada.alertaIcone = EnumAlertaIcone.TrianguloExclamacaoErro;
        this.solicitacaoEnviada.alertaMensagemCor = EnumAlertaCorTitulo.Vermelho;
        this.solicitacaoEnviada.alerta = true;
        this.solicitacaoEnviada.alertaTituloCor = EnumAlertaCorTitulo.Vermelho;
        this.solicitacaoEnviada.alertaTitulo = "Atenção";
		this.solicitacaoEnviada.alertaMensagem = "Você só poderá alterar novamente a data de vencimento das faturas após 12 meses a partir da última modificação.";
	}

    cadastrarTermoDeAdesaoDataCerta(): void {
        this._termoDeAdesaoService.cadastrarTermoDeAdesao(
            EnumIdTermo.DataCerta,
            '' // TODO: Substituir por Enum da tipologia correta para o Data Certa, quando houver uma.
        );
    }

    exibirAvisoDataDeVencimento(): void {
        const mensagem: string = `A última alteração da data de vencimento foi em ${this.extrairDataDaMensagem()}.\nSomente após 12 (doze) meses poderá realizar nova alteração.`
        this._userService.isFluxo = false;
        this._router.navigate(
            [PathCompleto.alterarDataDeVencimento, SubRotasDataCerta.aviso],
            { queryParams: {
                codigoAviso: EnumAvisosPadroes.DataDeVencimento,
                mensagem: mensagem
                }}
        );
    }

    extrairDataDaMensagem(): string {
        const mensagemDoRetorno = this._dataCertaService.dataCertaValidaResponseDTO.retorno.mensagem;
        const padraoDeData = /(\d{2}\/\d{2}\/\d{4})/;
        const dataArray = mensagemDoRetorno.match(padraoDeData);
        return dataArray ? dataArray[0] : 'DATA_DE_ALTERACAO';
    }

	desbloquearBotao(): void {
		this.isDisabled = !(this.checkDeclaracao && this.novaDataCerta);
	}

    checarAlteracaoDataCerta(): boolean {
        let mensagem : string[] = this._dataCertaService.dataCertaValidaResponseDTO.retorno.mensagem.split(":")
        this.dataAlteracao = mensagem[mensagem.length-1].trim();
        if ((this._dataCertaService.dataCerta.dataDeVencimento === DataAlteracao.SEM_DATA_FIXA || this._dataCertaService.dataCerta.dataDeVencimento === DataAlteracao.DATA_NORMAL_REGULADA) && this._dataCertaService.dataCertaValidaResponseDTO.retorno.numero === '103')  {
            this.redirecionarParaAviso({codigoAviso:EnumAvisosPadroes.DataDeVencimento, mensagem: "A última alteração da data de vencimento foi em "+ this.dataAlteracao+ ", somente após 12 meses poderá realizar nova alteração."});
            return false
        }
        else if (this._dataCertaService.dataCertaValidaResponseDTO.retorno.numero === '103') {
            this.exibirPopupSemDataFixa(this.dataAlteracao);
            return false;
        } else {
            return true;
        }
    }

	exibirPopupSemDataFixa(dataAlteracao : string): void {
		if (!this.podeAlterarDataFixa) {
			let dialogRef = this.dialog.open(DialogAtencaoComponent, {
				width: '50vw',
				maxWidth: '900px',
				minWidth: '310px'
			});
            dialogRef.componentInstance.dataAlteracao = dataAlteracao;
		}
	}

    definirDatasPossiveis(): void {
        this.obterListaDeDias().then((listaDeDias) => {
            this.datasPossiveis = this.filtrarDiasPossiveis(listaDeDias);
        }).catch((error) => {
            console.log('Erro na obtenção de datas permitidas para SE:', error);
            this.datasPossiveis = [];
        }).finally(() => {
            this.datasPossiveis = this.acrescentarSemDataFixa(this.datasPossiveis);
        });
    }

    obterListaDeDias(): Promise<Array<{ dia: string }>> {
        if ( (this._dataCertaService.dataCertaValidaResponseDTO.retorno.numero === '103' || this._dataCertaService.dataCertaValidaResponseDTO.retorno.numero === '')) {
            return Promise.resolve([]);
        }
        if (environment.regiao === Regiao.NE) {
            return Promise.resolve(this._dataCertaService.dataCertaValidaResponseDTO.dias);
        } else {
            return this.obterDataCertaDias().then((diasPossiveisSE) => {
                return diasPossiveisSE;
            }).catch((error) => {
                return [];
            });
        }
    }

    filtrarDiasPossiveis(listaDeDias: Array<{ dia: string }>): Array<string> {
        const antigaDataCerta = this._dataCertaService.dataCerta.dataDeVencimento;
        const listaFiltrada: Array<string> = [];
        listaDeDias.forEach((objetoDia) => {
            if (objetoDia.dia !== antigaDataCerta) {
                listaFiltrada.push(objetoDia.dia);
            }
        });
        return listaFiltrada;
    }

    acrescentarSemDataFixa(listaFiltrada: Array<string>): Array<string> {
        if ((this._dataCertaService.dataCerta.dataDeVencimento !== DataAlteracao.DATA_NORMAL_REGULADA) || this.datasPossiveis.length === 0) {
            listaFiltrada.push(DataAlteracao.SEM_DATA_FIXA);
        }
        return listaFiltrada;
    }

    obterDataCertaDias(): Promise<Array<{ dia: string }>> {
        this._loadingService.start();
        const requestDTO = this.preencherDataCertaDiasRequestDTO();
        return new Promise((resolve) => {
            this._dataCertaService.obterDataCertaDias(requestDTO).subscribe({
                next: (responseDTO) => {
                    this._dataCertaService.dataCertaDiasResponseDTO = responseDTO;
                    this._loadingService.stop();
                    resolve(responseDTO.dias);
                },
                error: (error) => {
                    console.log('Erro na chamada do GET/datacerta-dias SE:', error);
                    this._loadingService.stop();
                    resolve([]);
                }
            });
        });
    }

    preencherDataCertaDiasRequestDTO(): DataCertaDiasDTORequest {
        const requestDTO = new DataCertaDiasDTORequest();
        requestDTO.codigo = this._selecaoImovelService.getUCSelecionada!.uc;
        requestDTO.canalSolicitante = environment.canal;
        requestDTO.usuario = environment.USUARIO_UE;
        return requestDTO;
    }
}
