import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertaConsumoComponent } from './alerta-consumo.component';



@NgModule({
  declarations: [ AlertaConsumoComponent ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ AlertaConsumoComponent ],

})
export class AlertaConsumoModule { }
