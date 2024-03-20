import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NeoSharedModule } from '../../shared.module';
import { DialogTirarFotoService } from './dialog-tirar-foto.service';

describe(DialogTirarFotoService.name, () => {
  let service: DialogTirarFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        NeoSharedModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    });
    service = TestBed.inject(DialogTirarFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });




});
