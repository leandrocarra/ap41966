import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathCompleto } from 'app/core/enums/servicos';
import { DadosDeEndereco } from 'app/core/models/entrega-de-fatura/entrega-da-fatura';
import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import { FaturaImpressaService } from 'app/core/services/fatura-impressa/fatura-impressa.service';
import { UserService } from 'app/core/services/user/user.service';
import { ESTADOS_BRASILEIROS } from 'app/core/services/utils/neo-utils.service';
import { Estado } from 'app/shared/models/utils/agencia-virtual-utils';


@Component({
  selector: 'app-caixa-postal',
  templateUrl: './caixa-postal.component.html',
  styleUrls: ['./caixa-postal.component.scss']
})
export class CaixaPostalComponent {
  grupoDoUsuario: string;
  formCEP: FormGroup;
  estados: Array<Estado>;

  constructor(
    private _user: UserService,
    private _router: Router,
    private _location: Location,
    private _faturaImpressaService: FaturaImpressaService,
    private _formBuilder: FormBuilder,
  ) {
    this.formCEP = this.createForm();
    this.grupoDoUsuario = this._user.group;
    this.estados = ESTADOS_BRASILEIROS;
  }

  createForm(): FormGroup {
    let enderecoPreenchido: DadosDeEndereco = this._faturaImpressaService.entregaDaFatura.dadosEndereco;
    return this._formBuilder.group({
      cep: [
        enderecoPreenchido.cep,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      caixaPostal: [
        enderecoPreenchido.caixaPostal,
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      cidade: [
        enderecoPreenchido.cidade,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      estado: [
        enderecoPreenchido.estado,
        [
          Validators.required,
          Validators.maxLength(2)
        ]
      ]
    });
  }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    this._faturaImpressaService.entregaDaFatura.dadosEndereco = this.formCEP.value;
    this._router.navigate([PathCompleto.faturaImpressa, SubRotasFaturaImpressa.ConfirmarDados]);
  }
}
