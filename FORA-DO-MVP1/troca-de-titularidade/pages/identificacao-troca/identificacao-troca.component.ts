import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FluxoTrocaNavExtra } from 'app/core/models/troca-de-titularidade/troca-de-titularidade';
import { UserService } from 'app/core/services/user/user.service';
import { cpfCnpj } from 'app/core/services/utils/neo-utils.service';
import { emailsIguaisValidators } from 'app/shared/Validators/confirmar-emails-iguais.validators';
import { TrocaDeTitularidadeService } from '../../troca-de-titularidade.service';

@Component({
  selector: 'app-identificacao-troca',
  templateUrl: './identificacao-troca.component.html',
  styleUrls: ['./identificacao-troca.component.scss']
})
export class IdentificacaoTrocaComponent implements OnInit {


  dadosInformadosFormGroup!: FormGroup;

  dadosCliente: any;
  anexos: any;

  cpfCnpjmask!: string;
  isDisabled: boolean = true;

  navExtra!: NavigationExtras;
  navExtraDados!: NavigationExtras;
  navExtraConfirmacao!: NavigationExtras;
  textoSolicitacao!: NavigationExtras;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _trocaDeTitularidade: TrocaDeTitularidadeService,
    public user: UserService,
  ) {
    this._activatedRouter.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation() && this._router.getCurrentNavigation()?.extras.state) {
        this.navExtra = new FluxoTrocaNavExtra(this._router.getCurrentNavigation()?.extras.state)
      }
    });

    this.getDadosCliente();
    this.recebeAnexos();
  }

  recebeAnexos() {
    if (this.navExtra.state!.docsAnexados.length > 0) {
      this.anexos = this.navExtra.state!.docsAnexados;
    }
  }

  getDadosCliente() {
    this.dadosCliente = {
      nome: "Kelly Macagi",
      documento: "99999999999",
      docSecundario: "654893245",
      dataNascimento: "1992-08-31",
      telefone: "19940028922",
      celular: "79994011272",
      ucs: [
        {
          uc: '9876543',
          logradouro: 'Logradouro',
          numero: '0000',
          complemento: '',
          bairro: 'URBANO',
          cidade: 'AGUAÍ',
          estado: 'SP',
          cep: '13500-000'
        }
      ]
    };
  }

  ngOnInit(): void {
    this.dadosInformadosFormGroup = this._formBuilder.group({
      cpfCnpj: ['', [Validators.required]],
      email: ['', [Validators.email]],
      confirmarEmail: ['', [Validators.email]],
    },
      {
        validators: [emailsIguaisValidators],
      }
    );
  }


  continuar(): void {
    this.textoSolicitacao = this._trocaDeTitularidade.criaTextoSolicitacao();
    this.navExtraConfirmacao = this._trocaDeTitularidade.definirNavExtraConfirmacaoNovo(this.navExtra);

    this._router.navigate(['/servicos/troca-de-titularidade/novo-titular/solicitacao-enviada'], {
      state: { detalhesSolicitacao: this.navExtraConfirmacao, dadosTextoSolicitacao: this.textoSolicitacao }
    });
  }


  voltar(): void {
    this._location.back();
  }

  verificarBotao() {
    const vCpfCnpj = this.dadosInformadosFormGroup.get('cpfCnpj');
    const vEmail = this.dadosInformadosFormGroup.get('email');
    const vConfirmarEmail = this.dadosInformadosFormGroup.get('confirmarEmail');

    if (vCpfCnpj?.valid && vEmail?.valid && vConfirmarEmail?.valid && this.dadosInformadosFormGroup.errors?.emailsDiferentes) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }

  }

  applyMaskCpfCnpj(): void {
    const dadoCpfCnpj = this.dadosInformadosFormGroup.get('cpfCnpj')?.value;
    this.cpfCnpjmask = cpfCnpj(dadoCpfCnpj);
  }

}
