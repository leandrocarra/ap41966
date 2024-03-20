import { Routes } from '@angular/router';
import { SubRotasAutoleitura } from 'app/core/models/autoleitura/autoleitura';
import { AutoleituraResolver } from 'app/core/resolvers/autoleitura/autoleitura.resolver';
import { AnexarFotoAutoleituraComponent } from 'app/modules/servicos/pages/autoleitura/pages/anexar-foto-autoleitura/anexar-foto-autoleitura.component';
import { AutoleituraComponent } from 'app/modules/servicos/pages/autoleitura/pages/autoleitura/autoleitura.component';
import { ConfirmarAutoleituraComponent } from 'app/modules/servicos/pages/autoleitura/pages/confirmar-autoleitura/confirmar-autoleitura.component';
import { InformarAutoleituraComponent } from 'app/modules/servicos/pages/autoleitura/pages/informar-autoleitura/informar-autoleitura.component';
import { ExibirAvisoComponent } from 'app/shared/pages/exibir-aviso/exibir-aviso.component';

export const AutoleituraRoutes: Routes = [
    {
        path: "",
        component: AutoleituraComponent,
        data: { breadcrumb: { label: "Autoleitura" } },
        resolve: {
            leituras: AutoleituraResolver
        }
    },
    {
        path: SubRotasAutoleitura.InformarAutoleitura,
        component: InformarAutoleituraComponent,
        data: { breadcrumb: { skip: true } },
    },
    {
        path: SubRotasAutoleitura.ConfirmarAutoleitura,
        component: ConfirmarAutoleituraComponent,
        data: { breadcrumb: { skip: true } },
    },
    {
        path: SubRotasAutoleitura.AnexarFoto,
        component: AnexarFotoAutoleituraComponent,
        data: { breadcrumb: { skip: true } },
    },
    {
        path: SubRotasAutoleitura.SolicitacaoEnviada,
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } }
    },
    {
        path: 'aviso',
        component: ExibirAvisoComponent,
    },
    {
        path: '**',
        loadChildren: () => import('app/modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
    }
]
