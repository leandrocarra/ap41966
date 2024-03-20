import { Routes } from "@angular/router";

import { Servicos } from "app/core/enums/servicos";
import { EntendaSuaContaGuard } from "app/core/guards/entenda-sua-conta-guard/entenda-sua-conta.guard";
import { FaltaDeEnergiaGuard } from "app/core/guards/falta-de-energia-guard/falta-de-energia.guard";
import { FaturaDigitalGuard } from "app/core/guards/fatura-digital-guard/fatura-digital.guard";
import { SegundaViaGuard } from "app/core/guards/segunda-via-guard/segunda-via.guard";
import { FaturaDigitalResolver } from "app/core/resolvers/fatura-digital/fatura-digital.resolver";
import { ServicosComponent } from "app/modules/servicos/servicos.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";
import { DataCertaGuard } from "../../../guards/data-certa-guard/data-certa.guard";
import { AutoleituraGuard } from "../../../guards/autoleitura-guard/autoleitura.guard";
import { DebitoAutomaticoGuard } from "../../../guards/debito-automatico-guard/debito-automatico.guard";
import { FaturasResolver } from "../../../resolvers/faturas/home/faturas.resolver";

export const ServicosRoutes: Routes = [
    {
        path: '',
        component: ServicosComponent,
        data: {
            breadcrumb: { skip: true }

        },
        children: [
            {
                path: Servicos.autoleitura,
                loadChildren: () => import('../../../../modules/servicos/pages/autoleitura/autoleitura.module').then(m => m.AutoLeituraModule),
                canActivate: [AutoleituraGuard]
            },
            {
                path: Servicos.historicoDeconsumo,
                loadChildren: () => import('../../../../modules/servicos/pages/historico-consumo/historico-de-consumo.module').then(m => m.HistoricoDeConsumoModule)
            },
            {
                path: Servicos.debitoAutomatico,
                loadChildren: () => import('../../../../modules/servicos/pages/debito-automatico/debito-automatico.module').then(m => m.DebitoAutomaticoModule),
                canActivate: [DebitoAutomaticoGuard],
                canLoad: [DebitoAutomaticoGuard]
            },
            {
                path: Servicos.faturaDigital,
                loadChildren: () => import('../../../../modules/servicos/pages/fatura-digital/fatura-digital.module').then(m => m.FaturaDigitalModule),
                resolve: { minhaContaResponseDTO: FaturaDigitalResolver },
                canActivate: [FaturaDigitalGuard]
            },
            {
                path: Servicos.faltaDeEnergia,
                loadChildren: () => import('../../../../modules/servicos/pages/falta-energia/falta-de-energia.module').then(m => m.FaltaDeEnergiaModule),
                canActivate: [FaltaDeEnergiaGuard]
            },
            {
                path: Servicos.segundaVia,
                loadChildren: () => import('../../../../modules/servicos/pages/consultar-debitos/consultar-debitos.module').then(m => m.ConsultarDebitosModule),
                canActivate: [SegundaViaGuard],
                resolve: { faturas: FaturasResolver },
                data: {
                    origin: Servicos.segundaVia
                }
            },
            {
                path: Servicos.religacao,
                loadChildren: () => import('../../../../modules/servicos/pages/religacao/religacao.module').then(m => m.ReligacaoModule),
            },
            {
                path: Servicos.dataCerta,
                loadChildren: () => import('../../../../modules/servicos/pages/data-certa/data-certa.module').then(m => m.DataCertaModule),
                canActivate: [DataCertaGuard]
            },
            {
                path: Servicos.escolhaTipoFatura,
                loadChildren: () => import('../../../../modules/servicos/pages/escolha-tipo-fatura/escolha-tipo-fatura.module').then(m => m.EscolhaTipoFaturaModule)
            },
            {
                path: Servicos.faturaImpressa,
                loadChildren: () => import('../../../../modules/servicos/pages/entrega-da-fatura/fatura-impressa.module').then(m => m.FaturaImpressaModule)
            },
            {
                path: Servicos.faturaBraile,
                loadChildren: () => import('../../../../modules/servicos/pages/fatura-braile/fatura-braile.module').then(m => m.FaturaBraileModule)
            },
            {
                path: Servicos.entendaSuaConta,
                loadChildren: () => import('../../../../modules/servicos/pages/entenda-sua-conta/entenda-sua-conta.module').then(m => m.EntendaSuaContaModule),
                canActivate:[EntendaSuaContaGuard]
            },
            {
                path: Servicos.projetoParticular,
                loadChildren: () => import('../../../../modules/servicos/pages/projeto-particular/projeto-particular.module').then(m => m.ProjetoParticularModule),
                data: { breadcrumb: "Projeto Particular" }
            },
            // {
            //     path: Servicos.trocaDeTitularidade,
            //     loadChildren: () => import('../../../../modules/servicos/pages/troca-de-titularidade/troca-de-titularidade.module').then(m => m.TrocaDeTitularidadeModule)
            // },
            // {
            //     path: Servicos.acompanheSeuPedido,
            //     loadChildren: () => import('../../../../modules/servicos/pages/acompanhe-seu-pedido/acompanhe-seu-pedido.module').then(m => m.AcompanheSeuPedidoModule)
            // },
        ]
    },
    {
        path: 'solicitacao-enviada',
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule)
    },
    {
        path: "aviso",
        component: ExibirAvisoComponent
    },
    {
        path: '**',
        loadChildren: () => import('../../../../modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
    }
];
