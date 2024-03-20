import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackbarService } from "./snackbar.service";

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule,
    ],
    providers: [
        SnackbarService
    ]
})

export class SnackbarServiceModule { }

