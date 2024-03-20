import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipamentosAdicionadosComponent } from '../../equipamentos-adicionados/equipamentos-adicionados.component';
import { DialogAlterarCategoriaComponent } from '../dialog-alterar-categoria.component';

import { DialogAlterarCategoriaService } from './dialog-alterar-categoria.service';

describe(DialogAlterarCategoriaService.name, () => {
  let service: DialogAlterarCategoriaService;
  let component: DialogAlterarCategoriaComponent;
  let fixture: ComponentFixture<DialogAlterarCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    });
    service = TestBed.inject(DialogAlterarCategoriaService);
  });

  it('Deve criar o componente quando iniciado o ciclo de vida do Angular', () => {
    expect(service).toBeTruthy();
  });

  

});
