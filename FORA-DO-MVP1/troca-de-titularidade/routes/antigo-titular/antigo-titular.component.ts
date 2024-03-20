import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { CustomSweetAlertService } from 'app/core/services/customsweetalert/custom-sweet-alert.service';
import { LoginService } from 'app/core/services/login/login.service';
import { TokenService } from 'app/core/services/token/token.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-antigo-titular',
  templateUrl: './antigo-titular.component.html',
  styleUrls: ['./antigo-titular.component.scss']
})
export class AntigoTitularComponent implements OnInit {

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

  }

  ngOnInit(): void {

    this.verificarCpfRegular();

    if (this.debitoTitular) {
      this.navExtra!.state!.fluxoPendencia = 'pendencia-antigo-titular';
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'imovel-endereco'], this.navExtra);
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

  docProcuracao(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-procuracao'], {
    });
  }

  dadosNovoTitular(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'informar-novo-titular'], {
    });
  }

  imovelTroca(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'imovel-endereco'], {
    });
  }

  contatoNovoTitular(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'contato-novo-titular'], {
    });
  }

  docComFotoTerceiro(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'documento-com-foto-terceiro'], {
    });
  }

  informativoTitularidade(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'informativo-titularidade'], {
    });
  }

  chamaAlert() {
    this.alert.alertTrocaTitularidade('O terceiro que você deseja passar a titularidade possui dívidas com a distribuidora');
  }

  chamaAlert2() {
    this.alert.alertWarningSelfie();
  }

}
