import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EscolhaTipoFaturaGuard } from "app/core/guards/escolha-tipo-fatura/escolha-tipo-fatura.guard";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";
import { EscolhaTipoFaturaComponent } from "./escolha-tipo-fatura.component";



export const routes: Routes = [
    {
        path: "",
        component: EscolhaTipoFaturaComponent,
        data: {
            breadcrumb: {
                skip: true,
            }
        },
        canActivate: [
            EscolhaTipoFaturaGuard,
        ]
    },
    {
        path: "aviso",
        component: ExibirAvisoComponent,
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

export class EscolhaTipoFaturaRoutingModule { }