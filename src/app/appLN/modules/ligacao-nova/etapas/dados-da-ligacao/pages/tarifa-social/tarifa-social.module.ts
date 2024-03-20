import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule } from 'ngx-mask';
import { AttachedFileModule } from '../../../../../../shared/components/attached-file/attached-file.module';
import { BoxFileModule } from '../../../../../../shared/components/box-file/box-file.module';
import { NeoSharedModule } from '../../../../../../shared/shared.module';
import { DadosBeneficioComponent } from './components/dados-beneficio/dados-beneficio.component';
import { TitularTarifaSocialComponent } from './components/titular-tarifa-social/titular-tarifa-social.component';
import { DadosTarifaComponent } from './pages/dados-tarifa/dados-tarifa.component';
import { OpcaoTarifaSocialComponent } from './pages/opcao-tarifa-social/opcao-tarifa-social.component';
import { TarifaSocialRoutingModule } from './tarifa-social-routing.module';
import { TarifaSocialComponent } from './tarifa-social.component';


@NgModule({
  declarations: [
    TarifaSocialComponent,
    OpcaoTarifaSocialComponent,
    TitularTarifaSocialComponent,
    DadosBeneficioComponent,
    DadosTarifaComponent,
  ],
  imports: [
    CommonModule,
    TarifaSocialRoutingModule,
    AttachedFileModule,
    BoxFileModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NeoSharedModule,
    NgxMaskModule
  ]
})
export class TarifaSocialModule { }
