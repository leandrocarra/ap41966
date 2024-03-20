import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { AttachedFileModule } from "../attached-file/attached-file.module";
import { NeoButtonModule } from "../neo-button/neo-button.module";
import { ToolTipComponentModule } from "../tooltip/tooltip.module";
import { BoxFileComponent, TirarFotoComponentDialog } from "./box-file.component";

@NgModule({
    declarations: [
        BoxFileComponent,
        TirarFotoComponentDialog
    ],
    imports: [
        CommonModule,
        AttachedFileModule,
        NeoButtonModule,
        MatDialogModule,
        ToolTipComponentModule
    ],
    exports: [
        BoxFileComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BoxFileModule { }