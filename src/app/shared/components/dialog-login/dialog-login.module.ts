import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLoginComponent } from './dialog-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { CustomMatErrorModule } from '../custom-mat-error/custom-mat-error.module';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from "@angular/material/stepper";
import { NeoButtonModule } from "../neo-button/neo-button.module";

@NgModule({
    declarations: [
        DialogLoginComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        SharedModule,
        MatIconModule,
        NgxMaskModule,
        CustomMatErrorModule,
        RecaptchaFormsModule,
        RecaptchaModule,
        MatButtonToggleModule,
        MatStepperModule,
        NeoButtonModule
    ],
    entryComponents: [
        DialogLoginComponent
    ],
    exports: [
        DialogLoginComponent
    ]
})
export class DialogLoginModule { }
