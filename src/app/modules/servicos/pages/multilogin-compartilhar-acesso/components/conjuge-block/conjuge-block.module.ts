import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { ConjugeBlockComponent } from "./conjuge-block.component";

@NgModule({
    declarations: [
        ConjugeBlockComponent,
    ],
    imports: [
        CommonModule,
        NeoButtonModule
    ],
    exports: [
        ConjugeBlockComponent
    ]
})

export class ConjugeBlockModule { }
