import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskModule } from "ngx-mask";
import { CepComponent } from "./cep.component";



@NgModule({
    declarations: [
        CepComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        NgxMaskModule
    ],
    exports: [CepComponent]
})


export class CepModule { };