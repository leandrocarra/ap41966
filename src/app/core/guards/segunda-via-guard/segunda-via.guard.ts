import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SegundaViaService } from "app/core/services/segunda-via/segunda-via.service";
import { Observable } from "rxjs";
import { EnumTitulosPadroes } from "../../models/exibir-aviso/exibir-aviso";

@Injectable({
    providedIn: 'root'
})
export class SegundaViaGuard implements CanActivate {
    constructor(
        private _segundaViaService: SegundaViaService,
        private _router: Router,
    ) {
    }

    canActivate(): Observable<boolean> | boolean {
        return this.verificarAcesso();
    }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): boolean {
        let erroListarFaturas = this._segundaViaService.getDadosSegundaVia.erroListarFaturas;

        if (erroListarFaturas !== undefined) {
            // Não existem ainda faturas emitidas para esta Unidade Consumidora
            if (erroListarFaturas.error?.retorno?.numero === "057") {
                return true;
            } else {
                this._router.navigate(["home/servicos/aviso"], {queryParams: {titulo: EnumTitulosPadroes.Inesperado}});
            }
            return false;
        } else {

            // Retorno 200 mas sem listagem de faturas, erro no carregamento dos dados
            if (this._segundaViaService.getFaturas.length == 0) {
                this._router.navigate(["home/servicos/aviso"], {queryParams: {titulo: EnumTitulosPadroes.Carregamento}});
                return false;
            }
        }
        return true;
    }
}

