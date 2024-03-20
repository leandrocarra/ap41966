import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodigoDeBarrasComponent } from './codigo-de-barras.component';
import { MatIconModule } from '@angular/material/icon';
import { NeoButtonModule } from '../../neo-button/neo-button.module';



@NgModule({
  declarations: [
    CodigoDeBarrasComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    NeoButtonModule
  ],
  exports: [
    CodigoDeBarrasComponent
  ]
})
export class CodigoDeBarrasModule { }
