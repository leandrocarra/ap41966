import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { InformativoTarifaSocialComponent } from './informativo-tarifa-social.component';



@NgModule({
  declarations: [InformativoTarifaSocialComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    // ToolTipComponentModule
   
  ],

  exports:[InformativoTarifaSocialComponent]
})
export class InformativoTarifaSocialModule { }

