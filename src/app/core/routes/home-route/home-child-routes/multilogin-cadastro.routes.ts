import { Routes } from "@angular/router";
import { MultiloginCadastroGuard } from "app/core/guards/multilogin-cadastro-guard/multilogin-cadastro.guard";
import { SubRotasMultiloginCadastro } from "app/core/models/multilogin/multilogin-cadastro";
import { MultiloginCadastroComponent } from "app/modules/servicos/pages/multilogin-cadastro/multilogin-cadastro.component";
import { MultiloginCadastrarParceirosComponent } from "app/modules/servicos/pages/multilogin-cadastro/pages/multilogin-cadastrar-parceiros/multilogin-cadastrar-parceiros.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";


export const MultiloginCadastroRoutes: Routes = [
    {
        path: "",
        component: MultiloginCadastroComponent,
        children: [
            {
                path: SubRotasMultiloginCadastro.CadastroDeParceiros,
                component: MultiloginCadastrarParceirosComponent
            },
            {
                path: SubRotasMultiloginCadastro.Imobiliaria,
                loadChildren: () => import('../../../../modules/multilogin-cadastro-imobiliario/multilogin-cadastro-imobiliario.module').then(m => m.MultiloginCadastroImobiliarioModule),
                canActivate: [MultiloginCadastroGuard]
            },
            {
                path: SubRotasMultiloginCadastro.Credenciado,
                loadChildren: () => import('../../../../modules/multilogin-cadastro-credenciado/multilogin-cadastro-credenciado.module').then(m => m.MultiloginCadastroCredenciadoModule),
                canActivate: [MultiloginCadastroGuard]
            },
            {
                path: SubRotasMultiloginCadastro.Avisos,
                component: ExibirAvisoComponent,
            }
        ]
    }
];
