import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { DialogLoginComponent } from 'app/shared/components/dialog-login/dialog-login.component';
import { configureMenuByWindowSize } from "../../../../core/services/utils/neo-utils.service";

@Component({
    selector: 'app-conectar-cadastrar',
    templateUrl: './conectar-cadastrar.component.html',
    styleUrls: ['./conectar-cadastrar.component.scss']
})
export class ConectarCadastrarComponent {
    mobile: boolean;
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    constructor(
        private dialog: MatDialog,
        private _router: Router
    ) {
        this.mobile = configureMenuByWindowSize(window.screen.width);
    }

    openDialog(): void {
        this.dialog.open(DialogLoginComponent, {
            disableClose: false,
            hasBackdrop: true,
            height: this.mobile ? '90vh' : 'auto',
            width: this.mobile ? '90vw' : 'auto',
            position: {
                top: '5vh',
                right: window.screen.width <= 768 ? '' : '5vw'
            }
        });
    }

    navigateTo(): void {
        this._router.navigate([PathCompleto.cadastro]);
    }
}
