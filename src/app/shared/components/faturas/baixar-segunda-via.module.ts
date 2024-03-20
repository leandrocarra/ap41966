import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from '../neo-button/neo-button.module';
import { ToolTipComponentModule } from '../tooltip/tooltip.module';
import { BaixarSegundaVia } from './baixar-segunda-via.component';


@NgModule({
  declarations: [
    BaixarSegundaVia
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    ToolTipComponentModule,
    MatDividerModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NeoButtonModule 
  ],
  exports: [
    BaixarSegundaVia
  ]
})
export class BaixarSegundaViaModule { }