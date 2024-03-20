import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocoloGuard } from '../../guards/pedido/protocolo/protocolo.guard';
import { LigacaoNovaComponent } from './ligacao-nova.component';

const routes: Routes = [
	{
		path: '',
		component: LigacaoNovaComponent,
		children: [
			{
				path: 'pedido',
				loadChildren: () => import('./etapas/pedido/pedido.module').then(m => m.PedidoModule),
			},
			{
				path: 'documentos',
				loadChildren: () => import('./etapas/documentos/documentos.module').then(m => m.DocumentosModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: 'dados-do-titular',
				loadChildren: () => import('./etapas/dados-do-titular/dados-do-titular.module').then(m => m.DadosDoTitularModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: 'dados-da-ligacao',
				loadChildren: () => import('./etapas/dados-da-ligacao/dados-da-ligacao.module').then(m => m.DadosDaLigacaoModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: 'pagamento',
				loadChildren: () => import('./etapas/pagamento/pagamento.module').then(m => m.PagamentoModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: 'confirmacao',
				loadChildren: () => import('./etapas/confirmacao/confirmacao.module').then(m => m.ConfirmacaoModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: 'vistoria',
				loadChildren: () => import('./etapas/vistoria/vistoria.module').then(m => m.VistoriaModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: 'conclusao',
				loadChildren: () => import('./etapas/conclusao/conclusao.module').then(m => m.ConclusaoModule),
				canActivate: [ProtocoloGuard]
			},
			{
				path: '**',
				redirectTo: '/ligacao-nova/pedido'
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LigacaoNovaRoutingModule { }
