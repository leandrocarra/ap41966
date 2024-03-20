import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { EnumTipificacaoInformacao } from "app/core/models/falta-de-energia/fluxo-falta-de-energia";
import { LoadingService } from "app/core/services/customsweetalert/loading.service";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";
import { UserService } from "app/core/services/user/user.service";

@Injectable({
    providedIn: 'root'
})
export class FaltaDeEnergiaOcorrenciaResolver implements Resolve<any> {
    constructor(
        private _faltaDeEnergiaService: FaltaDeEnergiaService,
        private _loading: LoadingService,
        private _userService: UserService
    ) { }

    resolve(): Promise<any> {
        return new Promise((resolve) => {
            if (!this._userService.isFluxo) {
                this._loading.start();
                this._faltaDeEnergiaService.getConsultarOcorrencia(EnumTipificacaoInformacao.FaltaIndividual, true).then((faltaEnergiaOcorrenciaDTO: any) => {
                    if (this._faltaDeEnergiaService.possuiSuporteAVida()) {
                        this._faltaDeEnergiaService.chamarAssistenciaMedica();
                    } else {
                        if (faltaEnergiaOcorrenciaDTO.chamadosPendentes === 'Sim' || faltaEnergiaOcorrenciaDTO.interrupcao === 'Sim') {
                            this._faltaDeEnergiaService.getConsultarFaltaEnergia(true).then((_faltaEnergiaDTO: any) => {
                                this._faltaDeEnergiaService.verificarChamadosPendentes();
                            });
                        }
                    }
                    this._loading.stop();
                    resolve(faltaEnergiaOcorrenciaDTO);
                });
            } else {
                resolve(null);
            }
        });
    }
}
