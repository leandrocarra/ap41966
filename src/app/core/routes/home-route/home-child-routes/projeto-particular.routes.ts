import { ProjetoParticularGuard } from './../../../guards/projeto-particular-guard/projeto-particular.guard';
import { FormularioProjetoParticularComponent } from './../../../../modules/servicos/pages/projeto-particular/pages/formulario-projeto-particular/formulario-projeto-particular.component';
import { ProjetoParticularComponent } from './../../../../modules/servicos/pages/projeto-particular/pages/projeto-particular/projeto-particular.component';
import { Routes } from '@angular/router';
import { Servicos } from 'app/core/enums/servicos';

export const ProjetoParticularRoutes: Routes = [
    {
        path: "",
        redirectTo: Servicos.projetoParticularSolicitarAnalise,
    },
    {
        path: Servicos.projetoParticularSolicitarAnalise,
        component: ProjetoParticularComponent,
        data: { breadcrumb: {skip: true}}
    },
    {
        path: Servicos.projetoParticularFormulario,
        component: FormularioProjetoParticularComponent,
        canActivate: [ProjetoParticularGuard],
        data: { breadcrumb: {skip: true}}
    },
    {
        path: Servicos.solicitacaoEnviada,
        loadChildren: () => import('../../../../modules/solicitacao-enviada/solicitacao-enviada.module').then(m => m.SolicitacaoEnviadaModule),
        canActivate: [ProjetoParticularGuard]
    }

]
