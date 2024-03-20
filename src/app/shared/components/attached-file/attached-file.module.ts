import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormatBytesPipe } from "app/shared/pipes/format-bytes.pipe";
import { AttachedFileComponent } from "./attached-file.component";

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