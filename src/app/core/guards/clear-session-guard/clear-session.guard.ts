import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from 'app/core/services/token/token.service';

@Injectable({
	providedIn: 'root'
})
export class ClearSessionGuard implements CanActivate {
	constructor(
		private _tokenService: TokenService
	) { }
	canActivate(): boolean {
		this._tokenService.clearStorage();
		return true;
	}

}
