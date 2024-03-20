import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NeoButtonModule } from "../neo-button/neo-button.module";
import { EmailRecebimentoComponent } from "./email-recebimento.component";

@NgModule({
    declarations: [
        EmailRecebimentoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NeoButtonModule
        
    ],
    exports: [
        EmailRecebimentoComponent
    ]

})

export class EmailRecebimentoModule {}