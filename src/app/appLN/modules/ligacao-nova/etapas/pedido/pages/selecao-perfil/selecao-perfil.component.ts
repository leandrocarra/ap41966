import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EscolhaPerfil } from '../../../../../../core/models/escolha-perfil/escolha-perfil';
import { LigacaoNovaService } from '../../../../../../core/services/ligacao-nova/ligacao-nova.service';
import { UserServiceLN } from '../../../../../../core/services/user/user.service';
import { configureMenuByWindowSize, NeoUtilsService } from '../../../../../../core/services/utils/neo-utils.service';
import { CustomSweetAlertService } from '../../../../../../core/services/sweet-alert/custom-sweet-alert.service';

@Component({
  selector: 'neo-selecao-perfil',
  templateUrl: './selecao-perfil.component.html',
  styleUrls: ['./selecao-perfil.component.scss']
})
export class SelecaoPerfilComponent {

  public perfis: any;
  public mobile: boolean;
  public infos: EscolhaPerfil[];


  constructor(
    public neoUtils: NeoUtilsService,
    private _alert: CustomSweetAlertService,
    private _router: Router,
    private _userServiceLN: UserServiceLN,
    private _ligacaoNovaService: LigacaoNovaService,
    private _location: Location
  ) {
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.infos = [
      {
        perfil: "RESIDENCIAL",
        subPerfil: null,
        textoPerfil: "Imóvel será utilizado apenas para fins residenciais.",
        imagem: "assets/assetsLN/images/Residencial.svg",
        alt: "Residencial",
        bloqueado: this._userServiceLN.tipoDocumento === 'CPF' ? false : true,
        mensagemBloqueado: this._userServiceLN.tipoDocumento === 'CPF' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CPF ativo com situação regular na Receita Federal.",
      },
      {
        perfil: "BENEFÍCIO RURAL",
        subPerfil: null,
        textoPerfil: "Imóvel será utilizado para fins de atividades rurais ou para fins residenciais de trabalhadores ou aposentados rurais.",
        imagem: "assets/assetsLN/images/atividadesrurais.svg",
        alt: "Rural",
        bloqueado: false,
        mensagemBloqueado: '',
      },
      {
        perfil: "COMERCIAL",
        subPerfil: null,
        textoPerfil: "Imóvel será utilizado para fins de atividades comerciais ou de prestação de serviços, à exceção dos serviços públicos.",
        imagem: "assets/assetsLN/images/comercial.svg",
        alt: this._userServiceLN.tipoDocumento === 'CPF' ? "Comercial Bloqueado" : "Comercial",
        bloqueado: this._userServiceLN.tipoDocumento === 'CPF' ? true : false,
        mensagemBloqueado: this._userServiceLN.tipoDocumento === 'CNPJ' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CNPJ ativo com situação regular na Receita Federal."
      },
      {
        perfil: "INDUSTRIAL",
        subPerfil: null,
        textoPerfil: "Imóvel será utilizado para fins de atividades industriais caracterizadas como baixa tensão.",
        imagem: "assets/assetsLN/images/Industrial.svg",
        alt: this._userServiceLN.tipoDocumento === 'CPF' ? "Industrial Bloqueado" : "Industrial",
        bloqueado: this._userServiceLN.tipoDocumento === 'CPF' ? true : false,
        mensagemBloqueado: this._userServiceLN.tipoDocumento === 'CNPJ' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CNPJ ativo com situação regular na Receita Federal."
      }
    ];
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }


  alertBlocked(mensagemPerfilBloqueado: string): void {
    this._alert.alertInfo(mensagemPerfilBloqueado);
  }

  continuar(perfilEscolhido: EscolhaPerfil): void {
    this._ligacaoNovaService.setPerfilEscolhido = perfilEscolhido;

    if (perfilEscolhido.perfil == 'BENEFÍCIO RURAL') {
      this._router.navigate(['ligacao-nova', 'pedido', 'tipo-perfil-rural']);
    } else {
      this._router.navigate(['ligacao-nova', 'pedido', 'documentos-necessarios']);
    }
  }

  voltar(): void {
    this._location.back();
  }

}
