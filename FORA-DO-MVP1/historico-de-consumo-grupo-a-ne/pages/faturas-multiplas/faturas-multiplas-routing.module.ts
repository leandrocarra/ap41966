import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { FaturasMultiplasComponent } from './pages/faturas-multiplas/faturas-multiplas.component';
import { CadastrarFaturasComponent } from './pages/cadastrar-faturas/cadastrar-faturas.component';
import { MultiCadastradasComponent } from './pages/multi-cadastradas/multi-cadastradas.component';
import { FaturaMultiplaGrupoComponent } from './pages/fatura-multipla-grupo/fatura-multipla-grupo.component';
import { EditarGrupoComponent } from './pages/editar-grupo/editar-grupo.component';
import { AlterarEmailComponent } from './pages/alterar-email/alterar-email.component';

const routes: Routes = [
    {
        path: '',
        component: FaturasMultiplasComponent,
        children: [
            {
                path: 'cadastrar-faturas',
                component: CadastrarFaturasComponent
            },
            {
                path: 'cadastradas',
                component: MultiCadastradasComponent
            },
            {
                path: 'fatura-multipla-grupo',
                component: FaturaMultiplaGrupoComponent
            },
            {
                path: 'editar-grupo',
                component: EditarGrupoComponent,
            },
            {
                path: 'alterar-email',
                component: AlterarEmailComponent
            }
        ]
    }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FaturasMultiplasRoutingModule { }