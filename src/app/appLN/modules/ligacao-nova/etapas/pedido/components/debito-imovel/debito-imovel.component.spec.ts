import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebitoImovelComponent } from './debito-imovel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe(`${DebitoImovelComponent.name}`, () => {
  let component: DebitoImovelComponent;
  let fixture: ComponentFixture<DebitoImovelComponent>;

  let responseFaturasMockado = require("src/app/appLN/shared/mock/responses/response-api-debitos.json");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebitoImovelComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoImovelComponent);
    component = fixture.componentInstance;

  });

  it(`Deve instanciar ${DebitoImovelComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DebitoImovelComponent.prototype.onSelectAll.name}
  deve emitir faturasAPagar quando chamado`, () => {
    spyOn(component['_debitoFaturaService'], 'listarDebitoImovel').and.returnValue(of(responseFaturasMockado['13505511']));
    let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');
    fixture.detectChanges();
    component.onSelectAll();
    expect(faturasAPagarSpy).toHaveBeenCalled();
  });

  it(`#${DebitoImovelComponent.prototype.onSelectAll.name} deve emitir
	listaFaturas vazio quando selectItem for verdadeiro`, () => {
    spyOn(component['_debitoFaturaService'], 'listarDebitoImovel').and.returnValue(of(responseFaturasMockado['13505511']));
    let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');

    fixture.detectChanges();
    component.selectItem = true;
    component.onSelectAll();
    expect(faturasAPagarSpy).toHaveBeenCalledWith([]);

  });

  it(`#${DebitoImovelComponent.prototype.faturasSelecionadas.name}
	deve receber fatura por parametro e emitir faturasAPagar quando chamado`, () => {
		spyOn(component['_debitoFaturaService'], 'listarDebitoImovel').and.returnValue(of(responseFaturasMockado['13505511']));
    let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');

		fixture.detectChanges();
		component.onSelectAll();
		component.faturasSelecionadas(responseFaturasMockado['13505511'][0]);

		expect(faturasAPagarSpy).toHaveBeenCalled();

	});

  it(`#${DebitoImovelComponent.prototype.faturasSelecionadas.name}
	deve receber fatura por parametro e emitir faturasAPagar quando chamado`, () => {
		spyOn(component['_debitoFaturaService'], 'listarDebitoImovel').and.returnValue(of(responseFaturasMockado['13505511']));
    let faturasAPagarSpy = spyOn(component.faturasAPagar, 'emit');

		fixture.detectChanges();
		component.faturasSelecionadas(responseFaturasMockado['13505511'][0]);
		component.faturasSelecionadas(responseFaturasMockado['13505511'][1]);

		expect(faturasAPagarSpy).toHaveBeenCalled();

	});

  it(`#${DebitoImovelComponent.prototype.mudarSelecionarTodos.name}
	deve setar selectAll quando quantidade lista fatura for igual faturas Vencidas`, () => {
		fixture.detectChanges();
		component.listaFaturas = responseFaturasMockado['13505511'];
		component.faturasAtrasadasImovel = responseFaturasMockado['13505511'];
		component.mudarSelecionarTodos();
		expect(component.selectAll).toBeTrue();
	});
  it(`#${DebitoImovelComponent.prototype.mudarSelecionarTodos.name}
	deve setar selectAll quando quantidade lista fatura for igual faturas Vencidas`, () => {
		fixture.detectChanges();
		component.mudarSelecionarTodos();
		expect(component.valorTotalDebitosNoImovel).toEqual(0);
	});


});
