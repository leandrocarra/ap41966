import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FaturaInfoComponent } from "./fatura-info.component";

@NgModule({
    declarations: [
        FaturaInfoComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FaturaInfoComponent
    ]
})

export class CardFaturaInfoModule {}