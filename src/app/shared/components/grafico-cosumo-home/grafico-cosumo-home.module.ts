import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GraficoConsumoHomeComponent } from './grafico-consumo/grafico-consumo-home.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    GraficoConsumoHomeComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    GraficoConsumoHomeComponent
  ]
})

export class GraficoCosumoHomeModule { }
