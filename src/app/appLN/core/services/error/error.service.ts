import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { Observable } from 'rxjs';
import { CustomSweetAlertService } from '../sweet-alert/custom-sweet-alert.service';


@Injectable({
    providedIn: 'root'
})

export class ErrorService {

    constructor(
        private _router: Router,
        private _alert: CustomSweetAlertService,
        private _loadingService: LoadingService
    ) { }

    handleError<T>() {
        return (error: any): Observable<T> => {
            if (error && error.error && error.error.message == 'Authorization has been denied for this request.') {
                this._loadingService.stop();
                this._alert.alertError('Sessão expirada, favor efetuar o login novamente.');
                this.logout();
            }

            return error;
        };
    }

    logout() {
        this._router.navigate(['/']);
    }

}
