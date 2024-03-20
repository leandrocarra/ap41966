import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';
import { aplicarMascaraCelular } from 'app/core/services/utils/neo-utils.service';
import { celularesIguaisValidators } from 'app/shared/Validators/confirmar-celular-iguais.validator';

@Component({
  selector: 'app-cadastrar-whatsapp-troca',
  templateUrl: './cadastrar-whatsapp-troca.component.html',
  styleUrls: ['./cadastrar-whatsapp-troca.component.scss']
})
export class CadastrarWhatsappTrocaComponent implements OnInit {

  cadastrarWhatsAppGroup!: FormGroup;

  mascaraCelular: string = '';

  dadosConfirmacao!: Array<any>;
  navExtra!: NavigationExtras;
  isDisabled = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _activedRouter: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _trocaDeTitularidade: TrocaDeTitularidadeService,
    public user: UserService,
  ) {
    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    console.log(this.navExtra);
  }

  ngOnInit(): void {
    this.cadastrarWhatsAppGroup = this._formBuilder.group({
      celular: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ],
      confirmarCelular: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ],
    },
      {
        validators: [celularesIguaisValidators]
      },
    );
  }

  getCelMask(): void {
    this.mascaraCelular = aplicarMascaraCelular();
  }

  confirmar(): void {
    this.navExtra.state!.fluxoTroca = true;
    this.navExtra.state!.dadosFatura.whatsApp = this.cadastrarWhatsAppGroup.get('celular')?.value;

    if (this.navExtra.state!.fluxoAlterarDadosFatura) {

      this.navExtra.state!.dadosConfirmar = this._trocaDeTitularidade.dadosConfirmarNavExtra(this.navExtra);
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'confirmar'], this.navExtra);

    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'dados-debito-automatico'], this.navExtra);

    }
  }

  voltar(): void {
    this.navExtra.state!.fluxoTroca = true;
    this._router.navigate(['servicos', 'troca-de-titularidade', 'novo-titular', 'informativo-whatsapp'], this.navExtra);
  }



  verificarBotao() {
    const vCelular = this.cadastrarWhatsAppGroup.get('celular');
    const vConfirmarCelular = this.cadastrarWhatsAppGroup.get('confirmarCelular');

    if (vCelular?.valid && vConfirmarCelular?.valid && this.cadastrarWhatsAppGroup.errors?.celularesDiferentes) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }

  }
}
