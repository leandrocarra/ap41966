import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BoxFileModule } from 'app/shared/components/box-file/box-file.module';
import { ProjetoParticularRoutes } from './../../../../core/routes/home-route/home-child-routes/projeto-particular.routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { NgxMaskModule } from 'ngx-mask';
import { ProjetoParticularComponent } from './pages/projeto-particular/projeto-particular.component';
import { FormularioProjetoParticularComponent } from './pages/formulario-projeto-particular/formulario-projeto-particular.component';
import { NeoButtonModule } from 'app/shared/components/neo-button/neo-button.module';
import { CustomMatErrorModule } from 'app/shared/components/custom-mat-error/custom-mat-error.module';
import { AttachedFileModule } from 'app/shared/components/attached-file/attached-file.module';

@NgModule({
  declarations: [
    ProjetoParticularComponent,
    FormularioProjetoParticularComponent
  ],
  imports: [
    CommonModule,
    NeoButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    NgxMaskModule,
    CustomMatErrorModule,
    BoxFileModule,
    AttachedFileModule,
    RouterModule.forChild(ProjetoParticularRoutes)
  ]
})
export class ProjetoParticularModule { }
