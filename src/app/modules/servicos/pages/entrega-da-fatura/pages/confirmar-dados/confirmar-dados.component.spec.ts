// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { environment } from '@environments/environment';
// import { TokenService } from 'app/core/services/token/token.service';
// import {Regiao} from 'app/core/enums/regiao'
// import { ConfirmarDadosComponent } from './confirmar-dados.component';

// describe('ConfirmarDadosComponent', () => {
//   let component: ConfirmarDadosComponent;
//   let fixture: ComponentFixture<ConfirmarDadosComponent>;
//   let router : Router 


//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ConfirmarDadosComponent ],

//       imports:[
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])
//       ],

//       providers:[
//         TokenService,
//         FormBuilder
        
//       ]


//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfirmarDadosComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${ConfirmarDadosComponent.prototype.onResize.name}
//   deve ser retornar verdadeiro chamado quando emitir resize da tela
//   for menor que 768`, () => {
//     fixture.detectChanges();
//     spyOnProperty(window, 'innerWidth').and.returnValue(760);
//     window.dispatchEvent(new Event('resize'));
//     expect(component.mobile).toBeTrue();
//   });

  
//   it(`#${ConfirmarDadosComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });



//   it(`#${ConfirmarDadosComponent.prototype.mockFluxo.name} 
//   Deve mockar a região da fatura impressa como true`, () => {
//     environment.regiao = Regiao.NE;
//     fixture.detectChanges();
//     component.mockFluxo();
//     expect(component['_faturaImpressaService'].mockFluxoCC).toEqual(true);
//   });

//   it(`#${ConfirmarDadosComponent.prototype.mockFluxo.name} 
//   Deve mockar a região da fatura impressa como false `, () => {
//     environment.regiao = Regiao.SE;
//     fixture.detectChanges();
//     component.mockFluxo();
//     expect(component['_faturaImpressaService'].mockFluxoCC).toEqual(false);
//   });

//   it(`#${ConfirmarDadosComponent.prototype.preencheSolicitacaoEnviada.name}
//   Deve preencher a solicitaçao enviada, quando a solicitaçao for enviada`, () =>{
//     fixture.detectChanges();
//     component.preencheSolicitacaoEnviada()
//     expect(component.preencheSolicitacaoEnviada).toHaveBeenCalled()
//   })

//   it(`#${ConfirmarDadosComponent.prototype.montaLayout.name}
//   Deve preencher a solicitaçao enviada, quando a solicitaçao for enviada`, () =>{
//     fixture.detectChanges();
//     component['_faturaImpressaService'].entregaDaFatura.fluxo = "Na caixa postal"
//     component.montaLayout()
//     expect(component['_faturaImpressaService'].entregaDaFatura.fluxo).toHaveBeenCalled()
//   })

//   it(`#${ConfirmarDadosComponent.prototype.montaTextoTermoAceite.name}
//   Deve preencher a solicitaçao enviada, quando a solicitaçao for enviada`, () =>{
//     fixture.detectChanges();
//     component['_faturaImpressaService'].entregaDaFatura.fluxo = "Na caixa postal"
//     component['_faturaImpressaService'].entregaDaFatura.taxa = 57.50
//     component.montaTextoTermoAceite()
//     expect(component['_faturaImpressaService'].entregaDaFatura.fluxo).toHaveBeenCalled()
//   })

//   it(`#${ConfirmarDadosComponent.prototype.montaTextoTermoAceite.name}
//   Deve preencher a solicitaçao enviada, quando a solicitaçao for enviada`, () =>{
//     fixture.detectChanges();
//     component['_faturaImpressaService'].entregaDaFatura.contaContrato = "1"
//     component.montaTextoTermoAceite()
//     expect(component['_faturaImpressaService'].entregaDaFatura.contaContrato).toHaveBeenCalled()
//   })



// });
