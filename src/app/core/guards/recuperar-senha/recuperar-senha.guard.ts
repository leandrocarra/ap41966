import { CadastroService } from 'app/core/services/cadastro/cadastro.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaGuard implements CanActivate {

    constructor(
       private _cadastroService: CadastroService,
       private _router: Router
    ){}

  canActivate(): boolean {
        if(!this._cadastroService.fluxoRecuperarSenha.fluxoIniciado){
            this._router.navigate([PathCompleto.recuperarSenha]);
            return false;
        } else {
            return true
        }
  }
}
