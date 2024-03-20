import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculadoraComponent } from './calculadora.component';


describe(CalculadoraComponent.name, () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])],
      providers: [CalculadoraComponent],
      declarations: [CalculadoraComponent],
    })
      .compileComponents();
    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

   it('should create', () => {
     fixture.detectChanges();
     expect(component).toBeTruthy();
   });

  it(`#${CalculadoraComponent.prototype.adicionar.name}`, () => {
    fixture.detectChanges();
    component.adicionar('AR-CONDICIONADO');
    expect(component.equipamentosAdicionados.length).toBe(1);
  })

  it(`#${CalculadoraComponent.prototype.voltar.name}
  deve voltar a página quando chamado`, fakeAsync(() => {
    fixture.detectChanges();
    component.voltar();
    expect(location.back()).toBe();
  }));


  it(`#${CalculadoraComponent.prototype.adicionar.name}
  deve voltar a página quando chamado`, () => {
    fixture.detectChanges();
    component.equipamentosAdicionados = [];
    let equipamento = {
      'equipamento': 'chuveiro',
      'potencia': '1000',
      'quantidade': '1'
    }
    component.adicionar(equipamento);
    expect(component.equipamentosAdicionados.length).toEqual(1)
  })

  // it('should route navigate', () =>{
  //   let navigateSpy= spyOn(router, 'navigate');
  //   component.continuar();
  //   expect(navigateSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"])

  // });



  // it('deve chamar a função continuar e redirecionar para dados imovel', () => {
  //   let navigateSpy = spyOn(router, 'navigate');
  //   component.continuar();
  //   expect(navigateSpy).toHaveBeenCalledOnceWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);
  // });
  
  // it('should call function onResize', () => {
  //   const spyResize = spyOn(component, 'configureM
  // .enuByWindowSize');
  //   window.dispatchEvent(new Event('resize'));
  //   expect(spyResize).toHaveBeenCalled();
  // });

  // it(`#${CalculadoraComponent.prototype.voltar.name}
  // deve voltar página quando chamado `, () => {
  //   fixture.detectChanges();
  //   component.voltar();
  //   expect(location.back()).toBe();
  // });

  // it(`#${CalculadoraComponent.prototype.continuar.name}
  // deve redirecionar exibir alerta confirmacaode categoria`, () => {
  //   component.fluxoResidencial = true;
  //   const routerSpy = spyOn(router, 'navigate');
  //   fixture.detectChanges();

  //   expect(routerSpy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "distancia-imovel"]);

  // })

  it(`#${CalculadoraComponent.prototype.onResize.name}
  deve ser atribuir verdadeiro para variável mobile quando resize da tela
  for menor que 768`, () => {
    fixture.detectChanges();
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    expect(component.mobile).toBeTrue();
  });

  it(`#${CalculadoraComponent.prototype.validarContinuar.name}
  deve chamar #alertWarningWithText quando for trifásica e sem anexar art`, () => {
    fixture.detectChanges();
    component.categoria = "TRIFÁSICA";
    component.necessitaART = true;
    let alertSpy = spyOn(component['_alert'], 'alertWarningWithText');
    component.validarContinuar();
    expect(alertSpy).toHaveBeenCalledWith("ATENÇÃO", "Para as solicitações de categoria TRIFÁSICA é obrigatório o envio do ART, clique no botão abaixo para carregar o documento.");
  });


  it(`#${CalculadoraComponent.prototype.validarContinuar.name}
  deve chamar #${CalculadoraComponent.prototype.continuar.name}`, () => {
    fixture.detectChanges();
    component.categoria = "MONOFÁSICA";
    let continuarSpy = spyOn(component, 'continuar');
    component.validarContinuar();
    expect(continuarSpy).toHaveBeenCalled();
  });

  // it(`#${CalculadoraComponent.prototype.continuar.name}
  // deve redirecionar a opcao-tarifaria quando chamado`, () => {
  //   fixture.detectChanges();
  //   let spy = spyOn(router, 'navigate');
  //   component.continuar();
  //   expect(spy).toHaveBeenCalledWith(["ligacao-nova", "dados-da-ligacao", "opcao-tarifaria"]);
  // });



});
