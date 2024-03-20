import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosTarifaComponent } from './pages/dados-tarifa/dados-tarifa.component';
import { OpcaoTarifaSocialComponent } from './pages/opcao-tarifa-social/opcao-tarifa-social.component';
import { TarifaSocialComponent } from './tarifa-social.component';

const routes: Routes = [
	{
		path: '',
		component: TarifaSocialComponent,
		children: [
			{
				path: '',
				component: OpcaoTarifaSocialComponent
			},
			{
				path: 'dados-tarifa',
				component: DadosTarifaComponent
			},

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TarifaSocialRoutingModule { }
