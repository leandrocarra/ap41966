import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Canal } from 'app/core/enums/distribuidoras';
import { UcInfosResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/uc-infos-response-dto';
import { UCResponseDTO, UserUcsResponseDTO } from 'app/core/models/selecao-de-imoveis/DTO/responses/user-ucs-response-dto';
import { GrupoTensao } from 'app/core/models/selecao-de-imoveis/selecao-de-imoveis';
import { UserService } from '../user/user.service';
import { EnumStatusUC, STATUS_POSITIVOS_POSSIVEIS } from 'app/core/enums/unidade-consumidora';
import { Regiao } from "../../enums/regiao";
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { LoadingService } from '../customsweetalert/loading.service';

const CINCO_MINUTOS = 300000;
const STATUS_CORTADO_SE: Array <EnumStatusUC> = [EnumStatusUC.Suspensa, EnumStatusUC.Cortado];

@Injectable({
    providedIn: 'root'
})
export class SelecaoImovelService {

    private stageUcSelecionada = new BehaviorSubject<UCResponseDTO | null>(null);
    ucSelecionada: UCResponseDTO | any;
    storage: Storage = sessionStorage;
    protocoloSonda: string = '';
    opcaoSSOS: string = 'N';
    protocolo: string = '123';

    constructor(
        private _http: HttpClient,
        private _user: UserService,
        private _router: Router,
        private _loadingService: LoadingService
    ) {
        this.ucSelecionada = this.stageUcSelecionada.asObservable();
    }

    updateUcSelecionada(ucResponse: UCResponseDTO | null): void {
        this.stageUcSelecionada.next(ucResponse);
    }

    /*
     *  Parte Requisições ↓↓
     */
    consultarImoveis(documento: string, pesquisa?: any): Observable<any> {
        let endpoint: string;

        if (environment.canal == Canal.AGE) {
            endpoint = `${environment.endpoints.selecaoImovel}clientes/${documento}/ucs?canalSolicitante=${environment.canal}&usuario=${environment.USUARIO_UE}&opcaoSSOS=N`;
        } else {
            if (pesquisa === undefined) {
                endpoint = `${environment.endpoints.selecaoImovel}clientes/${documento}/ucs?canalSolicitante=${environment.canal}&usuario=${environment.USUARIO_UE}&protocolo=${this.protocolo}`;
            } else {
                endpoint = `${environment.endpoints.selecaoImovel}clientes/${documento}/ucs?canalSolicitante=${environment.canal}&usuario=${environment.USUARIO_UE}&protocolo=${this.protocolo}&codigo=${pesquisa}`;
            }
        }

        return this._http.get<UserUcsResponseDTO | any>(endpoint).pipe(
            map((data) => {
                return this.tratarArrayIncorreto(data);
            }),
            catchError((error: HttpErrorResponse) => {
                this._router.navigate(
                    [PathCompleto.home, 'aviso'],
                    { queryParams: { titulo: EnumTitulosPadroes.Indisponivel } }
                );
                this._loadingService.stop();
                return throwError(() => error);
            })
        );
    }

    tratarArrayIncorreto(data: any): any {
        if (data.ucs instanceof Array) {
            return data;
        } else {
            data.ucs = [data.ucs];
            return data;
        }
    }

    receberInformacoesUCSelecionada(codigo: string): Observable<UcInfosResponseDTO | any> {
        let endpoint: string;

        if (environment.canal == Canal.AGE) {
            endpoint = `${environment.endpoints.selecaoImovel}ucs/${codigo}?&opcaoSSOS=${this.opcaoSSOS}&usuario=${environment.USUARIO_UE}&canalSolicitante=${environment.canal}`;
        } else {
            endpoint = `${environment.endpoints.selecaoImovel}ucs/${codigo}?canalSolicitante=${environment.canal}&usuario=${environment.USUARIO_UE}&protocolo=${this.protocolo}`;
        }
        return this._http.get<UcInfosResponseDTO>(endpoint).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    /*
     * Parte Session Storage  ↓↓
     */

    getMeusImoveis(documento: string): Promise<UserUcsResponseDTO | any> {
        return new Promise((meusImoveis) => {
            // Provisório: Testa se foi feito o update dos dados há mais de 5 minutos
            const updateTime = new Date().valueOf() - new Date(this.storage.ultimaAtualizacaoUcs).valueOf();
            if (this.storage.ucs && updateTime < CINCO_MINUTOS) {
                meusImoveis(JSON.parse(this.storage.ucs));
            } else {
                this.consultarImoveis(documento).subscribe({
                    next: (imoveisDoCliente: UserUcsResponseDTO) => {
                        imoveisDoCliente.ucs = imoveisDoCliente.ucs.map((ucResponseDTO) => {
                            if (ucResponseDTO.status?.toUpperCase() === EnumStatusUC.Potencial) {
                                return { ...ucResponseDTO, status: EnumStatusUC.Ligando };
                            } else {
                                return ucResponseDTO;
                            }
                        });

                        this.setMeusImoveis = imoveisDoCliente;
                        meusImoveis(imoveisDoCliente);
                    },
                    error: (error: HttpErrorResponse) => {
                        if (error.status !== 401) {
                            if (error.error?.retorno?.numero === "153") {
                                meusImoveis(new UserUcsResponseDTO([], null, undefined, error.error.retorno));
                            } else {
                                meusImoveis(error);
                            }
                        }
                    }
                });
            }
        });
    }

    requisitarPesquisaNaBaseDeDados(pesquisa: any): Promise<UserUcsResponseDTO | any> {
        return new Promise((resolve) => {
            this.consultarImoveis(this._user.dadosUser.documento, pesquisa).pipe(take(1)).subscribe({
                next: (userUcsResponse: UserUcsResponseDTO) => {
                    resolve(userUcsResponse);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status !== 401) {
                        resolve(error.error)
                    }
                    resolve([]);
                }
            });
        });
    }

    temInformacoesUCSelecionada(ucEscolhida: string): Promise<UcInfosResponseDTO | any> {
        return new Promise((ucSelecionada) => {
            // Provisório: Testa se foi feito o update dos dados há mais de 5 minutos
            const updateTime = new Date().valueOf() - new Date(this.storage.ultimaAtualizacaoUcs).valueOf();
            if (this.storage.informacoesUCSelecionada && updateTime < CINCO_MINUTOS && this.storage.informacoesUCSelecionada.uc === ucEscolhida) {
                ucSelecionada(this.getInformacoesUCSelecionada);
            } else {
                this.receberInformacoesUCSelecionada(ucEscolhida).subscribe({
                    next: (informacoesUC: UcInfosResponseDTO) => {
                        this.setInformacoesUCSelecionada = informacoesUC;
                        ucSelecionada(informacoesUC);
                    },
                    error: (error: HttpErrorResponse) => {
                        ucSelecionada(error);
                    }
                });
            }
        })
    }

    /*
     * Parte Session Storage  ↓↓
     */

    set setMeusImoveis(userUCsResponse: UserUcsResponseDTO) {
        this.storage.ultimaAtualizacaoUcs = new Date().toString();
        this.storage.ucs = JSON.stringify(userUCsResponse);
    }

    set setUCSelecionada(ucEscolhida: UCResponseDTO | null) {
        this.updateUcSelecionada(ucEscolhida);
        this.storage.ucSelecionada = JSON.stringify(ucEscolhida);
    }

    get getUCSelecionada(): UCResponseDTO | null {
        if (this.storage.ucSelecionada) {
            this.updateUcSelecionada(JSON.parse(this.storage.ucSelecionada));
            return JSON.parse(this.storage.ucSelecionada);
        } else {
            return null;
        }
    }

    set setInformacoesUCSelecionada(value: UcInfosResponseDTO) {
        this.storage.informacoesUCSelecionada = JSON.stringify(value);
    }

    get getInformacoesUCSelecionada(): UcInfosResponseDTO {
        return JSON.parse(this.storage.informacoesUCSelecionada);
    }

    get getGrupoDoUsuario(): GrupoTensao {
        return this.storage.userGroup;
    }

    set setGrupoDoUsuario(grupoDoUsuario: GrupoTensao) {
        this.storage.userGroup = grupoDoUsuario;
    }

    get getEnderecoCompleto(): string {
        if (this.getUCSelecionada?.local.endereco != null) {
            return `${this.getUCSelecionada?.local.endereco}, ${this.getUCSelecionada?.local.bairro}, ${this.getUCSelecionada?.local.municipio}, ${this.getUCSelecionada?.local.uf}, ${this.getUCSelecionada?.local.cep}`;
        } else {
            return ``;
        }
    }

    get getContato(): string {
        return `${this.getInformacoesUCSelecionada.cliente?.contato.celular?.ddd}${this.getInformacoesUCSelecionada.cliente?.contato.celular?.numero}`
    }

    get ehContaContratoMae(): boolean {
        return (STATUS_POSITIVOS_POSSIVEIS?.includes(this.getUCSelecionada?.indCCColetiva ?? ''))
	}

	get ehColetivaFilha(): boolean {
		return (STATUS_POSITIVOS_POSSIVEIS?.includes(this.getUCSelecionada?.isGrupo ?? ''));
	}

    clearStorage(): void {
        localStorage.clear();
        sessionStorage.clear();
    }

    get unidadeDesligada(): boolean {
        return this.getUCSelecionada?.status === EnumStatusUC.Desligado;
    }

    get unidadeSuspensa(): boolean {
        return environment.regiao === Regiao.NE ? (this.getUCSelecionada?.status === EnumStatusUC.Suspensa || this.getUCSelecionada?.status == null) : STATUS_CORTADO_SE.includes(<EnumStatusUC>this.getUCSelecionada?.status);
    }

    get unidadeEmPeriodoDeLeitura(): boolean {
        // Fatura em período de leitura === Em período de faturamento === fatura OSB.
        return STATUS_POSITIVOS_POSSIVEIS.includes(this.getInformacoesUCSelecionada?.caracteristicas.espelho);
    }

}
