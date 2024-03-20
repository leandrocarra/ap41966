import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';

@Component({
  selector: 'app-escolha-proximo-titular-troca',
  templateUrl: './escolha-proximo-titular-troca.component.html',
  styleUrls: ['./escolha-proximo-titular-troca.component.scss']
})
export class EscolhaProximoTitularTrocaComponent implements OnInit {


  mobile: boolean = false;
  buttonContinuar!: string;
  optionSelected: string;

  navExtra!: NavigationExtras;

  constructor(
    public _router: Router,
    private _activatedRouter: ActivatedRoute,
    public trocaTitularidadeService: TrocaDeTitularidadeService
  ) {

    this.navExtra = new FluxoTrocaNavExtra();
    this._activatedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    if (this!.optionSelected == undefined) {
      this.optionSelected = this.navExtra.state!.fluxo;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.buttonContinuar = (this.mobile) ? "SOLICITAR TROCA" : "SOLICITAR TROCA DE TITULARIDADE"
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.buttonContinuar = (this.mobile) ? "SOLICITAR TROCA" : "SOLICITAR TROCA DE TITULARIDADE"
  }

  voltar(): void {
    this._router.navigate(['servicos', 'troca-de-titularidade', 'informativo-titularidade'], this.navExtra);
  }

  solicitarTrocaTitularidade(): void {
    this.navExtra.state!.fluxo = this.optionSelected;
    this.trocaTitularidadeService.titular = this.optionSelected;

    if (this.optionSelected == 'euMesmo') {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular'], this.navExtra);
    }
  }

}
