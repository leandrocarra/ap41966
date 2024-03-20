import { SelecaoPerfilComponent } from 'app/shared/pages/selecao-perfil/selecao-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SelecaoPerfilComponent],
  imports: [
    CommonModule,
    NeoButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SelecaoPerfilComponent
  ]
})
export class SelecaoPerfilModule { }
