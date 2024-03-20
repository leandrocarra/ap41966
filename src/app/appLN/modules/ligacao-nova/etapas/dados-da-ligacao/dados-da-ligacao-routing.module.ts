import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosDaLigacaoComponent } from './dados-da-ligacao.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { ComboComponent } from './pages/combo/combo.component';
import { DimensionamentoDeRedeComponent } from './pages/dimensionamento-de-rede/dimensionamento-de-rede.component';
import { DistanciaImovelComponent } from './pages/distancia-imovel/distancia-imovel.component';
import { DocumentoIcmsComponent } from './pages/documento-icms/documento-icms.component';
import { InformativoInicialComponent } from './pages/informativo-inicial/informativo-inicial.component';
import { InformativoLigacaoComponent } from './pages/informativo-ligacao/informativo-ligacao.component';
import { InformativoTarifaSocialComponent } from './pages/informativo-tarifa-social/informativo-tarifa-social.component';
import { IsencaoIcmsComponent } from './pages/isencao-icms/isencao-icms.component';
import { OpcaoTarifariaComponent } from './pages/opcao-tarifaria/opcao-tarifaria.component';
import { QuestionarioApartamentoComponent } from './pages/questionario-apartamento/questionario-apartamento.component';
import { QuestionarioZonaRuralComponent } from './pages/questionario-zona-rural/questionario-zona-rural.component';
import { InformativoTarifaBrancaComponent } from './pages/informativo-tarifa-branca/informativo-tarifa-branca.component';

const routes: Routes = [
	{
		path: '',
		component: DadosDaLigacaoComponent,
		children: [
			{
				path: '',
				component: InformativoInicialComponent,
			},
			{
				path: 'informativo-ligacao',
				component: InformativoLigacaoComponent,
			},
			{
				path: 'questionario-apartamento',
				component: QuestionarioApartamentoComponent,
			},
			{
				path: 'questionario-zona-rural',
				component: QuestionarioZonaRuralComponent,
			},
			{
				path: 'dimensionamento-de-rede',
				component: DimensionamentoDeRedeComponent
			},
			{
				path: 'distancia-imovel',
				component: DistanciaImovelComponent,
			},
			{
				path: 'combos',
				component: ComboComponent,
			},
			{
				path: 'opcao-tarifaria',
				component: OpcaoTarifariaComponent,
			},
			{
				path: 'informativo-tarifa-social',
				component: InformativoTarifaSocialComponent,
			},
			{
				path: 'informativo-tarifa-branca',
				component: InformativoTarifaBrancaComponent,
			},
			{
				path: 'calculadora',
				component: CalculadoraComponent
			},
			{
				path: 'isencao-icms',
				component: IsencaoIcmsComponent
			},
			{
				path: 'documento-icms',
				component: DocumentoIcmsComponent
			}
		]
	},
	{ path: 'tarifa-social', loadChildren: () => import('./pages/tarifa-social/tarifa-social.module').then(m => m.TarifaSocialModule) }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DadosDaLigacaoRoutingModule { }
