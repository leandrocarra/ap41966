// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';
// import { UserService } from 'app/core/services/user/user.service';
// import { ProblemaResolvidoComponent } from './problema-resolvido.component';


// describe(ProblemaResolvidoComponent.name, () => {
//   let component: ProblemaResolvidoComponent;
//   let fixture: ComponentFixture<ProblemaResolvidoComponent>;
//   let router: Router;

//   let navExtraMockado = {
//     "extras": {
//       "state": {
//         "ondeFaltaEnergia": "",
//         "tipoAlerta": ""
//       }
//     }
//   };


//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ProblemaResolvidoComponent ],
//       providers: [
//         UserService,
//         TokenService
//       ],
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     router = TestBed.inject(Router);
//     spyOn(router, 'getCurrentNavigation').and.returnValue(navExtraMockado as any);
//     fixture = TestBed.createComponent(ProblemaResolvidoComponent);
//     component = fixture.componentInstance;
//   });

//   it(`#${ProblemaResolvidoComponent}
//   deve criar o componente quando iniciado o ciclo de vida do Angular`, () => {
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });

//   it(`#${ProblemaResolvidoComponent.prototype.voltar.name}
//   deve direcionar para tela de passos`, () => {
//     fixture.detectChanges();
//     let routerSpy = spyOn(router, 'navigate');
//     component.voltar();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "passos"], component.navExtra);
//   });

//   it(`#${ProblemaResolvidoComponent.prototype.continuar.name}
//   deve direcionar para tela de avisos quando a energia tiver voltado`, () => {
//     component.problemaResolvido = "Sim, a energia voltou";
//     fixture.detectChanges();
//     let routerSpy = spyOn(router, 'navigate');
//     component.continuar();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "avisos"], component.navExtra);
//   });

//   it(`#${ProblemaResolvidoComponent.prototype.continuar.name}
//   deve direcionar para tela de avisos quando o disjuntor foi danificado`, () => {
//     component.problemaResolvido = "Não, meu disjuntor está danificado";
//     fixture.detectChanges();
//     let routerSpy = spyOn(router, 'navigate');
//     component.continuar();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "avisos"], component.navExtra);
//   });

//   it(`#${ProblemaResolvidoComponent.prototype.continuar.name}
//   deve direcionar para tela que o usuário informa qual o problema com a energia elétrica`, () => {
//     component.problemaResolvido = "Não, meu disjuntor está normal e permaneço sem energia";
//     fixture.detectChanges();
//     let routerSpy = spyOn(router, 'navigate');
//     component.continuar();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["servicos", "falta-de-energia", "problema"], component.navExtra);
//   });

// });
