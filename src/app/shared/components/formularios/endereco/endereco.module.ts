import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { EnderecoComponent } from "./endereco.component";
import { CepModule } from "../cep/cep.module";


@NgModule({
    declarations: [
        EnderecoComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        CepModule,
        ReactiveFormsModule
    ],
    exports: [
        EnderecoComponent
    ]
})

export class EnderecoModule { }