import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DadosDoImovelService } from '../../../../core/services/dados-do-imovel/dados-do-imovel.service';
import { UserServiceLN } from '../../../../core/services/user/user.service';
import { configureMenuByWindowSize } from '../../../../core/services/utils/neo-utils.service';

@Component({
  selector: 'neo-vistoria',
  templateUrl: './vistoria.component.html',
  styleUrls: ['./vistoria.component.scss']
})
export class VistoriaComponent {
  mobile: boolean;
  constructor(
    private _router: Router,
    private _userServiceLN: UserServiceLN,
    private _dadosDoimovelService: DadosDoImovelService
  ) {
      this.mobile = configureMenuByWindowSize(window.screen.width, 998);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  encerrar() {
    this._router.navigate(["ligacao-nova", "conclusao"]);
  }

  linkVistoria() {
    if (this._dadosDoimovelService.getEndereco.codigoLogradouro != "") {
      this._userServiceLN.vistoriaPadrao(this._dadosDoimovelService.getEndereco.codigoLogradouro).subscribe(data => {
        window.open(data, '_blank');
      });
    }
  }
}

