import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { DadosSolicitacaoTrocaComponent } from "./dados-solicitacao-troca.component";

@NgModule({
    declarations: [DadosSolicitacaoTrocaComponent],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        SharedModule,
        NgxMaskModule,
        SharedModule
    ],
    exports: [DadosSolicitacaoTrocaComponent]
})

export class DadosSolicitacaoTrocaModule { }