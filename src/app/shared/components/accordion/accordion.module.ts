import { CommonModule } from "@angular/common";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { EnviarEmailModule } from "../alerts/enviar-email/enviar-email.module";
import { InternetBankingModule } from "../alerts/internet-banking/internet-banking.module";
import { CodigoDeBarrasModule } from "../cards/codigo-de-barras/codigo-de-barras.module";
import { BaixarSegundaViaModule } from "../faturas/baixar-segunda-via.module";
import { AccordionComponent } from "./accordion.component";
import { ContentAccordionComponent } from "./content-accordion/content-accordion.component";


@NgModule({
    declarations: [
        ContentAccordionComponent,
        AccordionComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterModule,
        EnviarEmailModule,
        InternetBankingModule,
        MatDividerModule,
        BaixarSegundaViaModule,
        CodigoDeBarrasModule
    ],
    exports: [
        ContentAccordionComponent,
        AccordionComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      ]

})

export class AccordionModule { }

