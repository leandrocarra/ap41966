import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PathCompleto } from 'app/core/enums/servicos';

@Injectable({
  providedIn: 'root'
})
export class CadastroGuard implements CanActivate {

    constructor(
       private _cadastroService: CadastroService,
       private _router: Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        if(!this._cadastroService.fluxoCadastro.fluxoIniciado){
            this._router.navigate([PathCompleto.cadastro]);
            return false;
        } else {
            return true
        }
  }
}
