import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { environment } from "@environments/environment";
import { Regiao } from "app/core/enums/regiao";
import { OperacaoDataCerta } from "app/core/models/data-certa/data-certa";
import { DataCertaDTORequest as DataCertaDTORequest } from "app/core/models/data-certa/request/data-certa-dto";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { DataCertaService } from "app/core/services/data-certa/data-certa.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { take } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class DataCertaResolver implements Resolve<boolean> {
    constructor(
        private _dataCertaService: DataCertaService,
        private _loadingService: LoadingService,
        private _selecaoImovelService: SelecaoImovelService
    ) { }

    resolve(): Promise<boolean> {
        return this.obterDataCerta();
    }

    obterDataCerta(): Promise<boolean> {
        this._loadingService.start();
        return new Promise((resolve) => {
            this._dataCertaService.obterDataCerta().pipe(take(1)).subscribe({
                next: (responseDTO) => {
                    this._dataCertaService.dataCertaResponseDTO = responseDTO;
                    this._dataCertaService.dataCerta.dataDeVencimento = (environment.regiao === Regiao.NE ) ? responseDTO.dataAtual : responseDTO.dia;
                    this._loadingService.stop();
                    resolve(true);
                },
                error: (error) => {
                    // Tratamento de erros.
                    this._loadingService.stop();
                    resolve(false);
                }
            });
        });
    }
}

