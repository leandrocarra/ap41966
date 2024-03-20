import { Routes } from "@angular/router";
import { SubRotasMultiloginCadastro } from "app/core/models/multilogin/multilogin-cadastro";
import { MultiloginCadastroImobiliarioComponent } from "app/modules/multilogin-cadastro-imobiliario/multilogin-cadastro-imobiliario.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const MultiloginCadastroImobiliarioRoutes: Routes = [
    {
        path: '',
        component: MultiloginCadastroImobiliarioComponent,
    },
    {
        path: SubRotasMultiloginCadastro.Avisos,
        component: ExibirAvisoComponent,
    }
]
