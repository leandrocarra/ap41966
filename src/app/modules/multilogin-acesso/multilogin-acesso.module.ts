import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MultiloginAcessoRoutes } from 'app/core/routes/home-route/home-child-routes/multilogin-acesso.routes';
import { CustomMatErrorModule } from 'app/shared/components/custom-mat-error/custom-mat-error.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { NgxMaskModule } from 'ngx-mask';
import { DadosPerfilDeAcessoComponent } from './components/dados-perfil-de-acesso/dados-perfil-de-acesso.component';
import { MultiloginAcessoComponent } from './multilogin-acesso.component';
import { MultiloginPesquisarClienteComponent } from './pages/multilogin-pesquisar-cliente/multilogin-pesquisar-cliente.component';
import { MultiloginSelecionarClienteComponent } from './pages/multilogin-selecao-cliente/multilogin-selecionar-cliente.component';
import { MultiloginSelecaoPerfisComponent } from './pages/multilogin-selecao-perfis/multilogin-selecao-perfis.component';
import { DadosClientesComponent } from './components/dados-clientes/dados-clientes.component';
@NgModule({
  declarations: [
    MultiloginAcessoComponent,
    MultiloginSelecaoPerfisComponent,
    MultiloginPesquisarClienteComponent,
    MultiloginSelecionarClienteComponent,
    DadosClientesComponent,
    DadosPerfilDeAcessoComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MatFormFieldModule,
    MatRadioModule,
    NeoButtonModule,
    CustomMatErrorModule,
    MatIconModule,
    RouterModule.forChild(MultiloginAcessoRoutes)
  ]
})
export class MultiloginAcessoModule { }
