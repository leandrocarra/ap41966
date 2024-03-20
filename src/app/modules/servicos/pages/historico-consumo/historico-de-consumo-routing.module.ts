import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoricoDeConsumoGuard } from "app/core/guards/historico-de-consumo-guard/historico-de-consumo.guard";
import { SubRotasHistoricoDeConsumo } from "app/core/models/hitorico-de-consumo/sub-rotas-historico-de-consumo";
import { SegundaViaResolver } from "app/core/resolvers/faturas/segunda-via/segunda-via.resolver";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";
import { HistoricoConsumoAComponent } from "./pages/historico-consumo-a/historico-consumo-a.component";
import { HistoricoConsumoComponent } from "./pages/historico-consumo/historico-consumo.component";

export const routes: Routes = [
    {
        path: SubRotasHistoricoDeConsumo.GrupoB,
        component: HistoricoConsumoComponent,
        data: { breadcrumb: "Histórico de Consumo" },
        canActivate: [HistoricoDeConsumoGuard],
        resolve: {
            faturas: SegundaViaResolver
        }
    },
    {
        path: SubRotasHistoricoDeConsumo.GrupoASE,
        component: HistoricoConsumoAComponent,
        data: {
            breadcrumb: {
                skip: true,
            }
        },
        resolve: {
            faturas: SegundaViaResolver
        }
    },
    {
        path: SubRotasHistoricoDeConsumo.Aviso,
        component: ExibirAvisoComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HistoricoDeConsumoRoutingModule { }