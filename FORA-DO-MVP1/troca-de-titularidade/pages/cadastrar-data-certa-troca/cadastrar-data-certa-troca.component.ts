import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataCertaService } from 'app/core/services/data-certa/data-certa.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-cadastrar-data-certa-troca',
  templateUrl: './cadastrar-data-certa-troca.component.html',
  styleUrls: ['./cadastrar-data-certa-troca.component.scss']
})
export class CadastrarDataCertaTrocaComponent implements OnInit {

  dataCerta: string;
  mobile: boolean = false;
  cadDataCertaButton!: string;

  dadosConfirmacao!: any[];
  navExtra!: NavigationExtras;

  constructor(
    private _location: Location,
    public _router: Router,
    private _dataCertaService: DataCertaService,
    private _activedRouter: ActivatedRoute,
    public user: UserService
  ) {
    this.user.isFluxo = false;
    this.dataCerta = this._dataCertaService.dataCerta.dataDeVencimento;

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
    this.cadDataCertaButton = (this.mobile) ? "CADASTRAR" : "ALTERAR DATA DE VENCIMENTO";
  }

  ngOnInit(): void {
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.cadDataCertaButton = (this.mobile) ? "CADASTRAR" : "ALTERAR DATA DE VENCIMENTO";
  }

  declinarDataCerta(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar'], {
    });
  }

  cadDataCerta(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-data-certa'], {
    });
  }

  dadosEmailConfirmar() {
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
      }
    ];
    this.navExtra.state!.dadosConfirmar = this.dadosConfirmacao;
  }


}
