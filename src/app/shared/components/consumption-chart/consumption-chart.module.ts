import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ConsumptionChartComponent } from "./consumption-chart.component";

@NgModule({
    declarations: [
        ConsumptionChartComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        MatCardModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule
    ],
    exports: [
        ConsumptionChartComponent
    ]

})

export class ConsumptionChartModule {}

