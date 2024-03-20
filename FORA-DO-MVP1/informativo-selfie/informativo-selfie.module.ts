import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InformativoSelfieComponent } from "./informativo-selfie.component";
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';

@NgModule({
    declarations: [InformativoSelfieComponent],
    imports: [
        CommonModule,
        NeoButtonModule
    ],
    exports: [
        InformativoSelfieComponent
    ]
})
export class InformativoSelfieModule { }