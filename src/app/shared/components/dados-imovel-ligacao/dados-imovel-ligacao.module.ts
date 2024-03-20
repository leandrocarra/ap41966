import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { DadosImovelLigacaoComponent } from "./dados-imovel-ligacao.component";

@NgModule({
    declarations: [
        DadosImovelLigacaoComponent
    ],
    imports: [
        CommonModule,
        MatDividerModule,
        MatIconModule
    ],
    exports: [
        DadosImovelLigacaoComponent
    ]

})

export class DadosImovelLigacaoModule {}

