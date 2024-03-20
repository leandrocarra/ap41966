import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTirarFotoComponent } from './dialog-tirar-foto.component';
import { DialogTirarFotoService } from './dialog-tirar-foto.service';
import { NeoSharedModule } from '../../shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    DialogTirarFotoComponent
  ],
  imports: [
    CommonModule,
    NeoSharedModule,
    MatDialogModule
  ],
  exports: [
    DialogTirarFotoComponent
  ],
  entryComponents: [
    DialogTirarFotoComponent
  ],
  providers: [
    DialogTirarFotoService
  ]
})
export class DialogTirarFotoModule { }
