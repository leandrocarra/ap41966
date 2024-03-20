import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistoriaRoutingModule } from './vistoria-routing.module';
import { VistoriaComponent } from './vistoria.component';


@NgModule({
  declarations: [
    VistoriaComponent
  ],
  imports: [
    CommonModule,
    VistoriaRoutingModule
  ]
})
export class VistoriaModule { }
