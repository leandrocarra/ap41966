import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { MinhaContaResolver } from "app/core/resolvers/minha-conta/minha-conta.resolver";
import { MinhaContaRoutes } from "app/core/routes/home-route/home-child-routes/minha-conta.routes";
import { CustomMatErrorModule } from "app/shared/components/custom-mat-error/custom-mat-error.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { ProtocoloInformativoComponentModule } from "app/shared/components/protocolo-informativo/protocolo-informativo.module";
import { ValidarSenhasModule } from "app/shared/components/validar-senhas/validar-senhas.module";
import { ExibirAvisoModule } from "app/shared/pages/exibir-aviso/exibir-aviso.module";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { BreadcrumbModule } from "xng-breadcrumb";
import { AlterarSenhaComponent } from "./pages/alterar-senha/alterar-senha.component";
import { EditarDadosComponent } from "./pages/editar-dados/editar-dados.component";
import { MinhaContaComponent } from "./pages/minha-conta/minha-conta.component";

@NgModule({
    declarations: [
        MinhaContaComponent,
        EditarDadosComponent,
        AlterarSenhaComponent,
    ],
    imports: [
        CommonModule,
        ProtocoloInformativoComponentModule,
        ValidarSenhasModule,
        BreadcrumbModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        NgxMaskModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        NeoButtonModule,
        ExibirAvisoModule,
        SharedModule,
        RouterModule.forChild(MinhaContaRoutes),
        CustomMatErrorModule
    ],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'en-GB'
        },
        MinhaContaResolver
    ]
})

export class MinhaContaModule { }
