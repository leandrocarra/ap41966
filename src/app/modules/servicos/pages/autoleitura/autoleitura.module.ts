import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AnexosComponentModule } from "app/shared/components/anexos/anexos.module";
import { ProblemaRegistradoModule } from "app/shared/components/cards/problema-registrado/problema-registrado.module";
import { ConsumptionChartModule } from "app/shared/components/consumption-chart/consumption-chart.module";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { AutoleituraComponent } from "./pages/autoleitura/autoleitura.component";
import { InformarAutoleituraComponent } from './pages/informar-autoleitura/informar-autoleitura.component';
import { ConfirmarAutoleituraComponent } from './pages/confirmar-autoleitura/confirmar-autoleitura.component';
import { GraficoCosumoModule } from "app/shared/components/grafico-cosumo/grafico-cosumo.module";
import { DialogTermoDeUsoModule } from "app/shared/components/dialog-termo-de-uso/dialog-termo-de-uso.module";
import { AnexarFotoAutoleituraComponent } from './pages/anexar-foto-autoleitura/anexar-foto-autoleitura.component';
import { BoxFileModule } from "app/shared/components/box-file/box-file.module";
import { AttachedFileModule } from "app/shared/components/attached-file/attached-file.module";
import { AvisoMediaAutoleituraComponent } from './components/aviso-media-autoleitura/aviso-media-autoleitura.component';
import { GraficoAutoleituraModule } from "app/shared/components/grafico-autoleitura/grafico-autoleitura.module";
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";
import { RouterModule } from "@angular/router";
import { AutoleituraRoutes } from "app/core/routes/home-route/home-child-routes/autoleitura.routes";
import { NgxMaskModule } from "ngx-mask";
import { DialogConfirmarAutoleituraComponent } from './components/dialog-confirmar-autoleitura/dialog-confirmar-autoleitura.component';
import { CustomMatErrorModule } from "app/shared/components/custom-mat-error/custom-mat-error.module";

@NgModule({
    declarations: [
        AutoleituraComponent,
        InformarAutoleituraComponent,
        ConfirmarAutoleituraComponent,
        AnexarFotoAutoleituraComponent,
        AvisoMediaAutoleituraComponent,
        DialogConfirmarAutoleituraComponent,
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
        DadosImovelLigacaoModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatIconModule,
        ProblemaRegistradoModule,
        ConsumptionChartModule,
        MatCheckboxModule,
        FormsModule,
        AnexosComponentModule,
        GraficoCosumoModule,
        ReactiveFormsModule,
        DialogTermoDeUsoModule,
        BoxFileModule,
        AttachedFileModule,
        ExibirAvisoModule,
        GraficoAutoleituraModule,
        NgxMaskModule,
        CustomMatErrorModule,
        RouterModule.forChild(AutoleituraRoutes)

    ]
})

export class AutoLeituraModule { }
