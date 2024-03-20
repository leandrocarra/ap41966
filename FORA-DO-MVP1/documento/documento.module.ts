import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoComponent } from './documento.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';



@NgModule({
  declarations: [
    DocumentoComponent
  ],
  imports: [
    CommonModule,
    NeoButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    BoxFileModule
  ],
  exports: [
    DocumentoComponent
  ]
})
export class DocumentoModule { }
