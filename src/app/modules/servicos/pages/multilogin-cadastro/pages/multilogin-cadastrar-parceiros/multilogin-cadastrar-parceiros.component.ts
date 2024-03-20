import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { CardPerfil } from 'app/core/models/multilogin/multilogin-acesso';
import { CadastroDeParceirosService } from 'app/core/services/cadastro-de-parceiros/cadastro-de-parceiros.service';

@Component({
  selector: 'app-multilogin-cadastrar-parceiros',
  templateUrl: './multilogin-cadastrar-parceiros.component.html',
  styleUrls: ['./multilogin-cadastrar-parceiros.component.scss']
})
export class MultiloginCadastrarParceirosComponent {
  cardsParceiros: Array<CardPerfil>;
  banner: string;
  constructor(
    private _cadastroDeParceiroService: CadastroDeParceirosService,
    private _router: Router,
    private _location: Location
  ) { 
    this.cardsParceiros = this._cadastroDeParceiroService.criarCardParceiros();
    this.banner = this._cadastroDeParceiroService.banner;
  }

    navegarPara(rota: string): void {
      this._router.navigate([PathCompleto.multiloginCadastro, rota]);
    }

  voltar(): void {
    this._location.back();
  }

}
