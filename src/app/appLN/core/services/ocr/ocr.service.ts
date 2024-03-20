import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { catchError, map, Observable, of } from 'rxjs';
import { environmentLN } from '../../../../../environments/environmentsLN/environment';
import { ReconhecimentoFacialRequest } from '../../models/documentos/reconhecimento-facial-request';
import { Img, ImgStats, ReconhecimentoFacialResponse, Result, Status } from '../../models/documentos/reconhecimento-facial-response';
import { OcrRequest } from '../../models/ocr/ocr-request';
import { ErrorService } from '../error/error.service';
import { CustomSweetAlertService } from '../sweet-alert/custom-sweet-alert.service';
import { UserServiceLN } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class OcrService {

    ACCEPTABLE_OCR_SCORE = 0.5;
    ACCEPTABLE_FACE_DISTANCE = 0.6;
    TAGS_DUPLA_VALIDACOES: Array<string>;
    TAGS_DOCS_COM_FOTO: Array<string>;

    constructor(
        public alert: CustomSweetAlertService,
        private _userServiceLN: UserServiceLN,
        private _http: HttpClient,
        private _errorService: ErrorService,
        private _loadingService: LoadingService
    ) {
        this.TAGS_DUPLA_VALIDACOES = ['cnh_verso', 'rg_frente', 'rg_verso'];
        this.TAGS_DOCS_COM_FOTO = ['cnh', 'cnh_frente', 'cnh_verso', 'rg_frente', 'rg_verso', 'br-passaporte'];
    }

    isOCRFieldValid(field: any) {
        return field && field.score >= this.ACCEPTABLE_OCR_SCORE ? field.value : null;
    }

    ocr(arquivo: any): Promise<any> {
        this._loadingService.start();
        return new Promise((resolve) => {
            this.addFileToOCR(arquivo).subscribe((data: any) => {
                if (data && data.result && data.result.length > 0) {
                    let documentoConsultado = data.result[0].tags[1] ? data.result[0].tags[1] : data.result[0].tags[0];
                    this.log(data.result.length, documentoConsultado).subscribe(() => {
                        resolve(data);
                    });
                    this._loadingService.stop();
                } else {
                    resolve(false);
                }
            });
        });
    }

    log(data: any, doc: any): Observable<boolean> {
        const logBody = {
            idAtendimento: sessionStorage.getItem('protocolo'),
            documento: this._userServiceLN.sessionUser.documento,
            idCanalAtendimento: '13', // FIXO
            tipoDocumento: doc ? doc : "N/A",
            quantidadeFaces: data
        };

        let urlApiNeo = environmentLN.apiUrl + '/v2/cre/ocr-ligacao-nova?protocolo=' + encodeURIComponent(sessionStorage.getItem('protocolo')!) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);

        return this._http.post<boolean>(urlApiNeo, logBody).pipe(
            catchError((this._errorService.handleError<boolean>()))
        );
    }

    addFileToOCR(fileToOCR: any): Observable<any> {

        let apiUrl = environmentLN.apiUrl + '/v2/apoio/ocr-extracao-documento?protocolo=' + encodeURIComponent(sessionStorage.getItem('protocolo')!) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);

        return this._http.post<any>(apiUrl, fileToOCR).pipe(catchError(this._errorService.handleError<any>()));
    }

    createFileOCR(fileBase64: string) {
        return new OcrRequest(fileBase64, false);
    }

    compare(faces: any): Promise<any> {
        this._loadingService.start();
        return new Promise((resolve) => {
            this.compareFaces(faces).subscribe((data: any) => {
                if (data && data.result && data.status.message !== 'Retornando nulo') {
                    this.log(1, this._userServiceLN.sessionUser.documento);
                    this._loadingService.stop();
                    resolve(data);
                } else {
                    data.status.message === 'Retornando nulo' ? resolve(data) : resolve(false);
                }
            })
        });
    }

    compareFaces(faces: ReconhecimentoFacialRequest): Observable<ReconhecimentoFacialResponse> {
        let url = environmentLN.apiUrl + '/v2/apoio/ocr-reconhecimento-facial?protocolo=' + encodeURIComponent(this._userServiceLN.protocolo) + '&usuarioUE=' + encodeURIComponent(this._userServiceLN.USUARIO_UE);

        return this._http.post<ReconhecimentoFacialResponse>(url, faces).pipe(
            map(valor => {
                if (valor == null) {
                    throw new ReconhecimentoFacialResponse(
                        new Result(
                            -1,
                            new ImgStats(new Img(), new Img()),
                            "False",
                            ''
                        ),
                        '',
                        0
                        , new Status("501", 'Retornando nulo')
                    );
                }
                return valor;
            }),
            catchError(erro => of(erro))
        );
    }
}
