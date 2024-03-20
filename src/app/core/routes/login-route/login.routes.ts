import { Routes } from "@angular/router";
import { Servicos } from "app/core/enums/servicos";
import { LoginComponent } from "app/modules/login/login.component";
import { PaginaInicialComponent } from "app/modules/login/pages/pagina-inicial/pagina-inicial.component";

export const LoginRoutes: Routes = [
    {
        path: "",
        component: LoginComponent,
        children: [
            {
                path: '',
                component: PaginaInicialComponent
            },
            {
                path: "cadastro",
                loadChildren: () => import('../../../modules/cadastro/cadastro.module').then(m => m.CadastroModule)
            },
            {
                path: "recuperar-senha",
                loadChildren: () => import('../../../modules/recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaModule)
            },
            {
                path: Servicos.segundaViaLogin,
                loadChildren: () => import('../../../modules/servicos/pages/segunda-via-login/segunda-via-login.module').then(m => m.SegundaViaLoginModule)
            },
            {
                path: Servicos.multiloginCadastroImobiliaria,
                loadChildren: () => import('../../../modules/multilogin-cadastro-imobiliario/multilogin-cadastro-imobiliario.module').then(m => m.MultiloginCadastroImobiliarioModule),
            },
            {
                path: Servicos.multiloginCadastroCredenciado,
                loadChildren: () => import('../../../modules/multilogin-cadastro-credenciado/multilogin-cadastro-credenciado.module').then(m => m.MultiloginCadastroCredenciadoModule),
            }
        ]
    }
];
