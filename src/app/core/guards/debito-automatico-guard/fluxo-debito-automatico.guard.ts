import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DebitoAutomaticoService } from "../../services/debito-automatico/debito-automatico.service";
import { PathCompleto } from "../../enums/servicos";

@Injectable({
    providedIn: 'root'
})
export class FluxoDebitoAutomaticoGuard implements CanActivate {
    constructor(
        private _debitoAutomaticoService: DebitoAutomaticoService,
        private _router: Router
    ) {
    }

    canActivate(): Observable<boolean> | boolean {
        if (!this._debitoAutomaticoService.fluxoIniciado) {
            this._router.navigate([PathCompleto.debitoAutomatico]);
        }

        return true;
    }

}
