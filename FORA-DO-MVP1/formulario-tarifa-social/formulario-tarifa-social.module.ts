import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AttachedFileModule } from 'app/shared/components/attached-file/attached-file.module';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';
import { BeneficiarioTarifaSocialModule } from 'app/shared/components/formularios/beneficiario-tarifa-social/beneficiario-tarifa-social.module';
import { DadosBeneficioModule } from 'app/shared/components/formularios/dados-beneficio/dados-beneficio.module';
import { DadosTecnicosTarifaSocialModule } from 'app/shared/components/formularios/dados-tecnicos-tarifa-social/dados-tecnicos-tarifa-social.module';
import { TitularTarifaSocialModule } from 'app/shared/components/formularios/titular-tarifa-social/titular-tarifa-social.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormularioTarifaSocialComponent } from './formulario-tarifa-social.component';



@NgModule({
  declarations: [FormularioTarifaSocialComponent],
  imports: [
    CommonModule,
    BeneficiarioTarifaSocialModule,
    NeoButtonModule,
    DadosTecnicosTarifaSocialModule,
    TitularTarifaSocialModule,
    BoxFileModule,
    AttachedFileModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    DadosBeneficioModule,   
  ],

  exports: [FormularioTarifaSocialComponent]
})
export class FormularioTarifaSocialModule { }
