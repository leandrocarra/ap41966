import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FaturaDTO } from 'app/core/models/segunda-via/response/segunda-via-response-dto';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { SegundaViaService } from 'app/core/services/segunda-via/segunda-via.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { Servicos } from "../../../enums/servicos";

@Injectable({
    providedIn: 'root'
})
export class FaturasResolver implements Resolve<any> {

    constructor(
        private _segundaViaService: SegundaViaService,
        private _loading: LoadingService,
        private _selecaoImovelService: SelecaoImovelService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Array<FaturaDTO>> {
        this._loading.start();

        return new Promise(async (resolve): Promise<void> => {
            this._segundaViaService.dadosSegundaVia.erroListarFaturas = undefined;
            const estaNoSegundaVia: boolean = route?.data?.origin === Servicos.segundaVia;

            if (this._selecaoImovelService.getInformacoesUCSelecionada.codigo !== this._segundaViaService.dadosSegundaVia.unidadeConsumidora || estaNoSegundaVia) {
                const faturas: Array<FaturaDTO> = await this._segundaViaService.getEndpointFaturas(estaNoSegundaVia ? '' : 'X');
                this._segundaViaService.dadosSegundaVia.possuiFaturas = (faturas.length > 0);
                this._segundaViaService.setDadosSegundaVia = this._segundaViaService.dadosSegundaVia;

                this._loading.stop();
                resolve(this._segundaViaService.dadosSegundaVia.possuiFaturas ? faturas : []);
            } else {
                this._loading.stop();
                resolve(this._segundaViaService.getFaturas);
            }
        });
    }
}
