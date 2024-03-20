import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaoPossuiImovelComponent } from './nao-possui-imovel.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';



@NgModule({
  declarations: [NaoPossuiImovelComponent],
  imports: [
    CommonModule,
    NeoButtonModule
  ],
  exports: [
    NaoPossuiImovelComponent
  ]
})
export class NaoPossuiImovelModule { }
