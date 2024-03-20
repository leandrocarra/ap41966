// import { FormaRecebimentoComponent } from './forma-recebimento.component';
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { NgxMaskModule } from 'ngx-mask';
// import { environment } from '@environments/environment';
// import { Recebimento } from 'app/core/models/fatura-digital/fatura-digital';

// describe(FormaRecebimentoComponent.name, () => {
//   let component: FormaRecebimentoComponent;
//   let fixture: ComponentFixture<FormaRecebimentoComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         FormaRecebimentoComponent
//       ],

//       imports:[
//         NgxMaskModule,
//         NgxMaskModule.forRoot(),

//       ]





//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormaRecebimentoComponent);
//     component = fixture.componentInstance;
    
//   });

//   it(`Deve se iniciar o ciclo de vida do angular`, () => {
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });


//   it(`#${FormaRecebimentoComponent.prototype.ngOnInit.name}
//   Deve setar tipoRecebimentoCelular como True quando o tipoRecebimento for WhatsApp`, () => {
//     component.tipoRecebimento = Recebimento.whatsapp;
//     fixture.detectChanges();
//     expect(component.tipoRecebimentoCelular).toBeTrue();
//   });

//   it(`#${FormaRecebimentoComponent.prototype.alterarDados.name}
//   Deve executar o emit de (@Output alterar), quando for true `, () => {
//     let spy= spyOn(component.alterar, 'emit');
//     fixture.detectChanges();
//     component.alterarDados();
//     expect(spy).toBeTrue();
//   });




// });
