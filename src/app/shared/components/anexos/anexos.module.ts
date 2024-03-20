import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AnexosComponent } from "./anexos.component";

@NgModule({
    declarations: [
        AnexosComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        AnexosComponent
    ]

})

export class AnexosComponentModule { }

