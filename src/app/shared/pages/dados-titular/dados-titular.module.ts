import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DadosEmpresaModule } from 'app/shared/components/formularios/dados-empresa/dados-empresa.module';
import { DadosSolicitanteModule } from 'app/shared/components/formularios/dados-solicitante/dados-solicitante.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { DadosTitularComponent } from './dados-titular.component';





@NgModule({
  declarations: [
    DadosTitularComponent
  ],
  imports: [
    CommonModule,
    DadosSolicitanteModule,
    NeoButtonModule,
    DadosEmpresaModule

  ],
  exports: [DadosTitularComponent]
})
export class DadosTitularModule { }
