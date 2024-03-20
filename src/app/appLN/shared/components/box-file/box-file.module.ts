import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { AttachedFileModule } from "../attached-file/attached-file.module";
import { BoxFileComponent } from "./box-file.component";
import { TooltipModule } from "../tooltip/tooltip.module";

@NgModule({
    declarations: [
        BoxFileComponent,
    ],
    imports: [
        CommonModule,
        AttachedFileModule,
        MatDialogModule,
        TooltipModule
    ],
    exports: [
        BoxFileComponent
    ]
})

export class BoxFileModule { }
