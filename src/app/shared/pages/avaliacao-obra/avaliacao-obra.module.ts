import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoObraComponent } from './avaliacao-obra.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AvaliacaoObraComponent
  ],
  imports: [
    CommonModule,
    NeoButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    AvaliacaoObraComponent
  ]
})
export class AvaliacaoObraModule { }
