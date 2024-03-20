import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { SegundaViaPagamentoService } from 'app/core/services/segunda-via-pagamento/segunda-via-pagamento.service';

@Injectable({
    providedIn: 'root'
})
export class SegundaViaPagamentoGuard implements CanActivate {
    constructor(
        private _segundaViaPagamentoService: SegundaViaPagamentoService,
        private _router: Router
    ) { }

    canActivate(): boolean {
        if(!this._segundaViaPagamentoService.fluxoSegundaViaPagamento.fluxoIniciado) {
            this._router.navigate([PathCompleto.segundaViaLogin]);
            return false;
        } else {
            return true
        }
    }
}
