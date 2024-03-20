import { Routes } from "@angular/router";
import { SubRotasMultiloginCadastro } from "app/core/models/multilogin/multilogin-cadastro";
import { MultiloginCompartilharAcessoResolver } from "app/core/resolvers/multilogin-compartilhar-acesso/multilogin-compartilhar-acesso.resolver";
import { MultiloginCompartilharAcessoComponent } from "app/modules/servicos/pages/multilogin-compartilhar-acesso/multilogin-compartilhar-acesso.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const MultiloginCompartilharAcessoRoutes: Routes = [
    {
        path: "",
        component: MultiloginCompartilharAcessoComponent,
        data: { breadcrumb: { label: "Compartilhar Acesso" } },
        resolve: {
            vinculos: MultiloginCompartilharAcessoResolver
        }
    },
    {
        path: SubRotasMultiloginCadastro.Avisos,
        component: ExibirAvisoComponent,
    }
]
