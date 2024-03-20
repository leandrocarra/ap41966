import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { Religacao } from 'app/core/models/religacao/religacao';
import { ReligacaoImediataDTORequest, TaxaReligacaoDTORequestSE, ValidaReligacaoDTORequest } from 'app/core/models/religacao/request/religacao-dto';
import { ReligacaoImeadiataDTOResponse, TaxaReligacao, TaxaReligacaoDTOResponseSE, ValidaReligacaoDTOResponse } from 'app/core/models/religacao/response/religacao-dto';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ReligacaoService {
    dadosReligacao: Religacao;
    storage: Storage = sessionStorage;

    constructor(
        private _http: HttpClient,
    ) {
        this.dadosReligacao = new Religacao('', '', '', new TaxaReligacao('', '', '', 'horas', ''), 'sem débitos', [], false);
    }

    /**
     * Requisições
     */

    solicitarReligacao(solicitarReligacaoRequest: ReligacaoImediataDTORequest): Observable<ReligacaoImeadiataDTOResponse> {
        let endpoint = environment.endpoints.religacao + `${encodeURIComponent(solicitarReligacaoRequest.codigo)}/religacao-imediata`;
        let body = Object.assign({}, solicitarReligacaoRequest);
        return this._http.post<ValidaReligacaoDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    obterTaxaReligacao(taxaReligacao: TaxaReligacaoDTORequestSE): Observable<TaxaReligacaoDTOResponseSE> {
        let endpoint = environment.endpoints.religacao + `${encodeURIComponent(taxaReligacao.codigo)}/taxa-religacao`;
        let params = new HttpParams();
        Object.entries(taxaReligacao).forEach(([variavel, valor]) => {
            if (variavel !== 'codigo') {
                params = params.append(variavel, valor);
            }
        })
        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error)
            })
        );
    }

    getObterTaxaReligacao(taxaReligacao: TaxaReligacaoDTORequestSE): Promise<TaxaReligacaoDTOResponseSE | any> {
        return new Promise((dadosTaxaReligacao) => {
            if (this.dadosReligacao.uc === taxaReligacao.codigo) {
                dadosTaxaReligacao(this.getTaxaReligacao)
            } else {
                this.obterTaxaReligacao(taxaReligacao).subscribe({
                    next: (data: TaxaReligacaoDTOResponseSE) => {
                        this.dadosReligacao = this.getDadosReligacao;
                        this.dadosReligacao.dadosTaxa = data.taxaReligacao[0];
                        this.dadosReligacao.dadosTaxa.tempo = parseFloat(data.taxaReligacao[0].tempo ?? '').toString();
                        this.dadosReligacao.dadosTaxa.taxa = parseFloat(data.taxaReligacao[0].taxa ?? '').toString();
                        this.setDadosReligacao = this.dadosReligacao;
                        dadosTaxaReligacao(data);
                    },
                    error: (error: HttpErrorResponse) => {
                        dadosTaxaReligacao(error)
                    }
                })
            }
        });
    }

    validaReligacao(validaReligacaoRequest: ValidaReligacaoDTORequest): Observable<ValidaReligacaoDTOResponse> {
        let endpoint = environment.endpoints.religacao + `${encodeURIComponent(validaReligacaoRequest.codigo)}/valida-religacao`;
        let params = new HttpParams();
        Object.entries(validaReligacaoRequest).forEach(([variavel, valor]) => {
            if (variavel !== 'codigo' && valor) {
                params = params.append(variavel, valor);
            }
        });
        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error)
            })
        );
    }

    getValidaReligacao(validaReligacaoRequest: ValidaReligacaoDTORequest): Promise<ValidaReligacaoDTOResponse | any> {
        return new Promise((servicos) => {
            if (this.dadosReligacao.uc === validaReligacaoRequest.codigo) {
                servicos(this.getValidaDadosReligacao);
            } else {
                this.validaReligacao(validaReligacaoRequest).subscribe({
                    next: (validaReligacao: ValidaReligacaoDTOResponse) => {
                        this.setValidaDadosReligacao = validaReligacao;
                        if (environment.regiao == Regiao.NE) {
                            this.dadosReligacao = this.getDadosReligacao;
                            this.dadosReligacao.dadosTaxa.tempo = parseFloat(validaReligacao.prazoReligacao ?? '').toString();
                            this.dadosReligacao.dadosTaxa.taxa = parseFloat(validaReligacao.taxaReliga ?? '').toString();
                            this.setDadosReligacao = this.dadosReligacao;
                        }
                        servicos(validaReligacao);
                    },
                    error: (error: HttpErrorResponse) => {
                        servicos(error)
                    }
                })
            }
        });
    }

    /**
     * Getters e Setters
     */

    get getDadosReligacao(): Religacao {
        return (this.storage.dadosReligacao) ? JSON.parse(this.storage.dadosReligacao) : new Religacao('', '', '', new TaxaReligacao('', '', '', 'horas', ''), 'sem débitos', [], false);
    }

    set setDadosReligacao(val: Religacao) {
        this.dadosReligacao = val;
        this.storage.dadosReligacao = JSON.stringify(val);
    }

    get getValidaDadosReligacao(): ValidaReligacaoDTOResponse {
        return JSON.parse(this.storage.validaReligacao)
    }

    set setValidaDadosReligacao(validaReligacao: ValidaReligacaoDTOResponse) {
        this.storage.validaReligacao = JSON.stringify(validaReligacao)
    }

    get getTaxaReligacao(): TaxaReligacaoDTOResponseSE {
        return JSON.parse(this.storage.taxarReligacao)
    }
    set setTaxaReligacao(taxarReligacao: TaxaReligacaoDTOResponseSE) {
        this.storage.taxarReligacao = JSON.stringify(taxarReligacao)
    }

}
