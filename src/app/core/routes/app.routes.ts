import { Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { ClearSessionGuard } from "../guards/clear-session-guard/clear-session.guard";
import { LigacaoNovaSEGuard } from "../guards/ligacao-nova-se.guard/ligacao-nova-se.guard";

export const AppRoutes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full",
    },
    {
        path: "login",
        loadChildren: () => import('../../modules/login/login.module').then(m => m.LoginModule),
        canActivate: [ClearSessionGuard]
    },
    {
        path: "compartilhar-acesso",
        loadChildren: () => import('../../modules/servicos/pages/multilogin-compartilhar-acesso/multilogin-compartilhar-acesso.module').then(m => m.MultiloginCompartilharAcessoModule)
    },
    {
        path: "home",
        loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    {
        path: "ligacao-nova",
        loadChildren: () => import('../../appLN/appLN.module').then(m => m.AppLNModule),
        canActivate: [LigacaoNovaSEGuard, AuthGuard]
    },
    {
        path: "**",
        loadChildren: () => import('../../modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
    }
];
