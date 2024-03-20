import { Routes } from '@angular/router';

import { Servicos } from 'app/core/enums/servicos';
import { SubRotasFaturaDigital } from 'app/core/models/fatura-digital/sub-rotas-fatura-digital';
import { AlterarFaturaDigitalComponent } from 'app/modules/servicos/pages/fatura-digital/pages/alterar-fatura-digital/alterar-fatura-digital.component';
import { CadastrarFaturaDigitalComponent } from 'app/modules/servicos/pages/fatura-digital/pages/cadastrar-fatura-digital/cadastrar-fatura-digital.component';
import { ConfirmarFaturaDigitalComponent } from 'app/modules/servicos/pages/fatura-digital/pages/confirmar-fatura-digital/confirmar-fatura-digital.component';
import { DescadastrarFaturaDigitalComponent } from 'app/modules/servicos/pages/fatura-digital/pages/descadastrar-fatura-digital/descadastrar-fatura-digital.component';
import { ErroFaturaDigitalComponent } from 'app/modules/servicos/pages/fatura-digital/pages/erro-fatura-digital/erro-fatura-digital.component';
import { OpcoesFaturaDigitalComponent } from 'app/modules/servicos/pages/fatura-digital/pages/opcoes-fatura-digital/opcoes-fatura-digital.component';

export const FaturaDigitalRoutes: Routes = [

    {
        path: '',
        component: CadastrarFaturaDigitalComponent,
        data: { breadcrumb: "Fatura Digital" }
    },
    {
        path: SubRotasFaturaDigital.opcoesFaturaDigital,
        component: OpcoesFaturaDigitalComponent,
        data: { breadcrumb: { skip: true } }
    },

    {
        path: SubRotasFaturaDigital.alterarFaturaDigital,
        component: AlterarFaturaDigitalComponent,
        data: { breadcrumb: { skip: true } }
    },
    {
        path: SubRotasFaturaDigital.confirmarFaturaDigital,
        component: ConfirmarFaturaDigitalComponent,
        data: { breadcrumb: { skip: true } }
    },
    {
        path: SubRotasFaturaDigital.descadastrarFaturaDigital,
        component: DescadastrarFaturaDigitalComponent,
        data: { breadcrumb: { skip: true } }
    },

    // mensagem de erro
    {
        path: SubRotasFaturaDigital.erroFaturaDigital,
        component: ErroFaturaDigitalComponent,
        data: { breadcrumb: { skip: true } }
    },
    {
        path: Servicos.solicitacaoEnviada,
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        data: { breadcrumb: { skip: true } }
    }
]
