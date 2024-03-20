import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PagamentoDefinirDataComponent } from './pagamento-definir-data.component';




describe(PagamentoDefinirDataComponent.name, () => {
  let component: PagamentoDefinirDataComponent;
  let fixture: ComponentFixture<PagamentoDefinirDataComponent>;
  let router: Router;
  let location: Location


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentoDefinirDataComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoDefinirDataComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should location', fakeAsync(() => {
  //   let navigateSpy = spyOn(router, "navigate");
  //   component.voltar();
  //   expect(navigateSpy).toHaveBeenCalledWith(['ligacao-nova', 'pagamento', 'entrega-da-fatura']);
  // }));

  it(`#${PagamentoDefinirDataComponent.prototype.avancar.name} 
    deve ir para entrega-da-fatura quando clicado`, () => {
    let navigateSpy = spyOn(router, "navigate");
    component.avancar();
    expect(navigateSpy).toHaveBeenCalledWith(['ligacao-nova', 'pagamento', 'entrega-da-fatura']);
  });


  it(`#${PagamentoDefinirDataComponent.prototype.onResize.name}
  deve ser chamado quando emitir resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${PagamentoDefinirDataComponent.prototype.voltar.name}
deve voltar a página, quando chamado`, () => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  });

  // it(`#${PagamentoDefinirDataComponent.prototype.avancar.name}
  // deve avancar, quando chamado`, () => {
  //   fixture.detectChanges();
  //   const routerSpy = spyOn(router, 'navigate');
  //   component.avancar();
  //   expect(routerSpy).toHaveBeenCalledWith(['ligacao-nova', 'pagamento', 'entrega-da-fatura']);
  // });

  // it(`#${PagamentoDefinirDataComponent.prototype.avancar.name}
  // deve avancar o fluxo,  quando chamado`, () => {
  //   fixture.detectChanges();
  //   let navigateSpy = spyOn(router, 'navigate');
  //   component.avancar();
  //   expect(navigateSpy).toHaveBeenCalledWith(['ligacao-nova', 'pagamento', 'entrega-da-fatura']);
  // });

  // it('should call data de vencimento', () => {
  //   expect(component.setDataVencimento('01/01/2001')).toBe();

  // })

});
