import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from '@angular/material/stepper';
import { DialogProtocoloModule } from "app/shared/components/dialog-protocolo/dialog-protocolo.module";
import { FiltersAcompanheModule } from "app/shared/components/filters-acompanhe/filters-acompanhe.module";
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { PaginationComponentModule } from 'app/shared/components/pagination/pagination.module';
import { AcompanheSeuPedidoRoutingModule } from "./acompanhe-seu-pedido-routing.module";
import { AccordionSolicitacoesComponent } from "./components/accordion-solicitacoes/accordion-solicitacoes.component";
import { DetalhesSolicitacaoNeComponent } from "./components/detalhes-solicitacao-ne/detalhes-solicitacao-ne.component";
import { DetalhesSolicitacaoComponent } from "./components/detalhes-solicitacao-se/detalhes-solicitacao-se.component";
import { HeaderFilterComponent } from "./components/header-filter/header-filter.component";
import { StepperStatusSolicitacoesComponent } from "./components/stepper-status-solicitacoes/stepper-status-solicitacoes.component";
import { AcompanheSeuPedidoComponent } from "./pages/acompanhe-seu-pedido/acompanhe-seu-pedido.component";

@NgModule({
    declarations: [
        AcompanheSeuPedidoComponent,
        AccordionSolicitacoesComponent,
        HeaderFilterComponent,
        StepperStatusSolicitacoesComponent,
        DetalhesSolicitacaoComponent,
        DetalhesSolicitacaoNeComponent
    ], imports: [
        CommonModule,
        AcompanheSeuPedidoRoutingModule,
        MatExpansionModule,
        MatCardModule,
        MatStepperModule,
        MatIconModule,
        NeoButtonModule,
        FiltersAcompanheModule,
        PaginationComponentModule,
        DialogProtocoloModule
    ]
})

export class AcompanheSeuPedidoModule { }