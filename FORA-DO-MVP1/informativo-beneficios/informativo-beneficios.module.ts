import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { ToolTipComponentModule } from 'app/shared/components/tooltip/tooltip.module';
import { InformativoBeneficiosComponent } from './informativo-beneficios.component';



@NgModule({
  declarations: [InformativoBeneficiosComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    NeoButtonModule,
    ToolTipComponentModule,
  ],

  exports:[InformativoBeneficiosComponent]
})
export class InformativoBeneficiosModule {}
