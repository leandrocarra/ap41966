import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { RouterModule } from "@angular/router";
import { ReligacaoRoutes } from "app/core/routes/home-route/home-child-routes/religacao.routes";
import { AnexosComponentModule } from "app/shared/components/anexos/anexos.module";
import { AttachedFileModule } from "app/shared/components/attached-file/attached-file.module";
import { BoxFileModule } from "app/shared/components/box-file/box-file.module";
import { DadosImovelLigacaoModule } from "app/shared/components/dados-imovel-ligacao/dados-imovel-ligacao.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { DialogPagamentoComponent } from "./components/dialog-pagamento/dialog-pagamento.component";
import { AnexarComprovanteComponent } from './components/anexar-comprovante/anexar-comprovante.component';
import { PagamentoPixComponent } from './components/pagamento-pix/pagamento-pix.component';

import { ConfirmacaoComponent } from "./pages/confirmacao/confirmacao.component";
import { InformarDadosComponent } from "./pages/informar-dados/informar-dados.component";
import { PagarComPixComponent } from "./pages/pagar-com-pix/pagar-com-pix.component";
import { ReligacaoFaturasComponent } from './pages/religacao-faturas/religacao-faturas.component';
import { ReligacaoComponent } from "./pages/religacao/religacao.component";

@NgModule({
    declarations: [
        ConfirmacaoComponent,
        InformarDadosComponent,
        ReligacaoComponent,
        PagarComPixComponent,
        PagamentoPixComponent,
        ReligacaoFaturasComponent,
        DialogPagamentoComponent,
        AnexarComprovanteComponent
    ],
    imports: [
        CommonModule,
        DadosImovelLigacaoModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        AnexosComponentModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule,
        MatRadioModule,
        NeoButtonModule,
        SharedModule,
        MatIconModule,
        BoxFileModule,
        AttachedFileModule,
        RouterModule.forChild(ReligacaoRoutes)
    ]
})

export class ReligacaoModule { }
