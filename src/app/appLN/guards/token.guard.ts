import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(
    private _router: Router
  ) {

  }

  canActivate(): boolean{
    return this.verificarToken();
  }

  canLoad(): boolean {
    return this.verificarToken();
  }

  verificarToken(): boolean {
    if (sessionStorage.getItem('access_token') && sessionStorage.getItem('access_token') != undefined) {
      return true;
    } else {
      this._router.navigate(['login']);
      return false;

    }
  }

}
