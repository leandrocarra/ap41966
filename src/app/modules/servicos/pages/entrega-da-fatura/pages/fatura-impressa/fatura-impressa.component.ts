import { Location } from '@angular/common';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Regiao } from 'app/core/enums/regiao';
import { PathCompleto } from 'app/core/enums/servicos';
import { OpcoesDeFatura, OpcoesDeFaturaImpressa } from 'app/core/models/entrega-de-fatura/entrega-da-fatura';
import { SubRotasFaturaImpressa } from 'app/core/models/entrega-de-fatura/sub-rotas-falta-de-energia';
import { FaturaImpressaService } from 'app/core/services/fatura-impressa/fatura-impressa.service';
import { UserService } from 'app/core/services/user/user.service';
import { configureMenuByWindowSize } from 'app/core/services/utils/neo-utils.service';

@Component({
  selector: 'app-fatura-impressa',
  templateUrl: './fatura-impressa.component.html',
  styleUrls: ['./fatura-impressa.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaturaImpressaComponent {
  grupoDoUsuario: string;
  mobile: boolean;
  formFaturaImpressa: FormGroup;
  opcoesFaturaImpressa: Array<OpcoesDeFatura>;
  constructor(
    private _user: UserService,
    private _location: Location,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _faturaImpressaService: FaturaImpressaService,
  ) {
    this._user.isFluxo = true;
    this._user.breadcrumb = true;
    this.grupoDoUsuario = this._user.group;
    this.mobile = configureMenuByWindowSize(window.screen.width);
    this.opcoesFaturaImpressa = this.criaOpcoes();
    this._faturaImpressaService.entregaDaFatura.fluxo = "";
    this.formFaturaImpressa = this.criaFormulario();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

  criaOpcoes(): Array<OpcoesDeFatura> {
    if (environment.regiao === Regiao.NE) {
      return [
        OpcoesDeFaturaImpressa.UnidadeConsumidora,
        OpcoesDeFaturaImpressa.EnderecoAlternativo,
      ];
    } else {
      return [
        OpcoesDeFaturaImpressa.UnidadeConsumidora,
        OpcoesDeFaturaImpressa.EnderecoAlternativo,
        OpcoesDeFaturaImpressa.CaixaPostal
      ];
    }
  }

  criaFormulario(): FormGroup {
    return this._formBuilder.group({
      ondeReceberFatura: [
        this._faturaImpressaService.entregaDaFatura.fluxo,
        [
          Validators.required
        ],
      ],
    });
  }

  voltar(): void {
    this._location.back();
  }

  continuar(): void {
    const rota = this.definirRotaAoContinuar();
    this._router.navigate([PathCompleto.faturaImpressa, rota]);
  }

  definirRotaAoContinuar(): SubRotasFaturaImpressa {
    switch (this.formFaturaImpressa.controls.ondeReceberFatura.value) {
      case OpcoesDeFaturaImpressa.UnidadeConsumidora: {
        this._faturaImpressaService.entregaDaFatura.fluxo = OpcoesDeFaturaImpressa.UnidadeConsumidora;
        this._faturaImpressaService.preencheValoresMinhaUC();
        return SubRotasFaturaImpressa.ConfirmarDados;
      }
      case OpcoesDeFaturaImpressa.EnderecoAlternativo: {
        this._faturaImpressaService.entregaDaFatura.fluxo = OpcoesDeFaturaImpressa.EnderecoAlternativo;
        return environment.regiao === Regiao.SE ? SubRotasFaturaImpressa.EnderecoAlternativo : SubRotasFaturaImpressa.ContaContrato;
      }
      case OpcoesDeFaturaImpressa.CaixaPostal: {
        this._faturaImpressaService.entregaDaFatura.fluxo = OpcoesDeFaturaImpressa.CaixaPostal;
        return SubRotasFaturaImpressa.CaixaPostal;
      }
      default: {
        return SubRotasFaturaImpressa.Erro;
      }
    }
  }
}
