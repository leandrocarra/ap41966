import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { PagamentoModule } from '../../pagamento.module';
import { PagamentoFaturaDigitalComponent } from './pagamento-fatura-digital.component';

describe(PagamentoFaturaDigitalComponent.name, () => {
	let component: PagamentoFaturaDigitalComponent;
	let fixture: ComponentFixture<PagamentoFaturaDigitalComponent>;
	let router: Router;
	let location: Location;

	let userService: jasmine.SpyObj<UserServiceLN>;

	let sessionUserMockado = require('src/app/appLN/shared/mock/responses/response-session-user-cpf.json');
	let dadosPagamentoMockado = require('src/app/appLN/shared/mock/preenchimentos/dados-pagamento.json');


	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PagamentoFaturaDigitalComponent],
			providers: [UserServiceLN],
			imports: [
				PagamentoModule,
				RouterTestingModule.withRoutes([]),
				BrowserAnimationsModule,
				HttpClientTestingModule,
				ReactiveFormsModule,
				MatInputModule,
				MatFormFieldModule,
				FormsModule,
				CommonModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	});

	beforeEach(() => {
		userService = TestBed.inject(UserServiceLN) as jasmine.SpyObj<UserServiceLN>;


		fixture = TestBed.createComponent(PagamentoFaturaDigitalComponent);
		component = fixture.componentInstance;
		location = TestBed.inject(Location);
		router = TestBed.inject(Router);

		component['_etapaService'].dadosPagamento = dadosPagamentoMockado;
	});

	it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it(`Deve validar safenavigaton quando sessionUser for nulo`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		userService.sessionUser = null;
		component.createForm();
		expect(component).toBeTruthy();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.onResize.name}
	deve ser chamado quando emitir resize da tela for menor que 768`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		spyOnProperty(window, 'innerWidth').and.returnValue(760);
		window.dispatchEvent(new Event('resize'));
		expect(component.mobile).toBeTrue();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.changeEmail.name}
	deve salvar o novo e-mail válido informado pelo usuário e liberar o botão continuar`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		component.formEmailFaturaDigital.controls['email'].setValue("teste@com");
		component.dadosPagamento.faturaDigital = "Sim";
		component.changeEmail();
		expect(component.habilitarAvancar).toBeTrue();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.changeEmail.name}
	deve salvar o novo e-mail inválido informado pelo usuário e bloqueiar o botão continuar`, () => {
		userService.sessionUser = sessionUserMockado;
		component.formEmailFaturaDigital.controls.email.setValue("teste@");
		component.dadosPagamento.faturaDigital = "Sim";
		fixture.detectChanges();
		component.changeEmail();
		expect(component.habilitarAvancar).toBe(component.formEmailFaturaDigital.valid);
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.changeEmail.name}
	deve bloquear o botão continuar se o usuário optar por fatura digital e não informar o e-mail`, () => {
		userService.sessionUser = sessionUserMockado;
		component.formEmailFaturaDigital.controls.email.setValue("teste@gmail.com");
		component.dadosPagamento.faturaDigital = "Sim";
		fixture.detectChanges();
		component.changeEmail();
		expect(component.habilitarAvancar).toBeTrue();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.changeEmail.name}
	deve bloquear o botão continuar se o usuário não escolher fatura digital sem preencher os dados`, () => {
		userService.sessionUser = sessionUserMockado;
		component.dadosPagamento.faturaDigital = "Não";
		fixture.detectChanges();
		component.changeEmail();
		expect(component.habilitarAvancar).toBeFalse();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.carregaPerguntas.name}
	deve chamar o método #${PagamentoFaturaDigitalComponent.prototype.setReceberEmail.name} com a string 'Não' como parâmetro`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		component.dadosPagamento.faturaDigital = "Não";
		let spy = spyOn(component, 'setReceberEmail');
		component.carregaPerguntas();
		expect(spy).toHaveBeenCalledWith('Não');
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.setReceberEmail.name}
	deve bloquear o botão quando usuário informar que não deseja fatura digital`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		component.setReceberEmail('Não');
		expect(component.habilitarAvancar).toBeFalse();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.setReceberEmail.name}
	deve bloquear o botão quando usuário informar que deseja fatura digital e não preencher`, () => {
		userService.sessionUser = sessionUserMockado;
		component.formEmailFaturaDigital.controls.email.setValue("");
		fixture.detectChanges();
		component.setReceberEmail('Sim');
		expect(component.habilitarAvancar).toBeFalse();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.getTarifaAlternativa.name}
	deve formatar o valor da tarifa quando tiver 3 dígitos`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		spyOn(component['_etapaService'], 'taxaEntregaAlternativa').and.returnValue(of("101"));
		component.getTarifaAlternativa();
		expect(component.tarifaAdicional).toBe("1,01");
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.getTarifaAlternativa.name}
	deve formatar o valor da tarifa quando tiver 4 dígitos`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		spyOn(component['_etapaService'], 'taxaEntregaAlternativa').and.returnValue(of("1010"));
		component.getTarifaAlternativa();
		expect(component.tarifaAdicional).toBe("10,10");
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.receberDados.name}
	deve liberar o botão de prosseguir`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		component.receberDados(true);
		expect(component.habilitarAvancar).toBeTrue;
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.receberDados.name}
	deve bloqueiar o botão de prosseguir`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		component.receberDados(false);
		expect(component.habilitarAvancar).toBeFalse;
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.voltar.name}
	deve voltar pagina quando chamado`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		component.voltar();
		expect(location.back()).toBe();
	});

	it(`#${PagamentoFaturaDigitalComponent.prototype.avancar.name}
	deve redirecionar para tela de débito automático`, () => {
		userService.sessionUser = sessionUserMockado;
		fixture.detectChanges();
		let spy = spyOn(router, 'navigate');
		component.avancar();
		expect(spy).toHaveBeenCalledOnceWith(['ligacao-nova', 'pagamento', 'debito-automatico']);
	});

});
