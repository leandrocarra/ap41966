import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { DebitoAutomaticoRoutes } from "app/core/routes/home-route/home-child-routes/debito-automatico.routes";
import { ProblemaRegistradoModule } from "app/shared/components/cards/problema-registrado/problema-registrado.module";
import { CustomMatErrorModule } from "app/shared/components/custom-mat-error/custom-mat-error.module";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { ToolTipComponentModule } from "app/shared/components/tooltip/tooltip.module";
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { DialogPreRequisitosComponent } from "./components/dialog-pre-requisitos/dialog-pre-requisitos.component";
import { DebitoAutomaticoAComponent } from "./pages/debito-automatico-a/debito-automatico-a.component";
import { DebitoAutomaticoCadastradoComponent } from './pages/debito-automatico-cadastrado/debito-automatico-cadastrado.component';
import { DebitoAutomaticoCadastrarComponent } from "./pages/debito-automatico-cadastrar/debito-automatico-cadastrar.component";
import { DebitoAutomaticoConfirmarDadosComponent } from "./pages/debito-automatico-confirmar-dados/debito-automatico-confirmar-dados.component";
import { DebitoAutomaticoInicioComponent } from './pages/debito-automatico-inicio/debito-automatico-inicio.component';
import { DebitoAutomaticoComponent } from "./pages/debito-automatico/debito-automatico.component";
import { TabelaDebitoAutomaticoComponent } from './components/tabela-debito-automatico/tabela-debito-automatico.component';




@NgModule({
    declarations: [
        DebitoAutomaticoComponent,
        DebitoAutomaticoCadastradoComponent,
        DebitoAutomaticoCadastrarComponent,
        DebitoAutomaticoConfirmarDadosComponent,
        DebitoAutomaticoAComponent,
        DialogPreRequisitosComponent,
        DebitoAutomaticoInicioComponent,
        TabelaDebitoAutomaticoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DebitoAutomaticoRoutes),
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        DadosImovelLigacaoModule,
        FormsModule,
        NgxMaskModule,
        ProblemaRegistradoModule,
        NeoButtonModule,
        ToolTipComponentModule,
        ReactiveFormsModule,
        MatIconModule,
        ExibirAvisoModule,
        SharedModule,
        CustomMatErrorModule
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        }
    ]
})

export class DebitoAutomaticoModule { }