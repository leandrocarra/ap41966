// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';
// import { UserService } from 'app/core/services/user/user.service';

// import { DebitoAutomaticoCadastrarComponent } from './debito-automatico-cadastrar.component';

// describe('DebitoAutomaticoCadastrarComponent', () => {
//   let component: DebitoAutomaticoCadastrarComponent;
//   let fixture: ComponentFixture<DebitoAutomaticoCadastrarComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DebitoAutomaticoCadastrarComponent ],

//       providers:[
//         UserService,
//         TokenService
//       ],

//       imports:[
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DebitoAutomaticoCadastrarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${DebitoAutomaticoCadastrarComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior testando.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });
// });
