import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { DadosEmailComponent } from "./dados-email.component";
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { CustomMatErrorModule } from 'app/shared/components/custom-mat-error/custom-mat-error.module';

@NgModule({
    declarations: [
        DadosEmailComponent
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CustomMatErrorModule
    ],
    exports: [
        DadosEmailComponent    ]
})

export class DadosEmailModule {}