import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { OpcaoTarifariaComponent } from 'app/shared/pages/opcao-tarifaria/opcao-tarifaria.component';

import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OpcaoTarifariaComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    NeoButtonModule
    
  ],
  exports:[OpcaoTarifariaComponent]
})
export class OpcaoTarifariaModule { }
