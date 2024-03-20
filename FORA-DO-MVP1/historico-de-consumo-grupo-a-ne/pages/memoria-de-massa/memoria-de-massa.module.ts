import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SolicitacaoEnviadaModule } from "app/modules/solicitacao-enviada/solicitacao-enviada.module";
import { ProblemaRegistradoModule } from "../cards/problema-registrado/problema-registrado.module";
import { DadosImovelLigacaoModule } from "../dados-imovel-ligacao/dados-imovel-ligacao.module";
import { EmailRecebimentoModule } from "../email-recebimento/email-recebimento.module";
import { NeoButtonModule } from "../neo-button/neo-button.module";
import { MemoriaDeMassaComponent } from "./memoria-de-massa.component";


@NgModule({
    declarations: [
        MemoriaDeMassaComponent
    ],
    imports: [
        CommonModule,
        ProblemaRegistradoModule,
        DadosImovelLigacaoModule,
        NeoButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        EmailRecebimentoModule,
        SolicitacaoEnviadaModule
        

    ],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'en-GB'
        },
    ],
    exports: [
        MemoriaDeMassaComponent,

    ]
})

export class MemoriaDeMassaModule { }