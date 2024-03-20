import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FiltersAcompanheComponent } from "./filters-acompanhe.component";

@NgModule({
    declarations: [
        FiltersAcompanheComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatDividerModule,
        MatSelectModule,
        MatButtonModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatIconModule
    ],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'en-GB'
        },
    ],
    exports: [
        FiltersAcompanheComponent
    ]
})

export class FiltersAcompanheModule { }