import { Routes } from "@angular/router";
import { MultiloginAtendCredenciadoGuard } from "app/core/guards/multilogin-atend-credenciado-guard/multilogin-atend-credenciado.guard";
import { SubRotasMultiloginAcesso } from "app/core/models/multilogin/multilogin-acesso";
import { MultiloginListarClientesResolver } from "app/core/resolvers/multilogin-acesso/multilogin-listar-clientes.resolver";
import { MultiloginSelecaoDePerfilResolver } from "app/core/resolvers/multilogin-acesso/multilogin-selecao-de-perfil.resolver";
import { MultiloginAcessoComponent } from "app/modules/multilogin-acesso/multilogin-acesso.component";
import { MultiloginPesquisarClienteComponent } from "app/modules/multilogin-acesso/pages/multilogin-pesquisar-cliente/multilogin-pesquisar-cliente.component";
import { MultiloginSelecionarClienteComponent } from "app/modules/multilogin-acesso/pages/multilogin-selecao-cliente/multilogin-selecionar-cliente.component";
import { MultiloginSelecaoPerfisComponent } from "app/modules/multilogin-acesso/pages/multilogin-selecao-perfis/multilogin-selecao-perfis.component";


export const MultiloginAcessoRoutes: Routes = [
    {
        path: "",
        component: MultiloginAcessoComponent,
        children: [
            {
                path: SubRotasMultiloginAcesso.SelecaoDePerfil,
                component: MultiloginSelecaoPerfisComponent,
                resolve: {
                    recebidos: MultiloginSelecaoDePerfilResolver
                }

            },
            {
                path: SubRotasMultiloginAcesso.PesquisarCliente,
                component: MultiloginPesquisarClienteComponent,
                canActivate: [MultiloginAtendCredenciadoGuard],
                canLoad: [MultiloginAtendCredenciadoGuard]
            },
            {
                path: SubRotasMultiloginAcesso.SelecaoDeCliente,
                component: MultiloginSelecionarClienteComponent,
                resolve: {
                    recebidos: MultiloginListarClientesResolver
                }
            }
        ]
    }
]
