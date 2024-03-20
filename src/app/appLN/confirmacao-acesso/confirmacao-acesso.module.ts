import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NeoSharedModule } from '../shared/shared.module';
import { ConfirmacaoAcessoComponent } from './confirmacao-acesso.component';


@NgModule({
  imports: [
    CommonModule,
    NeoSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  declarations: [
    ConfirmacaoAcessoComponent
  ]
})
export class ConfirmacaoAcessoModule { }
