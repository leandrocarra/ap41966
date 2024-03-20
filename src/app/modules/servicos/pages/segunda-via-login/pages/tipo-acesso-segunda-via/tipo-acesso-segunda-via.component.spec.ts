// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';

// import { TipoAcessoSegundaViaComponent } from './tipo-acesso-segunda-via.component';

// describe('TipoAcessoSegundaViaComponent', () => {
//   let component: TipoAcessoSegundaViaComponent;
//   let fixture: ComponentFixture<TipoAcessoSegundaViaComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TipoAcessoSegundaViaComponent ],

//       imports: [
//         MatDialogModule,
//         MatDialogRef,
//         FormBuilder,
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([])],

//         providers: [
//           TokenService
//         ]
        
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TipoAcessoSegundaViaComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${TipoAcessoSegundaViaComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior.`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });
// });
