import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NeoButtonModule } from "../neo-button/neo-button.module";
import { ProtocoloTextoSolicitacaoComponent } from "./protocolo-texto-solicitacao.component";

@NgModule({
    declarations: [
        ProtocoloTextoSolicitacaoComponent
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
    ],
    exports: [
        ProtocoloTextoSolicitacaoComponent
    ]
})

export class ProtocoloTextoSolicitacaoModule { }