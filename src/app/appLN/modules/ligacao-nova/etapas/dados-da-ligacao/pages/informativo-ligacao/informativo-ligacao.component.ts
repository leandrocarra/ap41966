import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadosDoImovelService } from "../../../../../../core/services/dados-do-imovel/dados-do-imovel.service";
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';

@Component({
  selector: 'neo-informativo-ligacao',
  templateUrl: './informativo-ligacao.component.html',
  styleUrls: ['./informativo-ligacao.component.scss']
})
export class InformativoLigacaoComponent {

  constructor(
    private _router: Router,
    private _dadosDoImovelService: DadosDoImovelService,
    private _ligacaoNovaService: LigacaoNovaService,
    private _location: Location,
  ) { }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    if (this._dadosDoImovelService.getEndereco.apartamento && this._ligacaoNovaService.getPerfilEscolhido.perfil !== 'INDUSTRIAL') {
      this._router.navigate(["ligacao-nova", "dados-da-ligacao", "questionario-apartamento"]);
    } else {
      this._router.navigate(["ligacao-nova", "dados-da-ligacao", "dimensionamento-de-rede"]);
    }
  }

}
