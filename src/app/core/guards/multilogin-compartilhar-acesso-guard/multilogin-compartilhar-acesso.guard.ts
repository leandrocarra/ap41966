import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';

@Injectable({
    providedIn: 'root'
})
export class MultiloginCompartilharAcessoGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _multiloginAcessoService: MultiloginAcessoService,
    ) { }

    canActivate(): boolean {
        let perfilDeAcesso = this._multiloginAcessoService.getMultiloginAcesso.perfilDeAcesso;
        const perfis = [
            "Perfil de Acesso",
            "Corretor",
            "Padronista",
            "Atendente credenciado",
            "Cônjuge"
        ];

        if (perfis.includes(perfilDeAcesso)) {
            this._router.navigate(
                [PathCompleto.aviso],
                { queryParams: { titulo: `Usuário não possui este acesso.` } }
            );
            return false;
        } else {
            return true
        }
    }
}
