// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { environment } from '@environments/environment';
// import { Regiao } from 'app/core/enums/regiao';
// import { PathCompleto } from 'app/core/enums/servicos';
// import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
// import { TokenService } from 'app/core/services/token/token.service';

// import { EnderecoAlternativoComponent } from './endereco-alternativo.component';

// describe('EnderecoAlternativoComponent', () => {
//   let component: EnderecoAlternativoComponent;
//   let fixture: ComponentFixture<EnderecoAlternativoComponent>;
//   let router: Router

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ EnderecoAlternativoComponent ],

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
//     fixture = TestBed.createComponent(EnderecoAlternativoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${EnderecoAlternativoComponent.prototype.voltar.name}
//   Deve navegar para a pagina anterior`, ()=>{
//     fixture.detectChanges();
//     let spy = spyOn(component[`_location`], 'back');
//     component.voltar()
//     expect(spy).toHaveBeenCalled();
//   })


//   it(`#${EnderecoAlternativoComponent.prototype.continuar.name}
//     Deve ser direcionado para a rota ConfirmarDados, quando acionado`, () => {
//       let routerSpy = spyOn(router, 'navigate')
//       fixture.detectChanges();
//       component.continuar()
//       expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaImpressa, SubRotasFaturaImpressa.ConfirmarDados]);
//        fixture.detectChanges();
//      })

//      it(`#${EnderecoAlternativoComponent.prototype.textoLogradouro} 
//      Deve mockar a região da fatura impressa como true`, () => {
//        environment.regiao = Regiao.NE;
//        fixture.detectChanges();
//        component.textoLogradouro;
//        expect(component.textoLogradouro).toEqual('ENDEREÇO');
//      });

//      it(`#${EnderecoAlternativoComponent.prototype.continuar.name}
//      Deve preencher a solicitaçao enviada, quando a solicitaçao for enviada`, () =>{
//        fixture.detectChanges();
//        component['_faturaImpressaService'].entregaDaFatura.dadosEndereco = component.formEnderecoAlternativo.value
//        component.continuar()
//        expect(component['_faturaImpressaService'].entregaDaFatura.dadosEndereco).toHaveBeenCalled()
//      })
// });
