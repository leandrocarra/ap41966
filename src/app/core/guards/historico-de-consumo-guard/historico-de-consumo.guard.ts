import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasHistoricoDeConsumo } from 'app/core/models/hitorico-de-consumo/sub-rotas-historico-de-consumo';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { EnumTitulosPadroes } from "../../models/exibir-aviso/exibir-aviso";

@Injectable({
    providedIn: 'root'
})
export class HistoricoDeConsumoGuard implements CanActivate {

    storage: Storage = sessionStorage;

    constructor(
        private _selecaoImovelService: SelecaoImovelService,
        private _router: Router
    ) {
    }

    canActivate(): boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): any {
        if (this.storage?.userGroup === 'A') {
            if (this.storage?.userGroup === 'A' && environment.regiao === Regiao.SE) {
                this._router.navigate([PathCompleto.historicoDeconsumo, SubRotasHistoricoDeConsumo.GrupoASE]);
            } else {
                this._router.navigate([PathCompleto.historicoDeconsumo, SubRotasHistoricoDeConsumo.Aviso], {queryParams: { titulo: EnumTitulosPadroes.GrupoANE }});
            }
        } else {
            if (this.storage?.historicoConsumo === undefined || this.storage?.historicoConsumo === "" || this.storage?.historicoConsumo.length === 0) {
                this._router.navigate([PathCompleto.historicoDeconsumo, SubRotasHistoricoDeConsumo.Aviso], {queryParams: { titulo: EnumTitulosPadroes.SemHistoricoDeConsumo }});
            } else {
                return true;
            }
        }
    }

}
