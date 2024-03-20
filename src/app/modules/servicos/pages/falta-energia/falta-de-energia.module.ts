import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { RouterModule } from "@angular/router";

import { FaltaDeEnergiaRoutes } from "app/core/routes/home-route/home-child-routes/falta-de-energia.routes";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { ProblemaRegistradoModule } from "app/shared/components/cards/problema-registrado/problema-registrado.module";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { AvisosComponent } from "./pages/avisos/avisos.component";
import { ConfiraSeusDadosComponent } from "./pages/confira-seus-dados/confira-seus-dados.component";
import { DadosContatoComponent } from "./pages/dados-contato/dados-contato.component";
import { DisjuntorFuncionandoComponent } from "./pages/disjuntor-funcionando/disjuntor-funcionando.component";
import { FaltaEnergiaComponent } from "./pages/falta-energia/falta-energia.component";
import { IluminacaoPublicaComponent } from "./pages/iluminacao-publica/iluminacao-publica.component";
import { PassosComponent } from "./pages/passos/passos.component";
import { ProblemaComponent } from "./pages/problema/problema.component";
import { VerificarDisjuntorComponent } from "./pages/verificar-disjuntor/verificar-disjuntor.component";
import { FaltaDeEnergiaGuard } from "app/core/guards/falta-de-energia-guard/falta-de-energia.guard";

@NgModule({
    declarations: [
        AvisosComponent,
        ConfiraSeusDadosComponent,
        DadosContatoComponent,
        FaltaEnergiaComponent,
        IluminacaoPublicaComponent,
        PassosComponent,
        ProblemaComponent,
        VerificarDisjuntorComponent,
        DisjuntorFuncionandoComponent
    ],
    imports: [
        CommonModule,
        DadosImovelLigacaoModule,
        ProblemaRegistradoModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDividerModule,
        NeoButtonModule,
        SharedModule,
        NgxMaskModule,
        ExibirAvisoModule,
        RouterModule.forChild(FaltaDeEnergiaRoutes)
    ],
    providers: [
        FaltaDeEnergiaService,
        TipologiaFaltaEnergiaService,
        FaltaDeEnergiaGuard
    ]
})

export class FaltaDeEnergiaModule { }
