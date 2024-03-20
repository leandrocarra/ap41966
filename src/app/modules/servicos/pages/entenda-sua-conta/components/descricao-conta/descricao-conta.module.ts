import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { DescricaoContaComponent } from "./descricao-conta.component";

@NgModule({
    declarations: [
        DescricaoContaComponent
    ],
    imports: [
        CommonModule,
        MatDividerModule,
        MatIconModule
    ],
    exports: [
        DescricaoContaComponent
    ]
})

export class DescricaoContaModule {}