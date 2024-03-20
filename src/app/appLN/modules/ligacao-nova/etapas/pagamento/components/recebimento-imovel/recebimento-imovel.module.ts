import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { NeoSharedModule } from '../../../../../../shared/shared.module';
import { RecebimentoImovelComponent } from './recebimento-imovel.component';

@NgModule({
    declarations: [
        RecebimentoImovelComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NeoSharedModule,
        NgxMaskModule
    ],
    exports: [
        RecebimentoImovelComponent
    ]
})

export class RecebimentoImovelModule {}
