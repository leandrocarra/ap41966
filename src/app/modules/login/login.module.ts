import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { RouterModule } from "@angular/router";
import { CodeInputModule } from "angular-code-input";
import { LoginRoutes } from "app/core/routes/login-route/login.routes";
import { CleanHeaderModule } from "app/shared/components/clean-header/clean-header.module";
import { DialogLoginModule } from "app/shared/components/dialog-login/dialog-login.module";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { SpinnerModule } from "app/shared/components/spinner/spinner.module";
import { ValidarSenhasModule } from "app/shared/components/validar-senhas/validar-senhas.module";
import { NgxCaptchaModule } from "ngx-captcha";
import { NgxMaskModule } from "ngx-mask";
import { SegundaViaLoginModule } from "../servicos/pages/segunda-via-login/segunda-via-login.module";
import { CardAcessoRapidoModule } from "./components/card-acesso-rapido/card-acesso-rapido.module";
import { CardDestaquesComponent } from './components/card-destaques/card-destaques.component';
import { ConectarCadastrarComponent } from './components/conectar-cadastrar/conectar-cadastrar.component';
import { LoginComponent } from "./login.component";
import { NewRegisterComponent } from "./pages/new-register/new-register.component";
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';

@NgModule({
    declarations: [
        LoginComponent,
        NewRegisterComponent,
        PaginaInicialComponent,
        ConectarCadastrarComponent,
        CardDestaquesComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        SpinnerModule,
        ValidarSenhasModule,
        CodeInputModule,
        NgxCaptchaModule,
        NgxMaskModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatStepperModule,
        MatRadioModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        NeoButtonModule,
        CleanHeaderModule,
        DialogLoginModule,
        SegundaViaLoginModule,
        CardAcessoRapidoModule,
        RouterModule.forChild(LoginRoutes)
    ],
    providers: [
        MatDatepickerModule,
    ]
})

export class LoginModule {
}
