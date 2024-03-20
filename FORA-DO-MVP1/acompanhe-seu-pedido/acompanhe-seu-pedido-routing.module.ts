import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcompanheSeuPedidoComponent } from "./pages/acompanhe-seu-pedido/acompanhe-seu-pedido.component";

const routes: Routes = [
    {
        path: "",
        component: AcompanheSeuPedidoComponent,
        data: { breadcrumb: { label: "Suas Solicitações" } },
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AcompanheSeuPedidoRoutingModule { }