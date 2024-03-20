import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SegundaViaResolver } from "app/core/resolvers/faturas/segunda-via/segunda-via.resolver";
import { ConsultarDebitosComponent } from "./pages/consultar-debitos/consultar-debitos.component";

const routes: Routes = [
    {
        path: "",
        component: ConsultarDebitosComponent,
        data: { breadcrumb: "Faturas e 2ª via de fatura" },
        resolve: {
            faturas: SegundaViaResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConsultarDebitosRoutingModule { }