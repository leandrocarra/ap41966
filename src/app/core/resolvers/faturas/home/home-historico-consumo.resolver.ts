import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ConsumosDTORequest } from 'app/core/models/hitorico-de-consumo/request/historico-de-consumo-dto';
import { ConsumosDTOResponse } from 'app/core/models/hitorico-de-consumo/response/historico-de-consumo-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { HistoricoDeConsumoService } from 'app/core/services/historico-de-consumo/historico-de-consumo.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeHistoricoConsumoResolver implements Resolve<any> {
    constructor(
        private _historicoDeConsumoService: HistoricoDeConsumoService,
        private _loading: LoadingService,
    ) {}
    resolve(): Promise<ConsumosDTOResponse> {
        this._loading.start();
        return new Promise((resolve, reject) => {
            this._historicoDeConsumoService.gerarCodigoValido(new ConsumosDTORequest()).pipe(take(1)).subscribe({
                next: (responseDTO: ConsumosDTOResponse) => {
                    this._historicoDeConsumoService.setHistoricoConsumo = responseDTO;
                    this._historicoDeConsumoService.consumos = responseDTO;
                    this._loading.stop();
                    resolve(responseDTO);
                },
                error: (responseDTO: ConsumosDTOResponse) => {
                    this._loading.stop();
                    resolve(responseDTO);
                }
            })
        });
    }
}
