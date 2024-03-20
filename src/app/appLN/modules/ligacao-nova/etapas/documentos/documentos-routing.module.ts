import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformativoSelfieComponent } from '../../../../shared/pages/informativo-selfie/informativo-selfie.component';
import { TirarSelfieComponent } from '../../../../shared/pages/tirar-selfie/tirar-selfie.component';
import { DocumentosComercialComponent } from './pages/documentos-comercial/documentos-comercial.component';
import { DocumentosResidencialComponent } from './pages/documentos-residencial/documentos-residencial.component';
import { DocumentosRuralComponent } from './pages/documentos-rural/documentos-rural.component';
import { DocumentosPerfilComponent } from './pages/documentos.component';

const routes: Routes = [
	{
		path: '',
		component: DocumentosPerfilComponent,
		children: [
			{
				path: "residencial",
				component: DocumentosResidencialComponent
			},
			{
				path: "comercial",
				component: DocumentosComercialComponent
			},
			{
				path: "rural/:subperfil",
				component: DocumentosRuralComponent
			},
			{
				path: "industrial",
				component: DocumentosComercialComponent
			},
			{
				path: "prepare-se-para-selfie",
				component: InformativoSelfieComponent
			},
			{
				path: "tirar-selfie",
				component: TirarSelfieComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DocumentosRoutingModule { }
