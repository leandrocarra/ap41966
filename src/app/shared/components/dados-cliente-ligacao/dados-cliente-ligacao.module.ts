import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { DadosClienteLigacaoComponent } from "./dados-cliente-ligacao.component";

@NgModule({
    declarations: [DadosClienteLigacaoComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [DadosClienteLigacaoComponent]
})

export class DadosClienteLigacaoModule { }