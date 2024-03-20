import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { ProblemaRegistradoModule } from "app/shared/components/cards/problema-registrado/problema-registrado.module";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { NgxMaskModule } from "ngx-mask";
import { DadosEmailModule } from "./components/dados-email/dados-email.module";
import { DadosWhatsappModule } from './components/dados-whatsapp/dados-whatsapp.module';
import { FormaRecebimentoComponentModule } from "./components/forma-recebimento/forma-recebimento.module";
import { AlterarFaturaDigitalComponent } from "./pages/alterar-fatura-digital/alterar-fatura-digital.component";
import { CadastrarFaturaDigitalComponent } from "./pages/cadastrar-fatura-digital/cadastrar-fatura-digital.component";
import { ConfirmarFaturaDigitalComponent } from './pages/confirmar-fatura-digital/confirmar-fatura-digital.component';
import { DescadastrarFaturaDigitalComponent } from "./pages/descadastrar-fatura-digital/descadastrar-fatura-digital.component";
import { RouterModule } from "@angular/router";
import { ErroFaturaDigitalComponent } from './pages/erro-fatura-digital/erro-fatura-digital.component';
import { OpcoesFaturaDigitalComponent } from './pages/opcoes-fatura-digital/opcoes-fatura-digital.component';
import { FaturaDigitalRoutes } from "app/core/routes/home-route/home-child-routes/fatura-digital.routes";
import { FaturaDigitalResolver } from "app/core/resolvers/fatura-digital/fatura-digital.resolver";

@NgModule({
    declarations: [
        CadastrarFaturaDigitalComponent,
        AlterarFaturaDigitalComponent,
        DescadastrarFaturaDigitalComponent,
        OpcoesFaturaDigitalComponent,
        ConfirmarFaturaDigitalComponent,
        ErroFaturaDigitalComponent,
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
        DadosEmailModule,
        DadosWhatsappModule,
        DadosImovelLigacaoModule,
        FormaRecebimentoComponentModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        ProblemaRegistradoModule,
        NgxMaskModule,
        MatCheckboxModule,
        RouterModule.forChild(FaturaDigitalRoutes)
    ],
    providers: [
        FaturaDigitalResolver
    ]
})

export class FaturaDigitalModule {}