import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiarioTarifaSocialComponent } from './beneficiario-tarifa-social.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [BeneficiarioTarifaSocialComponent],
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

  exports: [BeneficiarioTarifaSocialComponent]
})
export class BeneficiarioTarifaSocialModule { }
