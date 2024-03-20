import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoAcessoSegundaViaComponent } from './pages/tipo-acesso-segunda-via/tipo-acesso-segunda-via.component';
import { RouterModule } from '@angular/router';
import { SegundaViaDePagamentoRoutes } from 'app/core/routes/login-route/login-child-routes/segunda-via.routes';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { AcessoFaturasSegundaViaComponent } from './pages/acesso-faturas-segunda-via/acesso-faturas-segunda-via.component';
import { ListarFaturasComponent } from './components/listar-faturas/listar-faturas.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { AcessoUcsSegundaViaComponent } from './pages/acesso-ucs-segunda-via/acesso-ucs-segunda-via.component';
import { UnidadeConsumidoraModule } from 'app/shared/components/cards/unidade-consumidora/unidade-consumidora.module';
import { MatIconModule } from '@angular/material/icon';
import { CardAcessoRapidoModule } from 'app/modules/login/components/card-acesso-rapido/card-acesso-rapido.module';
import { InternetBankingModule } from 'app/shared/components/alerts/internet-banking/internet-banking.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomMatErrorModule } from 'app/shared/components/custom-mat-error/custom-mat-error.module';
import { InformarUcCpfSegundaViaComponent } from './pages/informar-uc-cpf-segunda-via/informar-uc-cpf-segunda-via.component';



@NgModule({
  declarations: [
    TipoAcessoSegundaViaComponent,
    AcessoFaturasSegundaViaComponent,
    ListarFaturasComponent,
    AcessoUcsSegundaViaComponent,
    InformarUcCpfSegundaViaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SegundaViaDePagamentoRoutes),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule,
    NeoButtonModule,
    UnidadeConsumidoraModule,
    MatIconModule,
    CardAcessoRapidoModule,
    InternetBankingModule,
    MatDatepickerModule,
    NgxCaptchaModule,
    CustomMatErrorModule
  ]
})
export class SegundaViaLoginModule { }
