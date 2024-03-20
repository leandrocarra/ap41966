// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { PathCompleto } from 'app/core/enums/servicos';
// import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
// import { TokenService } from 'app/core/services/token/token.service';
// import { ContaContratoComponent } from './conta-contrato.component';

// describe(ContaContratoComponent.name, () => {
//   let component: ContaContratoComponent;
//   let fixture: ComponentFixture<ContaContratoComponent>;
//   let router : Router
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ContaContratoComponent],

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
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ContaContratoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${ContaContratoComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

//   it(`#${ContaContratoComponent.prototype.redirecionar.name}
//   Deve ser direcionado para a rota ConfirmarDados, quando acionado`, () => {
//     fixture.detectChanges();
//  let routerSpy = spyOn(router, 'navigate')
//     component.redirecionar();
//     fixture.detectChanges();
//      expect(routerSpy).toHaveBeenCalledOnceWith([PathCompleto.faturaImpressa, SubRotasFaturaImpressa.ConfirmarDados]);
//    })







// });
