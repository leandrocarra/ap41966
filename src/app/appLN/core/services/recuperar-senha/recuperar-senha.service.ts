import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { ErrorService } from '../error/error.service';
import { UserServiceLN } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  constructor(
    private _http: HttpClient,
    private _userServiceLN: UserServiceLN,
    private _errorService: ErrorService
  ) { }

  resgatarSenha(form: FormGroup): Observable<string> {
    let urlApiNeo = environmentLN.apiUrl + '/v2/usuarios/esqueci-senha';

    let body = {
      "documento": form.value.documento,
      "email": form.value.email,
      "protocolo": '0',
      "usuarioUE": this._userServiceLN.USUARIO_UE,
      "tipoEnvio": parseInt(form.value.tipoEnvioToken)
    };

    return this._http.post<string>(urlApiNeo, body).pipe(catchError(this._errorService.handleError<string>()));
  }

  validarNovaSenha(RecuperarSenha: any): Observable<string> {
    let urlApiNeo = environmentLN.apiUrl + '/v2/usuarios/esqueci-senha-valida';
    return this._http.post<string>(urlApiNeo, RecuperarSenha).pipe(catchError(this._errorService.handleError<string>()));
  }
}
