import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CardPerfil, GrupoVinculos, MultiloginAcesso, PerfisDeAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { ObterServicosDTORequest, ObterVinculosDTORequest, ValidaRelacaoDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { ObterServicosDTOResponse, ObterVinculosDTOResponse, ValidaRelacaoDTOResponse } from 'app/core/models/multilogin/response/multilogin-dto';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from "rxjs/operators";
import { UserService } from '../user/user.service';
import { SelecaoPerfilDeAcessoService } from '../selecao-perfil-de-acesso/selecao-perfil-de-acesso.service';


@Injectable({
    providedIn: 'root'
})
export class MultiloginAcessoService {
    multiloginAcesso: MultiloginAcesso;
    sessionStorage: Storage = sessionStorage;
    podeAlterarPerfilDeAcesso: BehaviorSubject<boolean>;

    constructor(
        private _http: HttpClient,
        private _userService: UserService,
        private _selecaoPerfilDeAcessoService: SelecaoPerfilDeAcessoService
    ) {
        this.multiloginAcesso = new MultiloginAcesso();
        this.podeAlterarPerfilDeAcesso = new BehaviorSubject<boolean>(false);
    }

    /**
     * Requisições
     */

    validaRelacao(validaRelacaoRequest: ValidaRelacaoDTORequest): Observable<ValidaRelacaoDTOResponse> {
        let endpoint = `${environment.endpoints.multilogin}usuarios/valida-relacao`;
        let body = Object.assign({}, validaRelacaoRequest);
        return this._http.post<ValidaRelacaoDTOResponse>(endpoint, body).pipe(
            mergeMap((response) => response ? of(response) : throwError(() => response))
        );
    }

    getValidaRelacao(validaRelacaoRequest: ValidaRelacaoDTORequest): Promise<ValidaRelacaoDTOResponse | any> {
        return new Promise((resolve, reject) => {
            this.validaRelacao(validaRelacaoRequest).subscribe({
                next: (data) => {
                    this.setDadosValidaRelacao = data;
                    resolve(data);
                },
                error: (error) => {
                    reject(error);
                }
            })
        });
    }

    obterServicos(obterServicosRequest: ObterServicosDTORequest): Observable<ObterServicosDTOResponse> {
        const endpoint = `${environment.endpoints.multilogin}obter-servicos`;
        let params = new HttpParams();
        Object.entries(obterServicosRequest).forEach(([variavel, valor]) => {
            params = params.append(variavel, valor);
        });
        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error)
            })
        );
    }

    getObterServicos(obterServicosRequest: ObterServicosDTORequest): Promise<ObterServicosDTOResponse | any> {
        return new Promise((servicos, reject) => {
            if (this.sessionStorage.obterServicos) {
                servicos(this.listaServicos);
            } else {
                this.obterServicos(obterServicosRequest).subscribe({
                    next: (obterServicos: ObterServicosDTOResponse) => {
                        this.setListarServicos = obterServicos;
                        servicos(obterServicos);
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error);
                    }
                })
            }
        })
    }

    obterVinculoConcedido(obterVinculosConcedidos: ObterVinculosDTORequest): Observable<ObterVinculosDTOResponse> {
        const endpoint = `${environment.endpoints.multilogin}mlogin-obter-vinculos-concedidos`;
        let params = new HttpParams();
        Object.entries(obterVinculosConcedidos).forEach(([variavel, valor]) => {
            params = params.append(variavel, valor);
        });

        return this._http.get<any>(endpoint, { params }).pipe(catchError((error) => {
            return throwError(() => error);
        }));
    }

    getObterVinculoConcedido(obterVinculosConcedidos: ObterVinculosDTORequest): Promise<ObterVinculosDTOResponse | any> {
        return new Promise((vinculosConcedidos) => {
            this.obterVinculoConcedido(obterVinculosConcedidos).subscribe({
                next: (val: ObterVinculosDTOResponse) => {
                    this.multiloginAcesso.vinculosConcedidos = val.listaObjetoPerfisAtivos;
                    this.setMultiloginAcesso = this.multiloginAcesso;
                    vinculosConcedidos(val);
                },
                error: (error: HttpErrorResponse) => {
                    vinculosConcedidos(error);
                }
            });

        });
    }

    obterVinculosRecebidos(obterVinculosRecebidos: ObterVinculosDTORequest): Observable<ObterVinculosDTOResponse> {
        const endpoint = `${environment.endpoints.multilogin}mlogin-obter-vinculos-recebidos`;
        let params = new HttpParams();
        Object.entries(obterVinculosRecebidos).forEach(([variavel, valor]) => {
            params = params.append(variavel, valor);
        });
        return this._http.get<any>(endpoint, { params }).pipe(catchError((error) => {
            return throwError(() => error);
        }));
    }

    getObterVinculosRecebidos(obterVinculosRecebidos: ObterVinculosDTORequest): Promise<ObterVinculosDTOResponse | any> {
        return new Promise((vinculosRecebidos) => {

            this.obterVinculosRecebidos(obterVinculosRecebidos).subscribe({
                next: (val: ObterVinculosDTOResponse) => {
                    this.multiloginAcesso.perfisRecebidos = val.listaPerfisAtivo;
                    this.multiloginAcesso.vinculosRecebidos = val.listaObjetoPerfisAtivos;
                    this.setMultiloginAcesso = this.multiloginAcesso;
                    vinculosRecebidos(val);
                },
                error: (error: HttpErrorResponse) => {
                    this.multiloginAcesso.perfisRecebidos = [];
                    this.multiloginAcesso.vinculosRecebidos = [];
                    this.setMultiloginAcesso = this.multiloginAcesso;
                    vinculosRecebidos(error);
                }
            });

        });
    }


    /**
     * GETTERS E SETTERS
     */

    set setDadosValidaRelacao(validaRelacao: ValidaRelacaoDTOResponse) {
        this.sessionStorage.validaRelacao = JSON.stringify(validaRelacao);
    }

    get getDadosValidaRelacao(): ValidaRelacaoDTOResponse {
        return JSON.parse(this.sessionStorage.validaRelacao);
    }

    set setListarServicos(obterServicos: ObterServicosDTOResponse) {
        this.sessionStorage.obterServicos = JSON.stringify(obterServicos);
    }

    get listaServicos(): ObterServicosDTOResponse {
        return JSON.parse(this.sessionStorage.obterServicos);
    }

    set setMultiloginAcesso(dados: MultiloginAcesso) {
        this.sessionStorage.multiloginAcesso = JSON.stringify(dados);
    }

    get getMultiloginAcesso(): MultiloginAcesso {
        return JSON.parse(this.sessionStorage.multiloginAcesso ?? null);
    }


    /**
     * Métodos
     */

    definirDocumento(): string {
        let perfisComDocUsuario = [PerfisDeAcesso.A, PerfisDeAcesso.B, PerfisDeAcesso.acessoComum];
        return perfisComDocUsuario.includes(this.getMultiloginAcesso.perfilDeAcesso) ? this._userService.dadosUser.documento : this.getMultiloginAcesso.documentoCliente;
    }

    definirGrupos(val: ObterVinculosDTOResponse): void {
        this.multiloginAcesso.grupos = [];
        val.listaPerfisAtivo.forEach(elem => {
            
            //NOTE: remover vínculos de representante legal e cônjuge 
            //Esses tipos de vínuculos virá do legado
            if (elem.toUpperCase() !== PerfisDeAcesso.representanteLegal.toUpperCase() || elem.toUpperCase() !== PerfisDeAcesso.conjuge.toUpperCase()) {
                this.multiloginAcesso.grupos.push(
                    new GrupoVinculos(
                        elem = (elem.toUpperCase() === 'ACESSO COMPARTILHADO') ? 'PERFIL DE ACESSO' : elem,
                        this.definirTooltip(elem),
                        []
                    )
                );       
            }
        });

        val.listaObjetoPerfisAtivos.forEach(vinculos => {
            this.multiloginAcesso.grupos.forEach(elem => {
                vinculos.nomePerfil = vinculos.nomePerfil.toUpperCase() === 'ACESSO COMPARTILHADO' ? 'PERFIL DE ACESSO' : vinculos.nomePerfil;

                if (elem.nomeGrupo.toUpperCase() === vinculos.nomePerfil.toUpperCase()) {
                    vinculos.button = 'excluir',
                        vinculos.isValid = true,
                        elem.vinculos.push(vinculos)
                }
            });
        });

        this.setMultiloginAcesso = this.multiloginAcesso
    }

    definirTooltip(titulo: string): string {
        switch (titulo) {
            case PerfisDeAcesso.representanteLegal.toUpperCase():
                return 'Pessoa física que representa uma empresa diante da Receita Federal, ou outras pessoas físicas ou jurídicas que ela venha a se relacionar.'

            case PerfisDeAcesso.padronista.toUpperCase():
                return 'Profissional contratado e responsável pela construção do padrão de entrada de energia de uma Unidade Consumidora.'

            case PerfisDeAcesso.perfilDeAcesso.toUpperCase():
                return 'Pessoa que terá acesso a alguns serviços de uma Unidade Consumidora.'

            case PerfisDeAcesso.conjuge.toUpperCase():
                return 'Pessoa com que se tem relação conjugal ou de companheiro.'

            default:
                return ''
        }
    }

    validarFluxoDiretoAcessoComum(): boolean {
        let perfisLiberados: boolean = false;
        this._selecaoPerfilDeAcessoService.getCardsPerfis.forEach((elem: CardPerfil) => {
            if (!elem.disabled && elem.titulo !== PerfisDeAcesso.acessoComum) {
                perfisLiberados = true;
            }
        });
        if (!perfisLiberados) {
            this.multiloginAcesso.perfilDeAcesso = PerfisDeAcesso.B;
            this.setMultiloginAcesso = this.multiloginAcesso;
        }
        return (!perfisLiberados);
    }

}
