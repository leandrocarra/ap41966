import { TrocaTitularidadeGuard } from './../../../../../../core/guards/trocaTitularidadeGuard/troca-titularidade.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacaoSolicitacaoTrocaComponent } from '../../pages/confirmacao-solicitacao-troca/confirmacao-solicitacao-troca.component';
import { ContatoNovoTitularTrocaComponent } from '../../pages/contato-novo-titular-troca/contato-novo-titular-troca.component';
import { DadosNovoTitularTrocaComponent } from '../../pages/dados-novo-titular-troca/dados-novo-titular-troca.component';
import { DocumentoComFotoTerceiroComponent } from '../../pages/documento-com-foto-terceiro/documento-com-foto-terceiro.component';
import { DocumentoProcuracaoTrocaComponent } from '../../pages/documento-procuracao-troca/documento-procuracao-troca.component';
import { InformarEnderecoTrocaComponent } from '../../pages/informar-endereco-troca/informar-endereco-troca.component';
import { InformativoTitularidadeTrocaComponent } from '../../pages/informativo-titularidade-troca/informativo-titularidade-troca.component';
import { PendenciasEmAbertoComponent } from '../../pages/pendencias-em-aberto/pendencias-em-aberto.component';
import { AntigoTitularComponent } from './antigo-titular.component';


const routes: Routes = [
  {
    path: '',
    component: AntigoTitularComponent,
    data: {
      breadcrumb: {
        label: "Troca de titularidade"
      }
    },
    children: [
      {
        path: 'documento-procuracao',
        component: DocumentoProcuracaoTrocaComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]
      },
      {
        path: 'informar-novo-titular',
        component: DadosNovoTitularTrocaComponent,
        data: { breadcrumb: { skip: true } },
        // canActivate: [TrocaTitularidadeGuard],
        // canLoad: [TrocaTitularidadeGuard]
      },
      {
        path: 'imovel-endereco',
        component: InformarEnderecoTrocaComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]
      },
      {
        path: 'contato-novo-titular',
        component: ContatoNovoTitularTrocaComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]
      },
      {
        path: 'documento-com-foto-terceiro',
        component: DocumentoComFotoTerceiroComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]

      },
      {
        path: 'pendencias-em-aberto',
        component: PendenciasEmAbertoComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]
      },
      {
        path: 'informativo-titularidade',
        component: InformativoTitularidadeTrocaComponent,
        data: { breadcrumb: { skip: true } }
      },
      {
        path: 'confirmar',
        component: ConfirmacaoSolicitacaoTrocaComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]
      },
      {
        path: 'solicitacao-enviada',
        loadChildren: () => import('../../../../../solicitacao-enviada/solicitacao-enviada-routing.module').then(m => m.SolicitacaoEnviadaRoutingModule),
        data: { breadcrumb: { skip: true } },
        canActivate: [TrocaTitularidadeGuard],
        canLoad: [TrocaTitularidadeGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntigoTitularRoutingModule { }
