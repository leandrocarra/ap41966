import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';

@Component({
  selector: 'app-cadastrar-fatura-digital-troca',
  templateUrl: './cadastrar-fatura-digital-troca.component.html',
  styleUrls: ['./cadastrar-fatura-digital-troca.component.scss']
})
export class CadastrarFaturaDigitalTrocaComponent implements OnInit {

  /**
   * TODO:
   *  Implementar o disable do botão
   * 
   *  */

  //
  cadFatDigitalFormGroup!: FormGroup;
  mobile: boolean = false;
  cadFaturaButton!: string;

  dadosConfirmacao!: any[];
  navExtra!: NavigationExtras;


  constructor(
    private _formBuilder: FormBuilder,
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.configureMenuByWindowSize(event.target.innerWidth);
  }

  configureMenuByWindowSize(width: any): void {
    this.mobile = (width <= 768) ? true : false;
    this.cadFaturaButton = (this.mobile) ? "CADASTRAR" : "CADASTRAR FATURA NO E-MAIL";
  }

  ngOnInit(): void {
    this.mobile = (window.screen.width <= 768) ? true : false;
    this.cadFaturaButton = (this.mobile) ? "CADASTRAR" : "CADASTRAR FATURA NO E-MAIL";

    this.cadFatDigitalFormGroup = this._formBuilder.group({
      email: ['samuel.ferreira@br.ey.com', [Validators.email]],
    });
  }

  segueFluxo(fluxo: string): void {
    this.navExtra.state!.fluxoTroca = true;


    if (fluxo == 'whatsapp') {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informativo-whatsapp'], this.navExtra);
    } else {
      this.navExtra.state!.dadosFatura.email = this.cadFatDigitalFormGroup.get('email')?.value;

      if (this.navExtra.state!.fluxoAlterarDadosFatura) {
        this.navExtra.state!.dadosConfirmar = this._trocaDeTitularidade.dadosConfirmarNavExtra(this.navExtra);
        this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar'], this.navExtra);

      } else {
        this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'dados-debito-automatico'], this.navExtra);
      }
    }
  }


}
