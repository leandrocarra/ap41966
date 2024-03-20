import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiloginCadastroImobiliarioComponent } from './multilogin-cadastro-imobiliario.component';
import { RouterModule } from '@angular/router';
import { MultiloginCadastroImobiliarioRoutes } from 'app/core/routes/login-route/login-child-routes/multilogin-cadastro-imobiliario.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { ExibirAvisoModule } from 'app/shared/pages/exibir-aviso/exibir-aviso.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    MultiloginCadastroImobiliarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MultiloginCadastroImobiliarioRoutes),
    NeoButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMaskModule,
    BreadcrumbModule,
    MatInputModule,
    ExibirAvisoModule,
    SharedModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class MultiloginCadastroImobiliarioModule { }
