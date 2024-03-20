import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaskModule } from "ngx-mask";
import { DadosSolicitanteComponent } from "./dados-solicitante.component";

@NgModule({
    declarations:[DadosSolicitanteComponent],

    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        NgxMaskModule,
        MatSelectModule
     ],

     exports: [DadosSolicitanteComponent]

})

export class DadosSolicitanteModule {

};

