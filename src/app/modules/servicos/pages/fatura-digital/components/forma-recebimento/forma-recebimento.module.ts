import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { NeoButtonModule } from "app/shared/components/neo-button/neo-button.module";
import { NgxMaskModule } from 'ngx-mask';
import { FormaRecebimentoComponent } from "./forma-recebimento.component";

@NgModule({
    declarations: [
        FormaRecebimentoComponent
    ],
    imports: [
        CommonModule,
        NeoButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMaskModule,
    ],
    exports: [
        FormaRecebimentoComponent
    ]
})

export class FormaRecebimentoComponentModule {}