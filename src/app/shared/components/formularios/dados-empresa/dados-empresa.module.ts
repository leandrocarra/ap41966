import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosEmpresaComponent } from './dados-empresa.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from '../../neo-button/neo-button.module';



@NgModule({
  declarations: [DadosEmpresaComponent],
  imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        NgxMaskModule,
        MatRadioModule,
        NeoButtonModule,
  ],

  exports: [DadosEmpresaComponent]
  
})
export class DadosEmpresaModule { }
