import { Routes } from "@angular/router";
import { SubRotasMultiloginCadastro } from "app/core/models/multilogin/multilogin-cadastro";
import { MultiloginCadastroCredenciadoComponent } from "app/modules/multilogin-cadastro-credenciado/multilogin-cadastro-credenciado.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const MultiloginCadastroCredenciadoRoutes: Routes = [
    {
        path: '',
        component: MultiloginCadastroCredenciadoComponent,
    },
    {
        path: SubRotasMultiloginCadastro.Avisos,
        component: ExibirAvisoComponent,
    }
]
