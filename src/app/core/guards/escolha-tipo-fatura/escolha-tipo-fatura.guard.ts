import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EnumAvisosPadroes, EnumTitulosPadroes } from 'app/core/models/exibir-aviso/exibir-aviso';
import { LigacaoNovaService } from 'app/core/services/ligacao-nova/ligacao-nova.service';
import { SelecaoImovelService } from 'app/core/services/selecao-de-imovel/selecao-de-imovel.service';
import { ExibirAvisoService } from 'app/shared/pages/exibir-aviso/exibir-aviso.service';
import {PathCompleto} from "../../enums/servicos";

@Injectable({
  providedIn: 'root'
})
export class EscolhaTipoFaturaGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _selecaoImovelService: SelecaoImovelService,
    private _exibirAvisoService: ExibirAvisoService,
    private _ligacaoNovaService: LigacaoNovaService
  )
  { }
  canActivate(): boolean {
    if (this._selecaoImovelService.getUCSelecionada?.isGrupo == 'S') {
      this._router.navigate([PathCompleto.aviso], { queryParams: { tituloPadrao: EnumTitulosPadroes.ContaColetiva } });
      return false;
    }

    if (this._selecaoImovelService.unidadeDesligada) {
      this._router.navigate([PathCompleto.aviso], { queryParams: { codigoAviso: EnumAvisosPadroes.UnidadeDesligada } });
      return false;
    }

    if (this._selecaoImovelService.unidadeSuspensa) {
      this._router.navigate([PathCompleto.aviso], { queryParams: { codigoAviso: EnumAvisosPadroes.UnidadeSuspensa } });
      return false;
    }

    return true;
  }

}

