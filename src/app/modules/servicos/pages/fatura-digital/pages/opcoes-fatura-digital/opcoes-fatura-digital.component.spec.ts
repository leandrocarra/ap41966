import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumRecebimento } from 'app/core/models/fatura-digital/fatura-digital';
import { SubRotasFaturaDigital } from 'app/core/models/fatura-digital/sub-rotas-fatura-digital';
import { TokenService } from 'app/core/services/token/token.service';
import { CadastrarFaturaDigitalComponent } from '../cadastrar-fatura-digital/cadastrar-fatura-digital.component';

import { OpcoesFaturaDigitalComponent } from './opcoes-fatura-digital.component';

describe('OpcoesFaturaDigitalComponent', () => {
  let component: OpcoesFaturaDigitalComponent;
  let componentCadastrar: CadastrarFaturaDigitalComponent;
  let fixture: ComponentFixture<OpcoesFaturaDigitalComponent>;
  let location : Location
  let router : Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcoesFaturaDigitalComponent,CadastrarFaturaDigitalComponent ],

      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],

      providers:[
        TokenService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(OpcoesFaturaDigitalComponent);
    component = fixture.componentInstance;
    // location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it(`Deve se iniciar o ciclo de vida do angular`, () => {
    expect(component).toBeTruthy();
  });

  // it(`#${OpcoesFaturaDigitalComponent.prototype.ngOnInit.name}
  // // deve setar o método setarOpcoesFaturaDigital();.`, () => {
  //   let methodSpy = spyOn(component, "setarOpcoesFaturaDigital");
  //   component.ngOnInit();
  //   expect(methodSpy).toHaveBeenCalled();
  // });

  it(`#${OpcoesFaturaDigitalComponent.prototype.voltar.name}
  deve navegar de volta para a página anterior.`, () => {
    fixture.detectChanges();
    let locationSpy = spyOn(component['_location'], 'back');
    component.voltar();
    expect(locationSpy).toHaveBeenCalled();
  });

  it(`#${CadastrarFaturaDigitalComponent.prototype.continuar.name}
Deve direcionar `, () => {
   let routerSpy = spyOn(router, 'navigate');
   component.canalDeEnvio = EnumRecebimento.emailAcesso;
   fixture.detectChanges();
   component.continuar();
   expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaDigital, SubRotasFaturaDigital.confirmarFaturaDigital])
});

// it(`#${CadastrarFaturaDigitalComponent.prototype.continuar.name}
// Deve direcionar `, () => {
//    let routerSpy = spyOn(router, 'navigate');
//    component.canalDeEnvio = Recebimento.novoWhatsapp;
//    fixture.detectChanges();
//    component.continuar();
//    expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaDigital, SubRotasFaturaDigital.alterarFaturaDigital])
// });

// it(`#${CadastrarFaturaDigitalComponent.prototype.continuar.name}
// Deve direcionar para a tela de descadastrar, quando fatura digital for false`, () => {
//    let routerSpy = spyOn(router, 'navigate');
//    component.canalDeEnvio = Recebimento.novoWhatsapp;
//    fixture.detectChanges();
//    component.continuar();
//    expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaDigital, SubRotasFaturaDigital.alterarFaturaDigital])
// });



  // it(`#${OpcoesFaturaDigitalComponent.prototype.escolherTipoDeEnvio.name}
  // deve direcionar tela para alterar fatura digital`, () => {
  //   fixture.detectChanges();
  //   component['_faturaDigitalService'].setModoDeEnvio 
  //   let routerSpy = spyOn(router, 'navigate');
  //   component.escolherTipoDeEnvio('tipo');
  //   expect(routerSpy).toHaveBeenCalled();
  // });


  // it(`#${OpcoesFaturaDigitalComponent.prototype.continuar.name}
  // deve direcionar tela para alterar fatura digital`, () => {
  //   fixture.detectChanges();
  //   component['_faturaDigitalService'].getModoDeEnvio.label = 'Quero receber minha conta em outro e-mail'
  //   let routerSpy = spyOn(router, 'navigate');
  //   component.continuar();
  //   expect(routerSpy).toHaveBeenCalledWith([PathCompleto.faturaDigital, SubRotasFaturaDigital.alterarFaturaDigital]);
  // });

  // it(`#${OpcoesFaturaDigitalComponent.prototype.adicionarOpcoes.name}
  // deve ##########`, () => {
  //   let faturaSpy = spyOnProperty(component['_faturaDigitalService'], 'getFaturaDigitalCadastrada').and.returnValue(true);
  //   fixture.detectChanges();
  //   component.adicionarOpcoes();
  //   expect(faturaSpy).toBeTrue();
  // });

  // it(`#${OpcoesFaturaDigitalComponent.prototype.adicionarOpcoes.name}
  // deve ##########`, () => {
  //   let faturaSpy = spyOnProperty(component['_faturaDigitalService'], 'getFaturaDigitalCadastrada').and.returnValue(false);
  //   fixture.detectChanges();
  //   component.adicionarOpcoes();
  //   expect(faturaSpy).toBeFalse();
  // });

  // it(`#${OpcoesFaturaDigitalComponent.prototype.adicionarOpcoes.name}
  // deve ##########`, () => {
  //   component['_faturaDigitalService'].setEmailFatura = '' ;
  //   fixture.detectChanges();
  //   component.adicionarOpcoes();
  //   expect(component['_faturaDigitalService'].getEmailFatura).toContain('');
  // });


});
