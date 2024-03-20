import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProtocoloInformativoComponent } from "./protocolo-informativo.component";

@NgModule({
    declarations: [
        ProtocoloInformativoComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProtocoloInformativoComponent,
    ]

})

export class ProtocoloInformativoComponentModule { }

