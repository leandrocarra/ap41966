import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebitoDocumentoComponent } from './debito-documento.component';

@NgModule({
  declarations: [
    DebitoDocumentoComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    DebitoDocumentoComponent
  ]
})
export class DebitoDocumentoModule { }
