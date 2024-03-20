import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoLigacaoComponent } from './tipo-ligacao.component';



@NgModule({
  declarations: [TipoLigacaoComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports: [TipoLigacaoComponent]
})
export class TipoLigacaoModule { }
