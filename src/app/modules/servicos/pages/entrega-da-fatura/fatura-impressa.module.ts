import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { CustomMatErrorModule } from "app/shared/components/custom-mat-error/custom-mat-error.module";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { CepModule } from "app/shared/components/formularios/cep/cep.module";
import { EnderecoModule } from "app/shared/components/formularios/endereco/endereco.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { FaturaImpressaRoutingModule } from "./fatura-impressa-routing.module";
import { CaixaPostalComponent } from './pages/caixa-postal/caixa-postal.component';
import { ConfirmarDadosComponent } from "./pages/confirmar-dados/confirmar-dados.component";
import { ContaContratoComponent } from './pages/conta-contrato/conta-contrato.component';
import { EnderecoAlternativoComponent } from './pages/endereco-alternativo/endereco-alternativo.component';
import { FaturaImpressaComponent } from './pages/fatura-impressa/fatura-impressa.component';
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";

@NgModule({
    declarations: [
        FaturaImpressaComponent,
        EnderecoAlternativoComponent,
        CaixaPostalComponent,
        ConfirmarDadosComponent,
        ContaContratoComponent
    ],
    imports: [
        CommonModule,
        FaturaImpressaRoutingModule,
        DadosImovelLigacaoModule,
        NeoButtonModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        NgxMaskModule,
        SharedModule,
        MatCheckboxModule,
        EnderecoModule,
        CepModule,
        MatSelectModule,
        MatOptionModule,
        CustomMatErrorModule,
        MatDividerModule,
        ExibirAvisoModule
    ]
})

export class FaturaImpressaModule { }