import { Router } from '@angular/router';
import { ProjetoParticularService } from './../../services/projeto-particular/projeto-particular.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';

@Injectable({
  providedIn: 'root'
})
export class ProjetoParticularGuard implements CanActivate {

    constructor(
        private _projetoParticularService: ProjetoParticularService,
        private _router: Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        if(!this._projetoParticularService.fluxoIniciado){
            this._router.navigate([PathCompleto.projetoParticular]);
            return false;
        } else {
            return true;
        }
    }
}
