
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NeoButtonModule } from '../neo-button/neo-button.module';
import { DialogTermoDeUsoComponent } from './dialog-termo-de-uso.component';



@NgModule({
  declarations: [DialogTermoDeUsoComponent],

  imports: [
    CommonModule,
    NeoButtonModule,
    MatIconModule,
  ],
  
  exports: [DialogTermoDeUsoComponent],
  
})
export class DialogTermoDeUsoModule { }