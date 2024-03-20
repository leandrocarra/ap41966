import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionGrupoFaturaComponent } from './accordion-grupo-fatura.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaginationComponentModule } from 'app/shared/components/pagination/pagination.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AccordionGrupoFaturaComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    PaginationComponentModule,
    MatRadioModule

  ],
  exports: [
    AccordionGrupoFaturaComponent
  ]
})
export class AccordionGrupoFaturaModule { }
