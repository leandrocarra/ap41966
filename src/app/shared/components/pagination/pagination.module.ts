import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        PaginationComponent
    ],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        PaginationComponent
    ]

})

export class PaginationComponentModule{}

