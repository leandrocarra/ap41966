import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { MeusGruposComponent } from "./meus-grupos.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { ToolTipComponentModule } from "app/shared/components/tooltip/tooltip.module";
import { ConjugeBlockModule } from "../conjuge-block/conjuge-block.module";

@NgModule({
    declarations: [
        MeusGruposComponent,
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
        MatExpansionModule,
        ToolTipComponentModule,
        ConjugeBlockModule
    ],
    exports: [
        MeusGruposComponent
    ]
})

export class MeusGruposModule { }
