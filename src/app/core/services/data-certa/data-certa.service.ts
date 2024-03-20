import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DataCerta, OperacaoDataCerta } from 'app/core/models/data-certa/data-certa';
import {
    AlterarDataCertaDTORequest,
    DataCertaDiasDTORequest,
    DataCertaDTORequest,
    DataCertaValidaDTORequest
} from 'app/core/models/data-certa/request/data-certa-dto';
import {
    AlterarDataCertaDTOResponse,
    DataCertaDiasDTOResponse,
    DataCertaDTOResponse,
    DataCertaValidaDTOResponse
} from 'app/core/models/data-certa/response/data-certa-dto';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from "rxjs/operators";
import { SelecaoImovelService } from "../selecao-de-imovel/selecao-de-imovel.service";

@Injectable({
    providedIn: 'root'
})
export class DataCertaService {
    public dataCerta: DataCerta;
    public dataCertaValidaResponseDTO: DataCertaValidaDTOResponse;
    public dataCertaResponseDTO: DataCertaDTOResponse;
    public dataCertaDiasResponseDTO: DataCertaDiasDTOResponse;
    public alterarDataCertaResponseDTO: AlterarDataCertaDTOResponse;

    constructor(
        private _http: HttpClient,
        private _selecaoImovelService: SelecaoImovelService
    ) {
        this.dataCerta = new DataCerta();
        this.dataCertaValidaResponseDTO = new DataCertaValidaDTOResponse();
        this.dataCertaResponseDTO = new DataCertaDTOResponse();
        this.dataCertaDiasResponseDTO = new DataCertaDiasDTOResponse();
        this.alterarDataCertaResponseDTO = new AlterarDataCertaDTOResponse();
    }

    /**
     * Parte requisições
     */

    // [GET]/UCS/{CODIGO}/DATACERTA-VALIDA
    getDataCertaValida(requestDTO: DataCertaValidaDTORequest): Observable<DataCertaValidaDTOResponse> {
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            if (atributo !== 'codigo') {
                params = params.append(atributo, valor);
            }
        });
        let endpoint: string = `${environment.endpoints.dataCerta}${requestDTO.codigo}/datacerta-valida`;
        return this._http.get<DataCertaValidaDTOResponse | any>(endpoint, { params }).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    // [GET]/UCS/{CODIGO}/DATACERTA
    obterDataCerta(): Observable<DataCertaDTOResponse> {
        const params: HttpParams = new HttpParams()
            .set('codigo', this._selecaoImovelService.getUCSelecionada!.uc)
            .set('canalSolicitante', environment.canal)
            .set('usuario', environment.USUARIO_UE)
            .set('operacao', OperacaoDataCerta.Consulta);

        let endpoint = `${environment.endpoints.dataCerta}${this._selecaoImovelService.getUCSelecionada!.uc}/datacerta`;
        return this._http.get<any>(endpoint, { params }).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    // [GET]/getTrocaTitulDiasDataCerta
    getTrocaTitulDiasDataCerta(requestDTO: DataCertaDTORequest): Observable<DataCertaDTOResponse> {
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
        let endpoint = `${environment.endpoints.dataCerta}${requestDTO.codigo}/datacerta`;
        return this._http.get<any>(endpoint, { params }).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    // [GET]/UCS/{CODIGO}/DATACERTA-DIAS - válido apenas para SONDA
    obterDataCertaDias(requestDTO: DataCertaDiasDTORequest): Observable<DataCertaDiasDTOResponse> {
        let params = new HttpParams();
        Object.entries(requestDTO).forEach(([atributo, valor]) => {
            params = params.append(atributo, valor);
        });
        let endpoint = `${environment.endpoints.dataCerta}${requestDTO.codigo}/datacerta-dias`;
        return this._http.get<any>(endpoint, { params }).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    alterarDataCerta(operacao: string, requestDTO: AlterarDataCertaDTORequest): Observable<AlterarDataCertaDTOResponse> {
        if (operacao === OperacaoDataCerta.Cadastro) {
            return this.cadastrarDataCerta(requestDTO);
        } else {
            return this.descadastrarDataCerta(requestDTO);
        }
    }

    // [PUT]/UCS/{CODIGO}/{DIA}/DATACERTA
    cadastrarDataCerta(requestDTO: AlterarDataCertaDTORequest): Observable<AlterarDataCertaDTOResponse> {
        let body = Object.assign({}, requestDTO);
        let endpoint = `${environment.endpoints.dataCerta}${requestDTO.codigo}/${requestDTO.dia}/datacerta`;
        return this._http.put<any>(endpoint, body).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }

    // [POST]/UCS/{CODIGO}/DATACERTA-DESCADASTRA
    descadastrarDataCerta(requestDTO: AlterarDataCertaDTORequest): Observable<AlterarDataCertaDTOResponse> {
        let body = Object.assign({}, requestDTO);
        let endpoint = `${environment.endpoints.dataCerta}${requestDTO.codigo}/datacerta-descadastra`;
        return this._http.post<any>(endpoint, body).pipe(
            mergeMap((response) => response.status != 200 ? of(response) : throwError(() => response))
        );
    }
}

