import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "app/shared/components/accordion/accordion.module";
import { CardUltimaFaturaModule } from "app/shared/components/card-ultima-fatura/card-ultima-fatura.module";
import { CardAlertaModule } from "app/shared/components/cards/alertas/alertas.module";
import { FilterscomponentModule } from "app/shared/components/filters/filters.module";
import { PaginationComponentModule } from "app/shared/components/pagination/pagination.module";
import { PersonalizeFaturaComponentModule } from "app/shared/components/personalize-fatura/personalize-fatura.module";
import { SnackbarServiceModule } from "app/shared/components/snackbar/snackbar.service.module";
import { ConsultarDebitosRoutingModule } from "./consultar-debitos-routing.module";
import { ConsultarDebitosComponent } from "./pages/consultar-debitos/consultar-debitos.component";

@NgModule({
    declarations: [
        ConsultarDebitosComponent
    ],
    imports: [
        CommonModule,
        ConsultarDebitosRoutingModule,
        CardAlertaModule,
        CardUltimaFaturaModule,
        PersonalizeFaturaComponentModule,
        FilterscomponentModule,
        AccordionModule,
        PaginationComponentModule,
        SnackbarServiceModule,
    ]
})

export class ConsultarDebitosModule {}