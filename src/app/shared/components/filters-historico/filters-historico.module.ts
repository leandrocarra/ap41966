import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ToolTipComponentModule } from "../tooltip/tooltip.module";
import { FiltersHistoricoComponent } from "./filters-historico.component";

@NgModule({
    declarations: [
        FiltersHistoricoComponent
    ],
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        MatButtonModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatIconModule,
        ToolTipComponentModule
    ],
    exports: [
        FiltersHistoricoComponent
    ]
})

export class FiltersHistoricocomponentModule { }

