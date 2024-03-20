import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { InformativoTarifaBrancaComponent } from './informativo-tarifa-branca.component';

@NgModule({
  declarations: [InformativoTarifaBrancaComponent],
  imports: [
    CommonModule,
    NeoButtonModule
  ],

  exports:[InformativoTarifaBrancaComponent]
})
export class InformativoTarifaBrancaModule { }
