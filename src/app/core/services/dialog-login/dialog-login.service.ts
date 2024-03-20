import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from 'app/shared/components/dialog-login/dialog-login.component';

@Injectable({
    providedIn: 'root'
})
export class DialogLoginService {
    constructor(
        private dialog: MatDialog
    ) { }

    exibirDialogLogin(): void {
        this.dialog.open(DialogLoginComponent, {
            disableClose: false,
            hasBackdrop: true,
            width: window.screen.width < 768 ? '90vw' : 'auto',
            height: window.screen.width < 768 ? '90vh' : 'auto',
            position: {
                top: '5vh',
                right: '5vh'
            }
        });
    }
}
