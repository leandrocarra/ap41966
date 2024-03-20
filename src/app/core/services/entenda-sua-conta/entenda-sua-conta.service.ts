import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EntendaSuaContaDTORequest, EntendaSuaContaQualidadeDTORequest } from 'app/core/models/entenda-sua-conta/request/entenda-sua-conta-dto';
import { BandeiraTarifariaDTO, DICDTO, DICRIDTO, DMICDTO, EntendaSuaContaDTOResponse, EntendaSuaContaQualidadeDTOResponse, FICDTO } from 'app/core/models/entenda-sua-conta/response/entenda-sua-conta-dto';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EntendaSuaContaService {
    storage: Storage = sessionStorage;
    private _dadosEntendaSuaConta!: EntendaSuaContaDTOResponse;
    private _dadosEntendaSuaContaQualidade!: EntendaSuaContaQualidadeDTOResponse;
    private _fatura!: FaturaDTO;
    public faturaIndex!: number;
    constructor(
        private _http: HttpClient,
    ) { }

    /*
    * REQUISIÇÕES
    */

    entendaSuaConta(entendaContaRequest: EntendaSuaContaDTORequest): Observable<EntendaSuaContaDTOResponse> {
        let endpoint = `${environment.endpoints.entendaSuaConta}${entendaContaRequest.fatura}/entenda-conta`;
        let params = new HttpParams();
        Object.entries(entendaContaRequest).forEach(([variavel, valor]) => {
            if (valor) {
                params = params.append(variavel, valor);
            }
        });

        params = params.delete('fatura');
        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    getConsultarEntendaSuaConta(entendaSuaContaRequest: EntendaSuaContaDTORequest): Promise<EntendaSuaContaDTOResponse> {
        return new Promise((resolve, errorResolve) => {
            this.entendaSuaConta(entendaSuaContaRequest).subscribe({
                next: (data) => {
                    this.setDadosEntendaSuaConta = data;
                    resolve(data);
                },
                error: (error) => {
                    errorResolve(error);
                }
            });
        });
    }

    entendaSuaContaQualidade(entendaContaQualidadeRequest: EntendaSuaContaQualidadeDTORequest): Observable<EntendaSuaContaQualidadeDTOResponse> {
        let endpoint = `${environment.endpoints.entendaSuaConta}${entendaContaQualidadeRequest.fatura}/entenda-conta-qualidade`;
        let params = new HttpParams();
        Object.entries(entendaContaQualidadeRequest).forEach(([variavel, valor]) => {
            if (valor) {
                params = params.append(variavel, valor);
            }
        });
        params = params.delete('fatura');
        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    consultarEntendaSuaContaQualidade(entendaSuaContaQualidadeRequest: EntendaSuaContaQualidadeDTORequest): Promise<EntendaSuaContaQualidadeDTOResponse> {
        return new Promise((resolve, errorResolve) => {
        this.entendaSuaContaQualidade(entendaSuaContaQualidadeRequest).subscribe({
                next: (data) => {
                    this.setDadosEntendaContaQualidade = data;
                    resolve(data);
                },
            });
        });
    }

    /*
    * GETTERS E SETTERS
    */
    set setEntendaSuaConta(contaEscolhida: EntendaSuaContaDTOResponse) {
        this._dadosEntendaSuaConta = contaEscolhida;
    }

    get getEntendaSuaConta(): EntendaSuaContaDTOResponse {
        return this._dadosEntendaSuaConta;
    }

    get getBandeiraTarifaria(): Array<BandeiraTarifariaDTO> {
        return this._dadosEntendaSuaConta.bandeiraTarifaria;
    }

    set setEntendaContaQualidade(entendaContaQualidade: EntendaSuaContaQualidadeDTOResponse) {
        this._dadosEntendaSuaContaQualidade = entendaContaQualidade;
    }

    get getEntendaContaQualidade(): EntendaSuaContaQualidadeDTOResponse {
        return this._dadosEntendaSuaContaQualidade;
    }

    get getDIC(): DICDTO {
        return this._dadosEntendaSuaContaQualidade.dic;
    }

    get getFIC(): FICDTO {
        return this._dadosEntendaSuaContaQualidade.fic;
    }

    get getDMIC(): DMICDTO {
        return this._dadosEntendaSuaContaQualidade.dmic;
    }

    get getDICRI(): DICRIDTO {
        return this._dadosEntendaSuaContaQualidade.dicri;
    }

    set setDadosEntendaSuaContaStorage(entendaSuaConta: EntendaSuaContaDTOResponse) {
        this.storage.dadosEntendaSuaConta = JSON.stringify(entendaSuaConta);
    }

    get getDadosEntendaSuaContaStorage(): EntendaSuaContaDTOResponse {
        return JSON.parse(this.storage.dadosEntendaSuaConta);
    }

    set setDadosEntendaSuaConta(entendaSuaConta: EntendaSuaContaDTOResponse) {
        this._dadosEntendaSuaConta = entendaSuaConta;
    }

    get getDadosEntendaSuaConta(): EntendaSuaContaDTOResponse {
        return this._dadosEntendaSuaConta;
    }

    set setDadosEntendaContaQualidade(entendaSuaContaQualidade: EntendaSuaContaQualidadeDTOResponse) {
        this._dadosEntendaSuaContaQualidade = entendaSuaContaQualidade;
    }

    get getDadosEntendaContaQualidade(): EntendaSuaContaQualidadeDTOResponse {
        return this._dadosEntendaSuaContaQualidade;
    }

    set setFatura(fatura: FaturaDTO) {
        this._fatura = fatura;
    }

    get getFatura(): FaturaDTO {
        return this._fatura;
    }

}
