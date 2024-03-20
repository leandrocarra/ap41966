import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-informativo-titularidade-troca',
  templateUrl: './informativo-titularidade-troca.component.html',
  styleUrls: ['./informativo-titularidade-troca.component.scss']
})
export class InformativoTitularidadeTrocaComponent implements OnInit {

  breadcrumbTroca: boolean;
  usuarioSemUc: boolean = false;

  navExtra!: NavigationExtras;

  constructor(
    public user: UserService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _trocaDeTitularidadeService: TrocaDeTitularidadeService,
  ) {

    this.user.breadcrumb = false;
    this.breadcrumbTroca = this._trocaDeTitularidadeService.breadCrumbTroca;
    this._trocaDeTitularidadeService.breadCrumbTroca = false;

    this.navExtra = new FluxoTrocaNavExtra();
    this._activatedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {        
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

  }

  voltar(): void {
    this._router.navigateByUrl('home/meus-imoveis');
  }

  continuar(): void {
    if (!this.usuarioSemUc) {
        this._router.navigate(['servicos', 'troca-de-titularidade', 'escolha-titular'],this.navExtra);
    } else {
      this.navExtra.state!.fluxo = 'euMesmo';
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular'], this.navExtra);
    }
  }

}
