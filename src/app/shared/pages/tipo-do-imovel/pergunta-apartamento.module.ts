import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { PerguntaApartamentoComponent } from './pergunta-apartamento.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PerguntaApartamentoComponent, ],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  
  exports:[PerguntaApartamentoComponent]
})
export class PerguntaApartamentoModule { }

