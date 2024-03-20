// import { CommonModule } from '@angular/common';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TokenService } from 'app/core/services/token/token.service';

// import { DadosDebitoAutomaticoTrocaComponent } from './dados-debito-automatico-troca.component';

// describe('DadosDebitoAutomaticoTrocaComponent', () => {
//   let component: DadosDebitoAutomaticoTrocaComponent;
//   let fixture: ComponentFixture<DadosDebitoAutomaticoTrocaComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DadosDebitoAutomaticoTrocaComponent ],

//       imports:[
//         CommonModule,
//         MatDialogModule, 
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         RouterTestingModule.withRoutes([]),
//       ],

//       providers:[
//         TokenService,


//       ]

//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DadosDebitoAutomaticoTrocaComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${DadosDebitoAutomaticoTrocaComponent.prototype.voltar.name}
//   Deve navegar para a pagina anterior teste dados-debito`, ()=>{
//     fixture.detectChanges();
//     let spy = spyOn(component[`_location`], 'back');
//     component.voltar()
//     expect(spy).toHaveBeenCalled();
//   })



// });
