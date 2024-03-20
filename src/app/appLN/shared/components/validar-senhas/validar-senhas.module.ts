import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ValidarSenhasRoute } from './validar-senhas-route';
import { ValidarSenhasComponent } from './validar-senhas.component';

@NgModule({
    imports: [
        RouterModule.forChild([ValidarSenhasRoute]),
        // NeoSharedModule
        CommonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ValidarSenhasComponent
    ],
    providers: [],
    exports: [
        ValidarSenhasComponent
    ]
})
export class ValidarSenhasModule { }
