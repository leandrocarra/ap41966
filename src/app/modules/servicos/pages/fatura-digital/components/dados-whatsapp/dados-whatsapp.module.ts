import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { DadosWhatsappComponent } from "./dados-whatsapp.component";

@NgModule({
    declarations: [
        DadosWhatsappComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule,
        SharedModule
    ],
    exports: [
        DadosWhatsappComponent
    ]
})

export class DadosWhatsappModule {}