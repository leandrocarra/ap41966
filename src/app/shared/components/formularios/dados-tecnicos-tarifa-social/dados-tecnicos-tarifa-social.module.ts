import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DadosTecnicosTarifaSocialComponent } from './dados-tecnicos-tarifa-social.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BoxFileModule } from '../../box-file/box-file.module';
import { AttachedFileModule } from '../../attached-file/attached-file.module';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [DadosTecnicosTarifaSocialComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,  
    MatDatepickerModule,
    BoxFileModule,
    AttachedFileModule,
    MatCheckboxModule,
    
  ],

  exports:[DadosTecnicosTarifaSocialComponent]
})
export class DadosTecnicosTarifaSocialModule { }
