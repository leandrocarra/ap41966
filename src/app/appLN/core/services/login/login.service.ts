import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Observable } from 'rxjs';
import { CustomSweetAlertService } from '../sweet-alert/custom-sweet-alert.service';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    public storage: Storage = sessionStorage;
    public protocolo: string = '';

    constructor(
        private _router: Router,
        private _http: HttpClient,
        private _token: TokenService,
        private _alert: CustomSweetAlertService,
        private _loadingService: LoadingService
    ) { }

    login(): Observable<any> {
        this._token.clearStorage();
        return this._token.getToken();
    }

    redirectToLogin() {
        this._router.navigate(['/']);
    }

    logout() {
        this.storage.clear();
        this.protocolo = '';
        this.redirectToLogin();
    }

    handleError<T>() {
        return (e: any): Observable<T> => {
            if (e && e.error && e.error.message == 'Authorization has been denied for this request.') {
                this._loadingService.stop();
                this._alert.alertError('Sessão expirada, favor efetuar o login novamente.');
                this.redirectToLogin();
                this.logout();
            }
            return e;
        };
    }

}

export const loginEndpoint = '/oauth2/token';
