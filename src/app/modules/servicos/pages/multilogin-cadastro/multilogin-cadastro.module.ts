import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiloginCadastroRoutes } from 'app/core/routes/home-route/home-child-routes/multilogin-cadastro.routes';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { MultiloginCadastroComponent } from './multilogin-cadastro.component';
import { MultiloginCadastrarParceirosComponent } from './pages/multilogin-cadastrar-parceiros/multilogin-cadastrar-parceiros.component';


@NgModule({
  declarations: [
    MultiloginCadastroComponent,
    MultiloginCadastrarParceirosComponent
  ],
  imports: [
    CommonModule,
    NeoButtonModule,
    RouterModule.forChild(MultiloginCadastroRoutes),
  ],
})
export class MultiloginCadastroModule { }
