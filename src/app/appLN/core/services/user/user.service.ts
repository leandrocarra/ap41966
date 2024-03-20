import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { ErrorService } from '../error/error.service';


@Injectable({
    providedIn: 'root'
})

export class UserServiceLN {
    USUARIO_UE = 'SITE02CMP';
    CODIGO_PROTOCOLO = 0;
    storage: Storage = sessionStorage;
    httpOptions: any;
    usuarioBloqueado: string;
    idAtendimento: string;
    PROTOCOLO_SESSAO: string;
    uc: string;
    numeroOS: any;
    numeroCliente: any;
    constructor(
        private _http: HttpClient,
        private _errorService: ErrorService
    ) {
        this.PROTOCOLO_SESSAO = '';
        this.usuarioBloqueado = '';
        this.idAtendimento = '';
        this.uc = '';
    }

    consultarCNPJ(usuario: string): Observable<any> {
        let url = environmentLN.apiUrl + '/v2/apoio/ocr-empresa?protocolo=' + encodeURIComponent(this.protocolo) + '&usuarioUE=' + encodeURIComponent(environmentLN.USUARIO_UE);
        let body = {
            'cnpj': usuario,
            'databases': ["ondemand_rf_status"]
        }
        return this._http.post<any>(url, body).pipe(catchError(this._errorService.handleError<any>()))
    }

    consultarCPF(usuario: string): Observable<any> {
        let url = environmentLN.apiUrl + '/v2/apoio/ocr-pessoa?protocolo=' + encodeURIComponent(this.protocolo) + '&usuarioUE=' + encodeURIComponent(this.USUARIO_UE);
        let body = {
            'cpf': usuario,
            'databases': ["basic_data"]
        }
        return this._http.post<any>(url, body, this.httpOptions).pipe(catchError(this._errorService.handleError<any>()))
    }


    consultarUsuario(usuario: string): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/usuarios/' + encodeURIComponent(usuario.toString());
        return this._http.get<any>(urlApiNeo, this.httpOptions).pipe(catchError(this._errorService.handleError<any>()))
    }

    consultarCliente(usuario: string): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/clientes/' + encodeURIComponent(usuario.toString()) + '?protocolo=' + encodeURIComponent(this.protocolo) + '&usuarioUE=' + encodeURIComponent(this.USUARIO_UE);
        return this._http.get<any>(urlApiNeo, this.httpOptions).pipe(catchError(this._errorService.handleError<any>()));
    }

    gerarProtocolo(): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/protocolos/' + encodeURIComponent(this.USUARIO_UE) + '/' + encodeURIComponent(this.CODIGO_PROTOCOLO.toString());
        return this._http.get<any>(urlApiNeo, this.httpOptions).pipe(catchError(this._errorService.handleError<any>()))
    }

    pedidoRealizado(codigo: any): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/ucs/' + encodeURIComponent(codigo) + '/pedidos?protocolo=' + encodeURIComponent(this.protocolo) + '&usuarioUE=' + encodeURIComponent(this.USUARIO_UE);
        return this._http.get<any>(urlApiNeo, this.httpOptions).pipe(catchError(this._errorService.handleError<string>()));
    }

    buscarClassePrincipal(cnae: string): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/ligacao-nova/classe-principal-consumo?protocolo=' + encodeURIComponent(this.protocolo) + '&usuarioUE=' + encodeURIComponent(this.USUARIO_UE);

        let body = {
            "cnae": cnae,
        }
        return this._http.post<any>(urlApiNeo, body).pipe(
            catchError(this._errorService.handleError<string>()));
    }

    vistoriaPadrao(codigoLogradouro: string): Observable<any> {
        let req = {
            "documento": this.sessionUser.documento,
            "codigoLogradouro": codigoLogradouro
        }

        let urlApiNeo = environmentLN.apiUrl + '/v2/cre/vistoria-foto?protocolo=' + encodeURIComponent(this.protocolo) + '&usuarioUE=' + encodeURIComponent(this.USUARIO_UE);

        return this._http.post<any>(urlApiNeo, req).pipe(
            catchError(this._errorService.handleError<string>()));
    }

    gerarListaBancos(): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/bancos';

        return this._http.get<any>(urlApiNeo).pipe(
            catchError(this._errorService.handleError<any>())
        );
    }

    getProtocolo() {
        return new Promise<any>((resolve) => {
            if (this.protocolo && this.protocolo != "") {
                resolve(this.protocolo);
            } else {
                this.gerarProtocolo().subscribe(protocolo => {
                    resolve(protocolo);
                });
            }
        });
    }

    get protocolo(): string {
        return this.storage.protocolo;
    }

    set protocolo(val: string) {
        this.storage.protocolo = val;
    }

    get protocoloFinal(): string {
        return this.storage.protocoloFinal;
    }

    set protocoloFinal(protocolo: string) {
        this.storage.protocoloFinal = protocolo;
    }

    get sessionUser(): any {
        if (this.storage.sessionUser !== undefined) {
            return JSON.parse(this.storage.sessionUser);
        }
    }

    set sessionUser(val: any) {
        if (!val) this.storage.removeItem("sessionUser");
        else this.storage.sessionUser = JSON.stringify(val);
    }

    set setIdAtendimento(id: string) {
        this.idAtendimento = id;
    }

    get cnae(): string {
        return this.storage.cnae;
    }

    set cnae(val: any) {
        if (!val) this.storage.removeItem("cnae");
        else this.storage.cnae = val;
    }

    get tipoDocumento(): string {
        return this.storage.tipoDocumento;
    }

    set tipoDocumento(val: string) {
        this.storage.tipoDocumento = val;
    }

}
