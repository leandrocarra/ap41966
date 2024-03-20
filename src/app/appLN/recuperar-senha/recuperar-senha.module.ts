import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ValidarSenhasModule } from '../shared/components/validar-senhas/validar-senhas.module';
import { NeoSharedModule } from '../shared/shared.module';
import { RecuperarSenhaComponent } from './recuperar-senha.component';
import { RecuperarSenhaRoute } from './recuperar-senha.route';

@NgModule({
    imports: [
        RouterModule.forChild([RecuperarSenhaRoute]),
        NeoSharedModule,
        CommonModule,
        ValidarSenhasModule,
        MatRadioModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule
    ],
    declarations: [
        RecuperarSenhaComponent,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecuperarSenhaComponentModule { }
