import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserServiceLN } from '../../../core/services/user/user.service';

@Injectable({
	providedIn: 'root'
})
export class ProtocoloGuard implements CanActivate {
	constructor(
		private _router: Router,
		private _userServiceLN: UserServiceLN) {

	}

	canActivate(): boolean {
		return this.verificarProtocolo();
	}

	verificarProtocolo(): boolean {
		if (this._userServiceLN.PROTOCOLO_SESSAO === '') {
			this._router.navigate(['/ligacao-nova']);
			return false;
		} else {
			return true;
		}
	}
}
