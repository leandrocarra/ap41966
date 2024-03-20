import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { DebitoAutomatico } from 'app/core/models/debito-automatico/debito-automatico';
import {
    AgenciaBancosDTORequest,
    BancosCadastradosDTORequest,
    CancelaDebitoAutomaticoDTORequest,
    DebitoAutomaticoDTORequest
} from 'app/core/models/debito-automatico/request/debito-automatico-dto';
import {
    AgenciaBancosDTOResponse,
    BancosCadastradosDTOResponse,
    CancelaDebitoAutomaticoDTOResponse,
    ContaCadastradaDebitoDTOResponse,
    DebitoAutomaticoDTOResponse
} from 'app/core/models/debito-automatico/response/debito-automatico-dto';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { LoadingService } from '../customsweetalert/loading.service';
import { SelecaoImovelService } from "../selecao-de-imovel/selecao-de-imovel.service";

@Injectable({
    providedIn: 'root'
})
export class DebitoAutomaticoService {
    podeConcluirDebitoAutomatico: boolean;
    debitoAutomatico: DebitoAutomatico;
    fluxoIniciado: boolean;
    private _debitoCadastradoResponse!: ContaCadastradaDebitoDTOResponse;

    constructor(
        private _http: HttpClient,
        private _loading: LoadingService,
        private _selecaoImovelService: SelecaoImovelService
    ) {
        this.debitoAutomatico = new DebitoAutomatico();
        this.podeConcluirDebitoAutomatico = false;
        this.fluxoIniciado = false;
    }

    /**
     * Parte requisições ↓↓
     */

    obterBancos(bancosCadastrados: BancosCadastradosDTORequest): Observable<BancosCadastradosDTOResponse> {
        let endpoint: string;
        let params = new HttpParams();
        Object.entries(bancosCadastrados).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
        if (environment.regiao === Regiao.NE) {
            params = params.delete('codigo');
        }
        endpoint = `${environment.endpoints.bancos}`

        return this._http.get<any>(endpoint, { params }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

    obterAgencia(agenciaBancosCadastrados: AgenciaBancosDTORequest): Observable<AgenciaBancosDTOResponse> {
        let endpoint: string
        let params = new HttpParams();

        endpoint = `${environment.endpoints.bancos}/${agenciaBancosCadastrados.banco}/${agenciaBancosCadastrados.agencia}/agencias`;

        Object.entries(agenciaBancosCadastrados).forEach(([variavel, valor]) => {
            if (valor !== undefined && (variavel !== 'banco' && variavel !== "agencia")) {
                params = params.append(variavel, valor)
            }
        })

        return this._http.get<AgenciaBancosDTOResponse | any>(endpoint, { params }).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    obterDebitoAutomatico(valida: 'X' | '' = ''): Observable<ContaCadastradaDebitoDTOResponse> {
        let endpoint: string
        let params = new HttpParams()
            .set('codigo', this._selecaoImovelService.getInformacoesUCSelecionada.codigo)
            .set('canalSolicitante', environment.canal)
            .set('usuario', environment.USUARIO_UE)
            .set('valida', valida);
        endpoint = `${environment.endpoints.debitoCadastrado}`

        return this._http.get<ContaCadastradaDebitoDTOResponse | any>(endpoint, { params }).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    cadastrarDebitoAutomatico(dadosCadastro: DebitoAutomaticoDTORequest): Observable<DebitoAutomaticoDTOResponse> {
        let endpoint = `${environment.endpoints.debitoAutomatico}${dadosCadastro.codigo}/debito-automatico`;
        let body = Object.assign({}, dadosCadastro);
        return this._http.post<any>(endpoint, body).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    cancelarDebitoAutomatico(dadosCancelamento: CancelaDebitoAutomaticoDTORequest): Observable<CancelaDebitoAutomaticoDTOResponse> {
        let endpoint = `${environment.endpoints.debitoAutomatico}${dadosCancelamento.codigo}/cancela-debito-automatico`;
        let body = Object.assign({}, dadosCancelamento);
        return this._http.post<any>(endpoint, body).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    /**
     * Getters e Setters
     */

    set setDebitoCadastrado(debitoCadastrado: ContaCadastradaDebitoDTOResponse) {
        this._debitoCadastradoResponse = debitoCadastrado;
    }

    get getDebitoCadastrado(): ContaCadastradaDebitoDTOResponse {
        return this._debitoCadastradoResponse;
    }

    set setDebitoAutomatico(debitoAutomatico: DebitoAutomatico) {
        this.debitoAutomatico = debitoAutomatico;
    }

    get getDebitoAutomatico(): DebitoAutomatico {
        return this.debitoAutomatico;
    }
}


