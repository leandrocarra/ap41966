import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'app/core/models/home/home';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';

@Component({
    selector: "card-alerta",
    templateUrl: "./alertas.component.html",
    styleUrls: ["./alertas.component.scss"],
})

export class AlertasComponent {

    showAlert: boolean = true;
    mobile: boolean = false;
    grupoDoUsuario: string;

    @Input() card!: Alerta;

    constructor(
        private _user: UserService,
        private _router: Router,
    ) {
        this.grupoDoUsuario = this._user.group;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.mobile = configureMenuByWindowSize(event.target.innerWidth);
    }

    direcionar(): void {
        if (this.card.titulo === "Faturas atrasadas com risco de suspensão do fornecimento!") {
            let otherWindow = window.open(this.card.rota, '_blank');
            if (otherWindow) {
                otherWindow.opener = null
            }
        } else {
            this._router.navigate([this.card.rota]);
        }
    }

    close(): void {
        this.showAlert = false;
    }
}
