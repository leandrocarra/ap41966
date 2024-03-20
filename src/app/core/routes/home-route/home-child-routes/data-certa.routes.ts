import { Routes } from "@angular/router";
import { SubRotasDataCerta } from "app/core/models/data-certa/data-certa";
import { DataCertaResolver } from "app/core/resolvers/data-certa/data-certa.resolver";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";
import { AlterarDataCertaComponent } from "../../../../modules/servicos/pages/data-certa/pages/alterar-data-certa/alterar-data-certa.component";
import { DataCertaComponent } from "../../../../modules/servicos/pages/data-certa/pages/data-certa/data-certa.component";
import { Servicos } from "../../../enums/servicos";

export const DataCertaRoutes: Routes = [
    {
        path: '',
        component: DataCertaComponent,
        data: { breadcrumb: "Data de Vencimento" },
        resolve: { dados: DataCertaResolver }
    },
    {
        path: SubRotasDataCerta.alterar,
        component: AlterarDataCertaComponent,
        data: { breadcrumb: { skip: true } }
    },
    {
        path: SubRotasDataCerta.aviso,
        component: ExibirAvisoComponent,
        data: { breadcrumb: { skip: true } }
    },
    {
        path: Servicos.solicitacaoEnviada,
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } }
    }
];
