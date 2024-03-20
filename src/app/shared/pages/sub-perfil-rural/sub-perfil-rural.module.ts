import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubPerfilRuralComponent } from './sub-perfil-rural.component';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolTipComponentModule } from 'app/shared/components/tooltip/tooltip.module';



@NgModule({
  declarations: [
    SubPerfilRuralComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ToolTipComponentModule,
    
  ],

  exports: [
    SubPerfilRuralComponent
  ],
})
export class SubPerfilRuralModule { }
