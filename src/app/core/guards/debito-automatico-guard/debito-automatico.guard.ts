import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { EnumAvisosPadroes, EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { LoadingService } from 'app/core/services/customsweetalert/loading.service';
import { LigacaoNovaService } from 'app/core/services/ligacao-nova/ligacao-nova.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DebitoAutomaticoGuard implements CanActivate {

    constructor(
        private _loading: LoadingService,
        private _router: Router,
        private _selecaoImovelService: SelecaoImovelService,
        private _exibirAvisoService: ExibirAvisoService,
        private _ligacaoNovaService: LigacaoNovaService
    ) {
    }

    canActivate(): Observable<boolean> | boolean {
        return this.verificarAcesso();
    }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        return this.verificarAcesso();
    }

    private verificarAcesso(): boolean {
        if (this._selecaoImovelService.unidadeSuspensa || this._selecaoImovelService.unidadeDesligada) {
            this._loading.stop();
            this.redirecionarParaTelaDeAviso({codigoAviso: this._selecaoImovelService.unidadeSuspensa ? EnumAvisosPadroes.UnidadeSuspensa : EnumAvisosPadroes.UnidadeDesligada});
            return false;
        }
        //Fatura coletiva ou fatura agrupada
        else if ((this._selecaoImovelService.ehContaContratoMae || this._selecaoImovelService.ehColetivaFilha) && environment.regiao === Regiao.NE) {
            this._loading.stop();
            this.redirecionarParaTelaDeAviso(
                {titulo: this._selecaoImovelService.ehColetivaFilha ? EnumTitulosPadroes.ContaColetivaFilhaDCC : EnumTitulosPadroes.ContaColetiva});
            return false;
        }

        return true;
    }

    redirecionarParaTelaDeAviso(queryParams: Object): void {
        this._router.navigate(
            [PathCompleto.aviso],
            {queryParams: queryParams}
        );
    }
}


