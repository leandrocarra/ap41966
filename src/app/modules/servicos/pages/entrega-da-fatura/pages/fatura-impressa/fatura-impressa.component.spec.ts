// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { PathCompleto } from 'app/core/enums/servicos';
// import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
// import { TokenService } from 'app/core/services/token/token.service';

// import { FaturaImpressaComponent } from './fatura-impressa.component';

// describe('EntregaDaFaturaComponent', () => {
//   let component: FaturaImpressaComponent;
//   let fixture: ComponentFixture<FaturaImpressaComponent>;
//   let router : Router 

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [FaturaImpressaComponent],

//       imports:[
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])
//       ],

//       providers:[
//         TokenService,
//         FormBuilder
        
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FaturaImpressaComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${FaturaImpressaComponent.prototype.onResize.name}
//   deve ser retornar verdadeiro chamado quando emitir resize da tela
//   for menor que 768 `, () => {
//     fixture.detectChanges();
//     spyOnProperty(window, 'innerWidth').and.returnValue(760);
//     window.dispatchEvent(new Event('resize'));
//     expect(component.mobile).toBeTrue();
//   });

//   it(`#${FaturaImpressaComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

//   it(`#${FaturaImpressaComponent.prototype.continuar.name}
//   Deve ser direcionado para a rota de FaturaImpressa, quando acionado `, () => {
//  let routerSpy = spyOn(router, 'navigate')
//     fixture.detectChanges();
//     component.continuar();
//     let rota = component.definirRotaAoContinuar()
//     fixture.detectChanges();
//      expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaImpressa, rota ]);
//    })




// });
