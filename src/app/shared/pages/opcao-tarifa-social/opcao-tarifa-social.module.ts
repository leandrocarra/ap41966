import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpcaoTarifaSocialComponent } from './opcao-tarifa-social.component';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OpcaoTarifaSocialComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    OpcaoTarifaSocialComponent
  ]
})
export class OpcaoTarifaSocialModule { }
