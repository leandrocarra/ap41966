import { FaturaBraileComponentModule } from './components/fatura-braile-component/fatura-braile-component.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FaturaBraileRoutingModule } from "./fatura-braile-routing.module";
import { FaturaBraileComponent } from "./pages/cadastrar-fatura-braile/fatura-braile.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { SolicitacaoEnviadaComponent } from "./pages/solicitacao-enviada/solicitacao-enviada.component";
import { DescadastrarFaturaBraileComponent } from "./pages/descadastrar-fatura-braile/descadastrar-fatura-braile.component";


@NgModule({
    declarations: [
        FaturaBraileComponent,
        SolicitacaoEnviadaComponent,
        DescadastrarFaturaBraileComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        DadosImovelLigacaoModule,
        FaturaBraileComponentModule,
        MatInputModule,
        NeoButtonModule,
        FormsModule,
        MatRadioModule,
        FaturaBraileRoutingModule
    ]
})

export class FaturaBraileModule {}