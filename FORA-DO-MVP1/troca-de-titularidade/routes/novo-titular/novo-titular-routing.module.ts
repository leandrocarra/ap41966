import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrocaTitularidadeGuard } from 'app/core/guards/trocaTitularidadeGuard/troca-titularidade.guard';
import { DadosTitularComponent } from 'app/shared/pages/dados-titular/dados-titular.component';
import { InformativoBeneficiosComponent } from 'app/shared/pages/informativo-beneficios/informativo-beneficios.component';
import { InformativoSelfieComponent } from 'app/shared/pages/informativo-selfie/informativo-selfie.component';
import { InformativoTarifaBrancaComponent } from 'app/shared/pages/informativo-tarifa-branca/informativo-tarifa-branca.component';
import { InformativoTarifaSocialComponent } from 'app/shared/pages/informativo-tarifa-social/informativo-tarifa-social.component';
import { OpcaoTarifaSocialComponent } from 'app/shared/pages/opcao-tarifa-social/opcao-tarifa-social.component';
import { OpcaoTarifariaComponent } from 'app/shared/pages/opcao-tarifaria/opcao-tarifaria.component';
import { SubPerfilRuralComponent } from 'app/shared/pages/sub-perfil-rural/sub-perfil-rural.component';
import { PerguntaApartamentoComponent } from 'app/shared/pages/tipo-do-imovel/pergunta-apartamento.component';
import { TipoLigacaoComponent } from 'app/shared/pages/tipo-ligacao/tipo-ligacao.component';
import { TirarSelfieComponent } from '../../../../../../shared/pages/tirar-selfie/tirar-selfie.component';
import { AlterarDataCertaComponent } from '../../../data-certa/pages/alterar-data-certa/alterar-data-certa.component';
import { DataCertaComponent } from '../../../data-certa/pages/data-certa/data-certa.component';
import { DebitoAutomaticoCadastrarComponent } from '../../../debito-automatico/pages/debito-automatico-cadastrar/debito-automatico-cadastrar.component';
import { DebitoAutomaticoComponent } from '../../../debito-automatico/pages/debito-automatico/debito-automatico.component';
import { CadastrarFaturaDigitalTrocaComponent } from '../../pages/cadastrar-fatura-digital-troca/cadastrar-fatura-digital-troca.component';
import { CadastrarWhatsappTrocaComponent } from '../../pages/cadastrar-whatsapp-troca/cadastrar-whatsapp-troca.component';
import { ConfirmacaoSolicitacaoPersonalizadaTrocaComponent } from '../../pages/confirmacao-solicitacao-personalizada-troca/confirmacao-solicitacao-personalizada-troca.component';
import { ConfirmacaoSolicitacaoTrocaComponent } from '../../pages/confirmacao-solicitacao-troca/confirmacao-solicitacao-troca.component';
import { DadosPessoaisTrocaComponent } from '../../pages/dados-pessoais-troca/dados-pessoais-troca.component';
import { DocumentoComFotoTrocaComponent } from '../../pages/documento-com-foto-troca/documento-com-foto-troca.component';
import { IdentificacaoTrocaComponent } from '../../pages/identificacao-troca/identificacao-troca.component';
import { InformarImovelTrocaComponent } from '../../pages/informar-imovel-troca/informar-imovel-troca.component';
import { InformativoSucessoTrocaComponent } from '../../pages/informativo-sucesso-troca/informativo-sucesso-troca.component';
import { InformativoTitularidadeTrocaComponent } from '../../pages/informativo-titularidade-troca/informativo-titularidade-troca.component';
import { InformativoWhatsappTrocaComponent } from '../../pages/informativo-whatsapp-troca/informativo-whatsapp-troca.component';
import { ManterCaracteristicasLigacaoTrocaComponent } from '../../pages/manter-caracteristicas-ligacao-troca/manter-caracteristicas-ligacao-troca.component';
import { MotivoTrocaComponent } from '../../pages/motivo-troca/motivo-troca.component';
import { PendenciasEmAbertoComponent } from '../../pages/pendencias-em-aberto/pendencias-em-aberto.component';
import { SelecaoPerfilComponent } from './../../../../../../shared/pages/selecao-perfil/selecao-perfil.component';
import { NovoTitularComponent } from './novo-titular.component';
import { SelecaoComboComponent } from 'app/shared/pages/selecao-combo/selecao-combo.component';
import { DocumentoComponent } from 'app/shared/pages/documento/documento.component';
import { AvaliacaoObraComponent } from 'app/shared/pages/avaliacao-obra/avaliacao-obra.component';
import { FormularioTarifaSocialComponent } from 'app/shared/pages/formulario-tarifa-social/formulario-tarifa-social.component';
import { TrocaDeLigacaoComponent } from 'app/shared/pages/troca-de-ligacao/troca-de-ligacao.component';




const routes: Routes = [
	{
		path: '',
		component: NovoTitularComponent,
		children: [
			{
				path: 'cadastrar-fatura-digital',
				component: CadastrarFaturaDigitalTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'cadastrar-data-certa',
				component: DataCertaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'alterar-data-certa',
				component: AlterarDataCertaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'cadastrar-debito-automatico',
				component: DebitoAutomaticoCadastrarComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'dados-debito-automatico',
				component: DebitoAutomaticoComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'informativo-sucesso',
				component: InformativoSucessoTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'documento-com-foto',
				component: DocumentoComFotoTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'informar-imovel',
				component: InformarImovelTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'motivo',
				component: MotivoTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'confirmar',
				component: ConfirmacaoSolicitacaoTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'confirmar-personalizar',
				component: ConfirmacaoSolicitacaoPersonalizadaTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'tirar-selfie',
				component: TirarSelfieComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'informativo-titularidade',
				component: InformativoTitularidadeTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'pendencias-em-aberto',
				component: PendenciasEmAbertoComponent,
				data: { breadcrumb: { skip: true } },
				canActivate: [TrocaTitularidadeGuard],
				canLoad: [TrocaTitularidadeGuard]
			},
			{
				path: 'informativo-selfie',
				component: InformativoSelfieComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'identificacao',
				component: IdentificacaoTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'dados-pessoais',
				component: DadosPessoaisTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'manter-caracteristicas-ligacao',
				component: ManterCaracteristicasLigacaoTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'informativo-whatsapp',
				component: InformativoWhatsappTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'cadastrar-whatsapp',
				component: CadastrarWhatsappTrocaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'selecao-perfil',
				component: SelecaoPerfilComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'documento',
				component: DocumentoComponent,
				data: { breadcrumb: { skip: true } },
			},
			{
				path: 'avaliacao-obra',
				component: AvaliacaoObraComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'opcao-tarifa-social',
				component:OpcaoTarifaSocialComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'selecao-combo',
				component: SelecaoComboComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'solicitacao-enviada',
				loadChildren: () => import('../../../../../solicitacao-enviada/solicitacao-enviada-routing.module').then(m => m.SolicitacaoEnviadaRoutingModule),
				data: { breadcrumb: { skip: true } },
			},

			{
				path: 'pergunta-apartamento',
				component: PerguntaApartamentoComponent,
				data: { breadcrumb: { skip: true } }
			},

			{
				path: 'informativo-tarifa-social',
				component:  InformativoTarifaSocialComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'tipo-ligacao',
				component: TipoLigacaoComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'informativo-tarifa-branca',
				component: InformativoTarifaBrancaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'informativo-beneficios',
				component: InformativoBeneficiosComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'opcao-tarifaria',
				component: OpcaoTarifariaComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'sub-perfil-rural',
				component: SubPerfilRuralComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'dados-titular',
				component: 	DadosTitularComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'formulario-tarifa-social',
				component: 	FormularioTarifaSocialComponent,
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'troca-de-ligacao',
				component: 	TrocaDeLigacaoComponent,
				data: { breadcrumb: { skip: true } }
			}
			

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NovoTitularRoutingModule { }
