import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { loginEndpoint } from '../login/login.service';
import { TokenLNDTOResponse } from 'app/core/services/ligacao-nova-se/ligacao-nova-se.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public storage: Storage;
  constructor(
    private _http: HttpClient
  ) {
    this.storage = sessionStorage;
  }

getToken(): Observable<TokenLNDTOResponse> {
    let url = environment.endpoints.ligacaoNovaSE;
    return this._http.get<TokenLNDTOResponse>(url).pipe(catchError(error => throwError(() => error)));
  }

  get accessToken(): string {
    return this.storage.access_token;
  }

  get idToken(): string {
    return this.storage.id_token;
  }

  get refreshToken(): string {
    return this.storage.refresh_token;
  }

  set accessToken(val: string) {
    if (!val) this.storage.removeItem("access_token");
    else this.storage.access_token = 'Bearer ' + val;
  }

  set idToken(val: string) {
    if (!val) this.storage.removeItem("id_token");
    else this.storage.id_token = val;
  }

  set refreshToken(val: string) {
    if (!val) this.storage.removeItem("refresh_token");
    else this.storage.refresh_token = val;
  }

  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
