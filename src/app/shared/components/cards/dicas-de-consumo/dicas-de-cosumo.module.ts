import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DicasDeConsumoComponent } from "./dicas-de-consumo.component";

@NgModule({
    declarations: [
        DicasDeConsumoComponent
    ],
    imports: [
        CommonModule,
        MatCardModule
    ],
    exports: [
        DicasDeConsumoComponent
    ]
})

export class CardDicasDeConsumoModule { }