import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { LoginResponseDTO } from 'app/core/models/LoginDTO/loginResponseDTO.model';
import { UserResponseDTO } from 'app/core/models/UserDTO/userResponseDTO.model';
import jwt_decode from 'jwt-decode';
import { Observable, of, throwError } from "rxjs";
import { catchError, mergeMap } from 'rxjs/operators';
import { LoginRequestDTO } from '../../models/LoginDTO/loginRequestDTO.model';
import { UserService } from '../user/user.service';

@Injectable()

export class TokenService {
  storage: Storage = localStorage;

  constructor(
    private _http: HttpClient,
    private _userService: UserService,
  ) { }

  requestToken(loginRequest: LoginRequestDTO): Observable<LoginResponseDTO> {
    let params = new HttpParams();
    params = params.append('grant_type', loginRequest.grant_type);
    params = params.append('client_id', loginRequest.client_id);
    params = params.append('client_secret', loginRequest.client_secret);
    params = params.append('username', loginRequest.username);
    params = params.append('password', loginRequest.password);
    params = params.append('scope', loginRequest.scope);

    return this._http.post<any>(environment.endpoints.token, params).pipe(
      mergeMap((response) => response.access_token ? of(response) : throwError(() => response) )
      );
  }

  requestRefreshToken(loginRequest: LoginRequestDTO): Observable<LoginResponseDTO> {
    let params = new HttpParams();
    params = params.append('grant_type', "refresh_token");
    params = params.append('refresh_token',this.refreshToken);
    params = params.append('client_id', loginRequest.client_id);
    params = params.append('client_secret', loginRequest.client_secret);
    return this._http.post<any>(environment.endpoints.token, params).pipe(catchError(this.handleError));
  }

  set token(token: LoginResponseDTO) {
    this.storage.setItem('token', JSON.stringify(token));
    this._userService.updateDadosUser(this.decodePayloadJwt(false));
  }

  get accessToken(): string {
    let token = JSON.parse(this.storage.getItem('token') as string);

    return token.access_token;
  }

  get idToken(): string {
    let token = JSON.parse(this.storage.getItem('token') as string);
    return token?.id_token;
  }

  get refreshToken(): string {
    let token = JSON.parse(this.storage.getItem('token') as string);
    return token.refresh_token;
  }

  set refreshToken(val: string) {
    if (!val) this.storage.removeItem("refresh_token");
    else this.storage.refresh_token = val;
  }

  decodePayloadJwt(atualizarUsuarioAcesso: boolean): any {
    try {
      let infos = jwt_decode(this.idToken)
      this._userService.updateDadosUser(infos as UserResponseDTO, atualizarUsuarioAcesso);
      return infos;
    } catch (error) {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  clearStorage():void {
    localStorage.clear();
    sessionStorage.clear();
    this._userService.updateDadosUser(new UserResponseDTO());
  }
}
