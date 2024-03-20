import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebitoImovelComponent } from './debito-imovel.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    DebitoImovelComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    DebitoImovelComponent
  ]
})
export class DebitoImovelModule { }
