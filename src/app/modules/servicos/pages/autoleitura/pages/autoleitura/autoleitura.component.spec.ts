// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';

// import { AutoleituraComponent } from './autoleitura.component';

// describe('AutoleituraComponent', () => {
//   let component: AutoleituraComponent;
//   let fixture: ComponentFixture<AutoleituraComponent>;
//   let router: Router

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AutoleituraComponent ],

//       imports:[
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])
//       ],

//       providers:[
//         TokenService,
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AutoleituraComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se inciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });


  
//   it(`#${AutoleituraComponent.prototype.voltar.name}
//   // deve direcionar para tela anterior, quando acionado`, () => {
   
//     let routerSpy = spyOn(router, 'navigate');
//     component.voltar();
//     fixture.detectChanges();
//     expect(routerSpy).toHaveBeenCalledOnceWith(["home"]);
//   });
// });
