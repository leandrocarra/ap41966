import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAlterarCategoriaComponent } from './dialog-alterar-categoria.component';


describe(DialogAlterarCategoriaComponent.name, () => {
  let component: DialogAlterarCategoriaComponent;
  let fixture: ComponentFixture<DialogAlterarCategoriaComponent>;

  const dialogMock = {
    close: jasmine.createSpy('close')
    };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ DialogAlterarCategoriaComponent 
      ],
      imports: [
        MatDialogModule
      ],
      
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        // { provide: MatDialogRef, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlterarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it(`Deve criar o componente quando iniciado o ciclo de vida do Angular com construtor vazio`, () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`#${DialogAlterarCategoriaComponent.prototype.close.name}
  Deve fechara caixa de opcões de categoria, quando acionado`, ()=>{
    fixture.detectChanges();
    component.close();
    expect(dialogMock.close).toHaveBeenCalled();
  });

  it(`#${DialogAlterarCategoriaComponent.prototype.alterarCategoria.name}
  Deve fechara caixa de opcões de categoria, quando acionado`, () => {
    fixture.detectChanges();
    component.alterarCategoria('MONOFÁSICA');
    expect(dialogMock.close).toHaveBeenCalled();
  });


});

