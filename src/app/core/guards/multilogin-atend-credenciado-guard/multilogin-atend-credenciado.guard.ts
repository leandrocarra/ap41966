import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { PerfisDeAcesso } from 'app/core/models/multilogin/multilogin-acesso';
import { MultiloginAcessoService } from 'app/core/services/multilogin-acesso/multilogin-acesso.service';
import { EnumAvisosPadroes, EnumTitulosPadroes } from "../../models/exibir-aviso/exibir-aviso";

@Injectable({
    providedIn: 'root'
})
export class MultiloginAtendCredenciadoGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _multiloginAcessoService: MultiloginAcessoService,
    ) { }

    canActivate(): boolean {
        return this.verificarAcesso();
    }

    canLoad(): boolean {
        return this.verificarAcesso();
    }

    verificarAcesso(): boolean {
        let perfilDeAcesso = this._multiloginAcessoService.multiloginAcesso.perfilDeAcesso
        if (perfilDeAcesso !== PerfisDeAcesso.atendenteCredenciado) {
            // TODO: Verificar mensagem correta
            this._router.navigate(
                [PathCompleto.aviso],
                { queryParams: { titulo: `Usuário não possui este acesso.` } }
            );
            return false
        } else {
            return true
        }
    }
}
