import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AccordionModule } from "app/shared/components/accordion/accordion.module";
import { AccordionHistoricoModule } from "app/shared/components/accordion-historico/accordion-historico.module";
import { AlertaConsumoModule } from "app/shared/components/cards/alerta-consumo/alerta-consumo.module";
import { ConsumptionChartModule } from "app/shared/components/consumption-chart/consumption-chart.module";
import { FilterscomponentModule } from "app/shared/components/filters/filters.module";
import { FiltersHistoricocomponentModule } from "app/shared/components/filters-historico/filters-historico.module";
import { GraficoCosumoModule } from "app/shared/components/grafico-cosumo/grafico-cosumo.module";
import { PaginationComponentModule } from "app/shared/components/pagination/pagination.module";
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HistoricoDeConsumoRoutingModule } from "./historico-de-consumo-routing.module";
import { HistoricoConsumoAComponent } from "./pages/historico-consumo-a/historico-consumo-a.component";
import { HistoricoConsumoComponent } from "./pages/historico-consumo/historico-consumo.component";


@NgModule({
    declarations: [
        HistoricoConsumoComponent,
        HistoricoConsumoAComponent
    ],
    imports: [
        CommonModule,
        HistoricoDeConsumoRoutingModule,
        MatCardModule,
        ConsumptionChartModule,
        MatIconModule,
        AccordionModule,
        FilterscomponentModule,
        FiltersHistoricocomponentModule,
        PaginationComponentModule,
        AccordionHistoricoModule,
        BreadcrumbModule,
        MatButtonModule,
        MatTooltipModule,
        GraficoCosumoModule,
        AlertaConsumoModule,
        MatDividerModule
    ]
})

export class HistoricoDeConsumoModule { }
