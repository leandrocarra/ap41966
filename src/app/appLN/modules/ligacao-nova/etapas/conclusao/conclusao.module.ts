import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConclusaoRoutingModule } from './conclusao-routing.module';
import { ConclusaoComponent } from './conclusao.component';


@NgModule({
  declarations: [
    ConclusaoComponent
  ],
  imports: [
    CommonModule,
    ConclusaoRoutingModule
  ]
})
export class ConclusaoModule { }
