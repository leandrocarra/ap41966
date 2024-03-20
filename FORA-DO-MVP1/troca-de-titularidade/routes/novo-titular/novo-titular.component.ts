import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoginService } from 'app/core/services/login/login.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';
@Component({
  selector: 'app-novo-titular',
  templateUrl: './novo-titular.component.html',
  styleUrls: ['./novo-titular.component.scss']
})
export class NovoTitularComponent implements OnInit {

  cpfInvalido: string = '22759820866';
  debitoTitular: boolean = true;

  navExtra!: NavigationExtras;

  constructor(
    public user: UserService,
    public alert: CustomSweetAlertService,
    public token: TokenService,
    public login: LoginService,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
  ) {


    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });
    console.log(this.navExtra);
  }

  ngOnInit(): void {

    this.verificarCpfRegular();

    if (this.debitoTitular) {
      this.navExtra.state!.fluxoPendencia = 'pendencia-novo-titular';
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informar-imovel'], this.navExtra);
    }

  }

  verificarCpfRegular() {
    if (this.user.dadosUser.documento == this.cpfInvalido) {
      this.alert.alertTrocaTitularidade("Para poder realizar a troca de titularidade seu nome tem que estar regular na receita federal.").then(
        (r) => {
          if (r) {
            this.token.clearStorage();
            this.login.usuarioAutenticado = false;
            this._router.navigateByUrl('login');
          }
        }
      );
    }
  }

  //TODO: Retirar funções e botões desnecessários

  iniciarFluxo() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-fatura-digital'], {
    });
  }
  cadFatDigital() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-fatura-digital'], {
    });
  }

  informativoSucesso() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informativo-sucesso'], {});
  }

  docComFoto() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'documento-com-foto'], {
    });
  }

  infImovelTroca() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informar-imovel'], this.navExtra);
  }

  motivoTroca() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'motivo'], {
    });
  }

  confSolicitacao() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar'], {
    });
  }

  confSolicitacaoPersonalizada() {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar-personalizar'], {
    });
  }

  identificacao(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'identificacao'], {
    });
  }

  dadosPessoais(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'dados-pessoais'], {
    });
  }

  manterCaracteristicasLigacao(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'manter-caracteristicas-ligacao'], {
    });
  }
}
