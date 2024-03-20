import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { IndicadoresContinuidadeComponent } from "./indicadores-continuidade.component";

@NgModule({
    declarations: [
        IndicadoresContinuidadeComponent
    ],
    imports: [
        CommonModule,
        NeoButtonModule
    ],
    exports: [
        IndicadoresContinuidadeComponent
    ]
})

export class IndicadoresContinuidadeModule {}