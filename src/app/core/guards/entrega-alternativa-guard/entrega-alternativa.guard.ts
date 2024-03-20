import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';

@Injectable({
  providedIn: 'root'
})
export class EntregaAlternativaGuard implements CanActivate {
  constructor(
    private _selecaoImovelService: SelecaoImovelService,
    private _router: Router,
  ) { }
  canActivate(): boolean {
    if (
      this._selecaoImovelService.getInformacoesUCSelecionada.servicos.entregaAlternativa === "N" &&
      this._selecaoImovelService.getInformacoesUCSelecionada.servicos.faturaEmail === "N" &&
      environment.regiao === Regiao.NE
    ) {
      this._router.navigate([PathCompleto.faturaImpressa, SubRotasFaturaImpressa.ContaContrato]);
      return false;
    } else {
      return true;
    }
  }  
}
