import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NeoSharedModule } from '../../shared.module';
import { DialogTirarFotoComponent } from './dialog-tirar-foto.component';


describe(DialogTirarFotoComponent.name, () => {
  let component: DialogTirarFotoComponent;
  let fixture: ComponentFixture<DialogTirarFotoComponent>;

  let streamObjectMockado = {
    "active": true,
    "id": "l5KFFrDwOGtjRdoSAFASDFASuvrZ2H6WWhj07cTUZ5gEs",
    "onactive": null,
    "onaddtrack": null,
    "oninactive": null,
    "onremovetrack": null,
  }

  // let error = {
  //   DOMException
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTirarFotoComponent],
      imports: [
        NeoSharedModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTirarFotoComponent);
    component = fixture.componentInstance;

  });

  it(`Deve criar o componente ${DialogTirarFotoComponent.name} quando chamado`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it(`#${DialogTirarFotoComponent.prototype.close.name}
  // Deve fechar, quando acionado`, () => {
  //   let spy = spyOn(component['_matDialogRef'],'close')
  //   fixture.detectChanges();
  //   component.close();
  //   expect(spy).toHaveBeenCalled();
  // });


  // it(`#${DialogTirarFotoComponent.prototype.confirm.name}
  // Deve confirmar a imagem, quando a selfie for tirada`, (done) => {
  //   let spy = spyOn<any>(component,'stopStreamedVideo')
  //   fixture.detectChanges();
  //   component.confirm();
  //   setTimeout(()=>{
  //   expect(spy).toHaveBeenCalled();
  //   done();
  //   })

  // });



  // it(`Deve chamar #closeLoading quando #getUserMedia retornar objeto`, fakeAsync((done) => {
  //   fixture.detectChanges();
  //   let mediaSpy = spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve<any>(streamObjectMockado));
  //   tick();

  //   let alertSpy = spyOn(component['_alert'], 'closeLoading');

  //   mediaSpy.calls.mostRecent().returnValue.then(res => {

  //     expect(alertSpy).toHaveBeenCalled();
  //     done();
  //   });

  // //   const spy = spyOn(func, 'bar').and.returnValue(Promise.resolve(true));
  // //  spy.calls.mostRecent().returnValue.then(res => {
  // //     ...your expect here...
  // //     done();
  // //  })

  // //   tick();
  // //   done();



  // }));

});
