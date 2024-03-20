import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { LoginRequestDTO } from 'app/core/models/LoginDTO/loginRequestDTO.model';
import { LoginResponseDTO } from 'app/core/models/LoginDTO/loginResponseDTO.model';
import { Observable } from 'rxjs';
import { TokenPixDTORequest } from '../../models/pix/request/pix-dto';
import { listen, Notification, NotificationService } from "../messaging/notification/notification.service";
import { LOGOUT, LOGOUT_SUCCESS } from '../messaging/notification/notifications';
import { PixService } from '../pix/pix.service';
import { TokenService } from '../token/token.service';



@Injectable({
	providedIn: 'root'
})
export class LoginService {
	usuarioAutenticado: boolean = false;
	constructor(
		private _token: TokenService,
		public notification: NotificationService,
		private _router: Router,
	) { }

	login(username: string, password: string): Observable<LoginResponseDTO> {
		this._token.clearStorage();
		let concatUsername = `${environment.name}/${username}`;
		return this._token.requestToken(new LoginRequestDTO(concatUsername, password));
	}

	@listen([LOGOUT])
	onLogout(isTokenExpired: any) {
		if (isTokenExpired) {
			this._token.clearStorage();
			this.notification.sendNotification(new Notification(LOGOUT_SUCCESS));
			this.redirectLogin();
		}
	}

	redirectLogin() {
		this._router.navigate(['login']);
	}

}
