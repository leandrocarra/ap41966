import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRepresentanteLegalComponent } from './dialog-representante-legal.component';

describe('DialogRepresentanteLegalComponent', () => {
  let component: DialogRepresentanteLegalComponent;
  let fixture: ComponentFixture<DialogRepresentanteLegalComponent>;

  const dialogMock = {
    close: () => {}
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRepresentanteLegalComponent,
    ],
     imports: [
      MatDialogModule,
    ],
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      // { provide: MatDialogRef, useValue: {} },
      { provide: MatDialogRef, useValue: dialogMock },
    ]
   
    })
    .compileComponents();

   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular com construtor vazio`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${DialogRepresentanteLegalComponent.prototype.close.name}
  Deve fechar, quando acionado`, () => {
    let spy = spyOn(component['_matDialogRef'],'close')
    fixture.detectChanges();
    component.close();
    expect(spy).toHaveBeenCalled();
  });
  
  it(`#${DialogRepresentanteLegalComponent.prototype.termoRepresentante.name}
  Deve fechar o termo representante, quando acionado`, () => {
    let spy = spyOn(component['_matDialogRef'],'close')
    fixture.detectChanges();
    component.termoRepresentante(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

});
