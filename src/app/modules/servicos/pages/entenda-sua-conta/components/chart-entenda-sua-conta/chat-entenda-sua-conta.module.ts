import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { LegendaComposicaoFaturaModule } from "../legenda-composicao-fatura/legenda-composicao-fatura.module";
import { ChartEntendaSuaContaComponent } from "./chart-entenda-sua-conta.component";

@NgModule({
    declarations: [
        ChartEntendaSuaContaComponent
    ],
    imports: [
        CommonModule,
        MatSlideToggleModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        LegendaComposicaoFaturaModule,
    ],
    exports: [
        ChartEntendaSuaContaComponent
    ]
})

export class ChartEntendaSuaContaModule { }