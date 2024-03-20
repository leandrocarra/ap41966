import { DocumentosAceitosComponent } from './pages/documentos-aceitos/documentos-aceitos.component';
import { DebitoJustificativaComponent } from './pages/debito-justificativa/debito-justificativa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BemVindoComponent } from './pages/bem-vindo/bem-vindo.component';
import { ConfirmarEnderecoComponent } from './pages/confirmar-endereco/confirmar-endereco.component';
import { DebitosComponent } from './pages/debitos/debitos.component';
import { DocumentosNecessariosComponent } from './pages/documentos-necessarios/documentos-necessarios.component';
import { EnderecoComponent } from './pages/endereco/endereco.component';
import { ImovelProntoComponent } from './pages/imovel-pronto/imovel-pronto.component';
import { InformativoTarifaSocialComponent } from './pages/informativo-tarifa-social/informativo-tarifa-social.component';
import { SelecaoPerfilComponent } from './pages/selecao-perfil/selecao-perfil.component';
import { PedidoComponent } from './pedido.component';
import { DocumentoPosseComponent } from './pages/documento-posse/documento-posse.component';
import { InformarTipoRuralComponent } from './pages/informar-tipo-rural/informar-tipo-rural.component';
import { AnexarAutorizacaoPrefeituraComponent } from './pages/anexar-autorizacao-prefeitura/anexar-autorizacao-prefeitura.component';
import { ProtocoloGuard } from '../../../../guards/pedido/protocolo/protocolo.guard';

const routes: Routes = [
	{
		path: "",
		component: PedidoComponent,
		children: [
			{
				path: "",
				component: BemVindoComponent
			},
			{
				path: "imovel-pronto",
				component: ImovelProntoComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "dados-do-imovel",
				component: EnderecoComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "confirmar-endereco",
				component: ConfirmarEnderecoComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "debitos",
				component: DebitosComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "anexar-autorizacao-da-prefeitura",
				component: AnexarAutorizacaoPrefeituraComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "selecao-perfil",
				component: SelecaoPerfilComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "tipo-perfil-rural",
				component: InformarTipoRuralComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "documentos-necessarios",
				component: DocumentosNecessariosComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "informativo-tarifa-social",
				component: InformativoTarifaSocialComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "justificativa",
				component: DebitoJustificativaComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "documento-posse",
				component: DocumentoPosseComponent,
				canActivate: [ProtocoloGuard]
			},
			{
				path: "documentos-aceitos",
				component: DocumentosAceitosComponent,
				canActivate: [ProtocoloGuard]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PedidoRoutingModule { }
