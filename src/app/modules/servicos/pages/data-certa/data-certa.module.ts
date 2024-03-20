import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from "@angular/router";
import { DialogAtencaoComponent } from 'app/modules/servicos/pages/data-certa/components/dialog-atencao/dialog-atencao.component';
import { DadosImovelLigacaoModule } from 'app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { ExibirAvisoModule } from 'app/shared/pages/exibir-aviso/exibir-aviso.module';
import { DataCertaRoutes } from "../../../../core/routes/home-route/home-child-routes/data-certa.routes";
import { AlterarDataCertaComponent } from './pages/alterar-data-certa/alterar-data-certa.component';
import { DataCertaComponent } from './pages/data-certa/data-certa.component';


@NgModule({
    declarations: [
        DataCertaComponent,
        AlterarDataCertaComponent,
        DialogAtencaoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DataCertaRoutes),
        DadosImovelLigacaoModule,
        NeoButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        FormsModule,
        ExibirAvisoModule
    ],
    providers: [
        DatePipe
    ]
})
export class DataCertaModule {
}
