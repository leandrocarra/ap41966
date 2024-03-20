import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AttachedFileComponent } from "./attached-file.component";
import { FormatBytesPipe } from "../../pipes/format-bytes.pipe";

@NgModule({
    declarations: [
        AttachedFileComponent,
        FormatBytesPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AttachedFileComponent
    ]
})

export class AttachedFileModule { }
