import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaturaBraileComponent } from "./pages/cadastrar-fatura-braile/fatura-braile.component";
import { DescadastrarFaturaBraileComponent } from "./pages/descadastrar-fatura-braile/descadastrar-fatura-braile.component";
import { SolicitacaoEnviadaComponent } from "./pages/solicitacao-enviada/solicitacao-enviada.component";

const routes: Routes = [
    {
        path: "",
        component: FaturaBraileComponent,
        data: { breadcrumb: "Fatura em Braile" }
    },
    {
        path: "solicitacao-enviada",
        component: SolicitacaoEnviadaComponent,
    },
    {
        path: "descadastrar-fatura-braile",
        component: DescadastrarFaturaBraileComponent,
        data: { breadcrumb: "Descadastrar Fatura em Braile" }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FaturaBraileRoutingModule {}