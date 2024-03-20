import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';
import { CepModule } from 'app/shared/components/formularios/cep/cep.module';
import { EnderecoModule } from 'app/shared/components/formularios/endereco/endereco.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { NgxMaskModule } from 'ngx-mask';
import { ContatoNovoTitularTrocaComponent } from '../../pages/contato-novo-titular-troca/contato-novo-titular-troca.component';
import { DocumentoProcuracaoTrocaComponent } from '../../pages/documento-procuracao-troca/documento-procuracao-troca.component';
import { AntigoTitularRoutingModule } from './antigo-titular-routing.module';
import { AntigoTitularComponent } from './antigo-titular.component';


@NgModule({
  declarations: [
    AntigoTitularComponent,
    DocumentoProcuracaoTrocaComponent,
    ContatoNovoTitularTrocaComponent,
  ],
  imports: [
    AntigoTitularRoutingModule,
    BoxFileModule,
    CommonModule,
    NeoButtonModule,
    CepModule,
    EnderecoModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMaskModule,
    ReactiveFormsModule,
  ]
})
export class AntigoTitularModule { }
