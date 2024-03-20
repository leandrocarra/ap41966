import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { UserServiceLN } from '../user/user.service';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';

@Injectable({
    providedIn: 'root'
})

export class DebitoFaturaService {
    private justificativa: string;
    private comprovanteDebitoValidado: boolean;
    public listaFaturasImovel: any;
    public listaFaturasCPF: any;
    public codigoCliente: any;
    public pendencias: any;


    constructor(
        private _userServiceLN: UserServiceLN,
        private _http: HttpClient,
        private _errorService: ErrorService,
    ) {
        this.justificativa = '';
        this.comprovanteDebitoValidado = false;
    }

    set setListaFaturasImovel(faturas: any) {
        this.listaFaturasImovel = faturas;
    }

    get getListaFaturasImovel(): any {
        return this.listaFaturasImovel;
    }

    set setListaFaturasCPF(faturas: any) {
        this.listaFaturasCPF = faturas;
    }

    get getListaFaturasCPF(): any {
        return this.listaFaturasCPF;
    }

    set setCodigoCliente(codigo: any) {
        this.codigoCliente = codigo;
    }

    set setPendencias(pendencias: any) {
        this.pendencias = pendencias;
    }

    get getPendencias(): any {
        return this.pendencias;
    }

    set setJustificativa(justificativa: string) {
        this.justificativa = justificativa;
    }

    get getJustificativa(): string {
        return this.justificativa;
    }

    set setComprovanteDebitoValidado(comprovanteDebitoValidado: boolean) {
        this.comprovanteDebitoValidado = comprovanteDebitoValidado;
    }

    get getComprovanteDebitoValidado(): boolean {
        return this.comprovanteDebitoValidado;
    }


    listarFaturas(codcliente: string): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/clientes/' + encodeURIComponent(codcliente) + '/faturas-aberto?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
        return this._http.get<any>(urlApiNeo).pipe(
            mergeMap((response) => response?.status == 401 ? throwError(null) : of(response))
        );
    }

    listarDebitoImovel(codigo: any): Observable<any> {
        let urlApiNeo = environmentLN.apiUrl + '/v2/ucs/' + encodeURIComponent(codigo) + '/debito-ligacao-nova?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);
        return this._http.get<any>(urlApiNeo).pipe(catchError(this._errorService.handleError<any>()));
    }

    gerarTokenPagarFaturas(uc: any, listFatura: any = []) {

        let urlApiNeo = environmentLN.apiUrl + '/v2/arrecadacao/arrecadacao-token';

        let body = {
            'uc': uc,
            'listFatura': listFatura
        };

        return this._http.post<string>(urlApiNeo, body).pipe(catchError(this._errorService.handleError<any>()));
    }

    verificaPagamento(codigos: any = []) {
        let urlApiNeo = environmentLN.apiUrl + '/v2/arrecadacao/faturas-pagas?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);

        let body = {
            codigos
        };

        return this._http.post<boolean>(urlApiNeo, body).pipe(catchError(this._errorService.handleError<any>()));
    }
}
