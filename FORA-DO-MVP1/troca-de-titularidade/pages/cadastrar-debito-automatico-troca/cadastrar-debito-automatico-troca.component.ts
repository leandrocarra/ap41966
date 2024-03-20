import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-cadastrar-debito-automatico-troca',
  templateUrl: './cadastrar-debito-automatico-troca.component.html',
  styleUrls: ['./cadastrar-debito-automatico-troca.component.scss']
})
export class CadastrarDebitoAutomaticoTrocaComponent implements OnInit {

  mobile!: boolean;
  cadDebAutomaticoButton!: string;
  group!: string;

  formaPagamento: string = 'Boleto Bancário';

  dadosConfirmacao!: any[];
  navExtra!: NavigationExtras;


  constructor(
    private _router: Router,
    private _user: UserService,
    private _activedRouter: ActivatedRoute
  ) {
    this.navExtra = {
      queryParams: {},
      state: {
        ucImovel: null,
        numeroDoMedidor: null,
        dadosImovel: null,
        dadosUsuario: null,
        docsAnexados: [],
        dadosConfirmar: null,
        fluxo: null,
        fluxoPendencia: null,
        result: null
      }
    }

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        const dados = this._router.getCurrentNavigation()?.extras.state;
        this.navExtra.state!.ucImovel = dados?.ucImovel;
        this.navExtra.state!.numeroDoMedidor = dados?.numeroDoMedidor;
        this.navExtra.state!.dadosImovel = dados?.dadosImovel;
        this.navExtra.state!.dadosUsuario = dados?.dadosUsuario;
        this.navExtra.state!.docsAnexados = dados?.docsAnexados;
        this.navExtra.state!.dadosConfirmar = dados?.dadosConfirmar;
        this.navExtra.state!.fluxo = dados?.fluxo;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.cadDebAutomaticoButton = (this.mobile) ? "CADASTRAR" : "CADASTRAR DÉBITO AUTOMÁTICO";
  }

  ngOnInit(): void {
    this.group = this._user.group;
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.cadDebAutomaticoButton = (this.mobile) ? "CADASTRAR" : "CADASTRAR DÉBITO AUTOMÁTICO";
  }

  declinarDebAutomatico(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-data-certa'], {
    });
  }

  cadDebAutomatico(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'dados-debito-automatico'], {
    });
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
      {
        label: "Email",
        data: "",
        "rota": "/servicos/troca-de-titularidade/novo-titular/cadastrar-fatura-digital",
      },
    ];
    this.navExtra.state!.dadosConfirmar = this.dadosConfirmacao;
  }

}
