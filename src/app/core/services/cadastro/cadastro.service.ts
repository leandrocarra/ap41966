import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";

import { mergeMap, take } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Regiao } from "app/core/enums/regiao";
import { CadastroUsuarioDTORequest, UsuarioAtivoDTORequest, ValidaUsuarioDTORequest, GerarCodigoValidoDTORequest, CodigoValidaDTORequest, RecuperarSenhaDTORequest, DadosTrocaSenhaDTORequest, EsqueciSenhaDTORequest, EsqueciSenhaValidaDTORequest } from "app/core/models/cadastro/request/cadastro-dto";
import { CadastroUsuarioDTOResponse, CodigoValidaDTOResponse, DadosTrocaSenhaDTOResponse, EsqueciSenhaDTOResponse, EsqueciSenhaValidaDTOResponse, GerarCodigoValidoDTOResponse, UsuarioAtivoDTOResponse, ValidaUsuarioDTOResponse } from "app/core/models/cadastro/responses/cadastro-dto";

@Injectable({
  providedIn: "root",
})
export class CadastroService {

	fluxoCadastro: CadastroUsuarioDTORequest;
    fluxoRecuperarSenha: RecuperarSenhaDTORequest;
    tipoDeInscricao: string;
	responseUsuariosAtivo: UsuarioAtivoDTOResponse;

	constructor(
        private _http: HttpClient,
        private _recaptchaV3Service: ReCaptchaV3Service
        ) {
        this.fluxoCadastro = new CadastroUsuarioDTORequest();
        this.fluxoRecuperarSenha = new RecuperarSenhaDTORequest();
        this.responseUsuariosAtivo = new UsuarioAtivoDTOResponse();
        this.tipoDeInscricao = '';
	}

	consultarUsuarioAtivo(requestDTO: UsuarioAtivoDTORequest): Observable<UsuarioAtivoDTOResponse> {
		const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/ativo`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<UsuarioAtivoDTOResponse>(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

	consultarValidaUsuario(requestDTO: ValidaUsuarioDTORequest): Observable<ValidaUsuarioDTOResponse> {
		const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/valida-usuario`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<ValidaUsuarioDTOResponse>(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

	obterRecaptcha(): Promise<string> {
		return new Promise((resolve, reject) => {
			this._recaptchaV3Service.execute('importantAction').pipe(take(1)).subscribe({
				next: (token: string) => {
                    console.log('Recaptcha:', token.substring(0, 10) + '...');
                    resolve(token);
                },
				error: (error) => {
                    console.log('Erro no recaptcha:', error);
					reject(error);
				},
			});
		});
	}

    cadastrarUsuario(requestDTO: CadastroUsuarioDTORequest): Observable<CadastroUsuarioDTOResponse> {
		const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<CadastroUsuarioDTOResponse>(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

    gerarCodigoValido(requestDTO: GerarCodigoValidoDTORequest): Observable<GerarCodigoValidoDTOResponse> {
		const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/gerar-codigo-valido`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
		return this._http.get<GerarCodigoValidoDTOResponse>(endpoint, { params }).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

    validarCodigo(requestDTO: CodigoValidaDTORequest): Observable<CodigoValidaDTOResponse> {
		const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/codigo-valida`;
		const body = Object.assign({}, requestDTO);
		return this._http.post<CodigoValidaDTOResponse>(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

    definirDocumentosPorRegiao(): Array<string> {
        if (environment.regiao === Regiao.NE) {
            return [
                'Nenhum',
                'RG',
                'CNH',
                'Passaporte',
                'Carteira de Trabalho',
                'Identificação Profissional',
                'Identificação Militar',
                'RNE',
                'RFA'
            ];
        } else {
            return [
                'Nenhum',
                'RG',
                'Passaporte',
                'Carteira de Trabalho'
            ];
        }
    }

    definirEmailParaRequest(): string {
        return this.fluxoCadastro.tipoCliente === 'F' ?
            this.fluxoCadastro.clienteF.email : this.fluxoCadastro.clienteJ.solicitante.email;
    }

    dadosTrocarSenha(requestDTO: DadosTrocaSenhaDTORequest):Observable<DadosTrocaSenhaDTOResponse> {
        const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/dados-troca-senha`;
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
        return this._http.get<DadosTrocaSenhaDTOResponse>(endpoint, { params }).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    enviarCodigoVerificacao(requestDTO: EsqueciSenhaDTORequest): Observable<EsqueciSenhaDTOResponse> {
        const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/esqueci-senha`;
        const body = Object.assign({}, requestDTO);
        return this._http.post<EsqueciSenhaDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    validarNovaSenha(requestDTO: EsqueciSenhaValidaDTORequest): Observable<EsqueciSenhaValidaDTOResponse>{
        const endpoint = `${environment.endpoints.areaNaoLogada}/usuarios/esqueci-senha-valida`;
        const body = Object.assign({}, requestDTO);
        return this._http.put<EsqueciSenhaValidaDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }
}
