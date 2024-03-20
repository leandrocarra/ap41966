import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EscolhaPerfil } from 'app/core/models/escolhaPerfilDTO/escolha-perfil';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-selecao-perfil',
  templateUrl: './selecao-perfil.component.html',
  styleUrls: ['./selecao-perfil.component.scss']
})
export class SelecaoPerfilComponent implements OnInit {
  
  navExtra!: NavigationExtras;
  formSelecaoPerfil!: FormGroup;
  infos!: EscolhaPerfil[];
  mobile!: boolean;
  btnAlterarCaracteristica!: string;
  tipoDocumento: string = 'CNPJ'; //FIXME: retirar dado mockado
  infoSelecaoPerfil: any = null;
  isSelect: boolean = false;

  constructor(
     private _userService: UserService,
     private _router: Router,
     private _activedRouter: ActivatedRoute,
     private _alert: CustomSweetAlertService
     ) { 
      this._activedRouter.queryParams.subscribe(params => {
        if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
          this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
        }
      });
     }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.btnAlterarCaracteristica = (this.mobile) ? "NÃO ALTERAR" : "NÃO DESEJO ALTERAÇÃO DE PERFIL";
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }
 
  ngOnInit() {
    this.configureMenuByWindowSize(this.configureMenuByWindowSize)
    this.mobile = (window.screen.width <= 768) ? true : false;

    this.infos = [
      {
        perfil: "RESIDENCIAL",
        textoPerfil: "Imóvel será utilizado apenas para fins residenciais.",
        perfilSelecionado: false,
        imagem: "assets/images/Residencial.svg",
        imagem_off: "assets/images/residencial_off.svg",
        alt: "Residencial",
        bloqueado: this.tipoDocumento === 'CPF' ? false : true,
        mensagemBloqueado: this.tipoDocumento === 'CPF' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CPF ativo com situação regular na Receita Federal.",
      },
      {
        perfil: "BENEFÍCIO RURAL",
        textoPerfil: "Imóvel será utilizado para fins de atividades rurais ou para fins residenciais de trabalhadores ou aposentados rurais.",
        perfilSelecionado: false,
        imagem: "assets/images/atividadesrurais.svg",
        imagem_off: "assets/images/rural_off.svg",
        alt: "Rural",
        bloqueado: false,
        mensagemBloqueado: '',
      },
      {
        perfil: "COMERCIAL",
        textoPerfil: "Imóvel será utilizado para fins de atividades comerciais ou de prestação de serviços, à exceção dos serviços públicos.",
        perfilSelecionado: false,
        imagem: "assets/images/comercial.svg",
        imagem_off: "assets/images/comercial_off.svg",
        alt: "Comercial Bloqueado",
        bloqueado: this.tipoDocumento === 'CPF' ? true : false,
        mensagemBloqueado: this.tipoDocumento === 'CNPJ' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CNPJ ativo com situação regular na Receita Federal."
      },
      {
        perfil: "INDUSTRIAL",
        textoPerfil: "Imóvel será utilizado para fins de atividades industriais caracterizadas como baixa tensão.",
        perfilSelecionado: false,
        imagem: "assets/images/Industrial.svg",
        imagem_off: "assets/images/industrial_off.svg",
        alt: "Industrial Bloqueado",
        bloqueado: this.tipoDocumento === 'CPF' ? true : false,
        mensagemBloqueado: this.tipoDocumento === 'CNPJ' ? '' : "Para fazer esta solicitação, você deve fazer o login utilizando um CNPJ ativo com situação regular na Receita Federal."
      }
    ]
  }

  setSelecaoPerfil(index: number){
    this.infos.forEach(info => info.perfilSelecionado = false)
    this.infos[index].perfilSelecionado = true
    this.isSelect = true;
  }

  continuar(): void {
    this._alert.alertRepresentanteLegal() //FIXME: retirar futuramente
  }
  alertRepresentanteLegal(){ //FIXME: ajustar futuramente
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  voltar(): void { //FIXME: ajustar futuramente
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

  alteracaoPerfil(): void{  //FIXME: ajustar futuramente
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

}
