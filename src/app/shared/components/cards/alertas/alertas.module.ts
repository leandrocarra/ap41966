import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { AlertasComponent } from "./alertas.component";

@NgModule({
    declarations: [
        AlertasComponent
    ],
    imports: [
        MatCardModule,
        CommonModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        AlertasComponent
    ]

})

export class CardAlertaModule {}

