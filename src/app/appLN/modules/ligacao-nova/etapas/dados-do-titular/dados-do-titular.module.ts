import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { NeoSharedModule } from '../../../../shared/shared.module';
import { DialogClassePrincipalComponent } from './components/dialog-classe-principal/dialog-classe-principal.component';
import { FormDadosCnpjComponent } from './components/form-dados-cnpj/form-dados-cnpj.component';
import { FormDadosTitularComponent } from './components/form-dados-titular/form-dados-titular.component';
import { DadosDoTitularRoutingModule } from './dados-do-titular-routing.module';
import { DadosDoTitularComponent } from './dados-do-titular.component';



@NgModule({
  declarations: [
    DadosDoTitularComponent,
    FormDadosTitularComponent,
    FormDadosCnpjComponent,
    DialogClassePrincipalComponent,
  ],
  imports: [
    CommonModule,
    DadosDoTitularRoutingModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    NeoSharedModule,
    NgxMaskModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class DadosDoTitularModule { }
