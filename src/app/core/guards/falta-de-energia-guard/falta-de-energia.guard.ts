import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";

import { PathCompleto } from "app/core/enums/servicos";
import { STATUS_POSITIVOS_POSSIVEIS } from "app/core/enums/unidade-consumidora";
import { EnumAvisosPadroes, EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";
import { FaltaDeEnergiaService } from "app/core/services/falta-de-energia/falta-de-energia.service";

@Injectable()
export class FaltaDeEnergiaGuard implements CanActivate, CanLoad {
    constructor(
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService,
        private _faltaDeEnergiaService: FaltaDeEnergiaService
    ) { }

    canActivate(): boolean {
        return this.verificarAcesso();
    }

    canLoad(): boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): boolean {
        if (this._selecaoImovelService.unidadeDesligada) {
            return this.exibirAviso( { codigoAviso: EnumAvisosPadroes.UnidadeDesligada });
        }
        if (this._selecaoImovelService.unidadeSuspensa) {
            return this.exibirAviso( { codigoAviso: EnumAvisosPadroes.UnidadeSuspensa });
        }
        if(STATUS_POSITIVOS_POSSIVEIS.includes(this._selecaoImovelService.getUCSelecionada?.indCCColetiva ?? '')){
            return this.exibirAviso({ titulo: EnumTitulosPadroes.ContaColetiva});
        }
        if(!this._faltaDeEnergiaService.fluxoFaltaDeEnergia.fluxoIniciado) {
            this._router.navigate([PathCompleto.faltaDeEnergia]);
            return false;
        }
        return true;
    }

    exibirAviso(queryParams: Object): boolean {
        this._router.navigate(
            [PathCompleto.aviso],
            { queryParams: queryParams }
        );
        return false;
    }
}
