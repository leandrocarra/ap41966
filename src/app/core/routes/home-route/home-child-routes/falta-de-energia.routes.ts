import { Routes } from "@angular/router";

import { Servicos } from "app/core/enums/servicos";
import { FaltaDeEnergiaGuard } from "app/core/guards/falta-de-energia-guard/falta-de-energia.guard";
import { SubRotasFaltaDeEnergia } from "app/core/models/falta-de-energia/sub-rotas-falta-de-energia";
import { FaltaDeEnergiaOcorrenciaResolver } from "app/core/resolvers/falta-de-energia/falta-de-energia.resolver";
import { AvisosComponent } from "app/modules/servicos/pages/falta-energia/pages/avisos/avisos.component";
import { ConfiraSeusDadosComponent } from "app/modules/servicos/pages/falta-energia/pages/confira-seus-dados/confira-seus-dados.component";
import { DadosContatoComponent } from "app/modules/servicos/pages/falta-energia/pages/dados-contato/dados-contato.component";
import { DisjuntorFuncionandoComponent } from "app/modules/servicos/pages/falta-energia/pages/disjuntor-funcionando/disjuntor-funcionando.component";
import { FaltaEnergiaComponent } from "app/modules/servicos/pages/falta-energia/pages/falta-energia/falta-energia.component";
import { IluminacaoPublicaComponent } from "app/modules/servicos/pages/falta-energia/pages/iluminacao-publica/iluminacao-publica.component";
import { PassosComponent } from "app/modules/servicos/pages/falta-energia/pages/passos/passos.component";
import { ProblemaComponent } from "app/modules/servicos/pages/falta-energia/pages/problema/problema.component";
import { VerificarDisjuntorComponent } from "app/modules/servicos/pages/falta-energia/pages/verificar-disjuntor/verificar-disjuntor.component";
import { ExibirAvisoComponent } from "app/shared/pages/exibir-aviso/exibir-aviso.component";

export const FaltaDeEnergiaRoutes: Routes = [
    {
        path: SubRotasFaltaDeEnergia.FaltaDeEnergia,
        component: FaltaEnergiaComponent,
        data: { breadcrumb: "Falta de Energia" },
        resolve: { ocorrencia: FaltaDeEnergiaOcorrenciaResolver }
    },
    {
        path: SubRotasFaltaDeEnergia.VerificarDisjuntor,
        component: VerificarDisjuntorComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]

    },
    {
        path: SubRotasFaltaDeEnergia.DisjuntorFuncionando,
        component: DisjuntorFuncionandoComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.Avisos,
        component: AvisosComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.ConfiraSeusDados,
        component: ConfiraSeusDadosComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.DadosContato,
        component: DadosContatoComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.IluminacaoPublica,
        component: IluminacaoPublicaComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.Passos,
        component: PassosComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.Problema,
        component: ProblemaComponent,
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: Servicos.solicitacaoEnviada,
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } },
        canActivate: [FaltaDeEnergiaGuard]
    },
    {
        path: SubRotasFaltaDeEnergia.ExibirAviso,
        component: ExibirAvisoComponent,
        canActivate: [FaltaDeEnergiaGuard]
    }
]
