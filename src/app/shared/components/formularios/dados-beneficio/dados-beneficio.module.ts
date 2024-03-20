import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosBeneficioComponent } from './dados-beneficio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [DadosBeneficioComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMaskModule,
    MatSelectModule,
    MatRadioModule,
  ],
  exports: [DadosBeneficioComponent]
})
export class DadosBeneficioModule { }
