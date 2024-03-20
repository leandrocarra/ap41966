import { NgModule } from '@angular/core';
import { ValidarSenhasComponent } from './validar-senhas.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { CustomMatErrorModule } from '../custom-mat-error/custom-mat-error.module';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CustomMatErrorModule
  ],
  declarations: [
    ValidarSenhasComponent
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ValidarSenhasComponent
  ]
})
export class ValidarSenhasModule { }
