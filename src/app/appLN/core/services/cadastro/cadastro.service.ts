import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { UsuarioDAO } from '../../models/user/usuarioDAO';
import { ErrorService } from '../error/error.service';
import { UserServiceLN } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  public storage: Storage = sessionStorage;

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService,
    private _userServiceLN: UserServiceLN,
  ) { }

  criarUsuario(usuario: UsuarioDAO): Observable<string> {

    const urlApiNeo = environmentLN.apiUrl + '/v2/usuarios/' + encodeURIComponent(usuario.cpf.toString()) + '/novo';

    const req = {
      'nome': usuario.username,
      'documento': usuario.cpf,
      'telefone': '',
      'celular': usuario.celular,
      'email': usuario.email,
      'senha': usuario.password,
      'protocolo': '',
      'usuarioUE': this._userServiceLN.USUARIO_UE,
      'RG': '',
      'DataNascimento': '',
      'tipoEnvio': usuario.tipoEnviado
    };

    return this._http.post<string>(urlApiNeo, req).pipe(catchError(this._errorService.handleError<string>()));
  }

  clearSession (): void {
    localStorage.clear();
    sessionStorage.clear();
  }

}
