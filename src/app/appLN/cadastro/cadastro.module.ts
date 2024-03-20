import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ValidarSenhasModule } from '../shared/components/validar-senhas/validar-senhas.module';
import { NeoSharedModule } from '../shared/shared.module';
import { CadastroRoute } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

@NgModule({
    imports: [
        RouterModule.forChild([CadastroRoute]),
        CommonModule,
        NeoSharedModule,
        ValidarSenhasModule,
        MatRadioModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        NgxMaskModule,
        MatCheckboxModule
    ],
    declarations: [
        CadastroComponent
    ],
})
export class CadastroComponentModule { }
