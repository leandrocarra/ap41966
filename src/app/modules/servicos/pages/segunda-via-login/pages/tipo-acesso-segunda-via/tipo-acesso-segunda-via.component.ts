import { Location } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import {
	EnumAvisosPadroes,
	EnumTitulosPadroes
} from 'app/core/models/exibir-aviso/exibir-aviso';
import { ProtocoloDTORequest } from 'app/core/models/protocolo/request/protocolo-dto';
import { ProtocoloDTOResponse } from 'app/core/models/protocolo/response/protocolo-dto';
import { UCCondensada } from 'app/core/models/segunda-via-pagamento/segunda-via-pagamento';
import { SubRotasSegundaViaPagamento } from 'app/core/models/segunda-via-pagamento/sub-rotas-segunda-via-pagamento';
import { MensagemAviso, formatarDataParaString } from 'app/core/models/segunda-via/segunda-via.model';
import { SubRotaSegundaViaLogin } from 'app/core/models/segunda-via/sub-rotas-segunda-via-login';
import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SegundaViaPagamentoService } from 'app/core/services/segunda-via-pagamento/segunda-via-pagamento.service';
import { AgenciaVirtualService } from 'app/core/services/utils/admin/agencia-virtual.service';
import { DocumentoValidator } from 'app/shared/Validators/validar-documento.validator';
import { validarDataDeNascimento } from 'app/shared/Validators/validar-idade.validator';
import { validarUC } from 'app/shared/Validators/validar-uc.validator';

@Component({
	selector: 'app-tipo-acesso-segunda-via',
	templateUrl: './tipo-acesso-segunda-via.component.html',
	styleUrls: ['./tipo-acesso-segunda-via.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TipoAcessoSegundaViaComponent {
	formTipoAcesso: FormGroup;
	documentoMask: string;
	parametroMask: string;
	msgAvisoDocumento: string;
	msgAvisoParametro: string;
	obterProtocoloRequestDTO: ProtocoloDTORequest;
	obterProtocoloResponseDTO: ProtocoloDTOResponse;
	errorMessage = '';
	constructor(
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _router: Router,
		private _segundaViaPagamentoService: SegundaViaPagamentoService,
        private _agenciaVirtualService: AgenciaVirtualService,
		private _loadingService: LoadingService,
		private _cadastroService: CadastroService,
	) {
		this.formTipoAcesso = this.createForm();
		this.documentoMask = "";
		this.parametroMask = "";
		this.msgAvisoDocumento = '';
		this.msgAvisoParametro = '';
		this.obterProtocoloRequestDTO = new ProtocoloDTORequest();
		this.obterProtocoloResponseDTO = new ProtocoloDTOResponse();
	}

	createForm(): FormGroup {
		return this._formBuilder.group({
			tipoDocumento: [
				'',
				[Validators.required]
			],
			documento: [
				this._segundaViaPagamentoService.fluxoSegundaViaPagamento.documento,
				[Validators.required, DocumentoValidator.validar]
			],
			parametro: [
				this._segundaViaPagamentoService.fluxoSegundaViaPagamento.dataDeNascimento
			],
			datepicker: [
				""
			],
			uc: [
				this._segundaViaPagamentoService.fluxoSegundaViaPagamento.uc
			]
		});
	}

	updateForm(_event: any): void {
		this.formTipoAcesso.patchValue({
			documento: "",
			parametro: "",
			uc: ""
		});
		this.documentoMask = this.formTipoAcesso.value.tipoDocumento === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00';
		this.parametroMask = this.formTipoAcesso.value.tipoDocumento === 'CPF' ? '00/00/0000' : '';
		if (this.formTipoAcesso.value.tipoDocumento === 'CNPJ') {
			this.formTipoAcesso.controls["uc"].setValidators([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(12),
				validarUC({ uc: true })
			]);
			this.formTipoAcesso.controls["parametro"].clearValidators();
		} else {
			this.formTipoAcesso.removeControl("recaptcha");
			this.formTipoAcesso.controls["uc"].clearValidators();
			this.formTipoAcesso.controls["parametro"].setValidators([
				Validators.required,
				validarDataDeNascimento({ idade: true })
			]);
		}
		this.formTipoAcesso.controls["uc"].updateValueAndValidity();
		this.formTipoAcesso.controls["parametro"].updateValueAndValidity();
	}

	verificarErroDocumento(): boolean {
		if (this.formTipoAcesso.invalid) {
			if (this.formTipoAcesso.controls["documento"].invalid) {
				this.msgAvisoDocumento = (this.formTipoAcesso.value.tipoDocumento === 'CPF') ? MensagemAviso.CPFInvalido : MensagemAviso.CNPJInvalido;
			}
			return true;
		}
		this.msgAvisoDocumento = '';
		return false;
	}

	verificarErroParametro(): boolean {

		if (this.formTipoAcesso.invalid) {
			if (this.formTipoAcesso.controls["parametro"].invalid) {
				this.msgAvisoParametro = (this.formTipoAcesso.value.tipoDocumento === 'CPF') ? MensagemAviso.DataDeNascimentoInvalido : MensagemAviso.CodigoClienteInvalido;
				this.errorMessage = "";
			}
			return true;
		}
		this.msgAvisoParametro = '';
		return false;
	}

	verificarErroCodCliente(): boolean {
		if (this.formTipoAcesso.controls["codigoDoCliente"].invalid && (this.formTipoAcesso.controls["codigoDoCliente"].value === "" ? false : true)) {
			this.msgAvisoParametro = MensagemAviso.CodigoClienteInvalido;
			return true;
		}
		return false;
	}

	verificarErroUC(): boolean {
		if (this.formTipoAcesso.controls["uc"].invalid) {
			this.msgAvisoParametro = MensagemAviso.CodigoClienteInvalido;
		}
		return true;
	}

	continuar(): void {
		this.passarDadosParaOService();
		this.obterProtocolo();
	}

	seguirAdiante(): void {
		if (this.formTipoAcesso.value.tipoDocumento === 'CPF') {
			const listaDeUCs: Array<UCCondensada> = this._segundaViaPagamentoService.condensarListaDeUCs(this._segundaViaPagamentoService.faturasResponseDTO.faturasAbertas);
			if (listaDeUCs.length === 1) {
				this._segundaViaPagamentoService.fluxoSegundaViaPagamento.faturasFiltradas = this._segundaViaPagamentoService.faturasResponseDTO.faturasAbertas;
				this._router.navigate([PathCompleto.segundaViaLogin, SubRotaSegundaViaLogin.AcessarFaturas]);
			} else {
				this._router.navigate([PathCompleto.segundaViaLogin, SubRotaSegundaViaLogin.InformarUC]);
			}
		} else {
			this._segundaViaPagamentoService.fluxoSegundaViaPagamento.faturasFiltradas = this._segundaViaPagamentoService.faturasResponseDTO.faturasAbertas;
			this._router.navigate([PathCompleto.segundaViaLogin, SubRotaSegundaViaLogin.AcessarFaturas]);
		}
	}

	voltar(): void {
		this._location.back();
	}

	preencherInputComDatepicker(): void {
		const valorDoInput: Date = this.formTipoAcesso.controls["datepicker"].value;
		const dataFormatadaParaString = valorDoInput.toLocaleDateString('pt-br', { day: 'numeric', month: 'numeric', year: 'numeric' });
		this.formTipoAcesso.controls["parametro"].setValue(dataFormatadaParaString.split('/').join(''));
	}

	passarDadosParaOService(): void {
		this._segundaViaPagamentoService.fluxoSegundaViaPagamento.tipoDocumento = this.formTipoAcesso.controls['tipoDocumento'].value;
		this._segundaViaPagamentoService.fluxoSegundaViaPagamento.documento = this.formTipoAcesso.controls['documento'].value;
		if (this.formTipoAcesso.value.tipoDocumento === 'CPF') {
			const dataDeNascimento = this.formTipoAcesso.controls['parametro'].value;
			this._segundaViaPagamentoService.fluxoSegundaViaPagamento.dataDeNascimento = formatarDataParaString(dataDeNascimento, true);
		} else {
			this._segundaViaPagamentoService.fluxoSegundaViaPagamento.uc = this.formTipoAcesso.controls['uc'].value;
		}
	}

	obterProtocolo(): void {
		this.preencherObterProtocoloRequestDTO().then(()=>{
            this._agenciaVirtualService.obterProtocoloAreaNaoLogada(this.obterProtocoloRequestDTO).subscribe({
                next: (responseDTO) => {
                    this.obterProtocoloResponseDTO = responseDTO;
                    this._agenciaVirtualService.protocoloANL.next(responseDTO);
                    this.obterFaturaSimplificada();
                    this._loadingService.stop();
                },
                error: (error) => {
                    this._loadingService.stop();
                    this.tratamentoErroObterProtocolo(error);
                }
            });
        })
	}

	private tratamentoErroObterProtocolo(error: any) {
		switch (error.error.retorno.numero) {
			case '064': //"Parceiro da Conta Contrato informado diferente do Protocolo":
				this.msgAvisoParametro = MensagemAviso.DadosNaoConferemSegundaVia;
				break;
			case '153': // "Conta Contrato não existe no SAP":
				this.redirecionarParaTelaAvisoUsuarioNaoEncontrado();
				break;
			default:
				this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado });
				break;
		}
	}

	redirecionarParaTelaAvisoUsuarioNaoEncontrado() {
		this._router.navigate([PathCompleto.segundaViaLogin, SubRotasSegundaViaPagamento.Avisos],
			{ queryParams: { codigoAviso: EnumAvisosPadroes.UsuarioNaoCadastrado } });
	}

	redirecionarParaTelaAviso(queryParams: Object) {
		this._router.navigate([PathCompleto.segundaViaLogin, SubRotasSegundaViaPagamento.Avisos],
			{ queryParams: queryParams })
	}

	preencherObterProtocoloRequestDTO(): Promise<void> {
        this._loadingService.start()
        return this._cadastroService.obterRecaptcha().then((token)=>{
            this.obterProtocoloRequestDTO.documento = this.formTipoAcesso.controls["documento"].value;
            this.obterProtocoloRequestDTO.regiao = environment.regiao;
            this.obterProtocoloRequestDTO.recaptcha = token;
        })
	}

	obterFaturaSimplificada(): void {
		this.preencherFaturaSimplificadaRequestDTO().then(() => {
			if (this._segundaViaPagamentoService.faturaRequestDTO.recaptcha) {
				this._segundaViaPagamentoService.faturasSimplificada(this._segundaViaPagamentoService.faturaRequestDTO).subscribe({
					next: (responseDTO) => {
						this._loadingService.stop();
						this._segundaViaPagamentoService.faturasResponseDTO = responseDTO;
						this._segundaViaPagamentoService.fluxoSegundaViaPagamento.fluxoIniciado = true;
						this.seguirAdiante();
					},
					error: (httpErrorResponse: HttpErrorResponse) => {
						this._loadingService.stop();
                        if (httpErrorResponse.error?.retorno?.mensagem) {
                            this.redirecionarParaTelaAviso({titulo: httpErrorResponse.error?.retorno?.mensagem});
                        } else {
                            this.redirecionarParaTelaAviso({ titulo: EnumTitulosPadroes.Inesperado});
                        }
					}
				});
			}
		});
	}

	preencherFaturaSimplificadaRequestDTO(): Promise<void> {
		this._loadingService.start();
		return this._cadastroService.obterRecaptcha().then((token) => {
			this._segundaViaPagamentoService.faturaRequestDTO.documento = this.formTipoAcesso.controls["documento"].value;
			this._segundaViaPagamentoService.faturaRequestDTO.tipoCliente = this.formTipoAcesso.controls["tipoDocumento"].value === 'CPF' ? 'F' : 'J';
			this._segundaViaPagamentoService.faturaRequestDTO.dataNascimento = this.formTipoAcesso.controls["tipoDocumento"].value === 'CPF' ? this._segundaViaPagamentoService.formatarDataParaAnoMesDia(this.formTipoAcesso.controls["parametro"].value) : '';
			this._segundaViaPagamentoService.faturaRequestDTO.codUc = this.formTipoAcesso.controls["tipoDocumento"].value === 'CNPJ' ? this.formTipoAcesso.controls["uc"].value : '';
			this._segundaViaPagamentoService.faturaRequestDTO.opcaoSSOS = true;
			this._segundaViaPagamentoService.faturaRequestDTO.recaptcha = token;
			this._segundaViaPagamentoService.faturaRequestDTO.protocolo = this.obterProtocoloResponseDTO.protocoloSalesforceStr;
			this._segundaViaPagamentoService.faturaRequestDTO.protocoloSonda = environment.regiao === Regiao.SE ? this.obterProtocoloResponseDTO.protocoloLegadoStr : '';
			this._segundaViaPagamentoService.faturaRequestDTO.tipificacao = '1031609'; //FIXO
			this._segundaViaPagamentoService.faturaRequestDTO.documentoSolicitante = this.formTipoAcesso.controls["documento"].value;
			this._segundaViaPagamentoService.faturaRequestDTO.canalSolicitante = environment.canal;
			this._segundaViaPagamentoService.faturaRequestDTO.usuario = environment.USUARIO_UE;
			this._segundaViaPagamentoService.faturaRequestDTO.distribuidora = environment.name;
			this._segundaViaPagamentoService.faturaRequestDTO.regiao = environment.regiao;
		}).catch((error) => {
			this._loadingService.stop();
		});
	}
}
