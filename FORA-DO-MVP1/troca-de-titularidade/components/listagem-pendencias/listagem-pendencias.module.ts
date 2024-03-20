import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { InternetBankingModule } from "app/shared/components/alerts/internet-banking/internet-banking.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { ListagemPendenciasComponent } from "./listagem-pendencias.component";

@NgModule({
    declarations: [ListagemPendenciasComponent],
    imports: [  
        CommonModule,      
        MatCardModule,
        NeoButtonModule,
        MatIconModule,
        MatMenuModule,
        InternetBankingModule
    ],
    exports:[ListagemPendenciasComponent]
})

export class ListagemPendenciasModule {}