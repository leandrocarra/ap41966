import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-informativo-whatsapp-troca',
  templateUrl: './informativo-whatsapp-troca.component.html',
  styleUrls: ['./informativo-whatsapp-troca.component.scss']
})
export class InformativoWhatsappTrocaComponent implements OnInit {

  mobile: boolean = false;
  cadastrarBtn!: string;

  dadosConfirmacao!: any[];
  navExtra!: NavigationExtras;

  constructor(
    public user: UserService,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
    private _trocaDeTitularidade: TrocaDeTitularidadeService,

  ) {
    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    console.log(this.navExtra);
  }

  ngOnInit(): void {
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.cadastrarBtn = (this.mobile) ? "CADASTRAR" : "CADASTRAR WHATSAPP";
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.cadastrarBtn = (this.mobile) ? "CADASTRAR" : "CADASTRAR WHATSAPP";

  }

  naoCadastrar(): void {
    this.navExtra.state!.fluxoTroca = true;
    if (this.navExtra.state!.fluxoAlterarDadosFatura) {
      this.navExtra.state!.dadosFatura.email = null;
      this.navExtra.state!.dadosFatura.whatsApp = null;
      this.navExtra.state!.dadosConfirmar = this._trocaDeTitularidade.dadosConfirmarNavExtra(this.navExtra);
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar'], this.navExtra);

    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'dados-debito-automatico'], this.navExtra);
    }

  }

  cadastrar(): void {
    this.navExtra.state!.fluxoTroca = true;
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'cadastrar-whatsapp'], this.navExtra);
  }

}
