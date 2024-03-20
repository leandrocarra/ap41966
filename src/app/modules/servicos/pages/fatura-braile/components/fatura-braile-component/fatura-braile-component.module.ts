import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { FaturaBraileComponentComponent } from "./fatura-braile-component.component";

@NgModule({
    declarations: [
        FaturaBraileComponentComponent
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        FaturaBraileComponentComponent
    ]
})

export class FaturaBraileComponentModule {}