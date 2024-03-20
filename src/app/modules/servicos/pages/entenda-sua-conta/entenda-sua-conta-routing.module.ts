import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreadCrumbEntendaSuaConta, SubRotasEntendaSuaConta } from 'app/core/models/entenda-sua-conta/sub-rotas-entenda-sua-conta';
import { EntendaSuaContaQualidadeResolver, EntendaSuaContaResolver } from 'app/core/resolvers/entenda-sua-conta/entenda-sua-conta.resolver';
import { ExibirAvisoComponent } from 'app/shared/pages/exibir-aviso/exibir-aviso.component';
import { SuaContaComponent } from './pages/sua-conta/sua-conta.component';

const routes: Routes = [
  {
    path: '',
    component: SuaContaComponent,
    data: { breadcrumb: BreadCrumbEntendaSuaConta.ENTENDA_SUA_CONTA },
    resolve: {
      dadosEntendaSuaConta: EntendaSuaContaResolver,
      dadosEntendaSuaContaQualidade: EntendaSuaContaQualidadeResolver
    }
  },
  {
    path: SubRotasEntendaSuaConta.Aviso,
    component: ExibirAvisoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntendaSuaContaRoutingModule { }
