import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TokenService } from 'app/core/services/token/token.service';
import { catchError, EMPTY, empty, Observable, throwError } from 'rxjs';
import { CustomSweetAlertService } from '../services/customsweetalert/custom-sweet-alert.service';
import { LoadingService } from '../services/customsweetalert/loading.service';
import { PixService } from '../services/pix/pix.service';
import { LigacaoNovaSEService } from '../services/ligacao-nova-se/ligacao-nova-se.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    //URLs que não utilizam access token
    allowedUrls: string[] = [
        environment.endpoints.token,
        '/areanaologada',
        'assets/images/',
        'https://api-agenciahml.elektro.com.br/oauth2/token'
    ];

    constructor(
        private _alert: CustomSweetAlertService,
        private _token: TokenService,
        private _router: Router,
        private _loading: LoadingService,
        private _pix: PixService,
        private _ligacaoNovaSEService: LigacaoNovaSEService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addToken(request)).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && error.error && error.statusText === 'Unauthorized') {
                    this._loading.stop();
                    this._router.navigate(['login']);
                    this._alert.alertErroRequisicao('Sua sessão expirou');
                    return EMPTY;
                }
                return throwError(() =>error); //tratativa de token expirado
            })
        );
    }

    //TODO
    solicitarRefreshToken() {
        // let loginRequestDTO = new LoginRequestDTO('','');
        // this._token.requestRefreshToken(loginRequestDTO).subscribe({
        //     next: (data: LoginResponseDTO) => {
        //         this._token.token = data;
        //     },
        //     error: () => {
        //         this._alert.alertBasic("Sessão expirada, favor efetuar o login novamente.");
        //         this._loginService.onLogout(true);
        //     }
        // })
    }

    addToken(request: any): HttpRequest<any> {

        //Chamadas Pix
        if (request.url.includes(environment.endpoints.pix)) {
            return this.definirChamadaPix(request)
        }
        else if (this.needsToken(request.url) && request.url.includes('.elektro.com.br')) {
            request = request.clone({
                setHeaders: {
                    Authorization: this._ligacaoNovaSEService.getTokenLN,
                    Accept: "application/json",
                }
            });
        }
        else if (this.needsToken(request.url) && this._token.accessToken) {
            let authorization = (request.url.includes("https://flexpag-api-neoenergia-hom.flexpag.com/")) ? `Basic ${environment.tokenFlexPag}` : `Bearer ${this._token.accessToken}`;
            request = request.clone({
                setHeaders: {
                    Authorization: authorization,
                    Accept: "application/json",
                }
            });
        }
        return request;
    }

    needsToken(url: string) {
        for (let item of this.allowedUrls) {
            if (url.includes(item)) {
                return false;
            }
        }
        return true;
    }

    definirChamadaPix(request: HttpRequest<any>): HttpRequest<any> {

        if (request.url.includes("auth-server/.well-known/jwks.json")) {
            request = request.clone({
                setHeaders: {
                    apikey: environment.apiKeyJWKS,
                }
            });
        }

        else if (request.url.includes("/auth/oauth/")) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Basic ' + window.btoa(`${request.body.updates[1].value}:${request.body.updates[3].value}`),
                    apikey: environment.apiKeyTokenPix,
                }
            });
        }

        else if(request.url.includes("/gerarPix")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._pix.getTokenPix.access_token}`,
                    apikey: environment.apiKeyJWKS,
                }
            });
        }
        return request;
    }
}
