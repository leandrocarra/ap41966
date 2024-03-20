import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebitoFaturaService } from '../../../../../../core/services/debito-fatura/debito-fatura.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { DebitoDocumentoComponent } from './debito-documento.component';

describe(DebitoDocumentoComponent.name, () => {
	let component: DebitoDocumentoComponent;
	let fixture: ComponentFixture<DebitoDocumentoComponent>;
	let userService: jasmine.SpyObj<UserServiceLN>;
	let debitFaturaoService: jasmine.SpyObj<DebitoFaturaService>


	let faturasAPagarMockado = require("src/app/appLN/shared/mock/responses/response-api-faturas-a-pagar.json");
	let sessionUserCPF = require("src/app/appLN/shared/mock/responses/response-session-user-cpf.json");

	beforeEach(async () => {

		await TestBed.configureTestingModule({
			declarations: [DebitoDocumentoComponent],
			imports: [RouterTestingModule, HttpClientTestingModule]
		}).compileComponents();


		fixture = TestBed.createComponent(DebitoDocumentoComponent);
		component = fixture.componentInstance;

		userService = TestBed.inject(UserServiceLN) as jasmine.SpyObj<UserServiceLN>;
		debitFaturaoService = TestBed.inject(DebitoFaturaService) as jasmine.SpyObj<DebitoFaturaService>;
	});

	it(`Deve instanciar ${DebitoDocumentoComponent.name} quando chamado`, () => {
		debitFaturaoService.setPendencias = faturasAPagarMockado['13505511'].vencidas;
		userService.sessionUser = sessionUserCPF;
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it(`Deve setar sessionUser como null  e instanciar ${DebitoDocumentoComponent.name} quando chamado`, () => {
		userService.sessionUser = null;
		debitFaturaoService.setPendencias = faturasAPagarMockado['13505511'].vencidas;
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it(`#${DebitoDocumentoComponent.prototype.onSelectAll.name} deve
	adicionar valor em valorTotalDebitosNoDoc e emitir via valorAPagar`, () => {

		debitFaturaoService.setPendencias = faturasAPagarMockado['13505511'].vencidas;

		let valorAPagarSpy = spyOn(component.valorAPagar, 'emit');
		fixture.detectChanges();
		component.onSelectAll();
		expect(valorAPagarSpy).toHaveBeenCalled();
	});

	it(`#${DebitoDocumentoComponent.prototype.onSelectAll.name} deve emitir
	listaFaturas vazio quando selectItem for verdadeiro`, () => {
		debitFaturaoService.setPendencias = faturasAPagarMockado['13505511'].vencidas;

		let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');

		fixture.detectChanges();
		component.selectItem = true;
		component.onSelectAll();
		expect(faturasAPagarSpy).toHaveBeenCalledWith([]);

	});


	it(`#${DebitoDocumentoComponent.prototype.faturasSelecionadas.name}
	deve receber fatura por parametro e emitir faturasAPagar quando chamado`, () => {
		debitFaturaoService.setPendencias = faturasAPagarMockado['13505511'].vencidas;

		let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');

		fixture.detectChanges();
		component.onSelectAll();
		component.faturasSelecionadas(faturasAPagarMockado['13505511'].vencidas[0]);

		expect(faturasAPagarSpy).toHaveBeenCalled();

	});

	it(`#${DebitoDocumentoComponent.prototype.faturasSelecionadas.name}
	deve receber fatura por parametro e emitir 2 faturasAPagar quando chamado`, () => {

		debitFaturaoService.setPendencias = faturasAPagarMockado['13505511'].vencidas;
		let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');

		fixture.detectChanges();

		component.faturasSelecionadas(faturasAPagarMockado['13505511'].vencidas[0]);
		component.faturasSelecionadas(faturasAPagarMockado['13505511'].vencidas[1]);

		expect(faturasAPagarSpy).toHaveBeenCalled();

	});

	it(`#${DebitoDocumentoComponent.prototype.mudarSelecionarTodos.name}
	deve setar selectAll quando quantidade lista fatura for igual faturas Vencidas`, () => {
		fixture.detectChanges();
		component.listaFaturas = faturasAPagarMockado['13505511'].vencidas;
		component.faturasVencidas = faturasAPagarMockado['13505511'].vencidas;
		component.mudarSelecionarTodos();
		expect(component.selectAll).toBeTrue();
	});

});
