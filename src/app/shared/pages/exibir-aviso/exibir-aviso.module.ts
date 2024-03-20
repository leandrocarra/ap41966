import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from "@angular/core";
import { ExibirAvisoComponent } from "./exibir-aviso.component";

@NgModule({
    declarations: [
        ExibirAvisoComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
    ],
    exports: [
        ExibirAvisoComponent,
    ],
})
export class ExibirAvisoModule { }
