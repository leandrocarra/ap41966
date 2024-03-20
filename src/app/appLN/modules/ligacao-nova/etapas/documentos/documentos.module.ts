import { AttachedFileModule } from '../../../../shared/components/attached-file/attached-file.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosResidencialComponent } from './pages/documentos-residencial/documentos-residencial.component';
import { DocumentosComercialComponent } from './pages/documentos-comercial/documentos-comercial.component';
import { DocumentosRuralComponent } from './pages/documentos-rural/documentos-rural.component';
import { DocumentosPerfilComponent } from './pages/documentos.component';
import { BoxFileModule } from '../../../../shared/components/box-file/box-file.module';
import { InformativoSelfieModule } from '../../../../shared/pages/informativo-selfie/informativo-selfie.module';
import { TirarSelfieModule } from '../../../../shared/pages/tirar-selfie/tirar-selfie.module';


@NgModule({
  declarations: [
    DocumentosPerfilComponent,
    DocumentosResidencialComponent,
    DocumentosComercialComponent,
    DocumentosRuralComponent
  ],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    AttachedFileModule,
    BoxFileModule,
    InformativoSelfieModule,
    TirarSelfieModule
  ]
})
export class DocumentosModule { }
