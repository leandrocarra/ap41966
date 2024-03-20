import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EntregaAlternativaGuard } from "app/core/guards/entrega-alternativa-guard/entrega-alternativa.guard";
import { SubRotasFaturaImpressa } from "app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia";
import { CaixaPostalComponent } from "./pages/caixa-postal/caixa-postal.component";
import { ConfirmarDadosComponent } from "./pages/confirmar-dados/confirmar-dados.component";
import { ContaContratoComponent } from "./pages/conta-contrato/conta-contrato.component";
import { EnderecoAlternativoComponent } from "./pages/endereco-alternativo/endereco-alternativo.component";
import { FaturaImpressaComponent } from "./pages/fatura-impressa/fatura-impressa.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";
import { SubRotasEnderecoAlternativo } from "app/core/models/fatura-impressa/fatura-impressa";

export const routes: Routes = [
    {
        path: "",
        component: FaturaImpressaComponent,
        data: {
            breadcrumb: "Entrega de Fatura"
        },
        canActivate: [
            EntregaAlternativaGuard,
        ]
    },
    {
        path: SubRotasFaturaImpressa.EnderecoAlternativo,
        component: EnderecoAlternativoComponent,
        data: {
            breadcrumb: {
                skip: true,
            }
        }
    },
    {
        path: SubRotasEnderecoAlternativo.Avisos,
        component: ExibirAvisoComponent,
    },
    {
        path: SubRotasFaturaImpressa.CaixaPostal,
        component: CaixaPostalComponent,
        data: {
            breadcrumb: {
                skip: true,
            }
        }

    },
    {
        path: SubRotasFaturaImpressa.ContaContrato,
        component: ContaContratoComponent,
        data: {
            breadcrumb: {
                skip: true,
            }
        }
    },
    {
        path: SubRotasFaturaImpressa.ConfirmarDados,
        component: ConfirmarDadosComponent,
        data: {
            breadcrumb: {
                skip: true,
            }
        },
        resolve: {
            // taxaEntrega: TaxaEntregaAlternativaResolver,
            // dadosEntregaFatura : ConfirmarDadosEntregaAlternativaResolver
        }
    },
    {
        path: 'solicitacao-enviada',
        loadChildren: () => import('../../../solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } }
    },
    {
        path: '**',
        loadChildren: () => import('app/modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FaturaImpressaRoutingModule { }