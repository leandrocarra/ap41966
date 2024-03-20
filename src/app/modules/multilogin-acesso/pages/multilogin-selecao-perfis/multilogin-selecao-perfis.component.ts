import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { CardPerfil } from 'app/core/models/multilogin/multilogin-acesso';
import { SelecaoPerfilDeAcessoService } from 'app/core/services/selecao-perfil-de-acesso/selecao-perfil-de-acesso.service';

@Component({
  selector: 'app-multilogin-selecao-perfis',
  templateUrl: './multilogin-selecao-perfis.component.html',
  styleUrls: ['./multilogin-selecao-perfis.component.scss']
})
export class MultiloginSelecaoPerfisComponent {
  public checkTermo: boolean;
  public banner: string;
  public cardsAcessoRapido: Array<CardPerfil>;
  constructor(
    private _selecaoPerfilDeAcessoService: SelecaoPerfilDeAcessoService,
    private _location: Location,
  ) {
    this.checkTermo = true;
    this.banner = this._selecaoPerfilDeAcessoService.banner;
    this.cardsAcessoRapido = this._selecaoPerfilDeAcessoService.criarCardPerfis();
  }

  voltar(): void {
    this._location.back();
  }

}
