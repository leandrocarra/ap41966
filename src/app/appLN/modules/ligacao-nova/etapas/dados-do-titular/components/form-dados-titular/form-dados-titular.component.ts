import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentosService } from '../../../../../../core/services/documentos/documentos.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { NeoUtilsService, ORGAO_EMISSORES } from '../../../../../../core/services/utils/neo-utils.service';
import { ValidatorsClass } from '../../../../../../core/services/validators/validators';

@Component({
	selector: 'neo-form-dados-titular',
	templateUrl: './form-dados-titular.component.html',
	styleUrls: ['./form-dados-titular.component.scss']
})
export class FormDadosTitularComponent {

	@Output() formTitularValidado: EventEmitter<any> = new EventEmitter<any>()

	formDadosTitular: FormGroup;
	alertEmail: boolean;
	isCPF: boolean;
	POSSIVEIS_ORGAOS_EMISSORES;

	constructor(
		private _formBuilder: FormBuilder,
		private _alert: CustomSweetAlertService,
		private _etapaService: DocumentosService,
		private _userServiceLN: UserServiceLN,
		public utilsService: NeoUtilsService,
	) {
		this.POSSIVEIS_ORGAOS_EMISSORES = ORGAO_EMISSORES;
        this.alertEmail = true;
        this.isCPF = this._userServiceLN.tipoDocumento === 'CPF' ? true : false;
        this.formDadosTitular = this.formTitular();
        this.validarForms();
	}

	formTitular(): FormGroup {
		return this._formBuilder.group({
			nome: [
				{
					value: this.isCPF ? this._userServiceLN.sessionUser.nome.toUpperCase() : this._etapaService.dadosTitular.nome,
					disabled: this.isCPF ? true : false,
				},
				[
					Validators.compose([
						Validators.required,
						Validators.minLength(3)
					])
				]
			],
			dataNascimento: [
				{
					value: this._etapaService.dadosTitular.dataNascimento,
					disabled: false
				},
				[
					Validators.compose([
						Validators.required,
						ValidatorsClass.compararDataAtual({ dataNascimento: true }),
						ValidatorsClass.idadeMinima({ idadeMinima: true }),
						ValidatorsClass.idadeMaxima({ idadeMaxima: true }),
						ValidatorsClass.validarDataCorreta({ dataCorreta: true })
					])

				]
			],
			cpf: [
				{
					value: this.isCPF ? this._userServiceLN.sessionUser.documento : this._etapaService.dadosTitular.cpf,
					disabled: this.isCPF ? true : false,
				},
				[
					Validators.required
				]
			],
			rg: [
				{
					value: this._etapaService.dadosTitular.rg,
					disabled: false
				},
				[
					Validators.required
				]
			],
			orgaoEmissor: [
				{
					value: this._etapaService.dadosTitular.orgaoEmissor,
					disabled: false
				},
				[
					Validators.required
				]
			],
			dataEmissao: [
				{
					value: this._etapaService.dadosTitular.dataEmissao,
					disabled: false,
				},
				[
					Validators.compose([
						Validators.required,
						ValidatorsClass.compararDataAtual({ dataEmissao: true }),
						ValidatorsClass.validarDataCorreta({ dataCorreta: true })
					])
				]
			],
			estado: [
				{
					value: this._etapaService.dadosTitular.estado,
					disabled: false
				},
				[
					Validators.required
				]
			],
			email: [
				{
					value: this._etapaService.dadosTitular.email ? this._etapaService.dadosTitular.email.toUpperCase() : (this._userServiceLN.sessionUser.email ? this._userServiceLN.sessionUser.email.toUpperCase() : ''), // TODO: Verificar se de fato poderá ser implementado dessa forma. Do contrário, remover.
					disabled: false
				},
				[
					Validators.compose([
						Validators.required,
						Validators.email
					])
				]
			],
			telefone: [
				{
					value: this._etapaService.dadosTitular.telefone ? this._etapaService.dadosTitular.telefone : this._userServiceLN.sessionUser.telefone ?? '', // TODO: Verificar se de fato poderá ser implementado dessa forma. Do contrário, remover.
					disabled: false
				}
			],
			celular: [
				{
					value: this._etapaService.dadosTitular.celular ? this._etapaService.dadosTitular.celular : this._userServiceLN.sessionUser.celular ?? '', // TODO: Verificar se de fato poderá ser implementado dessa forma. Do contrário, remover.
					disabled: false
				},
				[
					Validators.compose([
						Validators.required,
						ValidatorsClass.validarCelular({ celular: true })
					])
				]
			],
		}, {
			validators: [ValidatorsClass.verificarDataEmissao]
		});
	}

	deParaDadosCPF(): void {
		this._etapaService.dadosTitular.celular = this.formDadosTitular.value.celular;
		this._etapaService.dadosTitular.telefone = this.formDadosTitular.value.telefone;
		this._etapaService.dadosTitular.email = this.formDadosTitular.value.email;
		this._etapaService.dadosTitular.dataNascimento = this.formDadosTitular.value.dataNascimento;
		this._etapaService.dadosTitular.rg = this.formDadosTitular.value.rg;
		this._etapaService.dadosTitular.estado = this.formDadosTitular.value.estado;
		this._etapaService.dadosTitular.nome = this.isCPF ? this._userServiceLN.sessionUser.nome : this.formDadosTitular.value.nome;
		this._etapaService.dadosTitular.cpf = this.isCPF ? this._userServiceLN.sessionUser.documento : this.formDadosTitular.value.cpf;
		this._etapaService.dadosTitular.dataEmissao = this.formDadosTitular.value.dataEmissao;
		this._etapaService.dadosTitular.orgaoEmissor = this.formDadosTitular.value.orgaoEmissor;
	}

	validarForms(): void {
		this.touchForm();
		if (this.formDadosTitular.invalid) {
			if (this.formDadosTitular.controls.email.invalid) {
				this.validarEmail();
			}
			this.formTitularValidado.emit(false);
		} else {
			this.alertEmail = true;
			this.deParaDadosCPF();
			this.formTitularValidado.emit(true);
		}
	}

	touchForm(): void {
		this.formDadosTitular.controls['dataEmissao'].markAsTouched();
		this.formDadosTitular.controls['celular'].markAsTouched();
		this.formDadosTitular.controls['telefone'].markAsTouched();
		this.formDadosTitular.controls['email'].markAsTouched();
		this.formDadosTitular.controls['dataNascimento'].markAsTouched();
		this.formDadosTitular.controls['rg'].markAsTouched();
		this.formDadosTitular.controls['estado'].markAsTouched();
		this.formDadosTitular.controls['nome'].markAsTouched();
		this.formDadosTitular.controls['cpf'].markAsTouched();
		this.formDadosTitular.controls['dataEmissao'].markAsTouched();
		this.formDadosTitular.controls['orgaoEmissor'].markAsTouched();
	}

	validarEmail(): void {
		if (this.formDadosTitular.controls.email.invalid && this.formDadosTitular.value.email !== '' && this.alertEmail) {
			this._alert.alertError("Por favor preencha um e-mail válido!");
			this.alertEmail = false;
		}
	}

	validarDtNascimento(): void {
		if (this.formDadosTitular.value.dataNascimento.length === 8) {
			if (this.formDadosTitular.controls['dataNascimento'].hasError('dataNascimento')) {
				this._alert.alertWarning('A data de nascimento não pode ser maior do que a data atual!');
			} else if (this.formDadosTitular.controls['dataNascimento'].hasError('idadeMinima')) {
				this._alert.alertWarning('É necessário ser maior de 18 anos para solicitar uma Ligação Nova!')
			}
		}
	}

	validarDtEmissao(): void {
		if (this.formDadosTitular.value.dataEmissao.length === 8) {
			if (this.formDadosTitular.controls['dataEmissao'].hasError('dataEmissao')) {
				this._alert.alertWarning('A data de emissão não pode ser maior do que a data atual!')
			} else if (this.formDadosTitular.controls['dataEmissao'].hasError('dataEmissaoMenor')) {
				this._alert.alertWarning('A data de emissão não pode ser menor que a data de nascimento!');
			}
		}
	}
}
