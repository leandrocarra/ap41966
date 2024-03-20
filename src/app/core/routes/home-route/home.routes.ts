import { Routes } from "@angular/router";

import { Servicos } from "app/core/enums/servicos";
import { AuthGuard } from "app/core/guards/auth.guard";
import { MultiloginCompartilharAcessoGuard } from "app/core/guards/multilogin-compartilhar-acesso-guard/multilogin-compartilhar-acesso.guard";
import { SubRotasHome } from "app/core/models/home/sub-rotas-home";
import { FaturasResolver } from "../../resolvers/faturas/home/faturas.resolver";
import { HomeHistoricoConsumoResolver } from "app/core/resolvers/faturas/home/home-historico-consumo.resolver";
import { UCsUsuariosResolver } from "app/core/resolvers/selecao-de-imovel/ucs-usuario/ucs-usuario.resolver";
import { HomeRouteComponent } from "app/modules/home/home.component";
import { HomeComponent } from "app/modules/home/pages/home/home.component";
import { MeusImoveisComponent } from "app/modules/home/pages/meus-imoveis/meus-imoveis.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const HomeRoutes: Routes = [
    {
        path: "",
        component: HomeRouteComponent,
        data: {
            breadcrumb: {
                disable: true,
                label: 'Home'
            }
        },
        children: [
            {
                path: '',
                component: HomeComponent,
                resolve: {
                    faturas: FaturasResolver,
                    consumos: HomeHistoricoConsumoResolver
                },
                data: {
                    origin: 'Home'
                }
            },
            {
                path: SubRotasHome.MinhasUnidadesConsumidoras,
                component: MeusImoveisComponent,
                resolve: {
                    meusImoveis: UCsUsuariosResolver
                }
            },
            {
                path: Servicos.multiloginAcesso,
                loadChildren: () => import('../../../modules/multilogin-acesso/multilogin-acesso.module').then(m => m.MultiloginAcessoModule),
            },
            {
                path: Servicos.multiloginCadastro,
                loadChildren: () => import('../../../modules/servicos/pages/multilogin-cadastro/multilogin-cadastro.module').then(m => m.MultiloginCadastroModule)
            },
            {
                path: Servicos.compartilharAcesso,
                loadChildren: () => import('../../../modules/servicos/pages/multilogin-compartilhar-acesso/multilogin-compartilhar-acesso.module').then(m => m.MultiloginCompartilharAcessoModule),
                canActivate: [MultiloginCompartilharAcessoGuard]
            },
            {
                path: 'servicos',
                loadChildren: () => import('../../../modules/servicos/servicos.module').then(m => m.ServicosModule),
                canActivate: [AuthGuard],
                canLoad: [AuthGuard]
            },
            {
                path: 'minha-conta',
                loadChildren: () => import('../../../modules/minha-conta/minha-conta.module').then(m => m.MinhaContaModule),
                canActivate: [AuthGuard],
                canLoad: [AuthGuard]
            },
        ]
    },
    {
        path: 'aviso',
        component: ExibirAvisoComponent,
    },
];
