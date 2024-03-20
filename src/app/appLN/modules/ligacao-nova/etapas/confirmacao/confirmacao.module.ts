import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmacaoRoutingModule } from './confirmacao-routing.module';
import { ConfirmacaoComponent } from './confirmacao.component';


@NgModule({
  declarations: [
    ConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    ConfirmacaoRoutingModule
  ]
})
export class ConfirmacaoModule { }
