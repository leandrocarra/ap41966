// import { DadosWhatsappComponent } from './dados-whatsapp.component';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { environment } from '@environments/environment';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxMaskModule } from 'ngx-mask';
// import { SharedModule } from 'app/shared/shared.module';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { TokenService } from 'app/core/services/token/token.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('DadosWhatsappComponent', () => {
//   let component: DadosWhatsappComponent;
//   let fixture: ComponentFixture<DadosWhatsappComponent>;
//   let router: Router;
//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ 
//         DadosWhatsappComponent
//        ],

//        imports:[
//         MatFormFieldModule,
//         MatInputModule,
//         FormsModule,
//         ReactiveFormsModule,
//         NgxMaskModule,
//         SharedModule,
//         HttpClientTestingModule,
//         BrowserAnimationsModule,
//         NgxMaskModule.forRoot(),
        
//         RouterTestingModule.withRoutes([])
//        ],

//        providers:[
//         TokenService
        
//        ]
//     })
//     .compileComponents();

//     router = TestBed.inject(Router);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DadosWhatsappComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     expect(component).toBeTruthy();
//   });

//   it(`#${DadosWhatsappComponent.prototype.changeInputWhatsapp.name}
//   Deve emitir o valor do tel quando status for diferente de inválido, quando acionado`, () => {
//     fixture.detectChanges();
//     component.novoWhastappFormGroup.controls['email'].setValue('teste@teste.com.br')
//     component.changeInputWhatsapp();
//     expect(component.whatsappDigitado.emit).toBeTrue()
 
//   });

//   it(`#${DadosWhatsappComponent.prototype.onResize.name}
//   deve ser retornar verdadeiro chamado quando emitir resize da tela
//   for menor que 768`, () => {
//     fixture.detectChanges();
//     spyOnProperty(window, 'innerWidth').and.returnValue(760);
//     window.dispatchEvent(new Event('resize'));
//     expect(component.mobile).toBeTrue();
//   });

//   it(`#${DadosWhatsappComponent.prototype.changeInputWhatsapp.name}
//   Deve emitir o valor do tel quando status for diferente de inválido, quando acionado`, () => {
//     fixture.detectChanges();
//     component.novoWhastappFormGroup.controls['tel'].setValue('11995937482')
//     component.changeInputWhatsapp();
//     expect(component.whatsappDigitado.emit).toEqual(null)
 
//   });

//   it(`#${DadosWhatsappComponent.prototype.changeInputWhatsapp.name}
//   Deve emitir o valor do tel quando status for válido`, () => {
//     fixture.detectChanges();
//     component.novoWhastappFormGroup.controls['tel'].setValue('11995937482')
//     component.novoWhastappFormGroup.controls['confirmarTel'].setValue('11995937482')
//     component.changeInputWhatsapp();
//     expect(component.whatsappDigitado.emit).toEqual('11995937482')
//   });

//   it(`#${DadosWhatsappComponent.prototype.changeInputWhatsapp.name}
//   Deve emitir o ErrorState`, () => {
//     fixture.detectChanges();
//     component.novoWhastappFormGroup.controls['tel'].setValue('11995937482')
//     component.novoWhastappFormGroup.controls['confirmarTel'].setValue('11995937482')
//     component.changeInputWhatsapp();
//     expect(component.whatsappDigitado.emit).toEqual('11995937482')
//   });
  

  

// });
