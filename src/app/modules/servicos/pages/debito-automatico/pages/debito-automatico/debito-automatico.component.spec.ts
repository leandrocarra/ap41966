// import { CommonModule } from '@angular/common';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';

// import { DebitoAutomaticoComponent } from './debito-automatico.component';

// describe('DebitoAutomaticoComponent', () => {
//   let component: DebitoAutomaticoComponent;
//   let fixture: ComponentFixture<DebitoAutomaticoComponent>;
//   let router: Router;

//   const dialogMock = {
//     close: () => {}
//     };


//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DebitoAutomaticoComponent ],

//       imports:[
//         CommonModule,
//         MatDialogModule, 
//         FormBuilder,
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([]),
//       ],

//       providers:[
  

//        { provide: MatDialogRef, useValue: dialogMock },


//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DebitoAutomaticoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${DebitoAutomaticoComponent.prototype.voltar.name}
//   deve navegar de volta para a página anterior 12344321`, () => {
//     fixture.detectChanges();
//     let locationSpy = spyOn(component['_location'], 'back');
//     component.voltar();
//     expect(locationSpy).toHaveBeenCalled();
//   });

//   it(`#${DebitoAutomaticoComponent.prototype.onResize.name}
//   deve ser retornar verdadeiro chamado quando emitir resize da tela
//   for menor que 768 teste de tamanho`, () => {
//     component['_user'].group = 'A';
//     fixture.detectChanges();
//     spyOnProperty(window, 'innerWidth').and.returnValue(760);
//     window.dispatchEvent(new Event('resize'));
//     expect(component.mobile).toBeTrue();
//   });
// });
