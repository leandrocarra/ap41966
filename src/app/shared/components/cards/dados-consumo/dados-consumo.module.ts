import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { DadosConsumoComponent } from "./dados-consumo.component";


@NgModule({
    declarations: [
        DadosConsumoComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
    ],
    exports: [
        DadosConsumoComponent
    ]
})

export class DadosConsumoModule { }