import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { NgxMaskModule } from "ngx-mask";
import { PersonalizeFaturaComponent } from "./personalize-fatura.component";

@NgModule({
    declarations: [
        PersonalizeFaturaComponent
    ],
    imports: [
        CommonModule,
        MatDividerModule,
        MatCardModule,
        RouterModule,
        MatIconModule,
        MatListModule,
        NgxMaskModule
    ],
    exports: [
        PersonalizeFaturaComponent,
    ]

})

export class PersonalizeFaturaComponentModule { }

