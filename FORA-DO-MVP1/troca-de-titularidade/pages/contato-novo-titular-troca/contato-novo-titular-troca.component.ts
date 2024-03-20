import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { TrocaDeTitularidadeService } from 'app/core/services/troca-de-titularidade/troca-de-titularidade.service';
import { UserService } from 'app/core/services/user/user.service';
import { aplicarMascaraTelefoneCelular } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-contato-novo-titular-troca',
  templateUrl: './contato-novo-titular-troca.component.html',
  styleUrls: ['./contato-novo-titular-troca.component.scss']
})
export class ContatoNovoTitularTrocaComponent implements OnInit {

  contatoNovoTitularFormGroup!: FormGroup;

  telefone!: string;
  mascaraTelCel: any = '';

  checkTermo: boolean = false;
  isDisabled: boolean = true;

  dadosConfirmacao: any = [];
  navExtra!: NavigationExtras;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activedRouter: ActivatedRoute,
    public user: UserService,
    private _trocaTitularidadeService: TrocaDeTitularidadeService
  ) {

    this._activedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });
  }

  ngOnInit(): void {
    const contatoTelefone = this.navExtra.state!.contatoNovoTitular != undefined ? this.navExtra.state!.contatoNovoTitular.telefone : '';  
    const contatoEmail = (this.navExtra.state!.contatoNovoTitular != undefined && this.navExtra.state!.contatoNovoTitular.email != 'Não cadastrado') ? this.navExtra.state!.contatoNovoTitular.email : '';
    this.telefone = contatoTelefone;

    this.contatoNovoTitularFormGroup = this._formBuilder.group({
      telefone: [contatoTelefone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11)
        ]
      ],
      email: [contatoEmail,
        [
          Validators.email
        ]
      ],
    });

  }

  verificarBotao(): void {
    const telefone = this.contatoNovoTitularFormGroup.get('telefone');
    const email = this.contatoNovoTitularFormGroup.get('email');

    if ((telefone?.valid && email?.valid) && (this.checkTermo)) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  getTelCelMask(telefone: any): void {
    if (telefone) {
      this.mascaraTelCel = aplicarMascaraTelefoneCelular(telefone);
    }
    this.verificarBotao();
  }

  voltar(): void {
    if (this.navExtra.state!.fluxoPendencia === 'pendencia-antigo-terceiro') {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'pendencias-em-aberto'], this.navExtra);
    } else {
      this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'informar-novo-titular'], this.navExtra);
    }

  }

  continuar(): void {
    this._trocaTitularidadeService.confirmarTela = true;
    this.navExtra.state!.contatoNovoTitular = this.contatoNovoTitularFormGroup.value;
    if (this.contatoNovoTitularFormGroup.get('email')?.value === '') {
      this.navExtra.state!.contatoNovoTitular.email = 'Não cadastrado';
    }
    this.navExtra.state!.dadosConfirmar = this._trocaTitularidadeService.dadosConfirmarNavExtraAntigo(this.navExtra);
    console.log(this.navExtra);
    this._router.navigate(['servicos', 'troca-de-titularidade', 'antigo-titular', 'confirmar'], this.navExtra);
  }
}
