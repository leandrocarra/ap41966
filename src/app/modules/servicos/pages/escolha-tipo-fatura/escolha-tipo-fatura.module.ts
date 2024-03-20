import { NgModule } from "@angular/core";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";

import { EscolhaTipoFaturaComponent } from "../escolha-tipo-fatura/escolha-tipo-fatura.component";

import { EscolhaTipoFaturaRoutingModule } from "./escolha-tipo-fatura-routing.module";

@NgModule({
    declarations: [
        EscolhaTipoFaturaComponent
    ],
    imports: [
        EscolhaTipoFaturaRoutingModule,
        NeoButtonModule,
        ExibirAvisoModule
    ]
})

export class EscolhaTipoFaturaModule { }