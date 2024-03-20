import { Routes } from "@angular/router";
import { SubRotasDebitoAutomatico } from "app/core/models/debito-automatico/sub-rota-debito-automatico";
import { DebitoAutomaticoResolver } from "app/core/resolvers/debito-automatico/debito-automatico.resolver";
import {
    DebitoAutomaticoAComponent
} from "app/modules/servicos/pages/debito-automatico/pages/debito-automatico-a/debito-automatico-a.component";
import {
    DebitoAutomaticoCadastrarComponent
} from "app/modules/servicos/pages/debito-automatico/pages/debito-automatico-cadastrar/debito-automatico-cadastrar.component";
import {
    DebitoAutomaticoConfirmarDadosComponent
} from "app/modules/servicos/pages/debito-automatico/pages/debito-automatico-confirmar-dados/debito-automatico-confirmar-dados.component";
import {
    DebitoAutomaticoComponent
} from "app/modules/servicos/pages/debito-automatico/pages/debito-automatico/debito-automatico.component";
import {
    DebitoAutomaticoInicioComponent
} from "../../../../modules/servicos/pages/debito-automatico/pages/debito-automatico-inicio/debito-automatico-inicio.component";
import {
    DebitoAutomaticoCadastradoComponent
} from "../../../../modules/servicos/pages/debito-automatico/pages/debito-automatico-cadastrado/debito-automatico-cadastrado.component";
import { FluxoDebitoAutomaticoGuard } from "../../../guards/debito-automatico-guard/fluxo-debito-automatico.guard";

export const DebitoAutomaticoRoutes: Routes = [
    {
        path: "",
        component: DebitoAutomaticoComponent,
        data: { breadcrumb: "Débito Automático" },
        children: [
            {
                path: "",
                component: DebitoAutomaticoCadastradoComponent,
                resolve: {
                    dadosBancario: DebitoAutomaticoResolver
                }
            },
            {
                path: SubRotasDebitoAutomatico.InformacoesDePagamento,
                component: DebitoAutomaticoInicioComponent,
                data: { breadcrumb: { skip: true } }
            }
        ]
    },
    {
        path: SubRotasDebitoAutomatico.CadastrarDebitoAutomatico,
        component: DebitoAutomaticoCadastrarComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FluxoDebitoAutomaticoGuard]
    },
    {
        path: SubRotasDebitoAutomatico.ConfirmarDebitoAutomatico,
        component: DebitoAutomaticoConfirmarDadosComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FluxoDebitoAutomaticoGuard]
    },
    {
        path: SubRotasDebitoAutomatico.DebitoAutomaticoGrupoA,
        component: DebitoAutomaticoAComponent,
        data: { breadcrumb: { skip: true } }
    },
    {
        path: 'solicitacao-enviada',
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } }
    },
]
