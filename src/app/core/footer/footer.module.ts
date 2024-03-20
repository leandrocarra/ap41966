import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProtocoloInformativoComponentModule } from "app/shared/components/protocolo-informativo/protocolo-informativo.module";
import { FooterComponent } from "./footer.component";

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        ProtocoloInformativoComponentModule,
    ],
    exports: [
        FooterComponent
    ]

})

export class FooterModule {}

