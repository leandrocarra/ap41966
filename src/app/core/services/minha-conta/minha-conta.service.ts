import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { PathCompleto } from 'app/core/enums/servicos';
import { AtualizarMinhaContaDTORequest, AtualizarSenhaDTORequest, MinhaContaDTORequest, MinhaContaLegadoDTORequest } from 'app/core/models/minha-conta/request/minha-conta-dto';
import { AtualizarMinhaContaDTOResponse, AtualizarSenhaDTOResponse, MinhaContaDTOResponse, MinhaContaLegadoDTOResponse, MinhaContaLegadoDTOResponseSE } from 'app/core/models/minha-conta/response/minha-conta-dto';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CustomSweetAlertService } from '../customsweetalert/custom-sweet-alert.service';

const VALORES_POSITIVOS_HTTP = ['200', '201', '202'];

@Injectable({
	providedIn: 'root'
})
export class MinhaContaService {
	storage: Storage = sessionStorage;
  
	constructor(
		private _http: HttpClient,
		private _alert: CustomSweetAlertService,
		private _router: Router
	) { }

	/**
	 * Parte requisições ↓↓
	 */
    consultarMinhaContaLegado(requestDTO: MinhaContaLegadoDTORequest): Observable<MinhaContaLegadoDTOResponse> {
		let endpoint = `${environment.endpoints.minhaConta}minha-conta-legado`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
		return this._http.get<MinhaContaLegadoDTOResponse | any>(endpoint, { params }).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

	consultarMinhaContaLegadoSE(requestDTO: MinhaContaLegadoDTORequest): Observable<MinhaContaLegadoDTOResponseSE> {
		let endpoint = `${environment.endpoints.minhaConta}minha-conta-legado`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
		return this._http.get<MinhaContaLegadoDTOResponse | any>(endpoint, { params }).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

    consultarMinhaConta(requestDTO: MinhaContaDTORequest): Observable<MinhaContaDTOResponse> {
		let endpoint = `${environment.endpoints.minhaConta}minha-conta`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
		return this._http.get<MinhaContaDTOResponse | any>(endpoint, { params }).pipe(
			mergeMap((response) => VALORES_POSITIVOS_HTTP.includes(response.retorno.numero) ? of(response) : throwError(() => response))
		);
	}

	atualizarMinhaConta(dadosConta: AtualizarMinhaContaDTORequest): Observable<any> {
		let endpoint = `${environment.endpoints.minhaConta}atualizar-minha-conta`;

		return this._http.put<AtualizarMinhaContaDTOResponse | any>(endpoint, dadosConta).pipe(
            mergeMap((response) => VALORES_POSITIVOS_HTTP.includes(response.retorno.numero) ? of(response) : throwError(() => response))
        );
	}

	atualizarSenha(atualizarSenhaDTORequest: AtualizarSenhaDTORequest): Observable<any> {
		let endpoint = `${environment.endpoints.minhaConta}atualizar-senha`;

		return this._http.put<AtualizarSenhaDTOResponse | any>(endpoint, atualizarSenhaDTORequest).pipe(
            mergeMap((response) => VALORES_POSITIVOS_HTTP.includes(response.retorno.numero) ? of(response) : throwError(() => response))
        );
	}

	/**
	 * MÉTODOS ↓↓
	 */
	getAtualizarMinhaConta(atualizarContaRequest: AtualizarMinhaContaDTORequest, requisicaoPeloResolver: boolean = false): Promise<any> {
		return new Promise((resolve, errorPromise) => {
			this.atualizarMinhaConta(atualizarContaRequest).subscribe({
				next: (data) => {
					if (data.retorno.numero == '202' && requisicaoPeloResolver === false) {
						this._alert.alertAlteradoSucesso("Dados alterados com sucesso!");
					}
					resolve(atualizarContaRequest);
				},
				error: (error) => {
					errorPromise(this.tratarErrosAtualizarMinhaConta(error));
				}
			});
		});
	}

    tratarErrosAtualizarMinhaConta(error: any): any {
        switch (error.status) {
            case '400': {
                this._alert.alertErroRequisicao("Senha antiga não confere. Tente novamente.");
                return error;
            }
            case '401': {
                this._alert.alertErroRequisicao("Usuário não Autorizado.").then(() => {
                    this._router.navigate([PathCompleto.home]);
                    return `não autorizado`;
                });
            }
            case '403': {
                this._alert.alertErroRequisicao("Usuário com o perfil inativo!.").then(() => {
                    return `Usuário com o perfil inativo!`;
                });
            }
            case '404': {
                return `Usuário não encontrado`;
            }
            case '502': {
                this._alert.alertErroRequisicao("Sistema fora do ar, por favor tente novamente mais tarde.").then(() => this._router.navigate(['/']));
                return error;
            }
            default: {
                return error;
            }
        }
    }

	getAtualizarSenha(AtualizarSenhaDTORequest: AtualizarSenhaDTORequest) {
		return new Promise((atualizarSenhaPromise, errorPromise) => {
			this.atualizarSenha(AtualizarSenhaDTORequest).subscribe({
				next: (data) => {
					if (data.retorno.numero === '202') {
						this._alert.alertAlteradoSucesso("Senha alterada com sucesso!");
					}
					atualizarSenhaPromise(data);
				},
				error: (error) => {
					errorPromise(this.tratarErrosAtualizarSenha(error));
				}
			});
		});
	}

    tratarErrosAtualizarSenha(error: any): any {
        switch (error.status) {
            case '400': {
                this._alert.alertErroRequisicao("Senha antiga não confere. Tente novamente.");
                return error;
            }
            case '401': {
                this._alert.alertErroRequisicao("Sua sessão expirou. Entre novamente para continuar.").then(() => {
                    this._router.navigate([PathCompleto.home])
                    return `não autorizado`;
                });
            }
            case '403': {
                return `Usuário com o perfil inativo!`;
            }
            case '404': {
                return `Usuário não encontrado`;
            }
            case '502': {
                this._alert.alertErroRequisicao("Sistema fora do ar, por favor tente novamente mais tarde.").then(() => {
                    this._router.navigate([PathCompleto.home])
                });
                return error;
            }
            default: {
                return error;
            }
        }
    }

	/**
	 * Getters e Setters
	 */

	set setMinhaContaLegado(value: MinhaContaLegadoDTOResponse) {
		this.storage.minhaContaLegado = JSON.stringify(value);
	}

	get getMinhaContaLegado(): MinhaContaLegadoDTOResponse {
		return JSON.parse(this.storage.minhaContaLegado);
	}

	set setMinhaConta(value: MinhaContaDTOResponse) {
		this.storage.minhaConta = JSON.stringify(value);
	}

	get getMinhaConta(): MinhaContaDTOResponse {
		return JSON.parse(this.storage.minhaConta);
	}

	clearStorage(): void {
		localStorage.clear();
		sessionStorage.clear();
	}
}
