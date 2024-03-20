import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { Grupo } from "app/core/enums/grupos";
import { PathCompleto } from "app/core/enums/servicos";
import { EnumTitulosPadroes } from "app/core/models/exibir-aviso/exibir-aviso";
import { EntendaSuaContaService } from "app/core/services/entenda-sua-conta/entenda-sua-conta.service";
import { SelecaoImovelService } from "app/core/services/selecao-de-imovel/selecao-de-imovel.service";

@Injectable()
export class EntendaSuaContaGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _entendaSuaConta: EntendaSuaContaService,
        private _selecaoImovelService: SelecaoImovelService
    ) { }

    canActivate(): boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): boolean {
        if (this._entendaSuaConta.getFatura === undefined) {
            this._router.navigate([PathCompleto.entendaSuaConta],
                { queryParams: { titulo: EnumTitulosPadroes.Inesperado } }
            );
        return false;
        }
        if (this._selecaoImovelService.getUCSelecionada?.grupoTensao === Grupo.B) {
            return true;
        } else {
            this._router.navigate(
                [PathCompleto.aviso],
                { queryParams: {
                        titulo: EnumTitulosPadroes.GrupoA
                    }
                }
            );
            return false;
        }
    }
}
