import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperarDadosCadastroComponent } from './pages/recuperar-dados-cadastro/recuperar-dados-cadastro.component';
import { RouterModule } from '@angular/router';
import { RecuperarSenhaRoutes } from 'app/core/routes/login-route/login-child-routes/recuperar-senha.routes';
import { RecuperarSenhaComponent } from './recuperar-senha.component';
import { StepperHorizontalModule } from 'app/shared/components/stepper-horizontal/stepper-horizontal.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomMatErrorModule } from 'app/shared/components/custom-mat-error/custom-mat-error.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ValidarSenhasModule } from 'app/shared/components/validar-senhas/validar-senhas.module';
import { ExibirAvisoModule } from 'app/shared/pages/exibir-aviso/exibir-aviso.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { InformarCodigoEnviadoComponent } from './pages/informar-codigo-enviado/informar-codigo-enviado.component';
import { RecuperarMetodoEnvioComponent } from './pages/recuperar-metodo-envio/recuperar-metodo-envio.component';
import { MatRadioModule } from '@angular/material/radio';
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha.component';

@NgModule({
  declarations: [
    RecuperarSenhaComponent,
    RecuperarDadosCadastroComponent,
    InformarCodigoEnviadoComponent,
    RecuperarMetodoEnvioComponent,
    NovaSenhaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecuperarSenhaRoutes),
    StepperHorizontalModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    NeoButtonModule,
    MatInputModule,
    MatRadioModule,
    SharedModule,
    NgxMaskModule,
    CustomMatErrorModule,
    MatDatepickerModule,
    ValidarSenhasModule,
    ExibirAvisoModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class RecuperarSenhaModule { }
