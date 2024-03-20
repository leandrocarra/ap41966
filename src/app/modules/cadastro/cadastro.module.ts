import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CadastroRoutes } from 'app/core/routes/login-route/login-child-routes/cadastro.routes';
import { CustomMatErrorModule } from 'app/shared/components/custom-mat-error/custom-mat-error.module';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { StepperHorizontalModule } from 'app/shared/components/stepper-horizontal/stepper-horizontal.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { CadastroComponent } from './cadastro.component';
import { IdentificacaoCadastroComponent } from './pages/identificacao-cadastro/identificacao-cadastro.component';
import { SenhaCadastroComponent } from './pages/senha-cadastro/senha-cadastro.component';
import { IdentificacaoDadosCadastroComponent } from './pages/identificacao-dados-cadastro/identificacao-dados-cadastro.component';
import { DadosPessoaisPessoaFisicaComponent } from './pages/dados-pessoais-pessoa-fisica/dados-pessoais-pessoa-fisica.component';
import { DadosPessoaisPessoaFisicaEmailComponent } from './pages/dados-pessoais-pessoa-fisica-email/dados-pessoais-pessoa-fisica-email.component';
import { ValidarSenhasModule } from 'app/shared/components/validar-senhas/validar-senhas.module';
import { ExibirAvisoModule } from 'app/shared/pages/exibir-aviso/exibir-aviso.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DadosPessoaJuridicaUcComponent } from './pages/dados-pessoa-juridica-uc/dados-pessoa-juridica-uc.component';
import { DadosPessoaJuridicaEmpresaComponent } from './pages/dados-pessoa-juridica-empresa/dados-pessoa-juridica-empresa.component';
import { DadosPessoaJuridicaRepresentanteComponent } from './pages/dados-pessoa-juridica-representante/dados-pessoa-juridica-representante.component';
import { DadosPessoaJuridicaRepresentanteContatoComponent } from './pages/dados-pessoa-juridica-representante-contato/dados-pessoa-juridica-representante-contato.component';
import { DadosPessoaJuridicaRepresentanteEmailComponent } from './pages/dados-pessoa-juridica-representante-email/dados-pessoa-juridica-representante-email.component';
import { ValidarCodigoDeAtivacaoComponent } from './pages/validar-codigo-de-ativacao/validar-codigo-de-ativacao.component';



@NgModule({
  declarations: [
    CadastroComponent,
    IdentificacaoCadastroComponent,
    IdentificacaoDadosCadastroComponent,
    SenhaCadastroComponent,
    DadosPessoaisPessoaFisicaComponent,
    DadosPessoaisPessoaFisicaEmailComponent,
    DadosPessoaJuridicaUcComponent,
    DadosPessoaJuridicaEmpresaComponent,
    DadosPessoaJuridicaRepresentanteComponent,
    DadosPessoaJuridicaRepresentanteContatoComponent,
    DadosPessoaJuridicaRepresentanteEmailComponent,
    ValidarCodigoDeAtivacaoComponent
],
imports: [
    CommonModule,
    RouterModule.forChild(CadastroRoutes),
    StepperHorizontalModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    NeoButtonModule,
    MatInputModule,
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
export class CadastroModule { }
