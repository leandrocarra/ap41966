import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { NeoSharedModule } from '../../../../../../shared/shared.module';
import { RecebimentoAlternativoComponent } from './recebimento-alternativo.component';

@NgModule({
    declarations: [
        RecebimentoAlternativoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        NeoSharedModule,
        NgxMaskModule
    ],
    exports: [
        RecebimentoAlternativoComponent
    ]
})

export class RecebimentoAlternativoModule { }
