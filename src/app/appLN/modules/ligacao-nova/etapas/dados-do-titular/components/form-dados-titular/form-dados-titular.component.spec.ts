import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';
import { FormDadosTitularComponent } from './form-dados-titular.component';

describe(FormDadosTitularComponent.name, () => {
	let component: FormDadosTitularComponent;
	let fixture: ComponentFixture<FormDadosTitularComponent>;

	let sessionUserMockado = require('../../../../../../shared/mock/responses/response-session-user-cpf.json');

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FormDadosTitularComponent],
			imports: [
				ReactiveFormsModule,
				RouterTestingModule,
				HttpClientTestingModule,
				FormsModule,
				MatInputModule,
				MatFormFieldModule,
				MatSelectModule,
				MatOptionModule,
				BrowserAnimationsModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]

		})
			.compileComponents();

	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FormDadosTitularComponent);
		component = fixture.componentInstance;
		component['_userService'].sessionUser = sessionUserMockado;
	});

	it('should create instance', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it(`#${FormDadosTitularComponent.prototype.validarForms.name}
	deve chamar validar email quando email for invalido`, () => {
		fixture.detectChanges();
		component.formDadosTitular.patchValue({
			nome: "maria",
			dataNascimento: "08/08/2010",
			cpf: "96700905044",
			rg: "1234567891",
			orgaoEmissor: "SSP",
			dataEmissao: "08/08/2010",
			estado: "SP",
			email: "MARIAHOTMAIL.COM",
			telefone: "36725632",
			celular: "77988252332"
		});
		let validarEmailSpy = spyOn(component, 'validarEmail');
		component.validarForms();
		expect(validarEmailSpy).toHaveBeenCalled();
	});

	it(`#${FormDadosTitularComponent.prototype.validarForms.name}
	deve chamar alertEmail, deParaDadosCPF e formTitularValidado.emit quando dados forem validos`, () => {
		fixture.detectChanges();
		component.formDadosTitular.patchValue({
			nome: "maria",
			dataNascimento: "08/08/2000",
			cpf: "96700905044",
			rg: "1234567891",
			orgaoEmissor: "SSP",
			dataEmissao: "08/08/2010",
			estado: "SP",
			email: "MARIA@HOTMAIL.COM",
			telefone: "36725632",
			celular: "77988252332"
		});
		let deParaDadosCPFSpy = spyOn(component, 'deParaDadosCPF');
		let formTitularValidadoEmitSpy = spyOn(component.formTitularValidado, 'emit');
		component.validarForms();
		expect(deParaDadosCPFSpy).toHaveBeenCalled();
		expect(formTitularValidadoEmitSpy).toHaveBeenCalled();
	});

	it(`#${FormDadosTitularComponent.prototype.deParaDadosCPF.name}
	deve atualizar os dados do service dados titular para os dados do formulario`, () => {
		fixture.detectChanges();
		component['_userService'].tipoDocumento = "CPF";
		fixture.detectChanges();
		component.formDadosTitular.patchValue({
			nome: "maria",
			dataNascimento: "08/08/2010",
			cpf: "96700905044",
			rg: "1234567891",
			orgaoEmissor: "SSP",
			dataEmissao: "08/08/2010",
			estado: "SP",
			email: "MARIA@HOTMAIL.COM",
			telefone: "36725632",
			celular: "77988252332"
		});
		fixture.detectChanges();
		component.deParaDadosCPF();
		expect(component['_etapaService'].dadosTitular.cpf).toEqual(sessionUserMockado.documento);
	});

	it(`#${FormDadosTitularComponent.prototype.validarDtNascimento.name}
	deve validar Data de Nascimento quando não pode ser maior que a atual`, () => {
		component['_userService'].tipoDocumento = "CPF";
		fixture.detectChanges();
		let dataAtualMaisUm = new Date();
		component.formDadosTitular.controls.dataNascimento.setValue(acrescentarUmDiaDataAtual(dataAtualMaisUm));
		let mensagemWarningDataNascimento = "A data de nascimento não pode ser maior do que a data atual!";
		let mensagemWarningDataNascimentoSpy = spyOn(component['_alert'], 'alertWarning');
		component.validarDtNascimento();
		expect(mensagemWarningDataNascimentoSpy).toHaveBeenCalledOnceWith(mensagemWarningDataNascimento);
	});

	it(`#${FormDadosTitularComponent.prototype.validarDtNascimento.name}
	deve validar Data de Nascimento quando idade minima`, () => {
		component['_userService'].tipoDocumento = "CPF";
		fixture.detectChanges();
		let dataAtualMenosUm = new Date();
		component.formDadosTitular.controls.dataNascimento.setValue(diminuirUmDiaDataAtual(dataAtualMenosUm));
		let mensagemWarningDataNascimento = "É necessário ser maior de 18 anos para solicitar uma Ligação Nova!";
		let mensagemWarningDataNascimentoSpy = spyOn(component['_alert'], 'alertWarning');
		component.validarDtNascimento();
		expect(mensagemWarningDataNascimentoSpy).toHaveBeenCalledOnceWith(mensagemWarningDataNascimento);
	});

	it(`#${FormDadosTitularComponent.prototype.validarDtEmissao.name}
	deve validar Data de Emissao quando não pode ser maior que a atual`, () => {
		component['_userService'].tipoDocumento = "CPF";
		fixture.detectChanges();
		let dataAtualMaisUm = new Date();
		component.formDadosTitular.controls.dataNascimento.setValue("08082000");
		component.formDadosTitular.controls.dataEmissao.setValue(acrescentarUmDiaDataAtual(dataAtualMaisUm));
		let mensagemWarningDataEmissao = "A data de emissão não pode ser maior do que a data atual!";
		let mensagemWarningDataEmissaoSpy = spyOn(component['_alert'], 'alertWarning');
		component.validarDtEmissao();
		expect(mensagemWarningDataEmissaoSpy).toHaveBeenCalledOnceWith(mensagemWarningDataEmissao);
	});

	it(`#${FormDadosTitularComponent.prototype.validarDtEmissao.name}
	deve validar Data de Emissao quando idade minima`, () => {
		component['_userService'].tipoDocumento = "CPF";
		fixture.detectChanges();
		let dataAtualMenosUm = new Date();
		let dataAtualMaisUm = new Date();
		component.formDadosTitular.controls.dataNascimento.setValue(acrescentarUmDiaDataAtual(dataAtualMaisUm));
		component.formDadosTitular.controls.dataEmissao.setValue(diminuirUmDiaDataAtual(dataAtualMenosUm));
		let mensagemWarningDataEmissao = "A data de emissão não pode ser menor que a data de nascimento!";
		let mensagemWarningDataEmissaoSpy = spyOn(component['_alert'], 'alertWarning');
		component.validarDtEmissao();
		expect(mensagemWarningDataEmissaoSpy).toHaveBeenCalledOnceWith(mensagemWarningDataEmissao);
	});

	it(`#${FormDadosTitularComponent.prototype.deParaDadosCPF.name}
	deve atualizar os dados do formulario e do CPF para o Nome quando for CNPJ`, () => {
		component['_userService'].sessionUser = sessionUserMockado;
		component['_userService'].tipoDocumento = "CNPJ";
		component['_etapaService'].dadosTitular.nome = "MARIA FLAVIA";
		component['_etapaService'].dadosTitular.cpf = "96700905044";
		fixture.detectChanges();
		component.formDadosTitular.patchValue({
			nome: "MARIA FLAVIA",
			dataNascimento: "08/08/2011",
			cpf: "96700905044",
			rg: "1234567891",
			orgaoEmissor: "SSP",
			dataEmissao: "08/08/2011",
			estado: "SP",
			email: "MARIA@HOTMAIL.COM",
			telefone: "36725632",
			celular: "77988252332"
		});
		component.deParaDadosCPF();
		expect(component['_etapaService'].dadosTitular.nome).toEqual("MARIA FLAVIA");
	});
});

function zeroFill(num: number): any {
	return num < 9 ? "0" + num : num;
}

function acrescentarUmDiaDataAtual(date: Date): any {
	let dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	let di = zeroFill(date.getDate() + 1);
	let mo = zeroFill(date.getMonth() + 1);
	let y = zeroFill(date.getFullYear());
	if (dias.includes(di)) {
		di = '0' + di.toString()
	}
	return di + mo + y;
}

function diminuirUmDiaDataAtual(date: Date): any {
	let dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	let di = zeroFill(date.getDate() - 1);
	let mo = zeroFill(date.getMonth() + 1);
	let y = zeroFill(date.getFullYear());
	if (dias.includes(di)) {
		di = '0' + di.toString()
	}
	return di + mo + y;
}

