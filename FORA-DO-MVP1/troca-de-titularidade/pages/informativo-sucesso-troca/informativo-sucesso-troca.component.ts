import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-informativo-sucesso-troca',
  templateUrl: './informativo-sucesso-troca.component.html',
  styleUrls: ['./informativo-sucesso-troca.component.scss']
})
export class InformativoSucessoTrocaComponent implements OnInit {

  mobile: boolean = false;
  seguirCaracButton!: string;
  alterarCaracButton!: string;

  perfilLigacao!: string;
  categoriaLigacao!: string;
  tarifa!: string;

  dadosConfirmacao!: any[];
  navExtra!: NavigationExtras; 

  constructor(
    public user: UserService,
    private _router: Router,
    private _activedRouter: ActivatedRoute
  ) {

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    console.log(this.navExtra);
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.seguirCaracButton = (this.mobile) ? "CONTINUAR" : "SEGUIR COM AS CARACTERÍSTICAS";
    this.alterarCaracButton = (this.mobile) ? "ALTERAR" : "DESEJO ALTERAR AS CARACTERÍSTICAS";
  }


  ngOnInit(): void {
    this.perfilLigacao = 'Comercial';
    this.categoriaLigacao = 'Bifásico';
    this.tarifa = 'Convencional';

    this.mobile = (window.screen.width <= 768) ? true : false;
    this.seguirCaracButton = (this.mobile) ? "CONTINUAR" : "SEGUIR COM AS CARACTERÍSTICAS";
    this.alterarCaracButton = (this.mobile) ? "ALTERAR" : "DESEJO ALTERAR AS CARACTERÍSTICAS";
  }


  alterarCaracteristicas(): void {
    // TODO: alterar rota para fluxo troca caracteristicas
    this.dadosConfirmar();
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-fatura-digital'], this.navExtra)
  }


  seguirCaracteristicas(): void {
    this.dadosConfirmar();
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-fatura-digital'], this.navExtra)
  }

  dadosConfirmar() {
    this.dadosConfirmacao = [
      {
        label: "Número do medidor",
        data: this.navExtra.state!.numeroDoMedidor,
      },
      {
        label: "Data de entrega",
        data: "17/09/2021", //Definir com Derikys
      },
      {
        label: "Perfil de ligação",
        data: "Comercial",
      },
      {
        label: "Categoria de ligação",
        data: "Bifásico",
      },
      {
        label: "Tarifa",
        data: "Convencional",
      },
      {
        label: "Fatura digital",
        data: "Não",
        "rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-fatura-digital",
      },
      {
        label: "Data certa",
        data: "28",
        "rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-data-certa",
      },
      {
        label: "Débito automático",
        data: "Não",
        "rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-debito-automatico",
      },
    ]
    this.navExtra.state!.dadosConfirmar = this.dadosConfirmacao;
  }

}
