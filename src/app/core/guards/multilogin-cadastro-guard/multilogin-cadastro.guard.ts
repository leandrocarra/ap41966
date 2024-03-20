import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';

@Injectable({
    providedIn: 'root'
})
export class MultiloginCadastroGuard implements CanActivate {

    constructor(
        private _multiloginAcessoService: MultiloginAcessoService,
        private _router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let perfilDeAcesso = this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso;
        const perfis = [
            "Perfil de Acesso",
            "Corretor",
            "Padronista",
            "Atendente credenciado",
            "Cônjuge"
        ];

        if (perfis.includes(perfilDeAcesso)) {
            //TODO: Verificar mensagem correta
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
