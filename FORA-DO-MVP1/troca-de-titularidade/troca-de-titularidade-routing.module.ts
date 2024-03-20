import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscolhaProximoTitularTrocaComponent } from './pages/escolha-proximo-titular-troca/escolha-proximo-titular-troca.component';
import { InformativoTitularidadeTrocaComponent } from './pages/informativo-titularidade-troca/informativo-titularidade-troca.component';
import { TrocaDeTitularidadeComponent } from './troca-de-titularidade.component';


const routes: Routes = [
	{
		path: '',
		component: TrocaDeTitularidadeComponent,
		data: {
			breadcrumb: {
				label: "Troca de Titularidade"
			},
		},
		children: [
			{
				path: 'informativo-titularidade',
				component: InformativoTitularidadeTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'escolha-titular',
				component: EscolhaProximoTitularTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'novo-titular',
				loadChildren: () => import('./routes/novo-titular/novo-titular.module').then(m => m.NovoTitularModule),
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'antigo-titular',
				loadChildren: () => import('./routes/antigo-titular/antigo-titular.module').then(m => m.AntigoTitularModule),
				data: { breadcrumb: { skip: true } }
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrocaDeTitularidadeRoutingModule { }
