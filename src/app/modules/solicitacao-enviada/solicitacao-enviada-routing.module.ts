import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocoloTextoSolicitacaoComponent } from 'app/shared/components/protocolo-texto-solicitacao/protocolo-texto-solicitacao.component';

import { SolicitacaoEnviadaComponent } from './solicitacao-enviada.component';

const routes: Routes = [{
  path: '', component: SolicitacaoEnviadaComponent,
  children: [
    {
      path: 'protocolo-texto',
      component: ProtocoloTextoSolicitacaoComponent,
      data: {
        breadcrumb: {
          skip: true,
        }
      }

    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoEnviadaRoutingModule { }
