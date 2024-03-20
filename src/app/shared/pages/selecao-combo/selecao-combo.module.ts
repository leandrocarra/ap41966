import { SelecaoComboComponent } from './selecao-combo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SelecaoComboComponent],
  imports: [
    CommonModule,
    NeoButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SelecaoComboComponent
  ]
})

export class SelecaoComboModule { }
