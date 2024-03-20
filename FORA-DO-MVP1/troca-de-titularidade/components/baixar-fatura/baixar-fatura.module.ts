import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { BaixarFaturaComponent } from "./baixar-fatura.component";

@NgModule({
    declarations: [BaixarFaturaComponent],
    imports: [
        CommonModule,
        NeoButtonModule
    ],
    exports: [BaixarFaturaComponent]
})

export class BaixarFaturaModule {}