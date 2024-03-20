import { Routes } from '@angular/router';
import { Servicos } from 'app/core/enums/servicos';
import { ReligacaoGuard } from 'app/core/guards/religacao-guard/religacao.guard';
import { SubRotasReligacao } from 'app/core/models/religacao/sub-rotas-religacao';
import { ReligacaoResolver } from 'app/core/resolvers/religacao/religacao.resolver';
import { ConfirmacaoComponent } from 'app/modules/servicos/pages/religacao/pages/confirmacao/confirmacao.component';
import { InformarDadosComponent } from 'app/modules/servicos/pages/religacao/pages/informar-dados/informar-dados.component';
import { PagarComPixComponent } from 'app/modules/servicos/pages/religacao/pages/pagar-com-pix/pagar-com-pix.component';
import { ReligacaoFaturasComponent } from 'app/modules/servicos/pages/religacao/pages/religacao-faturas/religacao-faturas.component';
import { ReligacaoComponent } from 'app/modules/servicos/pages/religacao/pages/religacao/religacao.component';
import { ExibirAvisoComponent } from 'app/shared/pages/exibir-aviso/exibir-aviso.component';


export const ReligacaoRoutes: Routes = [
    {
        path: "",
        component: ReligacaoComponent,
        data: { breadcrumb: { label: "Religação"} },
        canActivate: [ReligacaoGuard],
        canLoad: [ReligacaoGuard],
        resolve: { validarReligacao: ReligacaoResolver
        }
    },
    {
        path: SubRotasReligacao.InformarDados,
        component: InformarDadosComponent,
        data: { breadcrumb: { skip: true, alias: 'informar-dados' } },
        canActivate: [ReligacaoGuard],
        canLoad: [ReligacaoGuard]
    },

    {
        path: SubRotasReligacao.Confirmacao,
        component: ConfirmacaoComponent,
        data: { breadcrumb: { skip: true, alias: 'confirmacao' } },
        canActivate: [ReligacaoGuard],
        canLoad: [ReligacaoGuard]
    },
    {
        path: SubRotasReligacao.PagarComPix,
        component: PagarComPixComponent,
        data: { breadcrumb: { skip: true, alias: 'pagar-com-pix' } },
        canActivate: [ReligacaoGuard],
        canLoad: [ReligacaoGuard]
    },
    {
        path: SubRotasReligacao.Faturas,
        component: ReligacaoFaturasComponent,
        data: { breadcrumb: { skip: true, alias: 'religacao-fatura' } },
        canActivate: [ReligacaoGuard],
        canLoad: [ReligacaoGuard]
    },

    {
        path: Servicos.solicitacaoEnviada,
        loadChildren: () => import("../../../../modules/solicitacao-enviada/solicitacao-enviada.module").then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } },
    },
]
