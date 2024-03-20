
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LoadingService } from '../customsweetalert/loading.service';
import { AnexosDTORequest, EnvioMensagensDTORequest } from 'app/core/models/multilogin/request/multilogin-dto';
import { Injectable } from '@angular/core';
import { codigoJornada } from '@environments/templates-mkt';

@Injectable({
	providedIn: 'root'
})
export class MarketingAutomationService {
	storage: Storage = sessionStorage;

	constructor(
		public _loading: LoadingService,
		private _http: HttpClient,
	) {

	}

    envioDeMensagem(requestDTO: EnvioMensagensDTORequest): Observable<any> {
		const endpoint = `${environment.endpoints.marketingAutomation}mensageria/envio-mensagens`;
		const body = Object.assign({}, requestDTO);
		return this._http.post(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

    uplodaArquivo(requestDTO: AnexosDTORequest): Observable<any> {
		const endpoint = `${environment.endpoints.marketingAutomation}mensageria/anexos`;
		const body = Object.assign({}, requestDTO);
		return this._http.post(endpoint, body).pipe(
			mergeMap((response) => response ? of(response) : throwError(() => response))
		);
	}

}
