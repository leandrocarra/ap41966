import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoConsumoChartComponent } from './historico-consumo-chart.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [HistoricoConsumoChartComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  exports: [HistoricoConsumoChartComponent],
})
export class HistoricoConsumoChartModule { }
