import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { CardAlertaModule } from "app/shared/components/cards/alertas/alertas.module";
import { CardFaturaInfoModule } from "app/shared/components/cards/fatura-info/fatura-info.module";
import { ConsumptionChartModule } from "app/shared/components/consumption-chart/consumption-chart.module";
import { PaginationComponentModule } from "app/shared/components/pagination/pagination.module";
import { NaoPossuiImovelModule } from "app/shared/pages/avisos/nao-possui-imovel/nao-possui-imovel.module";
import { HomeComponent } from "./pages/home/home.component";
import { MeusImoveisComponent } from "./pages/meus-imoveis/meus-imoveis.component";

import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { SegundaViaResolver } from "app/core/resolvers/faturas/segunda-via/segunda-via.resolver";
import { InformacoesUCResolver } from "app/core/resolvers/selecao-de-imovel/informacoes-uc/informacoes-uc.resolver";
import { UCsUsuariosResolver } from "app/core/resolvers/selecao-de-imovel/ucs-usuario/ucs-usuario.resolver";
import { HomeRoutes } from "app/core/routes/home-route/home.routes";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { TipologiaFaltaEnergiaService } from "app/core/services/falta-de-energia/tipologia-falta-de-energia.service";
import { CardUltimaFaturaModule } from "app/shared/components/card-ultima-fatura/card-ultima-fatura.module";
import { GraficoCosumoHomeModule } from "app/shared/components/grafico-cosumo-home/grafico-cosumo-home.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { SnackbarServiceModule } from "app/shared/components/snackbar/snackbar.service.module";
import { SpinnerModule } from "app/shared/components/spinner/spinner.module";
import { HomeAvisosComponent } from './components/home-avisos/home-avisos.component';
import { HomeRouteComponent } from "./home.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";
import { ServicosMaisUtilizadosComponent } from './components/servicos-mais-utilizados/servicos-mais-utilizados.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeUcInfoComponent } from './components/home-uc-info/home-uc-info.component';
import { PersonalizeFaturaComponentModule } from "../../shared/components/personalize-fatura/personalize-fatura.module";

@NgModule({
    declarations: [
        HomeComponent,
        MeusImoveisComponent,
        HomeRouteComponent,
        HomeAvisosComponent,
        ServicosMaisUtilizadosComponent,
        HomeBannerComponent,
        HomeUcInfoComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(HomeRoutes),
        RouterModule,
        PaginationComponentModule,
        ConsumptionChartModule,
        IvyCarouselModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        CardUltimaFaturaModule,
        CardFaturaInfoModule,
        CardAlertaModule,
        MatButtonModule,
        NaoPossuiImovelModule,
        GraficoCosumoHomeModule,
        MatCardModule,
        SpinnerModule,
        SnackbarServiceModule,
        MatDividerModule,
        NeoButtonModule,
        MatProgressSpinnerModule,
        ExibirAvisoModule,
        PersonalizeFaturaComponentModule,
    ],
    providers: [
        UCsUsuariosResolver,
        InformacoesUCResolver,
        SegundaViaResolver,
        FaltaDeEnergiaService,
        TipologiaFaltaEnergiaService
    ]
})

export class HomeModule { }
